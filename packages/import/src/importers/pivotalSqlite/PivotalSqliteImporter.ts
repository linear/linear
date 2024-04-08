import { File } from "@web-std/file";
import { Comment, Importer, ImportResult } from "../../types";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import {
  commentTable,
  fileAttachmentFileTable,
  fileAttachmentTable,
  labelTable,
  personTable,
  storyLabelTable,
  storyTable,
} from "./schema";
import { eq } from "drizzle-orm";
import invariant from "tiny-invariant";
import { LinearClient } from "@linear/sdk";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const j2m = require("jira2md");

type PivotalStoryType = "epic" | "feature" | "bug" | "chore" | "release";

/**
 * Import issues from an Pivotal Tracker CSV export.
 *
 * @param filePath  path to SQLite database file
 * @param apiKey Linear API key for file uploads
 */
export class PivotalSQLiteImporter implements Importer {
  public constructor(filePath: string, apiKey: string) {
    this.filePath = filePath;
    this.linearClient = new LinearClient({ apiKey });
  }

  public get name(): string {
    return "Pivotal (SQLite)";
  }

  public get defaultTeamName(): string {
    return "Pivotal";
  }

  public import = async (): Promise<ImportResult> => {
    const sqlite = new Database(this.filePath);
    const db = drizzle(sqlite);

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    const people = await db.select().from(personTable);

    for (const user of people) {
      importData.users[user.id.toString()] = {
        name: user.name ?? "Unknown",
        email: user.email ?? undefined,
      };
    }

    const allLabels = await db.select().from(labelTable);
    for (const label of allLabels) {
      invariant(label.name, "expected label to have a name");
      importData.labels[label.id.toString()] = {
        name: label.name,
      };
    }

    const workspaceLabels = {
      bug: "Bug",
      feature: "Feature",
      chore: "Chore",
    } as const;

    for (const [, name] of Object.entries(workspaceLabels)) {
      importData.labels[name] = {
        name: name,
      };
    }

    const stories = await db.select().from(storyTable);
    for (const story of stories) {
      const type = story.story_type as PivotalStoryType;
      const title = story.name;
      const url = `https://www.pivotaltracker.com/story/show/${story.id}`;
      const mdDesc = story.description ? j2m.to_markdown(story.description) : "";
      const description = `${mdDesc}\n\n[View original issue in Pivotal](${url})`;

      type TrackerStoryState =
        | "planned"
        | "unscheduled"
        | "unstarted"
        | "started"
        | "finished"
        | "delivered"
        | "accepted"
        | "rejected";

      // XXX: This is specific to our linear workflow states
      type LinearWorkflowState = "Backlog" | "Ready" | "Rejected" | "In Progress" | "Ready for PM QA" | "Done";

      const storyStateMap: Record<TrackerStoryState, LinearWorkflowState> = {
        planned: "Backlog",
        unscheduled: "Backlog",
        unstarted: "Ready",
        started: "In Progress",
        finished: "In Progress",
        delivered: "Ready for PM QA",
        accepted: "Done",
        rejected: "Rejected",
      };

      const status: LinearWorkflowState = storyStateMap[story.current_state] ?? "Backlog";

      const createdAt = new Date(story.created_at);
      const isCreatedAtValid = !isNaN(createdAt.getTime());
      invariant(isCreatedAtValid, "expected createdAt to be a valid date");

      const assigneeId = story.owned_by_id ? story.owned_by_id.toString() : undefined;

      const storyLabels = await db
        .select()
        .from(labelTable)
        .innerJoin(storyLabelTable, eq(labelTable.id, storyLabelTable.label_id))
        .where(eq(storyLabelTable.story_id, story.id));

      const labels = storyLabels.map(({ label }) => label.id.toString());
      switch (type) {
        case "bug": {
          labels.push(workspaceLabels.bug);
          break;
        }
        case "chore": {
          labels.push(workspaceLabels.chore);
          break;
        }
        case "feature": {
          labels.push(workspaceLabels.feature);
          break;
        }
        default:
        // noop
      }

      const pivotalComments = await db.select().from(commentTable).where(eq(commentTable.story_id, story.id));
      const comments: Comment[] = [];

      for (const comment of pivotalComments) {
        const pivotalFiles = await db
          .select()
          .from(fileAttachmentFileTable)
          .innerJoin(fileAttachmentTable, eq(fileAttachmentFileTable.file_attachment_id, fileAttachmentTable.id))
          .where(eq(fileAttachmentTable.comment_id, comment.id));

        const files: { url: string; content_type: string; filename: string }[] = [];
        for (const { file_attachment, file_attachment_file } of pivotalFiles) {
          invariant(file_attachment.content_type, "expected file_attachment to have a content_type");
          invariant(file_attachment.filename, "expected file_attachment to have a filename");
          const file = new File([file_attachment_file.blob], file_attachment.filename, {
            type: file_attachment.content_type,
          });
          console.log("uploading file", file_attachment.filename);
          const fileUrl = await this.uploadFileToLinear(file);
          files.push({ url: fileUrl, content_type: file_attachment.content_type, filename: file_attachment.filename });
        }

        const fileMarkdown =
          files.length > 0
            ? files
                .map(file => {
                  if (file.content_type.startsWith("image")) {
                    return `- ![${file.filename}](${file.url})`;
                  } else {
                    return `- [${file.filename}](${file.url})`;
                  }
                })
                .join("\n")
            : null;

        const body = j2m.to_markdown(comment.text ?? "") + (fileMarkdown ? `\n\n${fileMarkdown}` : "");

        comments.push({
          userId: comment.person_id.toString(),
          body: body ?? "",
          createdAt: new Date(comment.created_at),
        });
      }
      // .map(comment => ({
      //           userId: comment.person_id.toString(),
      //           body: comment.text ? j2m.to_markdown(comment.text) : "TODO - no comment text, attachments?",
      //           createdAt: new Date(comment.created_at),
      //         }))

      importData.issues.push({
        title,
        description,
        status,
        url,
        assigneeId,
        labels,
        createdAt,
        comments: comments,
      });
    }

    return importData;
  };

  /** Uploads a file to Linear, returning the uploaded URL. @throws */
  private uploadFileToLinear = async (file: File): Promise<string> => {
    const uploadPayload = await this.linearClient.fileUpload(file.type, file.name, file.size);

    if (!uploadPayload.success || !uploadPayload.uploadFile) {
      throw new Error("Failed to request upload URL");
    }

    const uploadUrl = uploadPayload.uploadFile.uploadUrl;
    const assetUrl = uploadPayload.uploadFile.assetUrl;

    // Make sure to copy the response headers for the PUT request
    const headers = new Headers();
    headers.set("Content-Type", file.type);
    headers.set("Cache-Control", "public, max-age=31536000");
    uploadPayload.uploadFile.headers.forEach(({ key, value }) => headers.set(key, value));

    try {
      await fetch(uploadUrl, {
        method: "PUT",
        headers,
        body: file,
      });

      return assetUrl;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to upload file to Linear");
    }
  };

  // -- Private interface

  private filePath: string;
  private linearClient: LinearClient;
}

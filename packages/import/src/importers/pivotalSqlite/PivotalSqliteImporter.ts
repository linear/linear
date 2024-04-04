import { Importer, ImportResult } from "../../types";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { commentTable, labelTable, personTable, storyLabelTable, storyTable } from "./schema";
import { eq } from "drizzle-orm";
import invariant from "tiny-invariant"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const j2m = require("jira2md");

type PivotalStoryType = "epic" | "feature" | "bug" | "chore" | "release";

interface PivotalIssueType {
  Id: string;
  Title: string;
  Labels: string;
  Iteration: string;
  "Iteration Start": string;
  "Iteration End": string;
  Type: PivotalStoryType;
  Estimate: string;
  "Current State": string;
  "Created at": Date;
  "Accepted at": Date;
  Deadline: string;
  "Requested By": string;
  Description: string;
  URL: string;
  "Owned By": string;
  Blocker: string;
  "Blocker Status": string;
  Comment: string;
}

/**
 * Import issues from an Pivotal Tracker CSV export.
 *
 * @param filePath  path to SQLite database file
 */
export class PivotalSQLiteImporter implements Importer {
  public constructor(filePath: string) {
    this.filePath = filePath;
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

    const labels = await db.select().from(labelTable);
    for (const label of labels) {
      invariant(label.name, "expected label to have a name");
      importData.labels[label.id.toString()] = {
        name: label.name,
      };
    }

    const stories = await db.select().from(storyTable);
    for (const story of stories) {
      const type = story.story_type;
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

      const comments = await db.select().from(commentTable).where(eq(commentTable.story_id, story.id))

      importData.issues.push({
        title,
        description,
        status,
        url,
        assigneeId,
        labels: storyLabels.map(({ label }) => label.id.toString()),
        createdAt,
        comments: comments.map((comment) => ({
          userId: comment.person_id.toString(),
          body: j2m.to_markdown(comment.text),
          createdAt: new Date(comment.created_at),
        }))
      });
    }

    return importData;
  };

  // -- Private interface

  private filePath: string;
}

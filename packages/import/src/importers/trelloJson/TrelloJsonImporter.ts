import fs from "fs";
import { Comment, Importer, ImportResult } from "../../types";

type TrelloLabelColor = "green" | "yellow" | "orange" | "red" | "purple" | "blue" | "sky" | "lime" | "pink" | "black";

interface TrelloCard {
  name: string;
  desc: string;
  shortUrl: string;
  closed: boolean;
  labels: {
    id: string;
    idBoard: string;
    name: string;
    color: TrelloLabelColor;
  }[];
  attachments: {
    name: string;
    url: string;
  }[];
  id: string;
  idList: string;
}

interface TrelloList {
  id: string;
  name: string;
  closed: boolean;
}

interface TrelloChecklist {
  id: string;
  idCard: string;
  checkItems: {
    name: string;
    state: "incomplete" | "complete";
    pos: number;
  }[];
}

interface TrelloComment {
  text: string;
  card: { id: string };
}

interface TrelloCommentAction {
  type: "commentCard";
  memberCreator?: { id: string; fullName: string; avatarUrl: string };
  data: TrelloComment;
  date: string;
}

export class TrelloJsonImporter implements Importer {
  public constructor(
    filePath: string,
    mapListsToStatuses: boolean,
    discardArchivedCards: boolean,
    discardArchivedLists: boolean,
    migrateAttachments: boolean,
    trelloApiKey: string,
    trelloApiToken: string
  ) {
    this.filePath = filePath;
    this.mapListsToStatuses = mapListsToStatuses;
    this.discardArchivedCards = discardArchivedCards;
    this.discardArchivedLists = discardArchivedLists;
    this.migrateAttachments = migrateAttachments;
    this.trelloApiKey = trelloApiKey;
    this.trelloApiToken = trelloApiToken;
  }

  public get name(): string {
    return "Trello (JSON)";
  }

  public get defaultTeamName(): string {
    return "Trello";
  }

  public import = async (): Promise<ImportResult> => {
    const bytes = fs.readFileSync(this.filePath);
    const data = JSON.parse(bytes as unknown as string);

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    // Map card id => checklists so we can add them to the issues in the next step
    const checkLists: { [key: string]: TrelloChecklist[] } = {};
    for (const checklist of (data?.checklists ?? []) as TrelloChecklist[]) {
      if (!checkLists[checklist.idCard]) {
        checkLists[checklist.idCard] = [];
      }
      checkLists[checklist.idCard].push(checklist);
    }

    // Map card id => comments so we can add them to the issues in the next step
    const comments: { [key: string]: Comment[] } = {};
    for (const action of data.actions) {
      if (action.type !== "commentCard") {
        continue;
      }
      const {
        data: { text, card },
        memberCreator,
        date,
      } = action as TrelloCommentAction;

      // Handle comment creator does not exist in import
      if (!memberCreator) {
        continue;
      }

      importData.users[memberCreator.id] = { name: memberCreator.fullName, avatarUrl: memberCreator.avatarUrl };
      const importComment = { body: text, userId: memberCreator.id, createdAt: new Date(date) };
      if (card.id in comments) {
        comments[card.id].push(importComment);
      } else {
        comments[card.id] = [importComment];
      }
    }

    const trelloLists = data.lists as TrelloList[];

    for (const card of data.cards as TrelloCard[]) {
      const url = card.shortUrl;
      const mdDesc = card.desc;
      const cardChecklists = checkLists[card.id] ?? [];
      let formattedChecklists = "";
      if (cardChecklists.length > 0) {
        formattedChecklists = cardChecklists
          .map(checklist =>
            checklist.checkItems
              .sort((item1, item2) => item1.pos - item2.pos)
              .map(item => `- [${item.state === "complete" ? "x" : " "}] ${item.name}`)
              .join("\n")
          )
          .join("\n\n---\n\n");
      }
      const formattedAttachments = this.migrateAttachments
        ? ""
        : card.attachments.map(attachment => `[${attachment.name}](${attachment.url})`).join("\n");
      const cardList = trelloLists.find(list => list.id === card.idList);

      let description = `${mdDesc}`;
      if (formattedChecklists) {
        description += `\n\nChecklists:\n${formattedChecklists}`;
      }
      if (!this.migrateAttachments && card.attachments && card.attachments.length > 0) {
        description += `\n\nAttachments:\n${formattedAttachments}`;
      }
      description += `\n\n[View original card in Trello](${url})`;
      const labels = card.labels?.map(l => l.id);

      if (this.discardArchivedCards && card.closed) {
        continue;
      }

      if (this.discardArchivedLists && cardList?.closed) {
        continue;
      }

      const issueBase = {
        title: card.name,
        description,
        url,
        labels,
        comments: comments[card.id],
        status: this.mapListsToStatuses ? cardList?.name : undefined,
        archived: card.closed || cardList?.closed,
      };

      const attachments = card.attachments.map(attachment => ({
        url: attachment.url,
        name: attachment.name,
        httpHeaders: {
          Authorization: `OAuth oauth_consumer_key="${this.trelloApiKey}", oauth_token="${this.trelloApiToken}"`,
        },
      }));

      importData.issues.push({
        ...issueBase,
        attachments: this.migrateAttachments ? attachments : undefined,
      });

      const allLabels =
        card.labels?.map(label => ({
          id: label.id,
          color: mapLabelColor(label.color),
          // Trello allows labels with no name and only a color value, but we must specify a name
          name: label.name || `Trello-${label.color}`,
        })) ?? [];

      for (const label of allLabels) {
        const { id, ...labelData } = label;
        importData.labels[id] = labelData;
      }
    }

    return importData;
  };

  // -- Private interface
  private filePath: string;
  private mapListsToStatuses: boolean;
  private discardArchivedCards: boolean;
  private discardArchivedLists: boolean;
  private migrateAttachments: boolean;
  private trelloApiKey: string;
  private trelloApiToken: string;
}

// Maps Trello colors to Linear branded colors
const mapLabelColor = (color: TrelloLabelColor): string => {
  const colorMap = {
    green: "#0F783C",
    yellow: "#F2C94C",
    orange: "#DB6E1F",
    red: "#C52828",
    purple: "#5E6AD2",
    blue: "#0F7488",
    sky: "#26B5CE",
    lime: "#4CB782",
    pink: "#EB5757",
    black: "#ffffff", // black is the new white ¯\_(ツ)_/¯
  };
  return colorMap[color];
};

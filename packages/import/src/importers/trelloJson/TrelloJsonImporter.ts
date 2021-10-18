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
  memberCreator: { id: string; fullName: string; avatarUrl: string };
  data: TrelloComment;
  date: string;
}

export class TrelloJsonImporter implements Importer {
  public constructor(filePath: string, discardArchivedCards: boolean, discardArchivedLists: boolean, listToStatusMap: string) {
    this.filePath = filePath;
    this.discardArchivedCards = discardArchivedCards;
    this.discardArchivedLists = discardArchivedLists;

    // convert string of form a=b,c=d to a map
    this.listToStatusMap = listToStatusMap
      .split(',')
      .map(v => v.trim().split('=').map(v => v.trim()))
      .reduce((acc, [listName, status]) => {
        if (listName && status) {
          acc[listName] = status
        }
        return acc
      }, {});
  }

  public get name(): string {
    return "Trello (JSON)";
  }

  public get defaultTeamName(): string {
    return "Trello";
  }

  public import = async (): Promise<ImportResult> => {
    const bytes = fs.readFileSync(this.filePath);
    const data = JSON.parse((bytes as unknown) as string);

    const importData: ImportResult = {
      issues: [],
      labels: {},
      users: {},
      statuses: {},
    };

    // Map card id => checklist so we can add them to the issues in the next step
    const checkLists: { [key: string]: TrelloChecklist } = {};
    for (const checklist of data.checklists as TrelloChecklist[]) {
      checkLists[checklist.idCard] = checklist;
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
      importData.users[memberCreator.id] = { name: memberCreator.fullName, avatarUrl: memberCreator.avatarUrl };
      const importComment = { body: text, userId: memberCreator.id, createdAt: new Date(date) };
      if (card.id in comments) {
        comments[card.id].push(importComment);
      } else {
        comments[card.id] = [importComment];
      }
    }

    // create a mapping of list ids to names from the trello data
    const listNameMap: Record<string, string> = (data.lists as {id: string, name: string}[]).reduce((acc, list) => {
      acc[list.id] = list.name
      return acc
    }, {})

    for (const card of data.cards as TrelloCard[]) {
      const url = card.shortUrl;
      const mdDesc = card.desc;
      const checklist = checkLists[card.id];
      let formattedChecklist = "";
      if (checklist) {
        formattedChecklist = checklist.checkItems
          .sort((item1, item2) => item1.pos - item2.pos)
          .map(item => `- [${item.state === "complete" ? "x" : " "}] ${item.name}`)
          .join("\n");
      }
      const formattedAttachments = card.attachments
        .map(attachment => `[${attachment.name}](${attachment.url})`)
        .join("\n");

      const description = `${mdDesc}${formattedChecklist && `\n${formattedChecklist}`}${
        formattedAttachments && `\n\nAttachments:\n${formattedAttachments}`
      }\n\n[View original card in Trello](${url})`;
      const labels = card.labels.map(l => l.id);

      if (this.discardArchivedCards && card.closed) {
        continue;
      }

      if (
        this.discardArchivedLists &&
        (data.lists as TrelloList[]).find(list => list.id === card.idList && list.closed)
      ) {
        continue;
      }

      const status = this.listToStatusMap[listNameMap[card.idList]] || 'Triage'

      importData.issues.push({
        title: card.name,
        description,
        url,
        labels,
        comments: comments[card.id],
        status
      });

      const allLabels = card.labels.map(label => ({
        id: label.id,
        color: mapLabelColor(label.color),
        // Trello allows labels with no name and only a color value, but we must specify a name
        name: label.name || `Trello-${label.color}`,
      }));

      for (const label of allLabels) {
        const { id, ...labelData } = label;
        importData.labels[id] = labelData;
      }
    }

    // reverse order, so that the order of cards in Trello is maintained in
    // Linear, since linear's UI orders by recency
    importData.issues.reverse();

    return importData;
  };

  // -- Private interface
  private filePath: string;
  private discardArchivedCards: boolean;
  private discardArchivedLists: boolean;
  private listToStatusMap: Record<string, string>;
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

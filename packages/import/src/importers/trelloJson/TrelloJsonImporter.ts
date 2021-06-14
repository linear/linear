import fs from "fs";
import { Importer, ImportResult } from "../../types";

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
  idList: string;
}

interface TrelloList {
  id: string;
  closed: boolean;
}

export class TrelloJsonImporter implements Importer {
  public constructor(filePath: string, discardArchivedCards: boolean, discardArchivedLists: boolean) {
    this.filePath = filePath;
    this.discardArchivedCards = discardArchivedCards;
    this.discardArchivedLists = discardArchivedLists;
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

    for (const card of data.cards as TrelloCard[]) {
      const url = card.shortUrl;
      const mdDesc = card.desc;
      const description = `${mdDesc}\n\n[View original card in Trello](${url})`;
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

      importData.issues.push({
        title: card.name,
        description,
        url,
        labels,
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

    return importData;
  };

  // -- Private interface
  private filePath: string;
  private discardArchivedCards: boolean;
  private discardArchivedLists: boolean;
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

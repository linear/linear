import { Issue, Linear } from "@linear/sdk";
import * as vscode from "vscode";

export class IssuesNodeProvider implements vscode.TreeDataProvider<Issue> {
  public readonly onDidChangeTreeData: vscode.Event<Issue | undefined>;

  public constructor() {
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.linear = new Linear({
      token: "fCzG6qAHVzRXZePyV1STfbCsMqfhtuSxHssG4W5I",
    });
    // TODO: Revoke this key once auth is in
    this.refresh();
  }

  public async refresh() {
    this.issues = await this.linear.query.issues();
    this._onDidChangeTreeData.fire();
  }

  public getTreeItem(element: Issue): vscode.TreeItem {
    return new IssueTreeItem(element);
  }

  public getChildren(element?: Issue) {
    console.log("Get children");
    return Promise.resolve(this.issues);
  }

  private _onDidChangeTreeData = new vscode.EventEmitter<Issue | undefined>();
  private issues: Issue[] = [];
  private linear: Linear;
}

export class IssueTreeItem extends vscode.TreeItem {
  public constructor(public readonly issue: Issue) {
    super("LIN-" + issue.number, vscode.TreeItemCollapsibleState.None);
  }

  public get tooltip(): string {
    return `LIN-${this.issue.number} - ${this.issue.title}`;
  }

  public get description(): string {
    return this.issue.title;
  }
}

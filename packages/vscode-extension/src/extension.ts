import * as vscode from "vscode";
import { IssuesNodeProvider } from "./IssueNodeProvider";

export function activate(context: vscode.ExtensionContext) {
  const nodeDependenciesProvider = new IssuesNodeProvider();
  vscode.window.registerTreeDataProvider("linearIssues", nodeDependenciesProvider);

  const disposable = vscode.commands.registerCommand("extension.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World!");
    //vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('http://www.pinkbike.com/news/fail-of-the-month-june-2016.html'));
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

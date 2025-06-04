> **Note**
> Linear now has a migration assistant for importing from Asana, Jira, Shortcut, and GitHub without using the CLI.
>
> Please see [the documentation](https://linear.app/docs/import-issues) for more information.
> If you would like to import data from other services not listed above this CLI may still be useful.

# linear-import

Install the CLI:

```
yarn global add @linear/import
```

or

```
npm i --location=global @linear/import
```

Run interactive importer:

```
linear-import
```

## Importers

It's recommended to only import open issues to keep your Linear account more manageable. Note that creation and modification dates on issues will not carry over.

### GitHub

Open GitHub issues can be imported with your personal access token from GitHub's API.

Supported fields:

- Title
- Description
- Labels
- (Optional) Comments

### Jira CSV

This method is deprecated. We recommend importing Jira projects through the [in-product importer](https://linear.app/docs/import-issues#jira) instead of the CLI, which also offers a CSV import option but imports more fields. If you proceed, the following fields are supported:

- `Summary` - Issue title
- `Description` - Converted into markdown and used as issue description
- `URL` - URL of Jira issue
- `Priority` - Issue priority
- `Issue key` - Used to build backlink to original Jira issue
- `Issue Type` - Added as a label
- (Optional) `Release` - Added as a label

### Asana CSV

Asana projects can be imported into a Linear team from the CSV export file.

Following fields are supported:

- `Name` - Issue title
- `Notes` - Converted into markdown and used as issue description
- `Priority` - Issue priority
- `Tags` - Added as a label
- `Assignee` - Issue assignee

### Pivotal Tracker CSV

Pivotal Tracker projects can be imported into a Linear team from the CSV export file. It only imports `chores`, `features`, and `bugs`.

Following fields are supported:

- `Title` - Issue title
- `Description` - Converted into markdown and used as issue description
- `Labels` - Added as a label
- `Owned By` - Story owner
- `URL` - URL of Pivotal Tracker story
- `Created at` - Preserves the story creation date

### Shortcut CSV

Shortcut workspaces can be imported into a Linear team from the CSV export file. It only imports `chores`, `features`, and `bugs`.

Following fields are supported:

- `Name` - Issue title
- `Description` - Shortcut markdown formatted description
- `Tasks` - Appended to the description
- `External Tickets` - Appended to the description
- `State` - Mapped to the most similar Linear status
- `Type` - Added as a label
- `Tags` - Added as labels
- `Owners` - Story owner (only the first is preserved)
- `URL` - URL of Shortcut story, also appended to the description
- `Created at` - Preserves the story creation date

### Trello JSON

Trello board can be imported into a Linear team from the JSON export file, which can be obtained by going into Board → Show Menu → More → Print and Export → Export as JSON.

Following fields are supported:

- `Name` - Issue title
- `Description` - Trello markdown formatted description
- `URL` - URL of Trello card
- `Labels` - Added as a label
- `Attachments` - Added as links in the description
- (Optional) `Comments` - Added in the description

### Linear CSV

Linear CSV exports (Settings → Import / Export → Export CSV) can be imported into Linear again. You can use this to import issues from one workspace to another. Archived issues won't be imported.

Following fields are supported:

- `Title` - Issue title
- `Description` - Issue description
- `Priority` - Issue priority
- `Status` - Issue state (workflow)
- `Assignee` - Issue assignee (user's full name)
- `Labels` - Added as a label

---

## Microsoft Planner Importer

This importer allows you to bring your tasks from Microsoft Planner into Linear.

### Prerequisites

Before you begin, you'll need:

1.  **Microsoft Graph API Key**:
    *   You need an API key (or an access token) that grants permissions to read Planner data via the Microsoft Graph API.
    *   Necessary permissions typically include:
        *   `Tasks.Read` (to read tasks)
        *   `Group.Read.All` (to read plans and buckets if they are tied to Microsoft 365 Groups)
        *   Consult Microsoft Graph documentation for the most up-to-date permission requirements.
2.  **Linear API Key**:
    *   Generate this from your Linear settings: _Settings → API → Personal API Keys_.
3.  **Linear Team ID**:
    *   This is the ID of the Linear team you want to import the Planner tasks into. You can usually find this in the URL when viewing a team in Linear (e.g., `linear.app/your-workspace/team/TEAM_ID/all`).

### How to Use

1.  Run the interactive importer command:
    ```bash
    linear-import
    ```
2.  When prompted to "Which service would you like to import from?", select **Microsoft Planner** from the list.
3.  You will then be prompted to enter:
    *   Your Microsoft Graph API key (or access token).
    *   The Linear Team ID for the import.

### What Gets Imported

The importer attempts to map your Planner data to Linear concepts as follows:

*   **Planner Plans**:
    *   Each Planner Plan can be associated with an existing Linear Project or potentially create new Linear Projects based on the Plan's name. The importer may also use a combination of Plan and Bucket names for Project creation.
*   **Planner Buckets**:
    *   Buckets within a Plan help organize tasks. These might be used to further refine Project association or, if a direct mapping isn't found, contribute to the creation of new Projects (e.g., "Plan Name - Bucket Name").
*   **Planner Tasks** are imported as **Linear Issues**.

    The following task details are mapped:
    *   **Task Name** → Issue Title
    *   **Task Description** (Notes) → Issue Description
    *   **Priority** (Urgent, Important, Medium, Low) → Linear Priority (Urgent, High, Medium, Low, No Priority)
    *   **Progress** (Not Started, In Progress, Completed) → Linear Workflow State (e.g., Todo, In Progress, Done). The importer will try to map to existing states by name.
    *   **Assigned To** → Linear Assignee.
        *   _Note: Assignee mapping might be basic, relying on matching display names or user IDs. Complex mapping scenarios might require manual adjustments post-import._
    *   **Labels** (Planner task labels) → Linear Labels
    *   **Due Date** → Issue Due Date
    *   **Checklist Items** → These are typically appended to the issue description as a checklist in Markdown format or might be converted to sub-issues depending on the importer's logic.

---

## Todo

- [x] Automatic image uploads
- [ ] Assignees (pick from a list)
- [ ] Created at (requires API change)

<!-- AUTO-GENERATED-CONTENT:START (TEXT_SECTION:id=license&src=../../README.md) -->
## License

<br/>

Licensed under the [MIT License](./LICENSE).
<!-- AUTO-GENERATED-CONTENT:END -->

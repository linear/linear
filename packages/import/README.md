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

### GitLab CSV

GitLab issues can be imported into a Linear team from the CSV export file.
Go to your project in GitLab. Select Plan > Issues from the left sidebar. Use filters if you want to narrow down the list. In the upper right, click Actions (⋮) > Export as CSV.

Following fields are supported:

- `Title` - Issue title
- `Description` - Issue description
- `State`: - Issue workflow state
- `Labels` - Added as a label
- `URL`: - Added as a link in the issue description
- `Created At`: Issue creation date
- `Due Date`: Issue due date
- `Closed At`: Issue completion date
- `Weight`: Issue priority;
- `Time Estimate` - Issue estimate

<!-- AUTO-GENERATED-CONTENT:START (TEXT_SECTION:id=license&src=../../README.md) -->

## License

<br/>

Licensed under the [MIT License](./LICENSE).

<!-- AUTO-GENERATED-CONTENT:END -->

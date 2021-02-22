# linear-import

Install the CLI:

```
yarn global add @linear/import
```

or

```
npm i -g @linear/import
```

Run interactive importer:

```
linear-import
```

## Importers

It's recommended to only import open issues to keep your Linear account more manageable.

### GitHub

Open GitHub issues can be imported with your personal access token from GitHub's API.

Supported fields:

- Title
- Description
- Labels
- (Optional) Comments

### Jira CSV

Jira project can be imported into a Linear team from the CSV export file.

Following fields are supported:

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

### Clubhouse CSV

Clubhouse workspaces can be imported into a Linear team from the CSV export file. It only imports `chores`, `features`, and `bugs`.

Following fields are supported:

- `Name` - Issue title
- `Description` - Clubhouse markdown formatted description
- `Tasks` - Appended to the description
- `External Tickets` - Appended to the description
- `State` - Mapped to the most similar Linear status
- `Type` - Added as a label
- `Tags` - Added as labels
- `Owners` - Story owner (only the first is preserved)
- `URL` - URL of Clubhouse story, also appended to the description
- `Created at` - Preserves the story creation date

### Trello JSON

Trello board can be imported into a Linear team from the JSON export file, which can be obtained by going into Board → Show Menu → More → Print and Export → Export as JSON.

Following fields are supported:

- `Name` - Issue title
- `Description` - Trello markdown formatted description
- `URL` - URL of Trello card
- `Labels` - Added as a label

## Todo

- [x] Automatic image uploads
- [ ] Assignees (pick from a list)
- [ ] Created at (requires API change)

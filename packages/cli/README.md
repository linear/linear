# linear-cli

A cli tool to interface with linear

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/linear-cli.svg)](https://npmjs.org/package/linear-cli)
[![Downloads/week](https://img.shields.io/npm/dw/linear-cli.svg)](https://npmjs.org/package/linear-cli)
[![License](https://img.shields.io/npm/l/linear-cli.svg)](https://github.com/zephraph/linear-cli/blob/master/package.json)

<!-- toc -->

- [linear-cli](#linear-cli)
- [Usage](#usage)
- [Commands](#commands)
- [Contributing](#contributing)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g linear-cli
$ linear COMMAND
running command...
$ linear (-v|--version|version)
linear-cli/0.0.0 darwin-x64 node-v10.15.3
$ linear --help [COMMAND]
USAGE
  $ linear COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`linear create`](#linear-create)
- [`linear help [COMMAND]`](#linear-help-command)

## `linear create`

Creates a new issue. Flags not provided will be prompted for at runtime.

```
USAGE
  $ linear create

OPTIONS
  -T, --team=team
  -h, --help         show CLI help
  -l, --label=label  label to be added to the issue
  -t, --title=title

EXAMPLE
  $ linear create
  $ linear create --title "Fix a bug" --label Bug
```

_See code: [src/commands/create.ts](https://github.com/zephraph/linear-cli/blob/v0.0.0/src/commands/create.ts)_

## `linear help [COMMAND]`

display help for linear

```
USAGE
  $ linear help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

<!-- commandsstop -->

# Contributing

Install dependencies via yarn

```
yarn
```

Start dev watch mode to ensure ts types are up-to-date

```
yarn dev
```

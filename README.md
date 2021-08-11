# @simonbetton/contentful-import-workflow-manager

A simple tool to extract the contentful-cli export file into a more manageable workflow.

[![Version](https://img.shields.io/npm/v/@simonbetton/contentful-import-workflow-manager.svg)](https://npmjs.org/package/@simonbetton/contentful-import-workflow-manager)
[![Downloads/week](https://img.shields.io/npm/dw/@simonbetton/contentful-import-workflow-manager.svg)](https://npmjs.org/package/@simonbetton/contentful-import-workflow-manager)
[![License](https://img.shields.io/npm/l/@simonbetton/contentful-import-workflow-manager.svg)](https://github.com/simonbetton/contentful-import-workflow-manager/blob/main/package.json)

<!-- toc -->

- [@simonbetton/contentful-import-workflow-manager](#simonbettoncontentful-import-workflow-manager)
- [Commands](#commands)
<!-- tocstop -->

# Commands

<!-- commands -->

- [`contentful-import-workflow-manager help [COMMAND]`](#contentful-import-workflow-manager-help-command)
- [`contentful-import-workflow-manager configure`](#contentful-import-workflow-manager-configure)
- [`contentful-import-workflow-manager export`](#contentful-import-workflow-manager-export)
- [`contentful-import-workflow-manager expand`](#contentful-import-workflow-manager-expand)
- [`contentful-import-workflow-manager bundle`](#contentful-import-workflow-manager-bundle)
- [`contentful-import-workflow-manager import`](#contentful-import-workflow-manager-import)

## `contentful-import-workflow-manager help [COMMAND]`

display help for contentful-import-workflow-manager

```
USAGE
  $ contentful-import-workflow-manager help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `contentful-import-workflow-manager configure`

Configure Contentful to import and export

```
USAGE
  $ contentful-import-workflow-manager configure

OPTIONS
  -c, --clear                              clears config by space ID
  -e, --environment_id=environment_id      environment ID e.g.'master'
  -h, --help                               show CLI help
  -s, --space_id=space_id                  space ID
  -t, --management_token=management_token  management token
```

_See code: [src/commands/configure.ts](https://github.com/simonbetton/contentful-import-workflow-manager/blob/v0.0.4/src/commands/configure.ts)_

## `contentful-import-workflow-manager export`

A wrapper for the contentful-cli export command

```
USAGE
  $ contentful-import-workflow-manager export

OPTIONS
  -h, --help               show CLI help
  -s, --space_id=space_id  space ID
```

_See code: [src/commands/export.ts](https://github.com/simonbetton/contentful-import-workflow-manager/blob/v0.0.4/src/commands/export.ts)_

## `contentful-import-workflow-manager expand`

Using the export files, expand into a workable folder/file format

```
USAGE
  $ contentful-import-workflow-manager expand

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/expand.ts](https://github.com/simonbetton/contentful-import-workflow-manager/blob/v0.0.4/src/commands/expand.ts)_

## `contentful-import-workflow-manager bundle`

Creates an import JSON file

```
USAGE
  $ contentful-import-workflow-manager bundle
```

_See code: [src/commands/bundle.ts](https://github.com/simonbetton/contentful-import-workflow-manager/blob/v0.0.4/src/commands/bundle.ts)_

## `contentful-import-workflow-manager import`

A wrapper for the contentful-cli import command

```
USAGE
  $ contentful-import-workflow-manager import

OPTIONS
  -f, --file=file          import JSON file
  -h, --help               show CLI help
  -s, --space_id=space_id  space ID
```

_See code: [src/commands/import.ts](https://github.com/simonbetton/contentful-import-workflow-manager/blob/v0.0.4/src/commands/import.ts)_

<!-- commandsstop -->

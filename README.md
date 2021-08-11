# @simonbetton/contentful-import-workflow-manager

A simple tool to extract the contentful-cli export file into a more manageable workflow.

[![Version](https://img.shields.io/npm/v/@simonbetton/contentful-import-workflow-manager.svg)](https://npmjs.org/package/@simonbetton/contentful-import-workflow-manager)
[![Downloads/week](https://img.shields.io/npm/dw/@simonbetton/contentful-import-workflow-manager.svg)](https://npmjs.org/package/@simonbetton/contentful-import-workflow-manager)
[![License](https://img.shields.io/npm/l/@simonbetton/contentful-import-workflow-manager.svg)](https://github.com/simonbetton/contentful-import-workflow-manager/blob/main/LICENSE)

<!-- toc -->

- [@simonbetton/contentful-import-workflow-manager](#simonbettoncontentful-import-workflow-manager)
- [Commands](#commands)
  <!-- tocstop -->
  <br />
  <br />

# Commands

<!-- commands -->

- [`ciwm bundle`](#contentful-import-workflow-manager-bundle)
- [`ciwm configure`](#contentful-import-workflow-manager-configure)
- [`ciwm expand`](#contentful-import-workflow-manager-expand)
- [`ciwm export`](#contentful-import-workflow-manager-export)
- [`ciwm help [COMMAND]`](#contentful-import-workflow-manager-help-command)
- [`ciwm import`](#contentful-import-workflow-manager-import)

<br />
<br />

### `ciwm bundle`

Creates an import JSON file

```
USAGE
  $ ciwm bundle
```

_See code: [src/commands/bundle.ts](https://github.com/simonbetton/contentful-import-workflow-manager/blob/v1.0.0/src/commands/bundle.ts)_

<br />

### `ciwm configure`

Configure Contentful to import and export

```
USAGE
  $ ciwm configure

OPTIONS
  -c, --clear                              clears config by space ID
  -e, --environment_id=environment_id      environment ID e.g.'master'
  -h, --help                               show CLI help
  -s, --space_id=space_id                  space ID
  -t, --management_token=management_token  management token
```

_See code: [src/commands/configure.ts](https://github.com/simonbetton/contentful-import-workflow-manager/blob/v1.0.0/src/commands/configure.ts)_

<br />

### `ciwm expand`

Using the export files, expand into a workable folder/file format

```
USAGE
  $ ciwm expand

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/expand.ts](https://github.com/simonbetton/contentful-import-workflow-manager/blob/v1.0.0/src/commands/expand.ts)_

<br />

### `ciwm export`

A wrapper for the contentful-cli export command

```
USAGE
  $ ciwm export

OPTIONS
  -h, --help               show CLI help
  -s, --space_id=space_id  space ID
```

_See code: [src/commands/export.ts](https://github.com/simonbetton/contentful-import-workflow-manager/blob/v1.0.0/src/commands/export.ts)_

<br />

### `ciwm help [COMMAND]`

display help for contentful-import-workflow-manager

```
USAGE
  $ ciwm help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

<br />

### `ciwm import`

A wrapper for the contentful-cli import command

```
USAGE
  $ ciwm import

OPTIONS
  -f, --file=file          import JSON file
  -h, --help               show CLI help
  -s, --space_id=space_id  space ID
```

_See code: [src/commands/import.ts](https://github.com/simonbetton/contentful-import-workflow-manager/blob/v1.0.0/src/commands/import.ts)_

<!-- commandsstop -->

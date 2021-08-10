import { Command, flags } from "@oclif/command";
import * as path from "path";
import Config from "conf";
const { importSpace } = require("contentful-cli/lib/cmds/space_cmds/import");

export default class Import extends Command {
  static description = "A wrapper for the contentful-cli import command";

  static flags = {
    help: flags.help({ char: "h" }),
    space_id: flags.string({ char: "s", description: "space ID" }),
    file: flags.string({ char: "f", description: "import JSON file" }),
  };

  async run() {
    const { flags } = this.parse(Import);

    if (flags.file && flags.space_id) {
      const config = new Config({
        configName: flags.space_id,
      });

      importSpace({
        contentFile: path.basename(flags.file),
        context: {
          managementToken: config.get("management_token"),
          activeSpaceId: flags.space_id,
          activeEnvironmentId: config.get("environment_id"),
        },
      });
    } else {
      this.error(`You must supply the filename & space ID`);
    }
  }
}

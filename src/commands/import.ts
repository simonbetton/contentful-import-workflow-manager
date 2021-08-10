import { Command, flags } from "@oclif/command";
import Config from "conf";
const { exportSpace } = require("contentful-cli/lib/cmds/space_cmds/export");

export default class Import extends Command {
  static description = "A wrapper for the contentful-cli export command";

  static flags = {
    help: flags.help({ char: "h" }),
    // space_id: flags.string({ char: "s", description: "space ID" }),
  };

  async run() {
    // const { flags } = this.parse(Export);
    // if (flags.space_id) {
    //   const config = new Config({
    //     configName: flags.space_id,
    //   });
    //   exportSpace({
    //     context: {
    //       managementToken: config.get("management_token"),
    //       activeSpaceId: flags.space_id,
    //       activeEnvironmentId: config.get("environment_id"),
    //     },
    //   });
    // } else {
    //   this.error(`You must supply the space ID`);
    // }
  }
}

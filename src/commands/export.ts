import { Command, flags } from "@oclif/command";
import Config from "conf";
const { spawn } = require("child_process");
const { exportSpace } = require("contentful-cli/lib/cmds/space_cmds/export");

export default class Export extends Command {
  static description = "A wrapper for the contentful-cli export command";

  static flags = {
    help: flags.help({ char: "h" }),
    space_id: flags.string({ char: "s", description: "space ID" }),
  };

  async run() {
    const { flags } = this.parse(Export);

    if (flags.space_id) {
      const config = new Config({
        configName: flags.space_id,
      });

      exportSpace({
        context: {
          managementToken: config.get("management_token"),
          activeSpaceId: flags.space_id,
          activeEnvironmentId: config.get("environment_id"),
        },
      });

      // Make environment file for type-gen.
      const gen = spawn(
        "npx",
        [
          "contentful-typescript-codegen",
          "-o",
          "@types/generated/contentful.d.ts",
        ],
        {
          env: {
            ...process.env,
            CONTENTFUL_SPACE_ID: flags.space_id,
            CONTENTFUL_ENVIRONMENT: config.get("environment_id"),
            CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN:
              config.get("management_token"),
          },
        }
      );
    } else {
      this.error(`You must supply the space ID`);
    }
  }
}

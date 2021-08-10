import { Command, flags } from "@oclif/command";
import Config from "conf";
import * as os from "os";

export default class Configure extends Command {
  static description = "Manage Contentful configuration";

  static flags = {
    help: flags.help({ char: "h" }),
    clear: flags.boolean({
      char: "c",
      description: "clears config by space ID",
    }),
    space_id: flags.string({ char: "s", description: "space ID" }),
    environment_id: flags.string({
      char: "e",
      description: "environment ID e.g.'master'",
    }),
    management_token: flags.string({
      char: "t",
      description: "management token",
    }),
  };

  async run() {
    const { flags } = this.parse(Configure);

    const schema = {
      environment_id: {
        default: "",
      },
      management_token: {
        default: "",
      },
    };

    const opts = {
      configName: flags.space_id,
      schema,
    };

    const config = new Config(opts);

    if (flags.clear) {
      config.clear();
    } else if (flags.space_id) {
      if (flags.environment_id && flags.management_token) {
        config.set("environment_id", flags.environment_id);
        config.set("management_token", flags.management_token);
      }
      this.print(`space_id: ${flags.space_id}` + os.EOL);
      for (let c of config) {
        this.print(`${c[0]}: ${c[1]}` + os.EOL);
      }
    }
  }

  private print(value: any) {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    process.stdout.write(value);
  }
}

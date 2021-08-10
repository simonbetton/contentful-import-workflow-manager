import { Command } from "@oclif/command";
import * as fs from "fs";
import * as prettier from "prettier";
import { glob } from "glob";
import chalk = require("chalk");
import { getJsonExport, pack } from "../utils";

export default class Bundle extends Command {
  static description = "A wrapper for the contentful-cli export command";

  async run() {
    // Glob the export json files.
    const exportDirectories = glob.sync("exports/*");

    exportDirectories.map((directory) => {
      const files = {
        contentTypes: glob.sync(`${directory}/contentTypes/*.json`),
        editorInterfaces: glob.sync(`${directory}/editorInterfaces/*.json`),
        entries: glob.sync(`${directory}/entries/*.json`),
        assets: glob.sync(`${directory}/assets/*.json`),
      };

      Promise.all([
        getJsonExport(files.contentTypes),
        getJsonExport(files.editorInterfaces),
        getJsonExport(files.entries),
        getJsonExport(files.assets),
      ]).then((contents) => {
        const combine: any = [];
        contents.map((item, key) => {
          combine.push({
            [Object.keys(files)[key]]: pack(item),
          });
        });

        const json = prettier.format(JSON.stringify(combine), {
          semi: false,
          parser: "json",
        });

        const export_filename = `contentful-import-${directory
          .replace("exports", "")
          .replace("/contentful-export-", "")}.json`;

        fs.writeFile(export_filename, json, (err) => {
          if (err) return console.log(err);
          this.log(chalk.green(`${export_filename} file created!`));
        });
      });
    });
  }
}

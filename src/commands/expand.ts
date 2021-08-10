import { Command, flags } from "@oclif/command";
import type { Entry } from "contentful";
import * as fs from "fs";
import * as path from "path";
import { glob } from "glob";
import * as prettier from "prettier";
import * as util from "util";
import {
  cleanJson,
  generateExportDirName,
  generateExportFileName,
} from "../utils";
import chalk = require("chalk");
const makeDir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

export default class Expand extends Command {
  static description =
    "Using the export files, expand into a workable folder/file format";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  // Create a directory for each section of the export e.g. contentTypes, entries, assets etc.
  async create_directories(json: Object, directory: string) {
    return await Promise.all(
      Object.keys(json).map((item) => {
        return makeDir(`${directory}/${item}`, { recursive: true });
      })
    );
  }

  getJsonContents(content: Buffer) {
    return JSON.parse(content.toString());
  }

  getExportDirectory(filename: string) {
    const directory = generateExportDirName(
      ["exports", path.basename(filename)].join("/")
    );

    this.log(
      `The export has been unpacked in the following directory: \n ${chalk.yellow(
        path.resolve(directory)
      )}`
    );

    return directory;
  }

  createJsonFile(directory: string, collection: string, data: Entry<any>) {
    const filename = generateExportFileName(data);
    const json = prettier.format(JSON.stringify(cleanJson(data)), {
      semi: false,
      parser: "json",
    });
    return writeFile(`${directory}/${collection}/${filename}`, json);
  }

  async run() {
    // Glob the export json files.
    const exportFiles = glob.sync(`contentful-export-*.json`);
    console.log(`${chalk.yellow(`${exportFiles.length} export files found`)}`);

    // For each export, let's create a directory for it and run through the unpacking of the export.
    for (const filename of exportFiles) {
      fs.readFile(filename, (error, content) => {
        if (error) throw error;

        const directory = this.getExportDirectory(filename);
        const json = this.getJsonContents(content);

        // The directories are now created, let's populate with the json output
        this.create_directories(json, directory)
          .then(() => {
            const collections = Object.keys(json);
            collections.map((collection) => {
              (async () => {
                return await Promise.all(
                  json[collection].map((data: any) => {
                    return this.createJsonFile(directory, collection, data);
                  })
                );
              })();
            });
          })
          .catch((err: any) => this.log(err));
      });
    }
  }
}

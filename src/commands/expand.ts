import { Command, flags } from "@oclif/command";
import type { Entry } from "contentful";
import { mkdir, writeFile as fs_writeFile, readFile } from "fs";
import { basename, resolve } from "path";
import { glob } from "glob";
import { format } from "prettier";
import { promisify } from "util";
import {
  cleanJson,
  generateExportDirName,
  generateExportFileName,
} from "../utils";
import { yellow } from "chalk";
const makeDir = promisify(mkdir);
const writeFile = promisify(fs_writeFile);

export default class Expand extends Command {
  static description =
    "Using the export files, expand into a workable folder/file format";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  // Create a directory for each section of the export e.g. contentTypes, entries, assets etc.
  async create_directories(json: Object, directory: string) {
    return await Promise.all(
      Object.keys(json).map((item) =>
        makeDir(`${directory}/${item}`, { recursive: true })
      )
    );
  }

  getJsonContents(content: Buffer) {
    return JSON.parse(content.toString());
  }

  getExportDirectory(filename: string) {
    const directory = generateExportDirName(
      ["exports", basename(filename)].join("/")
    );

    this.log(
      `The export has been unpacked in the following directory: \n ${yellow(
        resolve(directory)
      )}`
    );

    return directory;
  }

  createJsonFile(directory: string, collection: string, data: Entry<any>) {
    const filename = generateExportFileName(data);
    const json = format(JSON.stringify(cleanJson(data)), {
      semi: false,
      parser: "json",
    });
    return writeFile(`${directory}/${collection}/${filename}`, json);
  }

  async run() {
    // Glob the export json files.
    const exportFiles = glob.sync(`contentful-export-*.json`);
    console.log(`${yellow(`${exportFiles.length} export files found`)}`);

    // For each export, let's create a directory for it and run through the unpacking of the export.
    for (const filename of exportFiles) {
      readFile(filename, (error, content) => {
        if (error) throw error;

        const directory = this.getExportDirectory(filename);
        const json = this.getJsonContents(content);

        // The directories are now created, let's populate with the json output
        this.create_directories(json, directory)
          .then(() => {
            const collections = Object.keys(json);
            collections.map((collection) => {
              (async () =>
                await Promise.all(
                  json[collection].map((data: any) =>
                    this.createJsonFile(directory, collection, data)
                  )
                ))();
            });
          })
          .catch((err: any) => this.log(err));
      });
    }
  }
}

import slugify from "slugify";
import type { ContentType, Entry } from "contentful";
import * as fs from "fs";
import * as util from "util";
const readFile = util.promisify(fs.readFile);

// Create directories based on the json block of the export. E.g. entries, roles, assets etc.
export function generateExportDirName(filename: string) {
  return filename.replace(/^(contentful-export-)/, "").replace(/(.json)$/, "");
}

// Make human readable file names, mostly.
export function generateExportFileName(json: Entry<any>) {
  const filename = json.fields?.urlSlug
    ? json.fields?.urlSlug[Object.keys(json.fields?.urlSlug)[0]]
    : null ?? json.fields?.title
    ? json.fields?.title[Object.keys(json.fields?.title)[0]]
    : null ?? json.fields?.entryTitle
    ? json.fields?.entryTitle[Object.keys(json.fields?.entryTitle)[0]]
    : null ?? json.sys.contentType?.sys.id
    ? json.sys.contentType?.sys.id
    : null ?? null;
  return `${
    filename ? slugify(filename, { lower: true, strict: true }) + "-" : ""
  }${json.sys.id}.json`;
}

// Strip out the unnecessary data.
export function cleanJson(json: Entry<any> | ContentType) {
  delete json.sys.space;
  // delete json.sys.createdAt;
  // delete json.sys.updatedAt;
  // delete json.sys.environment;
  // delete json.sys.publishedVersion;
  // delete json.sys.publishedAt;
  // delete json.sys.firstPublishedAt;
  // delete json.sys.createdBy;
  // delete json.sys.updatedBy;
  // delete json.sys.publishedCounter;
  // delete json.sys.version;
  // delete json.sys.publishedBy;
  return json;
}

export function pack(json: any) {
  let p: any[] = [];
  json.map((item: { toString: () => string }) => {
    p.push(JSON.parse(item.toString()));
  });
  return p;
}

// Gather all the json data, read to bundle into an import file.
export async function getJsonExport(files: any) {
  try {
    return await Promise.all(
      files.map((filename: string) => readFile(filename, "utf-8"))
    );
  } catch (err) {
    throw err;
  }
}

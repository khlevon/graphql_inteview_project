import fs from "fs";
import path from "path";

/**
 * Reads all files with `fileExtension` from the given folder and returns them as an mapping of file name to file content
 */
export const loadSchemas = (
  folderPath: string,
  fileExtension: string = ".gql"
): { [key: string]: string } => {
  const files = fs.readdirSync(folderPath);
  const schemas: { [key: string]: string } = {};

  for (const file of files) {
    if (file.endsWith(fileExtension)) {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const fileName = file.replace(`.${fileExtension}`, "");

      schemas[fileName] = fileContent;
    }
  }

  return schemas;
};

type TDeepMergeArgFn = (k: any, a: Object, b: Object) => any;
export const deepMerge = (
  a: Object,
  b: Object,
  fn: TDeepMergeArgFn = () => Object.assign({}, a, b)
) => {
  return [...new Set([...Object.keys(a), ...Object.keys(b)])].reduce(
    (acc, key) => ({ ...acc, [key]: fn(key, a[key], b[key]) }),
    {}
  );
};

export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

import { readFileSync } from "node:fs";

export function loadJsonFile<T>(path: URL): T {
  const content = readFileSync(path, "utf-8");
  return JSON.parse(content) as T;
}

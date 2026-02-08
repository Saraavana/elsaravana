import { mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const blogContentDir = path.join(projectRoot, "src", "content", "blog");

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf-8"));
}

function parseDateToIso(input) {
  const normalized = input.replace(/(\d+)(st|nd|rd|th)/gi, "$1");
  const parsed = new Date(normalized);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Unable to parse date: ${input}`);
  }

  const year = String(parsed.getFullYear());
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function toYamlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function normalizeCodeFenceLanguages(content) {
  return content.replace(/```[ \t]*([A-Za-z0-9_-]+)/g, (_, language) => {
    const normalized = language.toLowerCase();
    if (normalized === "swiftui") {
      return "```swift";
    }
    return `\`\`\`${normalized}`;
  });
}

const recoveredBlogList = readJson(path.join(projectRoot, "recovered_blog_list.json"));
const recoveredBlogPosts = readJson(path.join(projectRoot, "recovered_blog_posts.json"));

const metadataBySlug = new Map(recoveredBlogList.map((item) => [item.slug, item]));
const filenames = new Set();

mkdirSync(blogContentDir, { recursive: true });

for (const post of recoveredBlogPosts) {
  const metadata = metadataBySlug.get(post.slug);

  if (!metadata) {
    throw new Error(`Missing metadata for slug: ${post.slug}`);
  }

  const date = parseDateToIso(metadata.date);
  const fileName = `${post.slug}.md`;
  const filePath = path.join(blogContentDir, fileName);
  filenames.add(fileName);

  const frontmatter = [
    "---",
    `title: ${toYamlString(post.title)}`,
    `description: ${toYamlString(post.desc ?? metadata.desc ?? "")}`,
    `category: ${toYamlString(metadata.category ?? "general")}`,
    `date: ${toYamlString(date)}`,
    "draft: false",
    "---",
    "",
  ].join("\n");

  const markdownBody = normalizeCodeFenceLanguages(String(post.content ?? "").trimEnd());
  writeFileSync(filePath, `${frontmatter}${markdownBody}\n`, "utf-8");
}

const existingFiles = readdirSync(blogContentDir).filter((file) => file.endsWith(".md"));
for (const fileName of existingFiles) {
  if (!filenames.has(fileName)) {
    unlinkSync(path.join(blogContentDir, fileName));
  }
}

console.log(`Imported ${filenames.size} blog posts into ${blogContentDir}`);

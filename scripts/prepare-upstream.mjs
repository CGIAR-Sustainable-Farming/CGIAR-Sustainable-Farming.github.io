import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";

// Only these editorial paths may be refreshed. SFP-owned content is never copied.
const guides = [
  "metadata-conventions.md",
  "data-conventions.md",
  "cloud-optimizing-data.md",
  "glossary.md",
];
const sources = {
  guides: {
    repo: "CGIAR-Climate-Data-Hub/CGIAR-Climate-Data-Hub.github.io",
    ref: "main",
  },
  skills: { repo: "CGIAR-Climate-Data-Hub/skills", ref: "main" },
  catalog: { repo: "CGIAR-Sustainable-Farming/catalog", ref: "main" },
  standard: {
    repo: "CGIAR-Climate-Data-Hub/cdh-metadata-standard",
    ref: "8cec4dcc61ff40232d2ef1f27f6abb7c17e3e0c7",
  },
};
const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, stdio: "inherit" });
mkdirSync(".cache", { recursive: true });
for (const [key, source] of Object.entries(sources)) {
  const path = resolve(".cache", key);
  if (!existsSync(path)) {
    run("git", ["init", path]);
    run(
      "git",
      ["remote", "add", "origin", `https://github.com/${source.repo}.git`],
      path,
    );
  }
  run("git", ["fetch", "--depth=1", "origin", source.ref], path);
  run("git", ["checkout", "--detach", "--force", "FETCH_HEAD"], path);
  source.commit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: path,
    encoding: "utf8",
  }).trim();
}
if (sources.standard.commit !== sources.standard.ref)
  throw new Error("Pinned standard tag changed; review required");
for (const file of guides) {
  const path = `src/content/wikis/${file}`;
  const body = readFileSync(`.cache/guides/${path}`, "utf8");
  const split = body.indexOf("\n---", 3);
  if (!body.startsWith("---\n") || split < 0)
    throw new Error(`Missing frontmatter: ${path}`);
  const markerEnd = split + 4;
  const attribution = `\n\n> Shared CGIAR Climate Data Hub guidance. [Upstream source](https://github.com/${sources.guides.repo}/blob/${sources.guides.commit}/${path}); reused under CC BY 4.0. SFP publication decisions follow [SFP review guidance](/wikis/governance/).\n`;
  writeFileSync(
    path,
    body.slice(0, markerEnd) + attribution + body.slice(markerEnd),
  );
}
run("./node_modules/.bin/biome", [
  "format",
  "--write",
  ...guides.map((file) => `src/content/wikis/${file}`),
]);
// Strict local inputs: upstream failure cannot silently empty skills or records.
if (!readdirSync(".cache/skills/.agents/skills").length)
  throw new Error("No upstream skills");
if (!existsSync(".cache/catalog/records"))
  throw new Error("Catalogue has no records directory");
writeFileSync(
  "public/upstream-provenance.json",
  JSON.stringify(
    {
      refreshed_at: new Date().toISOString(),
      website_baseline: "d244ba1cd96a226aa50e7807006b0d9ab7da4e31",
      sources,
      shared_guides: guides,
    },
    null,
    2,
  ) + "\n",
);

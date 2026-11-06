import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve("dist");
const files = readdirSync(root, { recursive: true }).filter((f) =>
  f.endsWith(".html"),
);
const broken = [];
for (const file of files) {
  const html = readFileSync(resolve(root, file), "utf8");
  for (const match of html.matchAll(
    /(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g,
  )) {
    const url = decodeURIComponent(match[1]);
    if (url.startsWith("//")) continue;
    const target = resolve(root, `.${url}`);
    if (!existsSync(target) && !existsSync(resolve(target, "index.html")))
      broken.push(`${file}: ${url}`);
  }
}
assert.equal(
  broken.length,
  0,
  `Broken local links:\n${[...new Set(broken)].join("\n")}`,
);
const stac = JSON.parse(readFileSync("dist/stac/catalog.json", "utf8"));
assert.equal(stac.type, "Catalog");
assert.equal(stac.id, "sfp");
const home = readFileSync("dist/index.html", "utf8");
assert.match(home, /Sustainable Farming/);
assert.match(home, /under review/);
assert.ok(!home.includes("Climate evidence,"));
const provenance = JSON.parse(
  readFileSync("dist/upstream-provenance.json", "utf8"),
);
for (const source of Object.values(provenance.sources))
  assert.match(source.commit, /^[a-f0-9]{40}$/);
console.log(
  `Verified ${files.length} pages, local links and upstream provenance.`,
);

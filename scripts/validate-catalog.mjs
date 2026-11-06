import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const records = resolve(process.env.RECORDS_DIR ?? ".cache/catalog/records");
const files = readdirSync(records, { recursive: true }).filter((f) =>
  /\.ya?ml$/.test(f),
);
if (files.length) {
  const standard = resolve(".cache/standard");
  execFileSync("npm", ["ci", "--ignore-scripts"], {
    cwd: standard,
    stdio: "inherit",
  });
  execFileSync(
    "node",
    [
      "scripts/validate-yaml.js",
      "--profile",
      "spec/schemas/profiles/cdh.schema.json",
      records,
    ],
    { cwd: standard, stdio: "inherit" },
  );
} else console.log("No approved records yet; review drafts remain excluded.");

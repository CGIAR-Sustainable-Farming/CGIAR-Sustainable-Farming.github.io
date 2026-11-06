import { execFileSync } from "node:child_process";

const run = (command, args) =>
  execFileSync(command, args, {
    stdio: "inherit",
    env: {
      ...process.env,
      RECORDS_DIR: process.env.RECORDS_DIR ?? ".cache/catalog/records",
      SKILLS_DIR: process.env.SKILLS_DIR ?? ".cache/skills/.agents/skills",
    },
  });
run("node", ["scripts/prepare-upstream.mjs"]);
run("bun", ["run", "ci"]);
run("node", ["scripts/validate-catalog.mjs"]);
run("bun", ["run", "astro", "check"]);
run("bun", ["run", "astro", "build"]);
run("node", ["scripts/check-site.mjs"]);

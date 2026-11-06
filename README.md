# CGIAR Sustainable Farming Data Hub

Website: https://cgiar-sustainable-farming.github.io

Built from the
[CGIAR Climate Data Hub website](https://github.com/CGIAR-Climate-Data-Hub/CGIAR-Climate-Data-Hub.github.io),
baseline `d244ba1cd96a226aa50e7807006b0d9ab7da4e31`.

## Local development

Requires Node >=22.12 and Bun 1.4.4.

```sh
bun install --frozen-lockfile
bun run build
RECORDS_DIR=.cache/catalog/records SKILLS_DIR=.cache/skills/.agents/skills bun run dev
bun run check
```

`build` strictly refreshes selected shared guides, skills, catalogue and the
pinned metadata validator. It validates approved records, type-checks Astro,
builds the site and checks local links. Public network access is required.
Source fetch failures abort the build; stale/empty fallback is not used for
production.

## Automatic updates

- **Daily at 03:23 UTC:** fetch selected CDH guides, current CDH skills and SFP
  catalogue; build and deploy only after checks pass. GitHub scheduling can be
  delayed. Manual Actions dispatch is available.
- **Weekly Monday at 04:41 UTC:** propose upstream website-code merges in
  `automation/cdh-upstream`, run checks, and open a PR. No automatic merge.
  Conflicts or failed checks stop the proposal and appear as failed Actions
  runs. Maintainers must review changes before merge.
- **SFP content:** branding, programme pages, governance and metadata stay
  separate. Shared content refresh uses the exact guide allowlist in
  `scripts/prepare-upstream.mjs` and adds attribution. No CDH datasets are
  imported by default.
- **Metadata standard:** pinned v0.5.0, not silently upgraded. Skills may
  describe newer upstream practices; records must still pass the supported
  version's validator.
- **Provenance:** every deployment records source commits and refresh time at
  `/upstream-provenance.json`.

Upstream code PRs require repository Actions permission to create pull requests.
No new long-lived secret or cross-repository dispatch token is required. Website
Pages source is GitHub Actions. Daily rebuilds pick up catalogue changes even
without a dispatch event.

## Metadata and STAC status

[SFP catalogue](https://github.com/CGIAR-Sustainable-Farming/catalog) keeps
`drafts/` separate from approved `records/`. Initial GAIA records remain drafts
with explicit gaps. The approved catalogue is initially empty. Schema success
does not approve roles, licences or scientific claims.

`/stac/catalog.json` is an empty STAC 1.1.0 Catalog scaffold, not a populated
catalogue or search API. `/catalog.json` is Schema.org JSON-LD and is not STAC.
ERA–Carob registration and a source-backed STAC mapping remain separate work; do
not fabricate extents or observation dates.

## Content ownership and contribution

Shared guide edits should go upstream; daily refresh overwrites their local
copies. SFP-specific content edits belong here. Submit metadata changes to the
catalogue repository. Never copy private planning files, internal correspondence
or credentials into these repositories.

## Attribution and licensing

- Upstream source code: MIT; original [LICENSE](LICENSE) retained.
- Reused CDH website text and documentation:
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); source links
  included on shared pages.
- SFP logos: original programme artwork from the official branding library; no
  trademark rights are granted by the code licence.
- Datasets: individual source licences and attribution apply; no blanket data
  licence or redistribution claim.

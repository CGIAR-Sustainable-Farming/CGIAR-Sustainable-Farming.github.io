---
title: Architecture and automatic updates
description: Shared CDH foundations, SFP-owned metadata and tested daily refreshes.
group: The Hub
updated: 2026-11-06
order: 3
---

The SFP site reuses the
[CDH Astro website](https://github.com/CGIAR-Climate-Data-Hub/CGIAR-Climate-Data-Hub.github.io).
SFP owns its identity, programme pages, catalogue and publication decisions.
Upstream licences and attribution are retained.

## Daily refresh

A daily GitHub Actions build retrieves the latest selected CDH technical guides,
CDH agent skills and SFP catalogue. Every fetch must succeed; lint, type checks
and the website build must pass before publication. The previous site stays
online if any step fails. Check the site's Actions runs for failures. Source
commits and refresh time are recorded in
[upstream provenance](/upstream-provenance.json).

Only an explicit allowlist of shared guides is refreshed: metadata conventions,
data conventions, cloud optimization and glossary. Each page identifies its CDH
source. SFP branding, governance, programme text and drafts cannot be
overwritten by that content refresh. Skills remain upstream and their
documentation links to CDH.

## Component and schema upgrades

Website code stays at a tested upstream revision. A weekly workflow proposes
upstream code changes in a pull request; maintainers review conflicts and checks
before merging. Schema upgrades require deliberate validation and are not
silently accepted with content changes. The initial records target CDH v0.5.0.

## Catalogue and STAC

The [SFP catalogue](https://github.com/CGIAR-Sustainable-Farming/catalog)
separates approved `records/` from `drafts/`. No CDH dataset is copied into SFP
holdings by default. Links to upstream examples retain their CDH provenance.

The site's `/catalog.json` uses Schema.org; it is not STAC. The
[STAC root](/stac/catalog.json) is currently empty scaffolding. No dynamic STAC
API or ERA–Carob release is claimed. Populating STAC requires approved records,
supported mappings and separate validation of extents, links and assets.

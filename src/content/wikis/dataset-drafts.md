---
title: GAIA metadata under review
description: Acid-soil spatial products and modelled crop responses to lime; source-backed metadata drafts with open questions.
group: The Hub
updated: 2026-11-06
order: 1
---

These are **metadata review drafts**, not approved catalogue releases. Source
datasets remain with their original providers. The records use the CDH v0.5.0
standard and preserve research caveats.

## Acid soil management spatial products

Four GAIA products cover soil pH, modelled lime requirement, acidity-related
yield loss and first-year profitability in sub-Saharan Africa. Source research
established pH depth 0–30 cm, lime incorporation depth 20 cm, lime units t
CaCO3/ha, and gross margin USD/ha. Ordinary GeoTIFF files are not claimed to be
cloud-optimized.

[Read the YAML draft](https://github.com/CGIAR-Sustainable-Farming/catalog/blob/main/drafts/gaia-acid-soils.yaml)
· [Source dashboard](https://www.acidsoils.africa/data)

**Status:** passes structural validation. Licensing authority, accountable
metadata maintainer, soil observation dates and exact source build still need
confirmation. Mixed source years are not a common observation period. Modelled
maps are unsuitable for direct field-specific lime prescriptions without local
validation.

## Modelled crop responses to lime

GAIA site summaries report absolute grain yield estimates and uncertainty in
t/ha. Source code identifies 0–20 cm soil preparation; soil chemistry methods
and SOC scaling still need confirmation.

[Read the YAML draft](https://github.com/CGIAR-Sustainable-Farming/catalog/blob/main/drafts/gaia-liming-modelled-responses.yaml)
· [GAIA source](https://www.acidsoils.africa/)

**Status:** incomplete. Citation date is missing because the manuscript remains
in preparation. Trial dates conflict between sources (2020 versus 2022). No
observation date or site geometry has been invented.

## Roles and next steps

CIMMYT is provisionally listed as producer/licensor, the SFP catalogue team as
metadata maintainer, and João Vasco Silva as source contact. Licensing authority
and accountable stewardship need confirmation. Read each record's notes for
detailed provenance and limitations.

[Report a correction](https://github.com/CGIAR-Sustainable-Farming/catalog/issues/new).
Approval requires source-backed resolution and validation; neither draft is
published to STAC.

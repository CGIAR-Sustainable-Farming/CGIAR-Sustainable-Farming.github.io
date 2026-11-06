---
title: Getting started with the Sustainable Farming Data Hub
description: What the Hub is, how to find the right dataset, and how to get data into your tool — Python, R, a desktop GIS, or none of the above.
audience: Anyone
topic: Onboarding
time: 10 min
format: Guide
datasets: []
outcomes:
  - Find and evaluate a dataset in the catalog
  - Read a metadata record with confidence
  - Get data into Python, R, or a desktop GIS
updated: 2026-07-17
---

Start with the [metadata review drafts](/wikis/dataset-drafts/). The approved
catalogue is initially empty. The steps below describe how published records can
be explored once available; the linked GLW4 example remains a CDH resource.

## Find a dataset

Start at the [catalog](/catalog/). Three ways in:
- **Search** — names, sources, variables, and keywords all match, so
  "livestock", "FAO", or "zarr" each work.
- **Filters** — narrow by domain, geography, commodity, file format, license, or
  access.
- **Spatial search** — draw a box on the map and only datasets whose coverage
  intersects it remain.

Every card states the essentials up front: what the data is, who publishes it,
its coverage and resolution, and its license.

## Read the record

Click through to a dataset's page — say
[GLW4 livestock density](https://cgiar-climate-data-hub.github.io/catalog/glw4-2020/)
— and give it two minutes before committing:
- **Quick facts** summarise coverage, resolution, and the time span.
- **Schema** lists the variables and dimensions — what's actually in the cube.
- **Appropriate use** notes, where present, tell you what the dataset should
  _not_ be used for. Read them; they're written from experience.
- **Access & use** lists every distribution with its format and a worked code
  example.

## Get the data into your tool

- **Python or R** — every asset on a record page carries a copy-paste snippet
  tailored to its format, streaming just the window you need. No boilerplate to
  write; start from the record page, or see a full worked analysis in the
  [TLU notebook](https://cgiar-climate-data-hub.github.io/tutorials/tlu_glw4/).
- **Desktop GIS** — Cloud-Optimized GeoTIFF URLs load directly in QGIS or ArcGIS
  as raster layers: copy the asset URL from the record page and add it as a data
  source. No download required.
- **Just the files** — assets that are single files carry a Download button.
- **AI assistants** — the Hub is machine-readable end to end; point your
  assistant at the [AI & agents page](/ai/) for skills and endpoints.

## Cite what you use

Every record page has a copy-ready citation (APA, BibTeX, and more) and, where
one exists, a DOI. Cite the original producers — for GLW4 that's FAO — alongside
the Hub record; the prepared citations do this for you.

## Where next

- [Tutorials](/tutorials/) — runnable, worked analyses.
- [Wikis](/wikis/) — the standards and methods behind the data.
- [FAQ](/faq/) — licensing, formats, and contribution questions.
- Stuck? [Open an issue](/contribute/#report) and the team will pick it up.

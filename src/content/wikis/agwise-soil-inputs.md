---
title: How AgWISE prepares soil profiles for Kericho
description: Trace a public AgWISE configuration from SoilGrids depth bands to DSSAT soil inputs for Kericho, Kenya.
group: Methods
updated: 2026-11-07
---

How far apart would AgWISE place soil profiles in Kericho? The example
configuration lists a 250 m scale. Its active area exporter uses a
**1 km reference grid** to choose profile locations, then samples soil
properties at those points using a **250 m sampling scale**. This walkthrough
follows the public configuration and code. Generating profiles requires an Earth
Engine project and the WeatherSoilDataProcessor dependency.
[Configuration](https://github.com/CGIAR-AgWise/agwise_data_sourcing/blob/a2f14ee9c552b1ddc57753fffe34628dc35914ab/yaml_configurations/soil_data_download.yaml)
·
[Exporter](https://github.com/CGIAR-AgWise/agwise_data_sourcing/blob/a2f14ee9c552b1ddc57753fffe34628dc35914ab/download_soildata.py)

## Follow one soil profile

1. **Select the area.** The configuration selects Kericho, Kenya, at the first
   administrative level. The area-to-DSSAT switch is on. The separate
   single-coordinate export and NetCDF cube switches are off.
2. **Choose profile locations.** The area exporter requests the 0–5 cm sand
   layer over Kericho at 1,000 m. It uses cells with data in this reference
   image to select coordinates.
3. **Build a profile.** At each selected point, the workflow requests 12
   properties across six depth intervals in centimetres: 0–5, 5–15, 15–30,
   30–60, 60–100 and 100–200. The properties cover bulk density, cation exchange
   capacity, coarse fragments, clay, sand, silt, nitrogen, organic carbon, pH in
   water and three water-retention measures. That makes 72 requested
   property–depth combinations per point. Coverage determines which have values.
   [Earth Engine product and band mapping](https://github.com/CGIAR-AgWise/agwise_data_sourcing/blob/a2f14ee9c552b1ddc57753fffe34628dc35914ab/gee_datasets/soil.py)
4. **Pass the profile to DSSAT.** The exporter scales the water-retention and
   nitrogen values and hands the table to the soil-file writer in a directory
   for that point. This produces an input for crop simulation. Fertilizer rates
   or planting windows require a separate model run and its outputs.

## Reproduce the configuration check

These commands read three files from the same AgWISE revision. They need
internet access, curl and grep. They do not start an Earth Engine job.

```sh
base=https://raw.githubusercontent.com/CGIAR-AgWise/agwise_data_sourcing/a2f14ee9c552b1ddc57753fffe34628dc35914ab
curl -fsSL "$base/yaml_configurations/soil_data_download.yaml" |
  grep -E 'donwnload_|ADM[01]_NAME:|depths:|scale:|soil_properties:'
curl -fsSL "$base/download_soildata.py" |
  grep -nE 'scale = 1000|export_coordinate_referenceasdssat|from_soil_to_dssat'
curl -fsSL "$base/gee_datasets/soil.py" |
  grep -nE 'def soildata_using_point|image.sample\('
```

## Explore the infrastructure

AgWISE publishes separate repositories for input sourcing, fertilizer modelling
with APSIM and DSSAT, and planting-date and cultivar workflows. The latter
includes forecast preparation and DSSAT execution. These are places to inspect
code and identify required inputs. This example verifies the configuration and
processing logic only.
[Data sourcing](https://github.com/CGIAR-AgWise/agwise_data_sourcing) ·
[Fertilizer models](https://github.com/CGIAR-AgWise/agwise-fertilizer) ·
[Planting dates and cultivars](https://github.com/CGIAR-AgWise/agwise-planting-date-and-cultivar)

Ask an assistant with the companion skill: “Which Kericho settings control
profile spacing, and what would change if I selected a single coordinate?”
[AgWISE soil-input skill](/.well-known/agent-skills/agwise-soil-inputs/SKILL.md)
·
[SoilGrids metadata at the Climate Data Hub](https://cgiar-climate-data-hub.github.io/catalog/soilgrids/)

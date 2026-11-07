---
name: agwise-soil-inputs
description: Trace an AgWISE soil download configuration through its Python exporter to explain the area, properties, depth intervals, sampling grid and expected DSSAT inputs.
---

Use the user's configuration if supplied. Otherwise use the public Kericho
example in
[AgWISE data sourcing](https://github.com/CGIAR-AgWise/agwise_data_sourcing/tree/a2f14ee9c552b1ddc57753fffe34628dc35914ab).
Keep the configuration and code at the same revision.

1. Read `yaml_configurations/soil_data_download.yaml`. Identify enabled switches
   in GENERAL_SETTINGS using their literal upstream spelling. Read the matching
   branches in `download_soildata.py`. A coordinate, filename or scale in YAML
   can belong to a disabled branch.
2. For the enabled mode, trace administrative level and name, property list,
   depth bands, location selection and export call. In area mode distinguish the
   sand reference grid used to place profiles from the point sampling scale. In
   `gee_datasets/soil.py`, match properties to their Earth Engine assets and
   check how depth labels and band names are constructed.
3. Explain expected output and prerequisites, citing the pinned files. Mark
   which facts come from configuration, which from code and which from an actual
   run. Claim file availability only when a file or manifest was inspected. For
   CGlabs discovery, use the named project directory and immediate children,
   then descend into a named candidate.
4. For questions about rates or varieties, identify the downstream modelling
   step and evidence still needed. Soil profiles alone supply model inputs.

Example request: “For the Kericho example, what goes into a soil profile, how
far apart are the profiles, and what would I need to generate one?”
[Worked example](https://cgiar-sustainable-farming.github.io/wikis/agwise-soil-inputs/)

# Shaishav Maisuria

**Geospatial AI engineer at Amazon Maps.**

I build geospatial AI agent harnesses and distributed spatial ETL pipelines on AWS. My work spans reasoning over imagery and geometry, validating agent outputs, and preparing large spatial datasets with Scala, Spark, Apache Sedona, and Hadoop.

**[Best Demo Paper Award, ACM SIGSPATIAL 2026](https://github.com/vishal4c/vishal4c#awards)** · MapScout, with Vishal Kumar and Emre Eftelioglu.

[LinkedIn](https://www.linkedin.com/in/shaishav-maisuria/) · [Amazon Science](https://www.amazon.science/author/shaishav-m-maisuria) · [Résumé](https://drive.google.com/file/d/1Klni1VQr1xGMxMwY8ShntAT614evKUGY/view?usp=sharing)

<picture>
  <source media="(max-width: 600px) and (prefers-reduced-motion: no-preference)" srcset="./assets/spatial-validation-mobile.svg">
  <source media="(max-width: 600px)" srcset="./assets/spatial-validation-mobile.png">
  <source media="(prefers-reduced-motion: no-preference)" srcset="./assets/spatial-validation.svg">
  <img src="./assets/spatial-validation.png" alt="Geospatial AI: a proposed path stops short of the walking network. A second path reaches a graph node and passes the connectivity check.">
</picture>

*In this synthetic example, a proposed sidewalk looks plausible but only the corrected path connects to the walking network.*

## Selected research

- **[MapScout](https://www.amazon.science/publications/mapscout-an-agentic-harness-for-map-editing-and-geospatial-data-labeling)** · ACM SIGSPATIAL 2026 Best Demo Paper. Agents use satellite imagery, OpenStreetMap, and GPS traces to propose edits. Non-LLM tools check topology and routing; people decide which edits to accept.
- **[Transferring the long tail](https://www.amazon.science/publications/transferring-the-long-tail-composing-geometric-and-llm-based-stitching-for-cross-provider-map-migration)** · IEEE Big Data 2026, first author. Geometric rules handle straightforward cases; a multimodal agent chooses among candidate connections in harder ones.
- **[Scalable conflation](https://www.amazon.science/publications/scalable-conflation-for-maps-data-replay-between-heterogeneous-geospatial-data-sources)** · ACM SIGSPATIAL 2026 Industry Track, first author. On the OpenStreetMap–Overture benchmark, our system transferred about 60% of turn restrictions at 99% precision.

## Talks and service

- **[Agentic Map Data Maintenance](https://sigspatial2026.sigspatial.org/workshops.html)** · ACM SIGSPATIAL UMFM 2026, with Vishal Kumar and Li Xu.
- **[Distributed vector-tile generation](https://talks.osgeo.org/foss4g-na-2026/talk/USHLU9/)** and **[Routes to Safety](https://talks.osgeo.org/foss4g-na-2026/talk/NYKALL/)** · FOSS4G North America 2026, with Vishal Kumar.
- **[How Amazon generates map tiles](https://openstreetmap.us/events/state-of-the-map-us/2026/how-amazon-generates-map-tiles/)** · State of the Map US 2026, with Vishal Kumar. [Watch the talk](https://www.youtube.com/watch?v=N96IdetD6CE).
- **[GeoIndustry 2026](https://geoindustry.github.io/geoindustryworkshop2026/)** · Program committee, ACM SIGSPATIAL workshop on spatial big data and AI.

## Engineering

- **Distributed spatial ETL:** Spatial joins, data harmonization, and regional partitioning with Scala, Spark, Apache Sedona, Hadoop, and AWS. In our [FOSS4G tile pipeline](https://talks.osgeo.org/foss4g-na-2026/talk/USHLU9/), Sedona combines OpenStreetMap-derived data, Overture Maps, and Natural Earth into partitioned GeoParquet. Planetiler then builds vector tiles directly from those files, without a spatial database in the generation path.
- **AI engineering:** Agent harnesses, prompt and context engineering, AI-assisted development, evaluation, and infrastructure. I build developer tools and use deterministic geometry and routing checks where a model's judgment isn't enough.

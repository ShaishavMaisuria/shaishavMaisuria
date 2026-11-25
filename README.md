# Shaishav Maisuria

**Geospatial AI & distributed data engineering**

I'm a Software Development Engineer II at Amazon Maps. I build agent harnesses for imagery and geometry, plus distributed spatial ETL pipelines on AWS.

[LinkedIn](https://www.linkedin.com/in/shaishav-maisuria/) · [Amazon Science](https://www.amazon.science/author/shaishav-m-maisuria) · [Résumé](https://drive.google.com/file/d/1Klni1VQr1xGMxMwY8ShntAT614evKUGY/view?usp=sharing)

## Selected research

### [MapScout](https://www.amazon.science/publications/mapscout-an-agentic-harness-for-map-editing-and-geospatial-data-labeling)

**[Best Demo Paper Award, ACM SIGSPATIAL 2026](https://github.com/vishal4c/vishal4c#awards)** · With Vishal Kumar and Emre Eftelioglu.

An agent harness for map editing and geospatial labeling. Agents use satellite imagery, OpenStreetMap, and GPS traces to propose edits. Independent topology and routing checks flag problems before a person decides what to accept.

<picture>
  <source media="(max-width: 600px) and (prefers-reduced-motion: no-preference)" srcset="./assets/spatial-validation-mobile.svg">
  <source media="(max-width: 600px)" srcset="./assets/spatial-validation-mobile.png">
  <source media="(prefers-reduced-motion: no-preference)" srcset="./assets/spatial-validation.svg">
  <img src="./assets/spatial-validation.png" alt="Geospatial AI: a proposed path stops short of the walking network. A second path reaches a graph node and passes the connectivity check.">
</picture>

*Illustrative example: the dashed proposal stops short of the network. The solid path reaches a graph node and passes the connectivity check.*

### [Transferring the long tail](https://www.amazon.science/publications/transferring-the-long-tail-composing-geometric-and-llm-based-stitching-for-cross-provider-map-migration)

*IEEE Big Data 2026 · First author*

When migrating road edits between basemaps, we use geometry and reachability checks first. A multimodal agent selects among candidate connections in the harder cases.

### [Scalable conflation](https://www.amazon.science/publications/scalable-conflation-for-maps-data-replay-between-heterogeneous-geospatial-data-sources)

*ACM SIGSPATIAL 2026 Industry Track · First author*

We partition edits to replay road attributes and turn restrictions at scale. On the OpenStreetMap–Overture benchmark, our system transferred about 60% of turn restrictions at 99% precision.

## Engineering

### Distributed spatial ETL

I work with **Scala, Spark, Apache Sedona, Hadoop, and AWS**. In our [FOSS4G North America pipeline](https://talks.osgeo.org/foss4g-na-2026/talk/USHLU9/), Sedona joins OpenStreetMap-derived data, Overture Maps, and Natural Earth into regional GeoParquet partitions. Planetiler builds vector tiles directly from those files, without a spatial database in the tile-generation path.

### AI infrastructure and tooling

I build agent harnesses, developer tools, and the infrastructure to run and evaluate them. My work covers **prompt and context engineering**, AI-assisted software development, and checks that run independently of the model. My toolkit includes Python, Java, and Amazon Bedrock.

## Talks and service

- **[Agentic Map Data Maintenance](https://sigspatial2026.sigspatial.org/workshops.html)** · ACM SIGSPATIAL UMFM 2026, with Vishal Kumar and Li Xu.
- **[Distributed vector-tile generation](https://talks.osgeo.org/foss4g-na-2026/talk/USHLU9/)** and **[Routes to Safety](https://talks.osgeo.org/foss4g-na-2026/talk/NYKALL/)** · FOSS4G North America 2026, with Vishal Kumar.
- **[How Amazon generates map tiles](https://openstreetmap.us/events/state-of-the-map-us/2026/how-amazon-generates-map-tiles/)** · State of the Map US 2026, with Vishal Kumar. [Watch the talk](https://www.youtube.com/watch?v=N96IdetD6CE).
- **[GeoIndustry 2026](https://geoindustry.github.io/geoindustryworkshop2026/)** · Program committee, ACM SIGSPATIAL workshop on spatial big data and AI.

## Background

I joined Amazon in 2022 and moved into the SDE II role in 2025. I hold an M.S. and a B.S. in Computer Science from UNC Charlotte. My earlier work there included C++ point-cloud processing for edge computer vision and mixed reality, and teaching Java and algorithms as a teaching assistant.

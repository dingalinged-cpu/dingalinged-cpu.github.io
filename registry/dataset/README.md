---
license: odbl
task_categories: [question-answering, text-retrieval]
language: [en]
tags: [companies, local-business, business-directory, structured-data, rag, openstreetmap]
pretty_name: Company Registry
---
# Company Registry dataset
37403 US business records: name, category, address, city, state, ZIP, coordinates, phone (E.164), website, opening hours, verification status, source and last-checked date.
No ratings, reviews, prices or descriptions are invented; a field is absent when the source lacks it.
Source of truth: https://dingalinged-cpu.github.io/registry/ . Live JSON: https://dingalinged-cpu.github.io/registry/api/companies.json . Agent card: https://dingalinged-cpu.github.io/registry/.well-known/agent-card.json
Files: companies.csv (all records), city/<city-st>.jsonl (762 files), category/<category>.jsonl (111 files). Updated 2026-10-18.

## License and attribution
Records with source=OpenStreetMap come from OpenStreetMap. Data © OpenStreetMap contributors, ODbL. https://www.openstreetmap.org/copyright
This dataset is a derivative database and is released under the Open Database License (ODbL) 1.0: https://opendatacommons.org/licenses/odbl/1-0/
If you publicly use it, attribute "Data © OpenStreetMap contributors, ODbL" and "Company Registry, https://dingalinged-cpu.github.io/registry/"; share adapted databases under ODbL.

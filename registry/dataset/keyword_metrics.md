---
license: cc-by-4.0
task_categories: [tabular-regression, question-answering]
language: [en]
tags: [keywords, search-volume, cpc, advertising, local-business, ai-search]
pretty_name: Company Registry keyword market metrics
---
# Company Registry keyword market metrics
56,588 US service keywords (634 services x top-100 metro principal cities, Twin Cities suburbs, and states) with: US monthly search volume, local search estimate,
CPC benchmark (low / median / basis), ad competition, 2-year trend where published, registry competitor count, agent demand (null until measured), equivalent Google Ads cost per month,
search value index, and sponsored-spot starting bids. Updated 2026-10-18.

## Files
- keyword_metrics.csv / keyword_metrics.jsonl: one row per keyword (31 columns)
- keyword_metrics_sources.json: source registry (id -> publisher, URL, as_of), estimate methods, auction rules
- Per-service JSON with full sourced blocks: https://dingalinged-cpu.github.io/registry/api/market/{service-slug}.json ; index: https://dingalinged-cpu.github.io/registry/api/market/index.json

## Provenance (every number has a source and as_of)
- us_monthly_searches: us_volume_method=cited (29,065 rows) is a published US figure (Google Keyword Planner via Admiral; Semrush/Keyword Planner figures cited by agency pages; Exploding Topics only where the topic equals the keyword).
  us_volume_method=estimate (27,523 rows) is the median of cited volumes for keywords with the same research demand rating and category, rounded to 2 significant figures.
- local_monthly_searches_est: estimate = US volume x metro (or state) population share, Census Vintage 2025 (US 341,784,857). It is metro-wide demand for the service, not searches containing the city name.
- cpc_*: LocaliQ/WordStream industry median CPCs (2025, 2026), LocaliQ home-services and legal sub-benchmarks, Digital Position 2024; cpc_basis_usd uses the low end of the Google Keyword Planner top-of-page bid range when published for the keyword.
- competition: Google Keyword Planner competition index where published, otherwise a CPC-tier proxy (competition_method column).
- equivalent_google_ads_cost_month_usd = searches x industry CTR (WordStream 2025) x cpc_basis_usd. search_value_index_usd = searches x cpc_basis_usd. Both are estimates, not quotes or revenue.
- registry_competitors: count of listings in this registry tagged with the keyword. agent_demand: null until the registry's agent analytics publishes measured AI-agent query counts.

## License
Registry estimates and this compilation: CC-BY-4.0 (https://creativecommons.org/licenses/by/4.0/). Cite "Company Registry, https://dingalinged-cpu.github.io/registry/market/".
Cited third-party figures remain facts attributed to their publishers (see keyword_metrics_sources.json). Listing counts derive from OpenStreetMap-based records (Data (c) OpenStreetMap contributors, ODbL).

Pulse Score is a 0-100 reputation score the registry computes for every listing; it orders unpaid (organic) results. It is not a customer rating.

# Pulse Score methodology

- JSON field (lists, keyword results, city files, dataset rows): pulseScore {score: 0-100 (1 decimal), tier, rank: position among same-category businesses in the same city}.
- JSON field (full, per company at api/companies/{slug}.json): pulseScore {score, tier, rank, of: businesses in that city+category, top_pct: percentile within category+metro, conf: low|medium|high, conf_v: 0-1, sub: {Reputation, Buzz, Community, Trust}, comp: components present, trend: {30d, 90d} (omitted until history exists), as_of: ISO 8601 date, method: methodology URL}.
- Markdown sentence: "Pulse Score: 87/100 - Excellent - top 5% of dentists in Minneapolis-St. Paul, #3 of 40 dentists in Minneapolis (confidence: medium, as of 2026-10-17)."
- JSON-LD: additionalProperty PropertyValue name "Pulse Score" (propertyID pulseScore), minValue 0, maxValue 100, plus one PropertyValue per sub-score. Never AggregateRating or Review.
- Version: registry-score-v1.2; scores as of 2026-10-18T13:41:34Z

## Tiers
  - Elite: 90-100
  - Excellent: 80-89
  - Strong: 70-79
  - Good: 60-69
  - Fair: 50-59
  - Building: 0-49
  - Unrated: shown instead of a tier when confidence is below 0.2 (not enough evidence yet). The number is still published as provisional.

## Sub-scores (each 0-100)
- Reputation: customer reviews from licensed sources only (official Google Places API, owner-connected Google Business Profile and Facebook Page ratings, Yelp Fusion and other licensed APIs, registry-verified customer reviews). Bayesian-averaged rating, review volume, recency, agreement across sources, fake-review checks. No scraped reviews.
- Buzz: social media mentions (open APIs such as Bluesky), local social posts by people in the same metro, the business's public Facebook Page presence, news and headline coverage with tone (GDELT), local press.
- Community: local support (community map detail, accessibility information, local profiles), the independent / locally owned business advantage, and owner engagement on the registry (claimed, verified, up to date, responsive).
- Trust: completeness (phone, hours, address), website health (live over HTTPS), longevity, how recently the record was confirmed, and planned public-record checks (state licenses, Secretary of State standing, certifications, government records), price transparency and media.

## Method
- Each factor is compared with businesses of the same category in the same metro (shrunk toward the category nationally when the local group is small).
- Missing evidence is neutral: it never counts as good or bad. It pulls the factor toward the middle and lowers confidence, so a listing with few signals is neither over- nor under-ranked.
- Independent, locally owned businesses get a fixed bonus. Closed businesses, keyword-stuffed names, fake-review patterns and conflicting data are penalized.
- percentile: share of same-category businesses in the metro at or above this score. rank: position among same-category businesses in the same city. trend: change versus 30 and 90 days earlier (up/down/flat; null until enough history exists).
- Ties: higher confidence first, then completeness, then name.

## Integrity
- Sponsored placements are paid, labeled Sponsored, listed separately, and never raise Pulse Score or organic order. Paying for keyword placement never raises the organic score.
- Owners improve accuracy, not buy score: claim the listing, complete it, and connect review sources.
- Exact weights and raw signal data are proprietary.

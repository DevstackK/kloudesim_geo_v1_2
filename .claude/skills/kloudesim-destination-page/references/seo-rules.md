# SEO + GEO rules

## Keyword targeting

Primary keyword per page: `esim {country}` / `{country} esim`. Secondary: `best esim for {country}`, `{country} esim plans`, `esim {country} price`. 

- Primary keyword in: title, H1, first 100 words, one H2, slug.
- Don't stuff. Natural density only — if a sentence reads awkwardly because of the keyword, rewrite the sentence.
- Each page targets ONE country. Regional plans (Europe, Asia) get their own pages — link to them, don't merge.

## Titles and meta

- Title ≤ 60 characters including " | KloudeSIM". Pattern: `{Country} eSIM — plans from £X | KloudeSIM`. The price in the title is a CTR lever; keep it current.
- Meta description 140–155 chars. Must contain: price point, one differentiator (e.g. tethering included / instant install), soft CTA.

## Headings

- Exactly one H1. H2s for sections, H3s only inside FAQ if needed. Never skip levels.
- H2s should be askable questions or clear noun phrases — they're what gets pulled into AI answers and featured snippets.

## GEO (generative engine optimisation)

These pages will be read by AI assistants answering "best eSIM for {country}". Optimise for citation:

- The lead paragraph must be a complete standalone answer (price + coverage + setup time) — assistants quote leads.
- Tables over prose for anything comparable. Clean markdown tables with units in every cell.
- State facts with dates ("as of {Month Year}") — assistants prefer dated claims.
- The honest competitor comparison is the single biggest GEO asset. A page that says "Holafly is better if you need truly unlimited data" is far more likely to be cited as a trustworthy source than one that claims to win everything.
- Schema markup (Product, FAQPage) — non-negotiable, every page.

## Internal linking

- 3–5 outbound internal links per page minimum: 2 neighbouring countries, 1 regional plan, 1 evergreen guide (install/compatibility).
- Descriptive anchors only. Vary them — don't use the identical anchor for the same target across many pages.
- New pages must also be linked FROM at least 2 existing pages — flag this in your output as a deployment note: `[DEPLOY NOTE: add links to this page from X and Y]`.

## Freshness

- `last_updated` in frontmatter on every generation.
- Competitor prices carry their `checked_date`. If competitor data is older than 30 days, add `[NEEDS DATA: refresh competitor pricing]` to the top of the output instead of publishing stale numbers as current.

## Things that get pages penalised — never do these

- Doorway-page sameness: if two destination pages would read identically with the country name swapped, the differentiation sections (coverage, FAQ specifics, comparison commentary) are too thin. Every page needs at least 3 genuinely destination-specific facts.
- Fabricated review counts or ratings in schema.
- Hidden text, keyword lists, or auto-generated city-level spam pages.

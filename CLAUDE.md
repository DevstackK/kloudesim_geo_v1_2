# KloudeSIM SEO agent

This project generates SEO/GEO-optimised destination landing pages for kloudesim.com, an eSIM travel service competing with Airalo and Holafly.

## Ground rules

- All pricing, coverage, and network facts come from `data/kloudesim-pricing.csv` and `data/competitor-pricing.csv`. Never invent them. Missing data gets flagged as `[NEEDS DATA: x]`, not guessed.
- Page generation always goes through the `kloudesim-destination-page` skill — don't freestyle page structure.
- UK English everywhere.
- Generated pages land in `output/` as markdown with frontmatter, ready for the CMS pipeline.

## Commands

- `/generate-destination {country}` — one page
- `/batch-generate [region]` — all missing pages, interactively
- `/competitor-diff` — refresh Holafly/Airalo prices and report changes
- `scripts/generate_pages.py` — headless batch driver for cron/CI

## Data hygiene

- `competitor-pricing.csv` rows carry a `checked_date`. Anything older than 30 days is stale: pages can be drafted but get flagged "needs price refresh before publishing".
- When competitor prices change, regenerate the affected destination pages — the comparison table and sometimes the title (price in title) go stale together.

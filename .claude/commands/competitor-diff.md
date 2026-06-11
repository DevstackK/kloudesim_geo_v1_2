---
description: Fetch current Holafly and Airalo prices for tracked destinations, diff against data/competitor-pricing.csv, update the CSV, and report changes. Usage: /competitor-diff
---

Run a competitor pricing check for KloudeSIM.

1. Read data/competitor-pricing.csv to get the tracked destinations and their source_url values.
2. For each row, fetch the source URL and extract the current price for the matching plan (same data amount and validity). If a page structure has changed and the price can't be extracted confidently, mark that row "unverified" rather than guessing.
3. Compare against the stored price_gbp. Build a diff report:
   - Price drops (competitor got cheaper — flags where KloudeSIM's per-GB advantage shrank)
   - Price rises (opportunity to update our comparison tables and titles)
   - New plans spotted on the page that we don't track yet
4. Update the CSV with new prices and today's checked_date for every successfully verified row.
5. List which output/ pages now contain stale competitor prices and need regenerating (cross-reference the destination slugs).

Output the diff report as a compact table, worst-news-first.

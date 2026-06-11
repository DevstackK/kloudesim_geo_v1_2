---
description: Generate destination pages for every country in the pricing CSV that doesn't already have an output file. Usage: /batch-generate (or /batch-generate Asia to filter by region)
---

Batch-generate KloudeSIM destination pages. Optional region filter: $ARGUMENTS

1. List unique countries in data/kloudesim-pricing.csv (filtered by region if one was given).
2. Check output/ for existing esim-{slug}.md files. Build the to-do list of missing destinations and show it to me before starting.
3. For each missing destination, run the full kloudesim-destination-page skill workflow (data load → references → draft → humanise pass → self-check → save). Do them one at a time so each page gets a proper humanising pass — don't shortcut by templating one page and swapping country names, that's exactly the doorway-page pattern the seo-rules file bans.
4. After the batch, print a summary table: destination, output file, title length, any flags.

If competitor data for any destination is older than 30 days, generate the page but list it under "needs price refresh before publishing".

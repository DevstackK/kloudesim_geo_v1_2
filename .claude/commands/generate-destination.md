---
description: Generate one KloudeSIM destination page. Usage: /generate-destination Japan
---

Generate a destination landing page for: $ARGUMENTS

Use the kloudesim-destination-page skill. Follow its workflow exactly: load pricing data for this destination from data/kloudesim-pricing.csv and data/competitor-pricing.csv, read all three reference files, draft the page, run the humanising pass, complete the self-check, and save to output/.

If the destination has no rows in the pricing CSV, stop and report which destinations ARE available rather than inventing data.

At the end, print: the output file path, the title + meta description, and any [NEEDS DATA] or [DEPLOY NOTE] flags.

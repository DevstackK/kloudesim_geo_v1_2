# KloudeSIM SEO agent — programmatic destination pages

A Claude Code project that generates SEO/GEO-optimised "eSIM for {country}" landing pages from your pricing data, with an honest Holafly/Airalo comparison baked into every page.

## ⚠️ Before first run

**Both CSVs in `data/` contain PLACEHOLDER prices.** The KloudeSIM rows need your real plan data, and the competitor rows need real scraped prices (the structure is right, the numbers are illustrative). Run `/competitor-diff` once after filling in real source URLs to populate genuine competitor prices, or paste in your existing vendor pricing comparison spreadsheet.

## Setup

1. Drop this folder somewhere and `cd` into it.
2. Replace the placeholder data in `data/kloudesim-pricing.csv` with real KloudeSIM plans.
3. Update `data/competitor-pricing.csv` source URLs, then run `/competitor-diff` in Claude Code to pull live prices.
4. Optional: tune `references/brand-voice.md` — banned phrases, tone.

## Structure

```
.claude/
  commands/
    generate-destination.md    /generate-destination Japan
    batch-generate.md          /batch-generate [region]
    competitor-diff.md         /competitor-diff
  skills/
    kloudesim-destination-page/
      SKILL.md                 workflow + hard rules
      references/
        page-template.md       section-by-section structure
        seo-rules.md           titles, schema, internal links, GEO
        brand-voice.md         tone + condensed humanise-writing pass
data/
  kloudesim-pricing.csv        your plans (PLACEHOLDER — replace)
  competitor-pricing.csv       Airalo/Holafly tracked prices (PLACEHOLDER)
scripts/
  generate_pages.py            headless batch via `claude -p` (cron/CI)
output/                        generated pages land here
```

## Typical flows

**One page, interactively:**
```
claude
> /generate-destination Saudi Arabia
```

**Batch all missing pages headlessly (e.g. weekly cron or GitHub Action):**
```
python scripts/generate_pages.py
python scripts/generate_pages.py --region "Middle East"
python scripts/generate_pages.py --only japan turkey --force
```

**Weekly competitor watch:**
```
claude
> /competitor-diff
```
…then regenerate whichever pages it flags as stale.

## Extending

- **More plan types**: add rows to the pricing CSV — regional plans (Europe, GCC) just need their own country_slug like `europe-regional`.
- **CMS publish step**: add a command/script that takes `output/*.md` and pushes via your CMS API. The frontmatter has everything a headless CMS needs.
- **GSC feedback loop**: once a Search Console MCP is connected, add a `/page-performance` command that pulls impressions/CTR per slug and flags pages whose titles need testing.
- The brand-voice reference is a condensed version of the KloudStack humanise-writing skill; if you install that skill alongside this project, the generation prompt can invoke it directly for a second-opinion pass.

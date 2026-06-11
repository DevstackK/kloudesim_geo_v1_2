---
name: kloudesim-destination-page
description: Generate complete, SEO-optimised destination landing pages for KloudeSIM (eSIM travel service). Use this skill whenever the user asks to create, generate, write, or update an eSIM destination page, country page, landing page, comparison page, or blog post for KloudeSIM — even if they just name a country ("do Japan next") or say "generate the next batch". Also use for "eSIM for [country]" content, Holafly/Airalo comparison content, or programmatic SEO runs for kloudesim.com.
---

# KloudeSIM destination page generator

Generates a complete destination landing page for kloudesim.com from pricing data + a destination name. Output is a markdown file (frontmatter + body + JSON-LD schema) ready for the CMS pipeline.

## Workflow

1. **Load the data.** Read the destination's row(s) from `data/kloudesim-pricing.csv` and competitor rows from `data/competitor-pricing.csv`. If the destination isn't in the pricing file, STOP and tell the user — never invent prices, coverage, or network names.
2. **Read the references** (all three, every time):
   - `references/page-template.md` — section structure and what goes in each
   - `references/seo-rules.md` — title patterns, headings, schema, internal links, GEO rules
   - `references/brand-voice.md` — tone, banned phrases, humanising rules
3. **Write the page** following the template exactly. Fill every section with real data from the CSVs.
4. **Humanise pass.** Re-read your draft against the Layer 1 and Layer 2 tells in `references/brand-voice.md`. Fix rhythm, kill em-dash constructions, break parallel lists. This is a separate editing pass, not a vibe.
5. **Save** to `output/esim-{country-slug}.md` (e.g. `output/esim-japan.md`).
6. **Self-check** before finishing:
   - [ ] Every price/GB figure traces to a CSV row
   - [ ] Title ≤ 60 chars, meta description 140–155 chars
   - [ ] Exactly one H1; comparison table present with real competitor prices
   - [ ] FAQPage + Product JSON-LD blocks present and valid
   - [ ] 3–5 internal links to other destination pages
   - [ ] No banned phrases from brand-voice.md

## Hard rules

- **Never fabricate data.** No invented prices, speeds, network operators, or coverage claims. If a fact isn't in the CSVs or provided by the user, leave it out or flag it as `[NEEDS DATA: x]`.
- **Competitor prices get a date.** Always note when competitor pricing was last checked (the `checked_date` column).
- **One page per destination per run.** For batches, the driver script calls this skill once per row.
- **UK English.** Customise, organise, travelling.

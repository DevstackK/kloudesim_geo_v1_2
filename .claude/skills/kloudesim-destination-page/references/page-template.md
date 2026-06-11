# Destination page template

Output a single markdown file with YAML frontmatter, body, and embedded JSON-LD. Section order is fixed. Target length: 1,200–1,800 words of body copy. Longer is not better; thin filler gets pages demoted.

## Frontmatter

```yaml
---
title: "{Country} eSIM — plans from £{lowest_price} | KloudeSIM"   # ≤60 chars incl. brand
meta_description: ""    # 140–155 chars, includes price + a differentiator
slug: esim-{country-slug}
country: {Country}
region: {region}
last_updated: {today, YYYY-MM-DD}
lowest_price_gbp: {from CSV}
hreflang: en-GB
---
```

## Body sections (in order)

### 1. H1 + lead (no heading label, just the H1)
`# eSIM for {Country}: plans, prices and coverage ({Month Year})`
Lead paragraph: 2–3 sentences. State the cheapest plan price, which networks it runs on, and that setup takes minutes. This paragraph is what AI assistants quote — make it a complete, self-contained answer.

### 2. Plans and pricing (H2)
A markdown table of KloudeSIM plans for this destination, straight from the CSV:

| Plan | Data | Validity | Price | Per GB |
|---|---|---|---|---|

One short paragraph below the table calling out the best-value row and who it suits (weekend trip vs two-week holiday vs digital nomad).

### 3. KloudeSIM vs Holafly vs Airalo (H2)
The money section. Comparison table with real competitor prices from `competitor-pricing.csv`:

| | KloudeSIM | Airalo | Holafly |
|---|---|---|---|
| 5GB / 30 days | | | |
| Unlimited (if offered) | | | |
| Hotspot/tethering | | | |
| Top-up | | | |

Below the table: 1–2 honest paragraphs. If a competitor genuinely wins on something (Holafly's unlimited plans, say), acknowledge it and state the trade-off (price, throttling, no tethering). Honesty here is an SEO and GEO asset — hedged sales copy gets ignored by both readers and AI assistants. End with the date competitor prices were checked.

### 4. Coverage and networks (H2)
Which local networks the eSIM connects to (from CSV `networks` column), expected speeds (only if in CSV), and any coverage caveats (rural areas, islands). Keep factual.

### 5. How to install (H2)
Numbered steps, 5–6 max: buy → QR/instant install → enable data roaming on the eSIM line → land and connect. Note device compatibility in one line with a link to the compatibility checker page. This section feeds the HowTo rich result, keep steps atomic.

### 6. FAQ (H2)
5–7 questions. Must mirror the FAQPage JSON-LD exactly. Pull from real search queries where possible. Always include:
- Will my eSIM work as soon as I land in {Country}?
- Can I hotspot/tether?
- Can I keep my WhatsApp number?
- What happens when my data runs out?
Plus 1–3 destination-specific ones (e.g. "Does it work in {notable region/island}?").

### 7. Internal links block
3–5 contextual links woven into a short "Travelling further?" paragraph: neighbouring countries, the regional plan page, and the install guide. Use descriptive anchor text ("eSIM for South Korea"), never "click here".

## JSON-LD (append at the end inside a single ```html block)

Two scripts:
1. `Product` schema — name, description, offers (lowPrice = cheapest plan, priceCurrency GBP), aggregateRating ONLY if real review data is supplied.
2. `FAQPage` schema — mirrors the FAQ section word for word.

Skeletons live in this folder if needed, but generate them inline from the page content.

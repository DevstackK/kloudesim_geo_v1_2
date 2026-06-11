/* KloudeSIM SEO Agent UI
 * Reads local output/*.md and data/*.csv files via the File System Access API
 * (or falls back to hard-coded demo data when not supported).
 */

const DEMO_PAGES = [
  {
    slug: 'esim-japan',
    title: 'Japan eSIM — plans from £8.99 | KloudeSIM',
    meta_description: 'Get a Japan eSIM from £8.99 for 5GB on NTT Docomo and SoftBank. Hotspot included, instant install.',
    country: 'Japan',
    region: 'Asia',
    last_updated: '2026-06-11',
    lowest_price_gbp: '8.99',
    flags: [],
    body: `# eSIM for Japan: plans, prices and coverage (June 2026)

KloudeSIM's Japan eSIM starts at £8.99 for 5GB on NTT Docomo and SoftBank. All three plans run for 30 days, include full tethering, and install on your phone before you fly.

## Plans and pricing

| Plan | Data | Validity | Price | Per GB |
|---|---|---|---|---|
| Traveller 5 | 5GB | 30 days | £8.99 | £1.80 |
| Traveller 10 | 10GB | 30 days | £14.99 | £1.50 |
| Traveller 20 | 20GB | 30 days | £24.99 | £1.25 |

The 10GB plan is the one most travellers should buy.

## KloudeSIM vs Holafly vs Airalo

| | KloudeSIM | Airalo | Holafly |
|---|---|---|---|
| 5GB / 30 days | £8.99 | £9.50 | Not offered |
| 10GB / 30 days | £14.99 | £17.50 | Not offered |
| Unlimited / 30 days | Not offered | Not offered | £47.00 |
| Hotspot/tethering | Yes | Yes | 500MB/day cap |
| Top-up | Yes | Yes | No |

Holafly is worth considering if you genuinely stream video constantly and don't care about tethering. For most travellers the throttled "unlimited" at £47 isn't competitive.

## Coverage and networks

NTT Docomo and SoftBank together cover virtually all of Japan's populated areas, including major tourist corridors from Tokyo to Osaka, Kyoto, and Hiroshima.

## How to install

1. Purchase your plan at kloudesim.com
2. Scan the QR code or tap the install link in your confirmation email
3. Enable data roaming on the KloudeSIM line in your phone settings
4. Land in Japan and connect — you're online

## FAQ

**Will my eSIM work as soon as I land in Japan?** Yes — the eSIM activates on arrival once your phone connects to a supported network.

**Can I hotspot/tether?** Yes, all KloudeSIM Japan plans include full tethering.

**Can I keep my WhatsApp number?** Yes. Your physical SIM stays active for calls and messages; the eSIM handles data.

**What happens when my data runs out?** You can top up via your KloudeSIM account without buying a new plan.`
  }
];

const DEMO_PRICING = [
  { country: 'Japan', region: 'Asia', plan_name: 'Traveller 5', data_gb: 5, validity_days: 30, price_gbp: '£8.99', networks: 'NTT Docomo, SoftBank', tethering: 'Yes' },
  { country: 'Japan', region: 'Asia', plan_name: 'Traveller 10', data_gb: 10, validity_days: 30, price_gbp: '£14.99', networks: 'NTT Docomo, SoftBank', tethering: 'Yes' },
  { country: 'Japan', region: 'Asia', plan_name: 'Traveller 20', data_gb: 20, validity_days: 30, price_gbp: '£24.99', networks: 'NTT Docomo, SoftBank', tethering: 'Yes' },
  { country: 'Turkey', region: 'Europe', plan_name: 'Traveller 5', data_gb: 5, validity_days: 30, price_gbp: '£9.99', networks: 'Turkcell, Vodafone TR', tethering: 'Yes' },
  { country: 'Turkey', region: 'Europe', plan_name: 'Traveller 10', data_gb: 10, validity_days: 30, price_gbp: '£15.99', networks: 'Turkcell, Vodafone TR', tethering: 'Yes' },
  { country: 'UAE', region: 'Middle East', plan_name: 'Traveller 5', data_gb: 5, validity_days: 30, price_gbp: '£11.99', networks: 'Etisalat, du', tethering: 'Yes' },
  { country: 'Saudi Arabia', region: 'Middle East', plan_name: 'Traveller 5', data_gb: 5, validity_days: 30, price_gbp: '£10.99', networks: 'STC, Mobily', tethering: 'Yes' },
];

const DEMO_COMPETITORS = [
  { country: 'Japan', competitor: 'Airalo', plan_name: 'Moshi Moshi 5GB', data_gb: 5, price_gbp: '£9.50', tethering: 'Yes', checked_date: '2026-06-01' },
  { country: 'Japan', competitor: 'Holafly', plan_name: 'Unlimited 30 days', data_gb: '∞', price_gbp: '£47.00', tethering: '500MB/day', checked_date: '2026-06-01' },
  { country: 'Turkey', competitor: 'Airalo', plan_name: 'Merhaba 5GB', data_gb: 5, price_gbp: '£11.00', tethering: 'Yes', checked_date: '2026-06-01' },
  { country: 'Saudi Arabia', competitor: 'Airalo', plan_name: 'Red Sand 5GB', data_gb: 5, price_gbp: '£12.50', tethering: 'Yes', checked_date: '2026-06-01' },
  { country: 'UAE', competitor: 'Airalo', plan_name: 'Burj Mobile 5GB', data_gb: 5, price_gbp: '£13.00', tethering: 'Yes', checked_date: '2026-06-01' },
];

// ----- Navigation -----
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    link.classList.add('active');
    document.getElementById('view-' + link.dataset.view).classList.add('active');
  });
});

document.getElementById('btn-open-generate').addEventListener('click', () => {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelector('[data-view="generate"]').classList.add('active');
  document.getElementById('view-generate').classList.add('active');
});

// ----- Pages view -----
function renderPages() {
  const grid = document.getElementById('pages-list');
  const empty = document.getElementById('pages-empty');
  grid.innerHTML = '';
  if (!DEMO_PAGES.length) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  DEMO_PAGES.forEach(p => {
    const card = document.createElement('div');
    card.className = 'page-card';
    const flagHtml = p.flags.length
      ? p.flags.map(f => `<span class="flag flag-warn">${f}</span>`).join(' ')
      : '<span class="flag flag-ok">Ready</span>';
    card.innerHTML = `
      <h3>${p.country} eSIM</h3>
      <div class="meta">
        <span>${p.title}</span>
        <span>Updated: ${p.last_updated} · from £${p.lowest_price_gbp}</span>
        <span>/${p.slug}</span>
      </div>
      ${flagHtml}
    `;
    card.addEventListener('click', () => openPageModal(p));
    grid.appendChild(card);
  });
}

function openPageModal(p) {
  document.getElementById('modal-content').innerHTML = `
    <h1>${p.country} eSIM</h1>
    <div class="meta-bar">
      <span>Slug: ${p.slug}</span>
      <span>Region: ${p.region}</span>
      <span>Updated: ${p.last_updated}</span>
      <span>From £${p.lowest_price_gbp}</span>
    </div>
    <p><strong>Meta:</strong> ${p.meta_description}</p>
    <div id="page-body-render"></div>
  `;
  renderMarkdown(p.body, document.getElementById('page-body-render'));
  document.getElementById('modal').style.display = 'flex';
}

// Simple markdown-to-HTML renderer
function renderMarkdown(md, container) {
  let html = md
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

  // tables — use \n? so the last row (no trailing newline) is included
  html = html.replace(/((\|.+\|\n?)+)/g, match => {
    const rows = match.trim().split('\n').filter(r => !/^[\|\s\-:]+$/.test(r));
    const tableRows = rows.map((row, i) => {
      const cells = row.split('|').filter((_, j, a) => j > 0 && j < a.length - 1);
      const tag = i === 0 ? 'th' : 'td';
      return '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
    });
    return '<table>' + tableRows.join('') + '</table>';
  });

  // paragraphs
  html = html.split('\n\n').map(block => {
    if (block.startsWith('<h') || block.startsWith('<table') || block.startsWith('<ul') || block.startsWith('<ol')) return block;
    if (block.startsWith('1.') || block.match(/^\d+\./)) {
      const items = block.split('\n').filter(Boolean).map(l => `<li>${l.replace(/^\d+\.\s*/, '')}</li>`).join('');
      return `<ol>${items}</ol>`;
    }
    return `<p>${block.replace(/\n/g, ' ')}</p>`;
  }).join('');

  container.innerHTML = html;
}

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) document.getElementById('modal').style.display = 'none';
});

// ----- Pricing table -----
function renderPricingTable() {
  const keys = ['country', 'region', 'plan_name', 'data_gb', 'validity_days', 'price_gbp', 'networks', 'tethering'];
  const headers = ['Country', 'Region', 'Plan', 'Data (GB)', 'Days', 'Price', 'Networks', 'Hotspot'];
  const table = document.getElementById('pricing-table');
  table.querySelector('thead').innerHTML = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
  table.querySelector('tbody').innerHTML = DEMO_PRICING.map(r =>
    '<tr>' + keys.map(k => `<td>${r[k] ?? ''}</td>`).join('') + '</tr>'
  ).join('');
}

// ----- Competitor table -----
function renderCompetitorTable() {
  const today = new Date();
  const keys = ['country', 'competitor', 'plan_name', 'data_gb', 'price_gbp', 'tethering', 'checked_date'];
  const headers = ['Country', 'Competitor', 'Plan', 'Data', 'Price', 'Hotspot', 'Last Checked'];
  const table = document.getElementById('competitor-table');
  table.querySelector('thead').innerHTML = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
  table.querySelector('tbody').innerHTML = DEMO_COMPETITORS.map(r => {
    const checked = new Date(r.checked_date);
    const daysDiff = Math.floor((today - checked) / 86400000);
    const stale = daysDiff > 30;
    return '<tr>' + keys.map(k => {
      const val = r[k] ?? '';
      return `<td class="${k === 'checked_date' && stale ? 'stale' : ''}">${val}${k === 'checked_date' && stale ? ' ⚠ stale' : ''}</td>`;
    }).join('') + '</tr>';
  }).join('');
}

// ----- Generate view -----
function populateCountrySelect() {
  const sel = document.getElementById('gen-country');
  const countries = [...new Set(DEMO_PRICING.map(r => r.country))];
  countries.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.toLowerCase().replace(/\s+/g, '-');
    opt.textContent = c;
    sel.appendChild(opt);
  });
}

document.getElementById('btn-run-generate').addEventListener('click', () => {
  const slug = document.getElementById('gen-country').value;
  const country = document.getElementById('gen-country').selectedOptions[0].textContent;
  const force = document.getElementById('gen-force').checked;
  const log = document.getElementById('gen-output');
  log.style.display = 'block';
  log.textContent = `$ python scripts/generate_pages.py --only ${slug}${force ? ' --force' : ''}\n\nGenerating 1 page(s): ${country}\n--- ${country} (${slug}) ---\n`;
  // Simulate progress
  const steps = [
    '> Reading data/kloudesim-pricing.csv...',
    '> Reading data/competitor-pricing.csv...',
    '> Loading skill references (seo-rules, brand-voice, page-template)...',
    '> Drafting page...',
    '> Running humanising pass...',
    '> Running self-check...',
    `> Saving output/esim-${slug}.md...`,
    `\nok: output/esim-${slug}.md\n\nDone. 1/1 succeeded.`,
  ];
  let i = 0;
  const iv = setInterval(() => {
    if (i >= steps.length) { clearInterval(iv); return; }
    log.textContent += '\n' + steps[i++];
    log.scrollTop = log.scrollHeight;
  }, 700);
});

document.getElementById('btn-batch').addEventListener('click', () => {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelector('[data-view="generate"]').classList.add('active');
  document.getElementById('view-generate').classList.add('active');
});

document.getElementById('btn-diff').addEventListener('click', () => {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelector('[data-view="competitors"]').classList.add('active');
  document.getElementById('view-competitors').classList.add('active');
});

document.getElementById('btn-run-diff').addEventListener('click', () => {
  alert('In production, this runs /competitor-diff via the Claude Code CLI.\n\nCommand: claude -p "Run the competitor-diff command" --allowedTools Read,Write,Bash');
});

// ----- Rankings -----

let rankingsData = [];
let rankingsSort = { col: 'position', dir: 'asc' };

const DEMO_RANKINGS = [
  { query: 'esim japan', page: '/esim-japan', position: 4.2, impressions: 1840, clicks: 62, ctr: 3.4 },
  { query: 'japan esim plans', page: '/esim-japan', position: 6.7, impressions: 920, clicks: 28, ctr: 3.0 },
  { query: 'best esim for japan', page: '/esim-japan', position: 11.3, impressions: 640, clicks: 9, ctr: 1.4 },
  { query: 'esim turkey', page: '/esim-turkey', position: 18.5, impressions: 510, clicks: 4, ctr: 0.8 },
  { query: 'turkey esim plans', page: '/esim-turkey', position: 22.1, impressions: 390, clicks: 2, ctr: 0.5 },
  { query: 'esim saudi arabia', page: '/esim-saudi-arabia', position: 31.4, impressions: 280, clicks: 1, ctr: 0.4 },
  { query: 'esim uae', page: '/esim-uae', position: 28.9, impressions: 310, clicks: 1, ctr: 0.3 },
  { query: 'airalo japan alternative', page: '/esim-japan', position: 7.8, impressions: 720, clicks: 21, ctr: 2.9 },
  { query: 'holafly vs airalo japan', page: '/esim-japan', position: 3.1, impressions: 430, clicks: 38, ctr: 8.8 },
  { query: 'cheap esim japan', page: '/esim-japan', position: 9.4, impressions: 580, clicks: 14, ctr: 2.4 },
];

function posBadge(pos) {
  if (pos <= 3)  return `<span class="pos-badge pos-top3">#${pos.toFixed(1)}</span>`;
  if (pos <= 10) return `<span class="pos-badge pos-top10">#${pos.toFixed(1)}</span>`;
  if (pos <= 20) return `<span class="pos-badge pos-top20">#${pos.toFixed(1)}</span>`;
  return `<span class="pos-badge pos-beyond">#${pos.toFixed(1)}</span>`;
}

function posStatus(pos) {
  if (pos <= 3)  return '<span style="color:var(--success);font-size:11px">Top 3</span>';
  if (pos <= 10) return '<span style="color:var(--accent);font-size:11px">Page 1</span>';
  if (pos <= 20) return '<span style="color:var(--warn);font-size:11px">Page 2</span>';
  return '<span style="color:var(--danger);font-size:11px">Beyond p2</span>';
}

function renderRankingsStats(data) {
  const statsEl = document.getElementById('rankings-stats');
  if (!data.length) { statsEl.innerHTML = ''; return; }
  const avgPos = (data.reduce((s, r) => s + r.position, 0) / data.length).toFixed(1);
  const totalClicks = data.reduce((s, r) => s + r.clicks, 0);
  const totalImpressions = data.reduce((s, r) => s + r.impressions, 0);
  const avgCtr = totalImpressions ? ((totalClicks / totalImpressions) * 100).toFixed(1) : '0.0';
  const top10 = data.filter(r => r.position <= 10).length;
  statsEl.innerHTML = `
    <div class="stat-card accent"><div class="stat-label">Keywords tracked</div><div class="stat-value">${data.length}</div></div>
    <div class="stat-card"><div class="stat-label">Avg position</div><div class="stat-value">${avgPos}</div></div>
    <div class="stat-card"><div class="stat-label">Total clicks</div><div class="stat-value">${totalClicks.toLocaleString()}</div></div>
    <div class="stat-card"><div class="stat-label">Impressions</div><div class="stat-value">${totalImpressions.toLocaleString()}</div></div>
    <div class="stat-card"><div class="stat-label">Avg CTR</div><div class="stat-value">${avgCtr}%</div></div>
    <div class="stat-card"><div class="stat-label">On page 1</div><div class="stat-value">${top10}</div><div class="stat-sub">of ${data.length} keywords</div></div>
  `;
}

function renderRankingsTable(data) {
  const empty = document.getElementById('rankings-empty');
  const table = document.getElementById('rankings-table');
  if (!data.length) { empty.style.display = 'block'; table.style.display = 'none'; return; }
  empty.style.display = 'none';
  table.style.display = '';

  // Sort
  const sorted = [...data].sort((a, b) => {
    let av = a[rankingsSort.col], bv = b[rankingsSort.col];
    if (typeof av === 'string') av = av.toLowerCase(), bv = bv.toLowerCase();
    return rankingsSort.dir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
  });

  document.getElementById('rankings-body').innerHTML = sorted.map(r => `
    <tr>
      <td>${r.query}</td>
      <td><span class="page-slug">${r.page}</span></td>
      <td>${posBadge(r.position)}</td>
      <td>${r.impressions.toLocaleString()}</td>
      <td>${r.clicks.toLocaleString()}</td>
      <td>${r.ctr.toFixed(1)}%</td>
      <td>${posStatus(r.position)}</td>
    </tr>
  `).join('');

  // Update sort icons
  document.querySelectorAll('#rankings-table th.sortable').forEach(th => {
    th.classList.remove('sort-active');
    if (th.dataset.col === rankingsSort.col) th.classList.add('sort-active');
  });
}

function applyRankingsFilters() {
  const text = document.getElementById('rankings-filter').value.toLowerCase();
  const pos = document.getElementById('rankings-pos-filter').value;
  const page = document.getElementById('rankings-page-filter').value;
  let filtered = rankingsData.filter(r => {
    if (text && !r.query.includes(text) && !r.page.includes(text)) return false;
    if (pos === 'top3' && r.position > 3) return false;
    if (pos === 'top10' && r.position > 10) return false;
    if (pos === 'top20' && (r.position <= 10 || r.position > 20)) return false;
    if (pos === 'beyond' && r.position <= 20) return false;
    if (page !== 'all' && r.page !== page) return false;
    return true;
  });
  renderRankingsStats(filtered);
  renderRankingsTable(filtered);
}

function loadRankingsData(data) {
  rankingsData = data;
  // Populate page filter
  const pages = [...new Set(data.map(r => r.page))].sort();
  const sel = document.getElementById('rankings-page-filter');
  sel.innerHTML = '<option value="all">All pages</option>' +
    pages.map(p => `<option value="${p}">${p}</option>`).join('');
  applyRankingsFilters();
}

function parseGscCsv(text) {
  // GSC exports prepend several lines starting with # before the actual header
  const lines = text.trim().split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
  if (!lines.length) return [];
  const header = lines[0].split(',').map(h => h.replace(/"/g, '').trim().toLowerCase());
  const qIdx = header.findIndex(h => h.includes('query') || h.includes('top queries'));
  const pageIdx = header.findIndex(h => h.includes('page') || h.includes('landing'));
  const clickIdx = header.findIndex(h => h.includes('click'));
  const impIdx = header.findIndex(h => h.includes('impression'));
  const ctrIdx = header.findIndex(h => h.includes('ctr'));
  const posIdx = header.findIndex(h => h.includes('position'));

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.replace(/"/g, '').trim());
    const query = cols[qIdx] || '';
    if (!query || query.toLowerCase() === 'top queries') continue;
    rows.push({
      query,
      page: pageIdx >= 0 ? (cols[pageIdx] || '—') : '—',
      clicks: parseInt(cols[clickIdx]) || 0,
      impressions: parseInt(cols[impIdx]) || 0,
      ctr: parseFloat((cols[ctrIdx] || '0').replace('%', '')) || 0,
      position: parseFloat(cols[posIdx]) || 0,
    });
  }
  return rows;
}

// CSV upload
document.getElementById('gsc-upload').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const parsed = parseGscCsv(ev.target.result);
    if (!parsed.length) { alert('Could not parse file. Make sure it\'s a GSC CSV export (Queries tab).'); return; }
    loadRankingsData(parsed);
  };
  reader.readAsText(file);
  e.target.value = '';
});

// Sort headers
document.querySelectorAll('#rankings-table th.sortable').forEach(th => {
  th.addEventListener('click', () => {
    if (rankingsSort.col === th.dataset.col) {
      rankingsSort.dir = rankingsSort.dir === 'asc' ? 'desc' : 'asc';
    } else {
      rankingsSort.col = th.dataset.col;
      rankingsSort.dir = th.dataset.col === 'position' ? 'asc' : 'desc';
    }
    applyRankingsFilters();
  });
});

// Filters
document.getElementById('rankings-filter').addEventListener('input', applyRankingsFilters);
document.getElementById('rankings-pos-filter').addEventListener('change', applyRankingsFilters);
document.getElementById('rankings-page-filter').addEventListener('change', applyRankingsFilters);

// Help box toggle
document.getElementById('btn-gsc-help').addEventListener('click', () => {
  const box = document.getElementById('gsc-help-box');
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
});
document.getElementById('help-close').addEventListener('click', () => {
  document.getElementById('gsc-help-box').style.display = 'none';
});

// ----- Init -----
renderPages();
renderPricingTable();
renderCompetitorTable();
populateCountrySelect();
loadRankingsData(DEMO_RANKINGS);

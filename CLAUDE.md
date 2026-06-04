# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for **Havana Club** — a Latin dance studio in Gomel, Belarus. Pure HTML/CSS/JS with no build tools, no dependencies, and no compilation step.

## Running the Project

Open `index.html` directly in a browser — no server, no build step required. Works via `file://` protocol.

For a local dev server (optional, for testing absolute paths or fetch):
```bash
python3 -m http.server 8000
# or
npx serve .
```

## Architecture

Three files contain all the code:

- **`index.html`** — Full page structure, all sections inline. Sections in order: nav, hero, benefits, partners, schedule, pricing, CTA form, footer.
- **`styles.css`** — All styling. Theme colors are CSS custom properties at the top of `:root`. Breakpoints: 768px (tablet), 480px (mobile).
- **`script.js`** — All interactivity: mobile menu, scroll effects, IntersectionObserver fade-ins, smooth scroll, form validation, phone formatting, counter animations, toast notifications.

## Key Design Details

**Color palette (CSS variables in `styles.css`):**
- `--primary`: #E63946 (red)
- `--secondary`: #F77F00 (orange)
- `--accent`: #D62828 (deep red)
- `--gold`: #FFB703

**Fonts:** Playfair Display (headings), Poppins (body) — loaded via Google Fonts CDN.

**Form:** Client-side validation only; submission logs to console. The comment in `script.js` marks where backend integration goes.

## Content Locations

- Contact info (phone, address, Telegram): footer section in `index.html` + hero CTA
- Pricing tiers: `.pricing-grid` in `index.html`
- Schedule: `.schedule-grid` table in `index.html`
- Social links: footer in `index.html`
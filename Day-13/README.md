# Habesha Eatery – Landing Page

Accessible, SEO-ready single-page site for a fictional Ethiopian restaurant.

## Project Structure

```
Day-12/
├── index.html      ← Main page (hero, form, menu, map)
├── style.css       ← Base styles + keyboard-nav focus styles
├── assets/
│   └── hero.jpg    ← Hero image (add your own)
└── README.md
```

## Features

| Requirement | Implementation |
|---|---|
| Reservation form | `name`, `tel` (pattern `09[0-9]{8}`), `guests` (1–20), `date` — all with `<label for>` |
| Menu table | `<table>` with `<caption>`, `scope="col/row"`, ETB price column |
| Hero image | Meaningful `alt`, `loading="lazy"`, `width`/`height` set |
| Google Map | `<iframe>` with descriptive `title` attribute |
| SEO | `<title>`, `<meta name="description">`, ordered heading outline (h1 → h2) |
| Keyboard nav | Skip-link, `focus-visible` outlines on all interactive elements, no focus traps |

## Keyboard Navigation Checklist

- [ ] Skip link appears on first Tab press → jumps to `#main-content`
- [ ] Nav links focusable with Tab
- [ ] All form fields reachable and labelled
- [ ] Submit button reachable with Tab, activatable with Enter/Space
- [ ] Map iframe focusable (has `tabindex="0"`)
- [ ] No element traps focus

## Setup

1. Add a hero image at `assets/hero.jpg` (recommended: 1200 × 420 px).
2. Open `index.html` in a browser — no build step required.

## Submission

```bash
git init
git add .
git commit -m "feat: Habesha Eatery landing page"
git remote add origin https://github.com/<your-username>/habesha-eatery.git
git push -u origin main
```

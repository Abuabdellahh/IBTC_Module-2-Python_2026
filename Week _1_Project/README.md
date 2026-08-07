# Habesha Eatery — Responsive Static Site

A multi-section marketing website for a real Addis Ababa restaurant, built as the Week 2 project for **CodeOps · Full Stack Software Development** at IBT College Canada.

## Live Demo

> Deploy to GitHub Pages and paste the URL here.

## What I Built

A fully responsive, HTML + CSS only static site covering:

| Section | Technique |
|---|---|
| Sticky navbar | Flexbox, `position: sticky` |
| Hero | CSS `clamp()` fluid heading, overlay gradient |
| About / story | CSS Grid two-column layout |
| Menu grid | `auto-fit` / `minmax` — reflows 1 → 2 → 3 columns |
| Reservation form | Labelled inputs, `pattern` validation, `aria-*` attributes |
| Footer | 4-column grid, collapses to 2 then 1 on mobile |

## Checklist

- [x] Viewport meta tag
- [x] Semantic landmarks (`header`, `nav`, `main`, `footer`, `section`, `article`, `address`)
- [x] `box-sizing: border-box` reset
- [x] Colour & spacing in `:root` custom properties
- [x] Sticky Flexbox navbar — logo left, links right
- [x] Hero with `clamp()` fluid heading and CTA button
- [x] Menu reflows 1 → 2 → 3 columns
- [x] Reservation form with labels + HTML5 validation
- [x] `max-width: 100%` on all images
- [x] Hover transition on menu cards
- [x] Looks right at 360 px and 1280 px
- [x] Skip link for keyboard accessibility
- [x] `alt` text on every image
- [x] `prefers-reduced-motion` respected

## Project Structure

```
Week_1_Project/
├── index.html
├── styles.css
├── images/
│   ├── hero.jpg
│   ├── doro-wat.jpg
│   └── injera.jpg
└── README.md
```

## Images

Place your own photos in the `images/` folder:

- `hero.jpg` — wide landscape shot for the hero banner (≥ 1400 × 560 px)
- `doro-wat.jpg` — Doro Wat dish photo (≥ 400 × 220 px)
- `injera.jpg` — injera / generic dish fallback (≥ 400 × 220 px)

The site uses the existing `injera.jpg` from earlier days as a placeholder for all cards until real photos are added.

## How to Run

Open `index.html` directly in a browser — no build step required.

## What I Learned

- Combining CSS Grid and Flexbox for real page layouts
- Mobile-first breakpoints and `clamp()` for fluid typography
- Accessible form markup with `aria-describedby`, `pattern`, and `required`
- CSS custom properties as a design-token system
- Sticky positioning and z-index stacking context

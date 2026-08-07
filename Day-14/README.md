# Habesha Eatery – Menu Card Component

Accessible, SEO-ready single-page site for a fictional Ethiopian restaurant,
featuring a fully styled `.menu-card` component.

## Project Structure

```
Day-13/
├── starter.html        ← Main page (hero, menu cards, form, map)
├── styles.css          ← Global reset, design tokens, .menu-card styles
├── injera.jpg          ← Hero image
├── enjera.jpg          ← Additional food image
└── README.md
```

## Deliverable – `.menu-card` Component

A single styled component demonstrating CSS variables, the box model,
typography, pseudo-classes, and pseudo-elements.

| Requirement | Implementation |
|---|---|
| Global reset | `box-sizing: border-box` on `*, *::before, *::after` |
| Base typography | `font-family` and `line-height` set on `body` |
| Card box model | `padding`, `border`, `border-top` gold accent (4px) |
| CSS variables | All colours use `var()` — zero raw hex in card rules |
| `:hover` state | Card lifts with `translateY(-4px)` and warms background |
| `::before` pseudo-element | Injects `"ETB "` before the numeric price |
| `:nth-child(even)` | Zebra-stripes the `.menu-card__ingredients` list |

## Menu Card Self-Check

- [ ] `box-sizing: border-box` applied universally
- [ ] `font-family` and `line-height` declared on `body`
- [ ] Card has `padding`, a `border`, and a gold `border-top` accent
- [ ] Every colour value goes through `var()` — no raw hex in card rules
- [ ] Card lifts and changes background on `:hover`
- [ ] `.menu-card__price::before` shows `"ETB "` in the browser
- [ ] Even ingredient rows have a different background (`:nth-child(even)`)

## Keyboard Navigation Checklist

- [ ] Skip link appears on first Tab press → jumps to `#main-content`
- [ ] Nav links focusable with Tab
- [ ] All form fields reachable and labelled
- [ ] Submit button reachable with Tab, activatable with Enter/Space
- [ ] Map iframe focusable (has `tabindex="0"`)
- [ ] No element traps focus

## Setup

1. Open `starter.html` in a browser — no build step required.
2. Open DevTools → inspect `.menu-card` to verify computed box dimensions.
3. Hover a card to confirm the `:hover` state and check `::before` on the price.

## Submission

```bash
git init
git add .
git commit -m "feat(menu-card): style .menu-card with CSS variables and pseudo-selectors"
git remote add origin https://github.com/<your-username>/habesha-eatery.git
git push -u origin main
```

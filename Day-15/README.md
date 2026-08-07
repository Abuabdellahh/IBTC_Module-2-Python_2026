# Habesha Eatery – Responsive & Animated Menu

Accessible, SEO-ready single-page site for a fictional Ethiopian restaurant.
The `.menu-card` grid is **mobile-first** and animates on hover.

---

## Project Files

```
Day-15/
├── menu.html       ← Main page (hero, menu cards, form, map)
├── menu.css        ← Mobile-first styles, design tokens, animations
├── targets.png     ← Phone and laptop target layouts
├── injera.jpg      ← Hero image
├── enjera.jpg      ← Additional food image
└── README.md
```

---

## Deliverable – Responsive Menu Grid

| Requirement | Implementation |
|---|---|
| Viewport meta tag | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |
| Mobile-first base | `grid-template-columns: 1fr` — single column at 360px+ |
| Tablet breakpoint | `@media (min-width: 768px)` → 2 columns |
| Desktop breakpoint | `@media (min-width: 1024px)` → 3 columns |
| Hover animation | `translateY(-6px) scale(1.02)` + shadow + warm background |
| Reduced-motion guard | `@media (prefers-reduced-motion: reduce)` disables `transform` |

---

## Self-Check

### Responsive Layout
- [ ] Single column at 360px (mobile)
- [ ] Two columns at 768px (tablet)
- [ ] Three columns at 1024px+ (desktop)
- [ ] Cards fill available width at every breakpoint
- [ ] No horizontal scroll from 360px to 1280px

### Animation
- [ ] Card lifts with `translateY(-6px) scale(1.02)` on hover
- [ ] Shadow deepens on hover
- [ ] Background warms to gold tint on hover
- [ ] Transition is smooth (0.25s ease)
- [ ] `prefers-reduced-motion: reduce` removes `transform` (colour change kept)

### Accessibility
- [ ] Skip link appears on first Tab press → jumps to `#main-content`
- [ ] All nav links focusable with Tab
- [ ] All form fields reachable and labelled
- [ ] Submit button activatable with Enter/Space
- [ ] Map iframe has `tabindex="0"` and a descriptive `title`
- [ ] No element traps focus

### CSS Quality
- [ ] `box-sizing: border-box` applied universally
- [ ] Every colour uses `var()` — zero raw hex in component rules
- [ ] `::before` on `.menu-card__price` shows `"ETB "` in browser
- [ ] Even ingredient rows zebra-striped with `:nth-child(even)`

---

## Setup

```bash
# No build step — open directly in a browser
open menu.html
```

Then in DevTools:
1. Toggle device toolbar and drag from **360px → 1280px** to confirm breakpoints.
2. Hover a card to verify `translateY + scale` lift.
3. Enable **Emulate CSS media feature `prefers-reduced-motion: reduce`** in
   Rendering panel — confirm cards no longer move on hover.

---

## Submission

```bash
git init
git add .
git commit -m "feat(menu): mobile-first responsive grid with hover animation"
git remote add origin https://github.com/<your-username>/habesha-eatery.git
git push -u origin main
```

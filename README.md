# NVB Tech Shop — Startup Landing Page

A beginner-friendly landing page built using **HTML5, CSS3, vanilla JavaScript, and a local JSON file**. All interface text and comments are in English.

## Features

- Semantic HTML sections: Header, Hero, Products, About, Contact, Footer
- Responsive layout using CSS Grid, Flexbox and media queries
- Product data loaded from `data/products.json` with `fetch()`
- Live product search by name
- Category filter, generated from JSON data
- Show / hide product descriptions
- Email validation with a demo success message (no backend or storage)
- Local SVG illustrations — no external image hosting required

## Run locally

> **Important:** Opening `index.html` directly via `file://` may block `fetch()` for the JSON file.

**Option A — VS Code:** Install *Live Server*, open this project folder, right-click `index.html`, then select **Open with Live Server**.

**Option B — Python:** From this folder, run:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000 in your browser.

## File structure

```
NVB-Tech-Shop/
├── index.html
├── css/style.css
├── js/main.js
├── data/products.json
├── images/*.svg
└── design/wireframe.svg
```

## Classroom progression

**Session 1 — Design:** Review `design/wireframe.svg`. Discuss the target audience, page sections, colors, spacing, and layout. Recreate or improve the wireframe in Figma or Canva.

**Session 2 — HTML:** Build the semantic page structure in `index.html`. For the first version, it is fine to write a sample product card in HTML.

**Session 3 — CSS:** Recreate the layout and styles in `css/style.css`. Test both desktop and mobile widths.

**Session 4 — JavaScript & JSON:** Move products into `data/products.json`, load them with `fetch()`, render cards, add search and event handlers, and validate the email form.

## Suggested student exercises

1. Add two new products by editing **only** `products.json` and adding SVG/image files.
2. Change the primary accent color using the CSS variables in `:root`.
3. Add a new product category and check if the dropdown updates automatically.
4. Explain the event listeners for `input`, `change`, `click`, and `submit`.
5. Explain why `event.preventDefault()` is used for the subscription form.

## Notes

This is a **front-end teaching demo**, not a functional online store. No checkout, accounts, email delivery, server database, or data persistence is provided. Prices are sample USD amounts. The illustrations are original, locally bundled SVG graphics.

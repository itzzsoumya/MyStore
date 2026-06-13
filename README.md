# MyStore – Mini E‑commerce

A small but complete e‑commerce frontend built with React, Vite, SCSS, and localStorage.

live url : https://mystore-jet-eta.vercel.app

## What works

- Product listing grid with quick add to cart
- Product detail page with images, colour/size picker, stock status (available/low/sold out)
- Cart drawer (slide from right) – change quantity, remove items, see total
- Favorites drawer – heart icon saves products you like
- Recently viewed section – shows up after you visit a product
- Search bar with debounce (updates URL query)
- Cart, favorites, recently viewed all survive page refresh (localStorage)
- Responsive – works on phone, tablet, desktop

## Tech

- React 18 (hooks only)
- React Router v6
- Context API (cart, favorites, recently viewed)
- SCSS modules (no Tailwind)
- Vite
- Fake Store API

## Run locally

```bash
git clone https://github.com/itzzsoumya/MyStore.git
cd MyStore
npm install
npm run dev
```

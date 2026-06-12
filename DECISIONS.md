---
## DECISIONS.md

```markdown
# Why I built it this way

## Context API, not Redux
The state is simple (cart, favorites, recently viewed). Redux would be overkill. Context + useReducer works fine. Just had to use memo/useCallback to avoid extra re‑renders.

## Variants & stock are generated
FakeStore API has no colour/size/stock. I made deterministic variants based on product ID so the same options show every time. Not real data, but enough to demo the UI.

## Extra images are placeholders
API gives only one image. I added two placeholder images so the thumbnail gallery works. Real app would have real product angles.

## Sale prices are fake
Products above 50 show an old price crossed out (15% extra). Just to show the pattern – not actual discounts.

## Lazy loading & skeletons
Product listing and detail pages load on demand. Skeleton loaders show while fetching. No blank screens.

## Recently viewed shows only after you visit something
No point showing an empty section. It appears only when you've seen at least one product.

## Search updates URL
Typing updates the query param `?search=...`. That way you can share or bookmark search results.

## localStorage with debounce
Cart, favorites, recently viewed save to localStorage. I added a 300ms debounce so it doesn't write on every keystroke when changing quantity.

## No TypeScript
Wanted faster iteration. In a real team project I'd use TS, but for this spec it's optional.

## Mobile navbar
On mobile, logo stays left, search icon + hearts + cart on the same row. Clicking search opens a full‑width drawer. Works like Flipkart.

## Known limitations
- Variants / stock / extra images are not real – just for UI demo.
- No backend – all data lives in localStorage.
- Sale prices are simulated, not from API.
- If API goes down, you'll see an error with a retry button.
---

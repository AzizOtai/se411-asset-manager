# Architecture

## Technology stack
| Concern | Choice |
|---|---|
| UI | React 19 (function components + hooks) |
| Build tool | Vite |
| Routing | react-router-dom (HashRouter – works on any static host) |
| State | React Context + `useReducer` (in-memory array of asset objects) |
| Styling | Plain CSS (responsive grid/flex) |
| Tests | Vitest, React Testing Library, jsdom |

## Structure
```
src/
  main.jsx            entry: HashRouter + AssetProvider
  App.jsx             route table
  components/Navbar   menu
  pages/              Dashboard, AssetsPage (list/search/delete), AssetFormPage (add/edit), About
  context/            AssetContext (reducer: add / update / remove)
  utils/assetUtils    pure functions: filterAssets, validateAsset, summarize
  data/initialAssets  seed data + status/type enums
```

## Data model
`{ id, name, type, serialNumber, assignedTo, status, purchaseDate, price }`

## Data flow
Pages read assets via `useAssets()`; mutations dispatch to `assetReducer`, which returns a new array. Search/filter logic is pure and memoized in the list page. In Part 2 the context actions can be swapped for API calls without changing the pages.

## Features → requirements
| Requirement | Where |
|---|---|
| Menu navigation | `Navbar`, `App` routes |
| Add / update / remove / search / display | `AssetFormPage`, `AssetsPage`, `assetUtils` |
| About page (name, student id) | `pages/About.jsx` |

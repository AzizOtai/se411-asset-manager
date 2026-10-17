# IT Asset Manager (SE411 – Part 1)

React front-end for managing a company's IT assets (computers, servers, monitors, …). Data is an in-memory collection of objects (no database; backend comes in Part 2).

## Features
- Menu navigation: Dashboard, Assets, Add Asset, About
- Create, read (table), update, delete assets
- Search (name, type, serial, owner, status) + filter by status/type
- Form validation, delete confirmation, dashboard summary
- About page with team members (name, student id)

## Run
```bash
npm install
npm run dev     # development server
npm test        # run the test suite
npm run build   # production build
```

## Docs
- [Architecture & tech stack](docs/ARCHITECTURE.md)
- [Test report](docs/TESTING.md)
- [Code review](docs/CODE_REVIEW.md)

Built with AI assistance (Claude Code) for requirements, design, code, docs, tests and review.

# BE Dev Test — README

## Project Overview
- Purpose: Small backend example using Express, TypeORM (SQLite), and Zod to import and serve customer data.
- Tech stack: Node.js, TypeScript, Express, TypeORM, SQLite, Zod, csv-parse.

## Features
- CSV import: Import customers from `data/customers.csv` into a local SQLite DB.
- REST API: Read-only customer endpoints for listing, searching and fetching by id.
- Data validation: Incoming CSV rows validated with Zod schema before insertion.
- Type-safe codebase: TypeScript with a simple project layout.

## Requirements
- Node.js (>= 18 recommended)
- npm

## Setup (step-by-step)
1. Clone the repo and install dependencies:

    ```bash
    git clone https://github.com/captainmio/catch-design-backend
    cd catch-design-backend
    npm install
    ```

2. (Optional) Create a `.env` file to set `PORT` (defaults to 3000):

    ```env
    PORT=3000
    ```

3. The app uses a local SQLite database file `database.sqlite` created automatically in the project root by TypeORM when initialized.

## Run in development
- Start dev server (auto restarts on changes):

  ```bash
  npm run dev
  ```

- Build and run production bundle:

  ```bash
  npm run build
  npm start
  ```

## Populate database (scripts)

Run the import script (will create/seed database.sqlite):

```bash
npm run import:customers
```

- This runs `ts-node src/services/csv-import.service.ts` and will initialize the TypeORM datasource automatically.
- Validation errors (Zod) for CSV rows will be logged to the console; valid rows are persisted.

## API (endpoints & usage)
Base URL: `http://localhost:3000` (or `PORT` if set in `.env`)

- List customers (paginated)
  - Endpoint: `GET /customers`
  - Query parameters:
     - `page` (optional): page number (default: `1`)
     - `limit` (optional): items per page (default: `10`)
  - Example:

     ```bash
     curl "http://localhost:3000/customers?page=1&limit=20"
     ```

  - Response shape:

     ```json
     {
        "success": true,
        "data": [ /* customers */ ],
        "meta": { "total": 123, "page": 1, "limit": 20 }
     }
     ```

- Get customer by id
  - Endpoint: `GET /customers/:id`
  - Example:

     ```bash
     curl "http://localhost:3000/customers/123"
     ```

- Search customers
  - Endpoint: `GET /customers/search`
  - Query parameter: `query` (string to search in `email`, `first_name` and `last_name`)
  - Example:

     ```bash
     curl "http://localhost:3000/customers/search?query=john"
     ```

## Troubleshooting
- Database file missing / permissions: ensure the process can create `database.sqlite` in the project root.
- Port already in use: set a different `PORT` in `.env` and restart.
- CSV encoding issues: ensure `data/customers.csv` is UTF-8 and has headers matching the schema.

## Next steps / improvements
- Add unit/integration tests (Jest or Vitest).
- Add a partial update/create API for customers.
- Add better import reporting (summary of success/fail counts and detailed error CSV).

---

If you want, I can also add a small test suite and an improved import summary report.


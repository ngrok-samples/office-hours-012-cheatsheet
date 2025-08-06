# Cheatsheet API

A simple Express.js API for storing and managing code snippets.

## Features

- Store code snippets with title, description, code, language, and tags
- Fetch all snippets
- Fetch snippet by ID
- Add new snippets

## API Endpoints

### GET /snippets
Returns all snippets ordered by creation date (newest first).

### GET /snippets/:id
Returns a specific snippet by ID.

### POST /snippets
Creates a new snippet.

**Required fields:**
- `title` (string)
- `code` (string) 
- `language` (string)

**Optional fields:**
- `description` (string)
- `tags` (string)

**Example:**
```bash
curl -X POST http://localhost:3000/snippets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Array Map Example",
    "description": "Simple example of using map to transform an array",
    "code": "const numbers = [1, 2, 3, 4];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);",
    "language": "javascript",
    "tags": "array, map, functional"
  }'
```

## Running the API

```bash
npm start
```

The server will run on port 3000 by default.

## Database

Uses SQLite database stored as `cheatsheet.db` in the project root.

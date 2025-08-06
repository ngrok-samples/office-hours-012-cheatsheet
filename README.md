# Cheatsheet API

A simple Express.js API for storing and managing code snippets.

## Follow along during the Office Hours livestream!

Link: https://youtube.com/live/ofeEk6WYGOE

### What you'll need

- An ngrok account ([sign up for free](https://dashboard.ngrok.com/signup))
- Node.js installed on your local machine
- A [Lovable](https://lovable.dev) account

### Setup

Clone this repository to your local machine:

```bash
git clone git@github.com:ngrok-samples/office-hours-012-cheatsheet.git
```

Run the API:

```
npm start
```

### Build with Lovable

Here's a prompt to get you going:

```
Create a frontend to an API I'm developing and hosting locally that allows me to create/read/update/delete code snippets and display them in a customizeable grid.

In addition, include the following:

- Syntax highlighting for popular languages, including YAML.
- An `API_BASE_URL` variable to query for data, which can start as
  `https://localhost:3000` but must be user-customizable.
- Rea

Do not include mock data.

Here are the API routes and specifications to build against:

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

curl -X POST http://localhost:3000/snippets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Array Map Example",
    "description": "Simple example of using map to transform an array",
    "code": "const numbers = [1, 2, 3, 4];\nconst doubled = 
numbers.map(n => n * 2);\nconsole.log(doubled);",
    "language": "javascript",
    "tags": "array, map, functional"
  }'
```

Once that finishes, ask Lovable to update the `API_BASE_URL` to your `$NGROK_DOMAIN`:

```
Update `API_BASE_URL` to $NGROK_DOMAIN and replace API calls 
```

### Use ngrok as your gateway

Start an ngrok agent that forwards traffic to it:

```
# Free account
ngrok http 3000

# Paid account
ngrok http 3000 --url https://$NGROK_DOMAIN.ngrok.app
```

Try out your Lovable frontend... it should work!

### Add security with Traffic Policy

Close your ngrok and start it again with the `policy.yaml` file in this repo.

```
# Free account
ngrok http 3000 --traffic-policy-file policy.yaml

# Paid account
ngrok http 3000 --url https://$NGROK_DOMAIN.ngrok.app --traffic-policy-file policy.yaml
```

If you try to edit your cheatsheet in Lovable, you'll get errors!

Update your Lovable app with one more prompt:

```
Add the following header to all API requests: `x-ngrok-token: thisistotallysecret`
```

### What's next?

- Change up the styling in Lovable
- Add [rate limiting](https://ngrok.com/docs/traffic-policy/actions/rate-limit/)
- Put this behind the [front door
  pattern](https://ngrok.com/docs/universal-gateway/examples/front-door-pattern/)
  to make ngrok easier to manage as a gateway
- [Multiplex](https://ngrok.com/docs/universal-gateway/examples/multiplex/) this cheatsheet with any number of other services you might be self-hosting in any environment

## API endpoints

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

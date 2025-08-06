const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'cheatsheet.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS snippets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    code TEXT NOT NULL,
    language TEXT NOT NULL,
    tags TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

app.get('/snippets', (req, res) => {
  db.all('SELECT * FROM snippets ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/snippets/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM snippets WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Snippet not found' });
      return;
    }
    res.json(row);
  });
});

app.post('/snippets', (req, res) => {
  const { title, description, code, language, tags } = req.body;
  
  if (!title || !code || !language) {
    res.status(400).json({ error: 'Title, code, and language are required' });
    return;
  }

  const stmt = db.prepare(`INSERT INTO snippets (title, description, code, language, tags) 
                          VALUES (?, ?, ?, ?, ?)`);
  
  stmt.run([title, description, code, language, tags], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ 
      id: this.lastID,
      message: 'Snippet created successfully'
    });
  });
  
  stmt.finalize();
});

app.listen(PORT, () => {
  console.log(`Cheatsheet API server running on port ${PORT}`);
});

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'lista_nascita.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Errore apertura DB:', err);
  else console.log('Database SQLite connesso');
});

// Crea tabella prodotti se non esiste
db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL UNIQUE,
    price REAL NOT NULL,
    stock INTEGER NOT NULL DEFAULT 1,
    sku TEXT,
    brand TEXT,
    description TEXT,
    image TEXT
  )
`);

// Crea tabella ordini per tracciare i pagamenti
db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paypal_order_id TEXT NOT NULL UNIQUE,
    total REAL NOT NULL,
    status TEXT DEFAULT 'completed',
    items TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;

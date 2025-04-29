const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

// ✅ Criação da tabela (só uma vez, no carregamento do módulo)
db.run(`CREATE TABLE IF NOT EXISTS categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  codigo TEXT,
  cor TEXT NOT NULL,
  icone TEXT NOT NULL,
  descricao TEXT
)`);

// ✅ GET /api/categorias
router.get('/categorias', (req, res) => {
  db.all('SELECT * FROM categorias', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ✅ POST /api/categorias
router.post('/categorias', (req, res) => {
  const { nome, cor, cIcon, cSisBar, descricao } = req.body;

  db.run(
    'INSERT INTO categorias (nome, cor, icone, codigo, descricao) VALUES (?, ?, ?, ?, ?)',
    [nome, cor, cIcon, cSisBar, descricao],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');


// Configuração do Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/produtos/');
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    }
  });
  
  const upload = multer({ storage });



db.run(`CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL,
  cBarra INTEGER NOT NULL,
  cSis INTEGER NOT NULL,
  precoCompra REAL NOT NULL,
  precoVenda REAL NOT NULL,
  estoque INTEGER NOT NULL,
  descricao TEXT,
  imageURL TEXT,
  ativo BOOLEAN NOT NULL DEFAULT 1
)`);

router.post('/produtos', upload.single('imagem'), (req, res) => {
    const {
      nome, categoria, cBarra, cSis,
      precoCompra, precoVenda, estoque, descricao
    } = req.body;
  
    const imageURL = req.file ? `/uploads/produtos/${req.file.filename}` : '';
  
    db.run(
      `INSERT INTO produtos 
      (nome, categoria, cBarra, cSis, precoCompra, precoVenda, estoque, descricao, imageURL) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, categoria, cBarra, cSis, precoCompra, precoVenda, estoque, descricao, imageURL],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
      }
    );
  });


  // backend/routes/produtos.js
  router.get('/produtos', (req, res) => {
    const { nome, cSis, cBarra } = req.query;
  
    let query = 'SELECT * FROM produtos';
    let params = [];
    let conditions = [];
  
    if (nome) {
      conditions.push('nome LIKE ?');
      params.push(`%${nome}%`);
    }
    if (cSis) {
      conditions.push('cSis = ?');
      params.push(cSis);
    }
    if (cBarra) {
      conditions.push('cBarra = ?');
      params.push(cBarra);
    }
  
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
  
    db.all(query, params, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });


  router.put('/produtos/:id', upload.single('imagem'), (req, res) => {
    const {
      nome, categoria, cBarra, cSis,
      precoCompra, precoVenda, estoque, descricao
    } = req.body;
    const imageURL = req.file ? `/uploads/${req.file.filename}` : req.body.imageURL;
  
    db.run(
      `UPDATE produtos SET 
        precoCompra = ?, 
        precoVenda = ?, 
        estoque = ?, 
        descricao = ?, 
        imageURL = ?
       WHERE id = ?`,
      [precoCompra, precoVenda, estoque, descricao, imageURL, req.params.id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updated: true });
      }
    );
  });
  
  

module.exports = router;
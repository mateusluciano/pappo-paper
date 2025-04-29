const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const categoriaRoutes = require('./routes/categorias');
app.use('/api', categoriaRoutes); // ✅ Aqui ele usará /api/categorias automaticamente

app.listen(3001, () => {
  console.log('🚀 Backend rodando em http://localhost:3001');
});

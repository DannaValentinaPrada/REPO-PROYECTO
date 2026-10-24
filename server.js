const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());

// REEMPLAZA "TU_CONTRASEÑA_REAL" POR LA QUE CREASTE EN MONGO ATLAS
const mongoURI = 'mongodb+srv://dannavalentina0805_db_user:BellaCausa2026@dannaprada.kqpgb67.mongodb.net/mi_base_de_datos';

mongoose.connect(mongoURI)
  .then(() => console.log('¡Conectado exitosamente a MongoDB Atlas!'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

app.get('/', (req, res) => {
  res.send('¡El servidor de Node.js está corriendo perfectamente!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

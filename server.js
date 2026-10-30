
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('¡Conectado exitosamente a MongoDB Atlas!'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

app.get('/', (req, res) => {
  res.send('¡El servidor de Node.js está corriendo perfectamente!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


const contactoSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
  email: String,
  mensaje: String,
  fechaRegistro: { type: Date, default: Date.now }
});

const Contacto = mongoose.model('Contacto', contactoSchema);


app.post('/api/contacto', async (req, res) => {
  try {
    const nuevoContacto = new Contacto({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email,
        mensaje: req.body.mensaje 
    });

    const datosGuardados = await nuevoContacto.save();

    res.status(201).json({
        mensaje: 'Formulario guardado con éxito en MongoDB!',
        datos: datosGuardados
    });
  } catch (error) {
    console.error("ERROR DETALLADO DE MONGO:", error);
    res.status(500).json({ mensaje: 'Error al guardar el formulario', error: error.message });
    }
});

const mascotaSchema = new mongoose.Schema({
  nombre: String,
  tipo: String,
  estado: String,
  foto: String,
  historia: String,
  fechaRegistro: { type: Date, default: Date.now }
});

const Mascota = mongoose.model('Mascota', mascotaSchema);

app.get('/api/mascotas', async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las mascotas', error: error.message });
  }
});

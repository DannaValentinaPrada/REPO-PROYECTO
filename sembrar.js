require('dotenv').config();
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');

// Mismo molde que en server.js
const mascotaSchema = new mongoose.Schema({
  nombre: String,
  tipo: String,
  estado: String,
  foto: String,
  historia: String,
  fechaRegistro: { type: Date, default: Date.now }
});
const Mascota = mongoose.model('Mascota', mascotaSchema);

const mascotasIniciales = [
  {
    nombre: 'ROCKY',
    tipo: 'Canino',
    estado: 'rescate',
    foto: './assets/ROCKY.jpg',
    historia: 'Escribe aquí la historia real de Rocky: dónde fue rescatado, cómo está hoy y qué necesita.'
  },
  {
    nombre: 'MILO',
    tipo: 'Canino',
    estado: 'disponible',
    foto: './assets/MILO.jpg',
    historia: 'Escribe aquí la historia real de Milo: dónde fue rescatado, cómo está hoy y qué necesita.'
  },
  {
    nombre: 'CANELA',
    tipo: 'Felino',
    estado: 'adoptado',
    foto: './assets/CANELA.jpg',
    historia: 'Escribe aquí la historia real de Canela: dónde fue rescatada, cómo está hoy y qué necesita.'
  }
];

async function sembrar() {
  await mongoose.connect(process.env.MONGO_URI);

  const cantidad = await Mascota.countDocuments();
  if (cantidad > 0) {
    console.log('Ya hay mascotas guardadas. No se agregó nada.');
  } else {
    await Mascota.insertMany(mascotasIniciales);
    console.log('Mascotas iniciales guardadas correctamente.');
  }

  await mongoose.disconnect();
}

sembrar().catch((error) => {
  console.log('Error:', error.message);
});
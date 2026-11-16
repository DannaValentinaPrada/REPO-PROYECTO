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

const historias = {
    MILO: 'A Milo lo encontraron siendo apenas un cachorro, solo y con mucha hambre, cerca de una plaza de mercado. Tenía el pelo enredado y unas ganas enormes de jugar con quien se le acercara. Ya fue vacunado, desparasitado y bañado, y desde entonces es el rey de su hogar de paso: le encantan las mantas suaves, las caricias y correr detrás de cualquier juguete. Es sociable con niños y con otros perros. Milo busca una familia con tiempo para pasear, enseñarle y darle un hogar para toda la vida.',
    CANELA: 'Canela fue encontrada escondida debajo de un carro, muy delgada y con una oreja lastimada. Era una gatita tímida que bufaba a cualquiera que se acercara. Con paciencia, comida y mucha tranquilidad en su hogar de paso, empezó a ronronear. Un fin de semana llegó una visitante que se quedó mirándola un buen rato, y la conexión fue inmediata. Hoy Canela vive con su nueva familia, duerme sobre su regazo y nos recuerda que la paciencia y el cariño pueden cambiar una vida entera.',
    ROCKY: 'Rocky apareció una noche de lluvia, empapado y temblando, en un callejón detrás de una tienda. Estaba muy flaquito y cubierto de barro, y al principio se escondía de todas las personas. Una voluntaria lo llevó a la veterinaria, donde lo bañaron, lo desparasitaron y le pusieron sus primeras vacunas. Hoy come con ganas, juega con una pelota y cada día confía un poco más. Todavía está en proceso de recuperación y pronto estará listo para encontrar una familia paciente que lo llene de cariño.',
    TERRY: 'Terry tiene unos nueve meses y es pura energía. Su familia anterior no pudo seguir cuidándolo y lo dejaron en la puerta de una veterinaria, con un collar y un plato de agua. Desde entonces vive en un hogar de paso donde ha aprendido a caminar con correa y a dar la pata a cambio de un premio. Es juguetón, curioso y muy cariñoso, aunque necesita paseos diarios para gastar toda su energía. Terry sueña con una familia activa que le dé rutina, juegos y mucho amor.'
};

async function actualizar() {
    await mongoose.connect(process.env.MONGO_URI);

    for (const nombre of Object.keys(historias)) {
        const resultado = await Mascota.updateOne(
            { nombre: new RegExp('^' + nombre + '$', 'i') },
            { $set: { historia: historias[nombre] } }
        );
        console.log(nombre + ': ' + resultado.matchedCount + ' encontrada(s), ' + resultado.modifiedCount + ' actualizada(s)');
    }

    await mongoose.disconnect();
}

actualizar().catch((error) => {
    console.log('Error:', error.message);
});

const botonMenu = document.getElementById("boton-menu");
const menu = document.getElementById("menu");

botonMenu.addEventListener("click", function () {
    menu.classList.toggle("abierto");
});

const botonesFiltro = document.querySelectorAll(".filtro");
const listaCasos = document.querySelector(".lista-casos");
const conteo = document.getElementById("conteo");
const API = "https://bella-causa-api.onrender.com";

let todasLasMascotas = [];
let filtroActual = "todos";

const textosEstado = {
    rescate: "En rescate",
    disponible: "Disponible",
    adoptado: "Adoptado"
};

function dibujarMascotas() {
    listaCasos.innerHTML = "";

    const visibles = todasLasMascotas.filter(function (mascota) {
        return filtroActual === "todos" || mascota.estado === filtroActual;
    });

    visibles.forEach(function (mascota) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "caso";
        tarjeta.dataset.estado = mascota.estado;

        const divFoto = document.createElement("div");
        divFoto.className = "foto";

        const imagen = document.createElement("img");
        imagen.src = mascota.foto;
        imagen.alt = mascota.nombre;

        const etiqueta = document.createElement("span");
        etiqueta.className = "etiqueta " + mascota.estado;
        etiqueta.textContent = textosEstado[mascota.estado] || mascota.estado;

        divFoto.append(imagen, etiqueta);

        const titulo = document.createElement("h3");
        titulo.textContent = mascota.nombre;

        const tipo = document.createElement("p");
        tipo.textContent = mascota.tipo;

        const botonHistoria = document.createElement("button");
        botonHistoria.className = "boton-oscuro boton-historia";
        botonHistoria.textContent = "Ver su historia";

        const historia = document.createElement("p");
        historia.className = "historia oculto";
        historia.textContent = mascota.historia;

        botonHistoria.addEventListener("click", function () {
            historia.classList.toggle("oculto");
            if (historia.classList.contains("oculto")) {
                botonHistoria.textContent = "Ver su historia";
            } else {
                botonHistoria.textContent = "Ocultar historia";
            }
        });

        tarjeta.append(divFoto, titulo, tipo, botonHistoria, historia);
        listaCasos.appendChild(tarjeta);
    });

    if (visibles.length === 1) {
        conteo.textContent = "1 mascota encontrada";
    } else {
        conteo.textContent = visibles.length + " mascotas encontradas";
    }
}

async function cargarMascotas() {
    listaCasos.textContent = "Cargando mascotas... (la primera vez puede tardar un momento)"
    try {
        const respuesta = await fetch(API + "/api/mascotas");
        todasLasMascotas = await respuesta.json();
        dibujarMascotas();
    } catch (error) {
        listaCasos.textContent = "No pudimos cargar las mascotas en este momento.";
    }
}

botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {
        filtroActual = boton.dataset.filtro;

        botonesFiltro.forEach(function (otroBoton) {
            otroBoton.classList.remove("activo");
        });
        boton.classList.add("activo");

        dibujarMascotas();
    });
});

cargarMascotas();

const pista = document.getElementById("carrusel-pista");
const botonAnterior = document.getElementById("btn-anterior");
const botonSiguiente = document.getElementById("btn-siguiente");

const totalSlides = document.querySelectorAll(".slide").length;
let indiceActual = 0;

function mostrarSlide() {
    const porcentaje = indiceActual * -100;
    pista.style.transform = "translateX(" + porcentaje + "%)";
}

botonSiguiente.addEventListener("click", function () {
    indiceActual = indiceActual + 1;

    if (indiceActual >= totalSlides) {
        indiceActual = 0;
    }
    mostrarSlide();
});

botonAnterior.addEventListener("click", function () {
    indiceActual = indiceActual - 1;

    if (indiceActual < 0) {
        indiceActual = totalSlides - 1;
    }

    mostrarSlide();
});


setInterval(function () {
    botonSiguiente.click();
}, 5000);

const botonesBlog = document.querySelectorAll(".boton-blog");

botonesBlog.forEach(function (boton) {
    boton.addEventListener("click", function () {
        const textoCompleto = boton.nextElementSibling;
        textoCompleto.classList.toggle("oculto");

        if (textoCompleto.classList.contains("oculto")) {
            boton.textContent = "Leer más";
        } else {
            boton.textContent = "Leer menos";
        }
    });
});

const gbVisor = document.getElementById("gb-visor");
const gbFotoGrande = document.getElementById("gb-foto-grande");
const gbCerrar = document.getElementById("gb-cerrar");
const gbFotos = document.querySelectorAll(".gb-fotos img");

gbFotos.forEach(function (foto) {
    foto.addEventListener("click", function () {
        gbFotoGrande.src = foto.src;
        gbVisor.style.display = "flex";
    });
});

gbCerrar.addEventListener("click", function () {
    gbVisor.style.display = "none";
});

gbVisor.addEventListener("click", function (evento) {
    if (evento.target === gbVisor) {
        gbVisor.style.display = "none";
    }
});

function toggleProposito() {
    // 1. Buscamos el cuadro de texto oculto y el botón por su ID
    var cajaTexto = document.getElementById("info-proposito");
    var boton = document.getElementById("btn-proposito");

    // 2. Revisamos si el texto está oculto ("none")
    if (cajaTexto.style.display === "none") {
        cajaTexto.style.display = "block"; // Lo hacemos visible
        boton.innerText = "Mostrar menos"; // Cambiamos el texto del botón
    } else {
        cajaTexto.style.display = "none";  // Lo volvemos a ocultar
        boton.innerText = "Conoce Más";    // Regresamos el botón a su texto original
    }
}

function activarFiltroDesdeMenu(valorFiltro) {
    // Busca el botón original de tu página que tenga ese data-filtro
    var botonOriginal = document.querySelector('.filtro[data-filtro="' + valorFiltro + '"]');

    // Si lo encuentra, simula un clic en él para usar tu propio código
    if (botonOriginal) {
        botonOriginal.click();
    }
}

document.getElementById('formulario-contacto').addEventListener('submit', async (e) => {
    e.preventDefault();

    const datosFormulario = {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value
    };


    const mensajeExito = document.getElementById('exito');

    try {
        const respuesta = await fetch('https://bella-causa-api.onrender.com/api/contacto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosFormulario)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            mensajeExito.textContent = "¡Gracias! Tus datos han sido guardados con éxito en la base de datos.";
            mensajeExito.classList.remove('oculto');

            document.getElementById('formulario-contacto').reset();
        } else {
            alert('Hubo un problema en el servidor: ' + resultado.mensaje);
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert('No se pudo conectar con el servidor. Asegúrate de que tu terminal azul tenga corriendo el comando node server.js');
    }
});

function enviarFormulario(evento) {
    evento.preventDefault();

    var alertaExito = document.getElementById("mensaje-exito");
    alertaExito.style.display = "block";

    document.getElementById("form-comunidad").reset();

    setTimeout(function () {
        alertaExito.style.display = "none";
    }, 6000);
}

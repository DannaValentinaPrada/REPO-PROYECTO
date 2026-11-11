
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

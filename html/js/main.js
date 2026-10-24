
const botonMenu = document.getElementById("boton-menu");
const menu = document.getElementById("menu");

botonMenu.addEventListener("click", function () {
    menu.classList.toggle("abierto");
});

const botonesFiltro = document.querySelectorAll(".filtro");
const casos = document.querySelectorAll(".caso");

botonesFiltro.forEach(function (boton) {

    boton.addEventListener("click", function () {
        const filtroSeleccionado = boton.dataset.filtro;
        mostrarCasos(filtroSeleccionado);

        botonesFiltro.forEach(function (boton) {
            boton.classList.remove("activo");


        });

        boton.classList.add("activo");

        casos.forEach(function (caso) {

            const estado = caso.dataset.estado;

            if (filtroSeleccionado === "todos" || estado === filtroSeleccionado
            ) {
                caso.style.display = "";
            } else {
                caso.style.display = "none";

            }

        });

    });

});

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

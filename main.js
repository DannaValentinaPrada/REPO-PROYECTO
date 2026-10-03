
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


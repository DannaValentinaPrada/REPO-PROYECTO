
const botonMenu = document.getElementById("boton-menu");
const menu = document.getElementById("menu");

botonMenu.addEventListener("click", function () {
    menu.classList.toggle("abierto");
});

const botonesFiltro = document.querySelectorAll(".filtro");


const casos = document.querySelectorAll(".caso";)
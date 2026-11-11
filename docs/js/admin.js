const API = "https://bella-causa-api.onrender.com";

const zonaLogin = document.getElementById("zona-login");
const zonaPanel = document.getElementById("zona-panel");
const formularioLogin = document.getElementById("formulario-login");
const mensajeLogin = document.getElementById("mensaje-login");
const botonSalir = document.getElementById("boton-salir");

const listaMascotas = document.getElementById("lista-mascotas");

async function cargarLista() {
    try {
        const respuesta = await fetch(API + "/api/mascotas");
        const mascotas = await respuesta.json();

        listaMascotas.innerHTML = "";

        mascotas.forEach(function (mascota) {
            const item = document.createElement("li");

            const imagen = document.createElement("img");
            imagen.src = mascota.foto;
            imagen.alt = mascota.nombre;

            const texto = document.createElement("span");
            texto.textContent = mascota.nombre + " (" + mascota.estado + ")";

            const botonEliminar = document.createElement("button");
            botonEliminar.className = "boton-oscuro";
            botonEliminar.textContent = "Eliminar";

            botonEliminar.addEventListener("click", async function () {
                const confirmado = confirm("¿Seguro que quieres eliminar a " + mascota.nombre + "?");
                if (!confirmado) {
                    return;
                }

                const respuestaBorrar = await fetch(API + "/api/mascotas/" + mascota._id, {
                    method: "DELETE",
                    headers: { "clave": sessionStorage.getItem("claveAdmin") }
                });

                if (respuestaBorrar.ok) {
                    cargarLista();
                } else {
                    alert("No se pudo eliminar. Revisa tu sesión e intenta de nuevo.");
                }
            });

            item.append(imagen, texto, botonEliminar);
            listaMascotas.appendChild(item);
        });
    } catch (error) {
        listaMascotas.textContent = "No se pudo cargar la lista.";
    }
}

function mostrarPanel() {
    zonaLogin.classList.add("oculto");
    zonaPanel.classList.remove("oculto");
}

function mostrarLogin() {
    zonaPanel.classList.add("oculto");
    zonaLogin.classList.remove("oculto");
    cargarLista();
}

formularioLogin.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const clave = document.getElementById("clave").value;
    mensajeLogin.textContent = "Comprobando...";

    try {
        const respuesta = await fetch(API + "/api/admin/login", {
            method: "POST",
            headers: { "clave": clave }
        });

        if (respuesta.ok) {
            sessionStorage.setItem("claveAdmin", clave);
            mensajeLogin.textContent = "";
            formularioLogin.reset();
            mostrarPanel();
        } else {
            mensajeLogin.textContent = "Clave incorrecta. Intenta de nuevo.";
        }
    } catch (error) {
        mensajeLogin.textContent = "No se pudo conectar con el servidor.";
    }
});

botonSalir.addEventListener("click", function () {
    sessionStorage.removeItem("claveAdmin");
    mostrarLogin();
});

if (sessionStorage.getItem("claveAdmin")) {
    mostrarPanel();
}

function comprimirImagen(archivo) {
    return new Promise(function (resolve, reject) {
        const lector = new FileReader();
        lector.onerror = reject;

        lector.onload = function () {
            const imagen = new Image();
            imagen.onerror = reject;

            imagen.onload = function () {
                const anchoMaximo = 800;
                const escala = Math.min(1, anchoMaximo / imagen.width);

                const canvas = document.createElement("canvas");
                canvas.width = imagen.width * escala;
                canvas.height = imagen.height * escala;

                canvas.getContext("2d").drawImage(imagen, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL("image/jpeg", 0.8));
            };

            imagen.src = lector.result;
        };

        lector.readAsDataURL(archivo);
    });
}

const formularioMascota = document.getElementById("formulario-mascota");
const mensajeMascota = document.getElementById("mensaje-mascota");

formularioMascota.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    mensajeMascota.textContent = "Guardando...";

    try {
        const archivo = document.getElementById("foto").files[0];
        const foto = await comprimirImagen(archivo);

        const respuesta = await fetch(API + "/api/mascotas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "clave": sessionStorage.getItem("claveAdmin")
            },
            body: JSON.stringify({
                nombre: document.getElementById("nombre").value,
                tipo: document.getElementById("tipo").value,
                estado: document.getElementById("estado").value,
                historia: document.getElementById("historia").value,
                foto: foto
            })
        });

        if (respuesta.ok) {
            formularioMascota.reset();
            mensajeMascota.textContent = "¡Mascota guardada con éxito!";
            cargarLista();
        } else {
            mensajeMascota.textContent = "No se pudo guardar. Revisa tu sesión e intenta de nuevo.";
        }
    } catch (error) {
        mensajeMascota.textContent = "Ocurrió un error. Intenta de nuevo.";
    }
});

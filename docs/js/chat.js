const URL_CHAT = "https://bella-causa-api.onrender.com/api/chat";
// Despierta el servidor de Render silenciosamente apenas carga la página
// Despierta tu propio servidor de Render usando una ruta válida
fetch("https://onrender.com").catch(() => {});


const chatBoton = document.getElementById("chat-boton");
const chatVentana = document.getElementById("chat-ventana");
const chatCerrar = document.getElementById("chat-cerrar");
const chatMensajes = document.getElementById("chat-mensajes");
const chatFormulario = document.getElementById("chat-formulario");
const chatEntrada = document.getElementById("chat-entrada");

let conversacion = [];

function agregarMensaje(texto, quien) {
    const burbuja = document.createElement("div");
    burbuja.className = "chat-burbuja " + quien;
    burbuja.textContent = texto.replace(/\*\*/g, "");
    chatMensajes.appendChild(burbuja);
    chatMensajes.scrollTop = chatMensajes.scrollHeight;
    return burbuja;
}

chatBoton.addEventListener("click", function () {
    chatVentana.classList.toggle("oculto");

    if (!chatVentana.classList.contains("oculto")) {
        chatEntrada.focus();

        if (chatMensajes.children.length === 0) {
            agregarMensaje("¡Hola! Soy el asistente de Bella Causa. Puedo ayudarte con la adopción de mascotas y con consejos de belleza. ¿Qué quieres saber?", "asistente");
        }
    }
});

chatCerrar.addEventListener("click", function () {
    chatVentana.classList.add("oculto");
});

chatFormulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const texto = chatEntrada.value.trim();
    if (texto === "") {
        return;
    }

    agregarMensaje(texto, "usuario");
    conversacion.push({ rol: "usuario", texto: texto });
    chatEntrada.value = "";

    const burbujaRespuesta = agregarMensaje("Escribiendo...", "asistente");
    const aviso = setTimeout(function () {
        burbujaRespuesta.textContent = "Sigo pensando... a veces el asistente tarda un poco en despertar.";
    }, 8000);

    try {
        const respuesta = await fetch(URL_CHAT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensajes: conversacion })
        });

        const datos = await respuesta.json();
        clearTimeout(aviso);
        const textoRespuesta = datos.respuesta || "No pude responder en este momento.";

        burbujaRespuesta.textContent = textoRespuesta.replace(/\*\*/g, "");

        if (respuesta.ok) {
            conversacion.push({ rol: "asistente", texto: textoRespuesta });
        }
    } catch (error) {
        clearTimeout(aviso);
        burbujaRespuesta.textContent = "No pude conectarme con el asistente. Intenta de nuevo más tarde.";
    }
});
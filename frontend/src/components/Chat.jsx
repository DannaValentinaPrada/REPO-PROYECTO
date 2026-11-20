import { useState, useEffect, useRef } from "react";
import { API } from "../config";

const saludo =
  "¡Hola! Soy el asistente de Bella Causa. Puedo ayudarte con la adopción de mascotas y con consejos de belleza. ¿Qué quieres saber?";

function Chat() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([
    { rol: "asistente", texto: saludo, enviar: false }
  ]);
  const [texto, setTexto] = useState("");
  const [esperando, setEsperando] = useState(false);
  const [tardando, setTardando] = useState(false);

  const listaRef = useRef(null);
  const entradaRef = useRef(null);

  // Al abrir el chat, el cursor queda listo para escribir
  useEffect(() => {
    if (abierto && entradaRef.current) {
      entradaRef.current.focus();
    }
  }, [abierto]);

  // Cada vez que hay algo nuevo, bajamos hasta el último mensaje
  useEffect(() => {
    if (listaRef.current) {
      listaRef.current.scrollTop = listaRef.current.scrollHeight;
    }
  }, [mensajes, esperando, abierto]);

  // Si la respuesta tarda más de 8 segundos, cambiamos el aviso
  useEffect(() => {
    if (!esperando) {
      return;
    }
    const temporizador = setTimeout(() => setTardando(true), 8000);
    return () => clearTimeout(temporizador);
  }, [esperando]);

  async function enviar(evento) {
    evento.preventDefault();

    const pregunta = texto.trim();
    if (pregunta === "" || esperando) {
      return;
    }

    const nuevos = [...mensajes, { rol: "usuario", texto: pregunta }];
    setMensajes(nuevos);
    setTexto("");
    setEsperando(true);

    try {
      const respuesta = await fetch(API + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensajes: nuevos.filter((m) => m.enviar !== false)
        }),
        signal: AbortSignal.timeout(60000)
      });

      const datos = await respuesta.json();
      const textoRespuesta = (datos.respuesta || "No pude responder en este momento.").replace(/\*\*/g, "");

      setMensajes([
        ...nuevos,
        { rol: "asistente", texto: textoRespuesta, enviar: respuesta.ok }
      ]);
    } catch {
      setMensajes([
        ...nuevos,
        {
          rol: "asistente",
          texto: "No pude conectarme con el asistente. Intenta de nuevo más tarde.",
          enviar: false
        }
      ]);
    } finally {
      setEsperando(false);
      setTardando(false);
    }
  }

  return (
    <>
      <button
        id="chat-boton"
        aria-label="Abrir el asistente virtual"
        onClick={() => setAbierto(!abierto)}
      >
        💬
      </button>

      {abierto && (
        <div id="chat-ventana">
          <div id="chat-encabezado">
            <span>Asistente Bella Causa</span>
            <button id="chat-cerrar" aria-label="Cerrar el chat" onClick={() => setAbierto(false)}>
              ✕
            </button>
          </div>

          <div id="chat-mensajes" ref={listaRef}>
            {mensajes.map((m, i) => (
              <div key={i} className={"chat-burbuja " + m.rol}>
                {m.texto}
              </div>
            ))}
            {esperando && (
              <div className="chat-burbuja asistente">
                {tardando
                  ? "Sigo pensando... a veces el asistente tarda un poco en despertar."
                  : "Escribiendo..."}
              </div>
            )}
          </div>

          <form id="chat-formulario" onSubmit={enviar}>
            <input
              type="text"
              id="chat-entrada"
              placeholder="Escribe tu pregunta..."
              maxLength={500}
              autoComplete="off"
              required
              value={texto}
              onChange={(evento) => setTexto(evento.target.value)}
              ref={entradaRef}
            />
            <button type="submit" disabled={esperando}>Enviar</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chat;
import { useState, useEffect } from "react";
import { API } from "../config";

const datosVacios = { nombre: "", telefono: "", email: "", mensaje: "" };

function Contacto() {
  const [datos, setDatos] = useState(datosVacios);
  const [estado, setEstado] = useState("inactivo");

  function cambiar(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value });
  }

  async function enviar(evento) {
    evento.preventDefault();
    setEstado("enviando");

    try {
      const respuesta = await fetch(API + "/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo guardar");
      }

      setDatos(datosVacios);
      setEstado("exito");
    } catch {
      setEstado("error");
    }
  }

  useEffect(() => {
    if (estado === "exito") {
      const temporizador = setTimeout(() => setEstado("inactivo"), 6000);
      return () => clearTimeout(temporizador);
    }
  }, [estado]);

  return (
    <section id="comunidad" className="comunidad">
      <h2>Únete a Nuestra Comunidad</h2>
      <p className="subtitulo-formulario">
        ¿Quieres adoptar, ser voluntario, postular una fundación o recibir nuestros consejos
        cruelty-free? Déjanos tus datos y nos pondremos en contacto contigo.
      </p>

      <div className="contacto-directo" id="contacto-directo">
        <h3>Contacto directo</h3>
        <p>También puedes escribirme sin llenar el formulario.</p>

        <ul>
          <li>
            <a href="mailto:dannavalentina0805@gmail.com">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>dannavalentina0805@gmail.com</span>
            </a>
          </li>
          <li>
            <a href="https://wa.me/573122245272" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>Escríbeme por WhatsApp</span>
            </a>
          </li>
        </ul>
      </div>

      <form id="form-comunidad" onSubmit={enviar}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre completo"
          value={datos.nombre} onChange={cambiar} required />

        <label htmlFor="telefono">Teléfono:</label>
        <input type="tel" id="telefono" name="telefono" placeholder="Ej. 300 123 4567"
          value={datos.telefono} onChange={cambiar} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="tucorreo@ejemplo.com"
          value={datos.email} onChange={cambiar} required />

        <label htmlFor="mensaje">Mensaje:</label>
        <textarea id="mensaje" name="mensaje" rows="4"
          placeholder="Cuéntanos cómo te gustaría apoyar a Bella Causa..."
          value={datos.mensaje} onChange={cambiar} required />

        <button type="submit" className="btn" disabled={estado === "enviando"}>
          {estado === "enviando" ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {estado === "exito" && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "15px",
            border: "1px solid #c3e6cb",
            textAlign: "center"
          }}
        >
          <strong>¡Gracias por unirte a Bella Causa! 🐾</strong><br />
          Hemos recibido tu mensaje correctamente. Muy pronto nuestro equipo se comunicará contigo.
        </div>
      )}

      {estado === "error" && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "15px",
            border: "1px solid #f5c6cb",
            textAlign: "center"
          }}
        >
          No pudimos enviar tu mensaje en este momento. Inténtalo de nuevo en unos minutos o
          escríbenos por correo o WhatsApp.
        </div>
      )}
    </section>
  );
}

export default Contacto;
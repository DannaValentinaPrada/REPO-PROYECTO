import { useState } from "react";
import { API } from "../config";

function LoginAdmin({ alEntrar }) {
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function entrar(evento) {
    evento.preventDefault();
    setMensaje("Comprobando...");

    try {
      const respuesta = await fetch(API + "/api/admin/login", {
        method: "POST",
        headers: { clave }
      });

      if (respuesta.ok) {
        alEntrar(clave);
      } else {
        setMensaje("Clave incorrecta. Intenta de nuevo.");
      }
    } catch {
      setMensaje("No se pudo conectar con el servidor.");
    }
  }

  return (
    <section id="zona-login">
      <h2>Iniciar sesión</h2>
      <form id="formulario-login" onSubmit={entrar}>
        <label htmlFor="clave">Clave de administrador</label>
        <input
          type="password"
          id="clave"
          value={clave}
          onChange={(evento) => setClave(evento.target.value)}
          required
        />
        <button type="submit" className="boton-oscuro">Entrar</button>
        <p id="mensaje-login">{mensaje}</p>
      </form>
    </section>
  );
}

export default LoginAdmin;
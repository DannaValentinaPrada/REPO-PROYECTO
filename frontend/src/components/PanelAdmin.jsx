import { useState, useEffect } from "react";
import { API } from "../config";

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

const formularioVacio = { nombre: "", tipo: "Canino", estado: "rescate", historia: "" };

function PanelAdmin({ clave, alSalir }) {
  const [mascotas, setMascotas] = useState([]);
  const [datos, setDatos] = useState(formularioVacio);
  const [foto, setFoto] = useState(null);
  const [mensaje, setMensaje] = useState("");

  async function cargarLista() {
    try {
      const respuesta = await fetch(API + "/api/mascotas");
      setMascotas(await respuesta.json());
    } catch (error) {
      setMensaje("No se pudo cargar la lista.");
    }
  }

  useEffect(() => {
    cargarLista();
  }, []);

  function cambiar(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value });
  }

  async function guardar(evento) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    setMensaje("Guardando...");

    try {
      const fotoComprimida = await comprimirImagen(foto);

      const respuesta = await fetch(API + "/api/mascotas", {
        method: "POST",
        headers: { "Content-Type": "application/json", clave },
        body: JSON.stringify({ ...datos, foto: fotoComprimida })
      });

      if (respuesta.status === 401) {
        alSalir();
        return;
      }

      if (respuesta.ok) {
        setDatos(formularioVacio);
        setFoto(null);
        formulario.reset();
        setMensaje("¡Mascota guardada con éxito!");
        cargarLista();
      } else {
        setMensaje("No se pudo guardar. Intenta de nuevo.");
      }
    } catch (error) {
      setMensaje("Ocurrió un error. Intenta de nuevo.");
    }
  }

  async function eliminar(mascota) {
    if (!window.confirm("¿Seguro que quieres eliminar a " + mascota.nombre + "?")) {
      return;
    }

    try {
      const respuesta = await fetch(API + "/api/mascotas/" + mascota._id, {
        method: "DELETE",
        headers: { clave }
      });

      if (respuesta.status === 401) {
        alSalir();
        return;
      }

      if (respuesta.ok) {
        cargarLista();
      } else {
        window.alert("No se pudo eliminar. Intenta de nuevo.");
      }
    } catch (error) {
      window.alert("No se pudo conectar con el servidor.");
    }
  }

  return (
    <section id="zona-panel">
      <button id="boton-salir" className="boton-oscuro" onClick={alSalir}>
        Cerrar sesión
      </button>

      <h2>Agregar una mascota</h2>
      <form id="formulario-mascota" onSubmit={guardar}>
        <label htmlFor="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" value={datos.nombre} onChange={cambiar} required />

        <label htmlFor="tipo">Tipo</label>
        <select id="tipo" name="tipo" value={datos.tipo} onChange={cambiar}>
          <option value="Canino">Canino</option>
          <option value="Felino">Felino</option>
          <option value="Otro">Otro</option>
        </select>

        <label htmlFor="estado">Estado</label>
        <select id="estado" name="estado" value={datos.estado} onChange={cambiar}>
          <option value="rescate">En rescate</option>
          <option value="disponible">Disponible</option>
          <option value="adoptado">Adoptado</option>
        </select>

        <label htmlFor="historia">Historia</label>
        <textarea id="historia" name="historia" rows="5" value={datos.historia} onChange={cambiar} required />

        <label htmlFor="foto">Foto</label>
        <input
          type="file"
          id="foto"
          accept="image/*"
          onChange={(evento) => setFoto(evento.target.files[0])}
          required
        />

        <button type="submit" className="boton-oscuro">Guardar mascota</button>
        <p id="mensaje-mascota">{mensaje}</p>
      </form>

      <h2>Mascotas publicadas</h2>
      <ul id="lista-mascotas" className="lista-admin">
        {mascotas.map((mascota) => (
          <li key={mascota._id}>
            <img src={mascota.foto} alt={mascota.nombre} />
            <span>{mascota.nombre} ({mascota.estado})</span>
            <button className="boton-oscuro" onClick={() => eliminar(mascota)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PanelAdmin;
import { useState, useEffect } from "react";
import { API } from "../config";
import TarjetaMascota from "./TarjetaMascota";

const filtros = [
  { valor: "todos", texto: "Todos" },
  { valor: "rescate", texto: "En rescate" },
  { valor: "disponible", texto: "Disponible" },
  { valor: "adoptado", texto: "Adoptado" }
];

function Mascotas({ filtro, alCambiarFiltro }) {
  const [mascotas, setMascotas] = useState([]);
  const [estado, setEstado] = useState("cargando");
  const [abierta, setAbierta] = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        const respuesta = await fetch(API + "/api/mascotas");
        if (!respuesta.ok) {
          throw new Error("Respuesta no valida");
        }
        const datos = await respuesta.json();
        setMascotas(datos);
        setEstado("listo");
      } catch (error) {
        setEstado("error");
      }
    }

    cargar();
  }, []);

  const visibles = mascotas.filter(
    (mascota) => filtro === "todos" || mascota.estado === filtro
  );

  function textoConteo() {
    if (estado !== "listo") {
      return "";
    }
    return visibles.length === 1
      ? "1 mascota encontrada"
      : visibles.length + " mascotas encontradas";
  }

  return (
    <section id="seccion-mascotas" className="rescates">
      <h3>Adopta una Mascota</h3>
      <p>Explora nuestras mascotas disponibles para adopción y encuentra a tu nuevo mejor amigo.</p>

      <div className="filtros">
        {filtros.map((f) => (
          <button
            key={f.valor}
            className={filtro === f.valor ? "filtro activo" : "filtro"}
            onClick={() => alCambiarFiltro(f.valor)}
          >
            {f.texto}
          </button>
        ))}
      </div>

      <p id="conteo">{textoConteo()}</p>
      <p className="nota-ejemplos">Los casos que ves aquí son ejemplos para mostrar cómo funciona la página.</p>

      <div className="lista-casos">
        {estado === "cargando" && "Cargando mascotas... (la primera vez puede tardar un momento)"}
        {estado === "error" && "No pudimos cargar las mascotas en este momento."}
        {estado === "listo" &&
          visibles.map((mascota) => (
            <TarjetaMascota
              key={mascota._id}
              mascota={mascota}
              abierta={abierta === mascota._id}
              alAlternar={() => setAbierta(abierta === mascota._id ? null : mascota._id)}
            />
          ))}
      </div>

      <p className="ayuda-adopcion">¿Te enamoraste de alguno? <a href="#contacto-directo">Escríbenos aquí</a>.</p>

      <a href="#fundaciones" className="boton">Ver Más Mascotas</a>
    </section>
  );
}

export default Mascotas;
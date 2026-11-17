import { useState } from "react";

function Propuesta() {
  const [abierto, setAbierto] = useState(false);

  return (
    <section id="propuesta" className="propuesta">
      <article className="articulo">
        <h2>Belleza con propósito</h2>
        <p>
          En Bella Causa creemos que la verdadera belleza nace cuando hacemos el bien. Aquí
          conectamos la pasión por la belleza con el rescate animal, inspirando a miles de personas a conocer,
          compartir y apoyar historias que merecen una segunda oportunidad. Juntos construimos una comunidad
          donde cada acción, por pequeña que parezca, puede cambiar una vida.
        </p>

        {abierto && (
          <div style={{ marginTop: "15px", marginBottom: "20px" }}>
            <p>
              <strong>¿Cómo funciona?</strong> En Bella Causa promovemos marcas y hábitos de belleza{" "}
              <em>cruelty-free</em> (libres de crueldad animal) mientras damos visibilidad gratuita a refugios
              independientes. Al aprender sobre cuidado consciente y compartir nuestras historias, nos ayudas
              a conectar a cientos de mascotas rescatadas con familias amorosas y donantes.
            </p>
          </div>
        )}

        <button
          className="boton-oscuro"
          style={{ marginTop: "10px" }}
          onClick={() => setAbierto(!abierto)}
        >
          {abierto ? "Mostrar menos" : "Conoce Más"}
        </button>
      </article>
    </section>
  );
}

export default Propuesta;
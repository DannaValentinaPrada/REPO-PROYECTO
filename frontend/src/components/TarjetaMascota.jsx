const textosEstado = {
  rescate: "En rescate",
  disponible: "Disponible",
  adoptado: "Adoptado"
};

function TarjetaMascota({ mascota, abierta, alAlternar }) {
  return (
    <article className="caso" data-estado={mascota.estado}>
      <div className="foto">
        <img src={mascota.foto} alt={mascota.nombre} />
        <span className={"etiqueta " + mascota.estado}>
          {textosEstado[mascota.estado] || mascota.estado}
        </span>
      </div>
      <h3>{mascota.nombre}</h3>
      <p>{mascota.tipo}</p>
      <button className="boton-oscuro boton-historia" onClick={alAlternar}>
        {abierta ? "Ocultar historia" : "Ver su historia"}
      </button>
      {abierta && <p className="historia">{mascota.historia}</p>}
    </article>
  );
}

export default TarjetaMascota;
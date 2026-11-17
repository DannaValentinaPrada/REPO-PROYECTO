function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-texto">
        <h1>BELLA CAUSA</h1>
        <h2 className="subtitulo">Belleza al rescate</h2>
        <h2 className="bienvenida">¡Bienvenido a Bella Causa!</h2>
        <p>
          Descubre cómo puedes ayudar a las mascotas que más lo necesitan y marcar una diferencia en sus vidas.
          Al mismo tiempo, disfruta de contenido sobre belleza y cuidado personal, aprende nuevos consejos y
          diviértete mientras apoyas una causa llena de amor y esperanza.
        </p>
        <a href="#seccion-mascotas" className="boton">Adopta Ahora</a>
      </div>
      <div className="marco-logo">
        <img src="./assets/LOGO-BELLA CAUSA.png" alt="Logo de Bella Causa" />
      </div>
    </section>
  );
}

export default Hero;
const fundaciones = [
  {
    imagen: "./assets/fundacion_1.jpg",
    alt: "Centro de Bienestar Animal La Perla",
    tipo: "Centro municipal",
    nombre: "Centro de Bienestar Animal La Perla",
    texto: `Depende de la Alcaldía de Medellín. Atiende a los perros y gatos rescatados en las calles, les da atención veterinaria y los pone en adopción cuando se recuperan.`,
    enlace: "https://www.medellin.gov.co/es/sala-de-prensa/noticias/con-protocolo-de-atencion-este-ano-se-han-rescatado-1-337-animales-de-compania-vulnerables-en-medellin/"
  },
  {
    imagen: "./assets/fundacion_2.jpg",
    alt: "Manejo Humanitario de Fauna Callejera",
    tipo: "Fundación",
    nombre: "Manejo Humanitario de Fauna Callejera",
    texto: `Nació en Medellín para mejorar la vida de los animales con y sin hogar. Hace esterilizaciones gratuitas para animales en situación de calle y promueve la tenencia responsable.`,
    enlace: "https://www.noticiascaracol.com/estilo-de-vida/asi-es-la-titanica-labor-para-reparar-a-los-animales-victimas-de-maltrato-en-colombia"
  },
  {
    imagen: "./assets/fundacion_3.jpg",
    alt: "Fundación Kronos",
    tipo: "Fundación",
    nombre: "Fundación Kronos",
    texto: `Rescata animales víctimas de maltrato y mantiene comederos públicos para animales callejeros en Medellín.`,
    enlace: "https://telemedellin.tv/?p=203043"
  },
  {
    imagen: "./assets/fundacion_4.jpg",
    alt: "Fundación Instintos",
    tipo: "Fundación",
    nombre: "Fundación Instintos",
    texto: `Trabaja con perros callejeros o de difícil adopción para acompañar a jóvenes y adultos mayores, y luego los ubica en familias.`,
    enlace: "https://www.noticiascaracol.com/colombia/perros-sin-hogar-en-medellin-ayudan-a-crear-tejido-social-gracias-a-fundacion"
  },
  {
    imagen: "./assets/fundacion_5.jpg",
    alt: "Fundación Nuestro Cielo",
    tipo: "Fundación",
    nombre: "Fundación Nuestro Cielo",
    texto: `Creada por un grupo de amigas, da hogar a más de 50 perros y gatos.`,
    enlace: "https://telemedellin.tv/?p=103908"
  },
  {
    imagen: "./assets/fundacion_6.jpg",
    alt: "Donatón por los Animales",
    tipo: "Asociación",
    nombre: "Donatón por los Animales",
    texto: `Organiza las "Adoptatón", ferias donde perros y gatos de hogares de paso, fundaciones y rescatistas buscan una nueva familia.`,
    enlace: "https://www.eltiempo.com/colombia/medellin/se-realizara-feria-para-los-animales-en-itaguei-116342"
  }
];

function Fundaciones() {
  return (
    <section id="fundaciones" className="fundaciones">
      <h2>Fundaciones que salvan vidas en Medellín</h2>
      <p className="fundaciones-intro">
        Estas organizaciones rescatan, cuidan y buscan hogar para animales en nuestra ciudad.
        Conócelas y sigue su trabajo.
      </p>

      <div className="lista-fundaciones">
        {fundaciones.map((f) => (
          <article className="fundacion" key={f.nombre}>
            <img src={f.imagen} alt={f.alt} />
            <p className="fundacion-tipo">{f.tipo}</p>
            <h3>{f.nombre}</h3>
            <p>{f.texto}</p>
            <a href={f.enlace} target="_blank" rel="noopener noreferrer">Conocer más</a>
          </article>
        ))}
      </div>

      <p className="fundaciones-nota">
        Bella Causa no está afiliada a estas organizaciones. La información proviene de medios de
        comunicación y fuentes públicas, y puede cambiar. Para adoptar o ayudar, comunícate
        directamente con cada una. Las imágenes pertenecen a sus respectivas organizaciones.
      </p>
    </section>
  );
}

export default Fundaciones;
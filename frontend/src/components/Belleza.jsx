import { useState } from "react";

const articulos = [
  {
    imagen: "./assets/Cuidado facial 1.jpg",
    alt: "Cuidado Facial",
    categoria: "Cuidado Facial",
    titulo: "Rutina facial básica en 3 pasos",
    resumen: "Descubre cómo mantener tu piel saludable y radiante con una rutina facial sencilla y efectiva.",
    parrafos: [
      "Una rutina facial no necesita ser complicada para ser efectiva. Con solo tres pasos constantes, tu piel puede lucir más sana y equilibrada.",
      "1. Limpieza: lava tu rostro dos veces al día (mañana y noche) con un limpiador suave, acorde a tu tipo de piel. Esto retira el exceso de grasa, la contaminación y los residuos de maquillaje sin resecar.",
      "2. Hidratación: aplica una crema hidratante todos los días, incluso si tienes piel grasa. La hidratación ayuda a mantener la barrera natural de la piel y previene que produzca más grasa para compensar la sequedad.",
      "3. Protección solar: usa protector solar todas las mañanas, haga sol o esté nublado. Es el paso más importante para prevenir el envejecimiento prematuro y manchas.",
      "La clave no está en usar muchos productos, sino en ser constante con estos tres pasos."
    ]
  },
  {
    imagen: "./assets/cuidado corporal 1.jpg",
    alt: "Cuidado Corporal",
    categoria: "Cuidado Corporal",
    titulo: "Hidratación corporal de cabeza a pies",
    resumen: "Descubre los secretos para mantener tu piel hidratada y suave en todas las áreas del cuerpo.",
    parrafos: [
      "La piel del cuerpo también necesita cuidado, no solo el rostro. Aquí algunos consejos simples:",
      "Elige según tu tipo de piel: si tienes piel seca, busca cremas con manteca de karité o aceites naturales. Si tienes piel grasa o mixta, opta por lociones más ligeras, en gel o de rápida absorción.",
      `El mejor momento para hidratar: justo después de ducharte, cuando la piel todavía está un poco húmeda. Esto ayuda a "sellar" la humedad y la crema se absorbe mejor.`,
      "No olvides zonas como codos, rodillas y talones, que suelen resecarse más rápido que el resto del cuerpo.",
      "La constancia importa más que el producto: aplicar una crema sencilla todos los días da mejores resultados que usar una crema cara solo de vez en cuando."
    ]
  },
  {
    imagen: "./assets/outfits 1.jpg",
    alt: "Ideas para outfits",
    categoria: "Outfits",
    titulo: "Qué ponerte según el clima",
    resumen: "Ideas de outfits cómodos y con estilo para cada clima sin perder tu esencia.",
    parrafos: [
      "Vestirse bien según el clima no significa sacrificar el estilo. Aquí algunas ideas:",
      "Días fríos: apuesta por capas. Una camiseta básica, un suéter de punto y una chaqueta encima te permiten quitarte o ponerte ropa según cambie la temperatura durante el día. Los colores tierra y neutros siempre combinan bien entre sí.",
      "Días lluviosos: prioriza materiales que no se dañen con el agua, como impermeables o chaquetas resistentes, y calzado cerrado y antideslizante. Un buen paraguas de color llamativo también le da un toque de personalidad al outfit.",
      "Días soleados: telas livianas como algodón o lino ayudan a mantenerte fresca. No olvides un sombrero o gorra, y gafas de sol que combinen con tu look.",
      "Un buen outfit empieza por sentirte cómoda; el estilo llega solo cuando estás a gusto con lo que llevas puesto."
    ]
  },
  {
    imagen: "./assets/maquillaje 1.jpg",
    alt: "Maquillaje Natural",
    categoria: "Maquillaje",
    titulo: "Maquillaje natural para el día a día",
    resumen: "Un paso a paso sencillo para lucir fresca y radiante sin pasar horas frente al espejo.",
    parrafos: [
      "No necesitas una rutina de maquillaje larga para verte bien todos los días. Con estos pasos básicos es suficiente:",
      "1. Base ligera: usa una base o BB cream de cobertura ligera, que unifique el tono sin sentirse pesada.",
      "2. Corrector: aplica solo donde lo necesites, como ojeras o alguna imperfección puntual, y difumina bien con los dedos o una esponjita.",
      "3. Rubor: un toque de rubor en las mejillas da un aspecto saludable y fresco de inmediato.",
      "4. Máscara de pestañas: un par de capas abren la mirada sin necesidad de usar sombras ni delineador.",
      "5. Labios: un bálsamo con color o un labial en tono natural termina el look de forma sencilla.",
      "Todo este proceso puede tomar menos de 10 minutos, ideal para el día a día."
    ]
  },
  {
    imagen: "./assets/cuidado capilar 1.jpg",
    alt: "Cuidado Capilar",
    categoria: "Cuidado Capilar",
    titulo: "Tips para un cabello saludable y hermoso",
    resumen: "Consejos simples para fortalecer tu cabello y mantenerlo brillante sin maltratarlo.",
    parrafos: [
      "Un cabello sano empieza con hábitos simples y constantes:",
      "No te laves el cabello todos los días: lavarlo en exceso puede resecarlo. Para la mayoría de los tipos de cabello, es suficiente lavarlo cada 2 o 3 días.",
      "Usa agua tibia, no caliente: el agua muy caliente reseca el cuero cabelludo y debilita el cabello con el tiempo.",
      "Reduce el calor: planchas y secadores a alta temperatura dañan la fibra capilar. Si los usas, aplica antes un protector térmico.",
      "Corta las puntas regularmente: un corte cada 2 o 3 meses evita que las puntas abiertas suban y dañen más cabello.",
      "Cuida también desde adentro: una buena alimentación e hidratación con agua se reflejan directamente en la salud de tu cabello."
    ]
  }
];

const galeria = [
  {
    titulo: "Cuidado facial",
    prefijo: "cuidado facial",
    alts: [
      "Limpieza facial suave con productos libres de crueldad animal",
      "Aplicación de crema hidratante natural para el rostro",
      "Uso diario de protector solar ecológico",
      "Rutina de cuidado de la piel consciente y vegana"
    ]
  },
  {
    titulo: "Cuidado corporal",
    prefijo: "cuidado corporal",
    alts: [
      "Hidratación corporal con manteca de karité natural",
      "Exfoliación suave de piel con ingredientes orgánicos",
      "Cuidado hidratante para manos y zonas resecas",
      "Aceites corporales nutritivos libres de testeo animal"
    ]
  },
  {
    titulo: "Outfits",
    prefijo: "outfits",
    alts: [
      "Estilo diario consciente combinando tonos neutros",
      "Conjunto fresco de algodón y lino para días soleados",
      "Outfit casual y elegante para eventos sociales",
      "Outfit cómodo en capas para días fríos con moda ética"
    ]
  },
  {
    titulo: "Maquillaje",
    prefijo: "maquillaje",
    alts: [
      "Maquillaje natural ligero para el día a día",
      "Aplicación de rubor en tonos cálidos cruelty-free",
      "Mirada natural realzada con máscara de pestañas vegana",
      "Bálsamo labial hidratante con color suave"
    ]
  },
  {
    titulo: "Cuidado capilar",
    prefijo: "cuidado capilar",
    alts: [
      "Cabello saludable e hidratado con productos naturales",
      "Cuidado capilar sin calor para proteger la fibra",
      "Mascarilla nutritiva para dar brillo al cabello",
      "Rutina de lavado suave para fortalecer el cabello"
    ]
  }
];

function TarjetaBlog({ articulo }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <article className="blog-card">
      <div className="blog-foto">
        <img src={articulo.imagen} alt={articulo.alt} />
      </div>
      <span className="blog-categoria">{articulo.categoria}</span>
      <h3>{articulo.titulo}</h3>
      <p>{articulo.resumen}</p>
      <button className="boton-oscuro boton-blog" onClick={() => setAbierto(!abierto)}>
        {abierto ? "Leer menos" : "Leer más"}
      </button>
      {abierto && (
        <div className="blog-completo">
          {articulo.parrafos.map((parrafo, i) => (
            <p key={i}>{parrafo}</p>
          ))}
        </div>
      )}
    </article>
  );
}

function Belleza() {
  const [fotoGrande, setFotoGrande] = useState(null);

  return (
    <section id="belleza" className="belleza">
      <h2>Belleza Consciente</h2>
      <p>Tips y consejos para cuidarte por fuera, sin dejar de cuidar tu belleza interna</p>

      <div className="blog-grid">
        {articulos.map((articulo) => (
          <TarjetaBlog key={articulo.titulo} articulo={articulo} />
        ))}
      </div>

      <div className="gb-galeria">
        <h3>Galería de Belleza</h3>

        {galeria.map((bloque) => (
          <div className="gb-bloque" key={bloque.titulo}>
            <h4>{bloque.titulo}</h4>
            <div className="gb-fotos">
              {bloque.alts.map((alt, i) => {
                const ruta = `./assets/${bloque.prefijo} ${i + 2}.jpg`;
                return (
                  <img key={ruta} src={ruta} alt={alt} onClick={() => setFotoGrande(ruta)} />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {fotoGrande && (
        <div
          id="gb-visor"
          style={{ display: "flex" }}
          onClick={(evento) => {
            if (evento.target === evento.currentTarget) {
              setFotoGrande(null);
            }
          }}
        >
          <span id="gb-cerrar" onClick={() => setFotoGrande(null)}>&times;</span>
          <img id="gb-foto-grande" src={fotoGrande} alt="Imagen ampliada" />
        </div>
      )}
    </section>
  );
}

export default Belleza;
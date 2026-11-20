import { useState, useEffect } from "react";

const slides = [
  {
    imagen: "./assets/CONEJO_BLANCO.jpg",
    alt: "Chica joven con un conejo blanco",
    frase: '"La verdadera belleza no necesita hacer sufrir a nadie"'
  },
  {
    imagen: "./assets/PERRO_RESCATADO.jpg",
    alt: "Chica y perro en una zona verde",
    frase: '"Ser conscientes de nuestros actos es la base de una belleza responsable"'
  },
  {
    imagen: "./assets/PROTESTA_PACIFICA.jpg",
    alt: "Personas en una marcha pacífica",
    frase: '"Elegir productos cruelty-free también es un acto de amor hacia los animales"'
  },
  {
    imagen: "./assets/MANOS_AYUDA.jpg",
    alt: "Gato, conejo y perro en manos humanas",
    frase: '"La belleza no es solo apariencia, sino también compasión y respeto por la vida"'
  },
  {
    imagen: "./assets/VOLUNTARIOS_RESCATANDO.jpg",
    alt: "Personas rescatando animales",
    frase: '"La verdadera belleza se encuentra escondida en las manos que ayudan a rescatar"'
  },
  {
    imagen: "./assets/ANTES_DESPUES.jpg",
    alt: "Antes y después de un perro rescatado",
    frase: '"Al rescatar un animal no solo cambias su vida, sin querer también cambias la tuya"'
  }
];

function Carrusel() {
  const [indice, setIndice] = useState(0);

  function siguiente() {
    setIndice((actual) => (actual + 1) % slides.length);
  }

  function anterior() {
    setIndice((actual) => (actual - 1 + slides.length) % slides.length);
  }

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setIndice((actual) => (actual + 1) % slides.length);
    }, 5000);

    return () => clearTimeout(temporizador);
  }, [indice]);

  return (
    <section className="carrusel">
      <div className="carrusel-contenedor">
        <div
          className="carrusel-pista"
          id="carrusel-pista"
          style={{ transform: `translateX(${indice * -100}%)` }}
        >
          {slides.map((slide) => (
            <div className="slide" key={slide.imagen}>
              <img src={slide.imagen} alt={slide.alt} />
              <p>{slide.frase}</p>
            </div>
          ))}
        </div>

        <button className="carrusel-boton izquierda" onClick={anterior}>&#10094;</button>
        <button className="carrusel-boton derecha" onClick={siguiente}>&#10095;</button>
      </div>
    </section>
  );
}

export default Carrusel;
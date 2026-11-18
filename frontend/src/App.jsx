import { useState } from "react";
import Header from "./components/Header";
import Carrusel from "./components/Carrusel";
import Hero from "./components/Hero";
import Propuesta from "./components/Propuesta";
import Mascotas from "./components/Mascotas";
import Footer from "./components/Footer";

function App() {
  const [filtro, setFiltro] = useState("todos");

  return (
    <>
      <Header alElegirFiltro={setFiltro} />
      <Carrusel />
      <main>
        <Hero />
        <Propuesta />
        <Mascotas filtro={filtro} alCambiarFiltro={setFiltro} />
      </main>
      <Footer />
    </>
  );
}

export default App;
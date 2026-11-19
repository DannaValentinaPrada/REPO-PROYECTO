import { useState } from "react";
import Header from "./components/Header";
import Carrusel from "./components/Carrusel";
import Hero from "./components/Hero";
import Propuesta from "./components/Propuesta";
import Mascotas from "./components/Mascotas";
import Fundaciones from "./components/Fundaciones";
import Belleza from "./components/Belleza";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import Chat from "./components/Chat";

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
        <Fundaciones />
        <Belleza />
        <Contacto />
      </main>
      <Footer />
      <Chat />
    </>
  );
}

export default App;
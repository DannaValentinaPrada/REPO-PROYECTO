import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Propuesta from "./components/Propuesta";
import Footer from "./components/Footer";

function App() {
  const [filtro, setFiltro] = useState("todos");

  return (
    <>
      <Header alElegirFiltro={setFiltro} />
      <main>
        <Hero />
        <Propuesta />
      </main>
      <Footer />
    </>
  );
}

export default App;
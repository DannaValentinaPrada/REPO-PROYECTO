import { useState } from "react";

function Header({ alElegirFiltro }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function elegirFiltro(filtro) {
    alElegirFiltro(filtro);
    setMenuAbierto(false);
  }

  return (
    <header className="encabezado">
      <img className="logo-pequeno" src="./assets/LOGO-BELLA CAUSA.png" alt="Logo de Bella Causa" />
      <button id="boton-menu" onClick={() => setMenuAbierto(!menuAbierto)}>Menú</button>
      <nav id="menu" className={menuAbierto ? "menu abierto" : "menu"}>
        <ul>
          <li><a href="#inicio" onClick={() => setMenuAbierto(false)}>Inicio</a></li>
          <li><a href="#seccion-mascotas" onClick={() => elegirFiltro("todos")}>Mascotas</a></li>
          <li><a href="#seccion-mascotas" onClick={() => elegirFiltro("disponible")}>Adopciones</a></li>
          <li><a href="#fundaciones" onClick={() => setMenuAbierto(false)}>Fundaciones</a></li>
          <li><a href="#seccion-mascotas" onClick={() => elegirFiltro("adoptado")}>Historias</a></li>
          <li><a href="#belleza" onClick={() => setMenuAbierto(false)}>Blog</a></li>
          <li><a href="#propuesta" onClick={() => setMenuAbierto(false)}>Sobre Nosotros</a></li>
          <li><a href="#comunidad" onClick={() => setMenuAbierto(false)}>Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
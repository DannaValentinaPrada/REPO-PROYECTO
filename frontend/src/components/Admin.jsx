import { useState } from "react";
import LoginAdmin from "./LoginAdmin";
import PanelAdmin from "./PanelAdmin";

function Admin() {
  const [clave, setClave] = useState(sessionStorage.getItem("claveAdmin"));

  function entrar(nuevaClave) {
    sessionStorage.setItem("claveAdmin", nuevaClave);
    setClave(nuevaClave);
  }

  function salir() {
    sessionStorage.removeItem("claveAdmin");
    setClave(null);
  }

  return (
    <main className="admin">
      <h1>Panel de administrador</h1>

      {clave ? (
        <PanelAdmin clave={clave} alSalir={salir} />
      ) : (
        <LoginAdmin alEntrar={entrar} />
      )}

      <a href="./">Volver a la página</a>
    </main>
  );
}

export default Admin;
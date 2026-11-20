BELLA CAUSA 🐾

Es una página web de labor social que une dos causas muy importantes: el rescate animal y la belleza consciente. Muestra mascotas en adopción, en rescate y adoptados, fundaciones de rescate de Medellín y consejos de belleza *cruelty-free*, e incluye un asistente con inteligencia artificial que responde amablemente las dudas a los usuarios y un panel para editar o añadir los casos sin necesidad de editar el código internamente. Esta pagina se convertirá en una donación a una fundación.

Proyecto final básico de Jóvenes Creativos

•	Enlaces

¿Qué? Dirección 

-Página publicada:  https://dannavalentinaprada.github.io/REPO-PROYECTO/ 
-Panel de administrador: https://dannavalentinaprada.github.io/REPO-PROYECTO/admin.html 
-Servidor (API) https://bella-causa-api.onrender.com 

Nota: El servidor está en el plan gratuito de Render y se "duerme" tras unos minutos sin visitas. La primera carga después de un rato puede tardar cerca de un minuto en mostrar las mascotas.

La clave del panel de administrador no se publica en el readme: se entrega por separado.



•	¿Qué incluye?

 (Requisito) Cómo se cumple
 Landing / inicio: Portada con carrusel, mensaje de marca, secciones y menú de navegación.
Catálogo: Mascotas leídas desde MongoDB, con filtros por estado y la historia de cada caso. Sección con fundaciones de rescate de Medellín.
Contacto real: Formulario que guarda cada mensaje en la base de datos, y contacto directo por correo y WhatsApp.
Panel de administrador: Inicio de sesión con clave. Permite agregar y eliminar mascotas sin tocar el código.
IA aplicada | Asistente virtual que responde sobre adopción, mascotas y belleza.
Publicación: Página en GitHub Pages y servidor en Render.

•	Tecnologías

Parte/ Tecnología
Página (frontend): React + Vite, con CSS propio.
Servidor (backend): Node.js + Express.
Base de datos: MongoDB Atlas, con Mongoose.
Inteligencia artificial: API de Gemini (Google), llamada solo desde el servidor.
Publicación:  GitHub Pages con GitHub Actions, y Render.
Control de versiones: Git y GitHub.




•	Cómo está armado

Visitante → Página React (GitHub Pages)
fetch
 ▼
Servidor Express (Render) ──► MongoDB Atlas (mascotas y mensajes)
                                         └─► API de Gemini (asistente)

La clave de la IA vive solo en el servidor: la página nunca la ve.

•	Estructura del repositorio

* frontend/ Página en React (Vite)
* index.html/Página principal
* admin.html/Panel de administrador (segunda página de Vite)
* public/assets/ Imágenes
* src/
* components/ Un componente por sección (Header, Carrusel, Mascotas, Chat, PanelAdmin...)
* config.js/ Dirección del servidor
* index.css/ Estilos
* server.js/Servidor: rutas, base de datos y asistente de IA
* sembrar.js/Carga las mascotas iniciales en la base de datos
actualizar-historias.js/Script de apoyo para actualizar las historias de las mascotas
* docs/ Versión anterior en HTML, CSS y JavaScript (respaldo)
* .github/workflows/Publicación automática de la página.




-Variables de entorno (servidor)

Van en un archivo `.env` (que no se sube a GitHub) y, en producción, en el panel de Render (Environment).

(Variable) Para qué sirve
-'MONGO_URI`: Cadena de conexión de MongoDB Atlas.
-`CLAVE_ADMIN`: Clave del panel de administrador.
- `GEMINI_API_KEY`: Clave de la API de Gemini.
-`MODELO_IA`: Modelo de IA principal.
-`MODELO_IA_RESPALDO`: Modelo de respaldo, por si el principal está saturado.
-`NIVEL_PENSAMIENTO`: (Opcional) Nivel de razonamiento de la IA, para respuestas más rápidas.
En el frontend, la variable opcional `VITE_API_URL` cambia la dirección del servidor.

•	Rutas del servidor

(Método y ruta) Qué hace?  ¿Pide clave? 
-`GET /api/mascotas`: Lista las mascotas  (No).
-`POST /api/mascotas`: Guarda una mascota nueva  (Sí).
-`DELETE /api/mascotas/:id`: Elimina una mascota (Sí).
-`POST /api/admin/login`: Comprueba la clave del administrador (Sí).
-`POST /api/contacto`:  Guarda un mensaje del formulario de contacto (No). 
-`POST /api/chat`:  Responde una pregunta del asistente de IA (No).

La clave viaja en la cabecera `clave` de cada petición.

Ejecutarlo en el computador

Servidor:
bash
npm install
-crea un archivo .env con las variables de la tabla anterior
npm start

Página:
bash
cd frontend
npm install
npm run dev

Para que la página use el servidor local, se crea `frontend/.env.local` con la línea `VITE_API_URL=http://localhost:3000`.

•	Publicación

- Página: cada vez que se suben cambios a la rama `main`, GitHub Actions compila `frontend/` y publica el resultado en GitHub Pages.
- Servidor: Render lo construye con el comando `npm install` y lo inicia con `npm start`. Las variables de entorno se cargan en su panel.

Seguridad y limitaciones

- Las claves están en `.env` o en el panel de Render, y no en el repositorio.
- El panel usa una clave compartida enviada en una cabecera. Es una protección sencilla: no hay cuentas por persona.
- El chat limita a 20 preguntas por visitante cada 10 minutos, y recorta cada mensaje a 500 caracteres.
- Las fotos se reducen a 800 píxeles de ancho y se guardan como texto dentro de MongoDB. Para una versión de producción conviene un servicio de imágenes.
- MongoDB Atlas acepta conexiones desde cualquier dirección; la protección es la contraseña.
- Los planes gratuitos de Render y de la IA tienen límites: el servidor se duerme y la IA puede saturarse (por eso hay un modelo de respaldo).

•	Casos de ejemplo y entrega a una fundación

Los casos de mascotas (Rocky, Milo, Canela y Terry) son ejemplos para mostrar cómo funciona la página. Para usarla con una fundación real:

- [ ] Reemplazar las mascotas de ejemplo por casos reales desde el panel de administrador.
- [ ] Quitar la nota de "casos de ejemplo" (`Mascotas.jsx`).
- [ ] Cambiar el contacto directo (correo y WhatsApp) en `Contacto.jsx`.
- [ ] Revisar la lista de fundaciones (`Fundaciones.jsx`) y los derechos de sus imágenes.

•	Créditos y aviso

La información de las fundaciones proviene de medios de comunicación y fuentes públicas, y puede cambiar. Bella Causa no está afiliada a esas organizaciones. Las imágenes de las fundaciones pertenecen a sus respectivas organizaciones.

•	Historial

La versión anterior, hecha solo con HTML, CSS y JavaScript, está guardada en la etiqueta `v1-html` y en la carpeta `docs/`.


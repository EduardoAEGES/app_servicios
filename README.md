# Hogarix · Servicios para el hogar (PWA)

App web móvil hecha con **HTML, CSS y JavaScript puros** (sin React, sin compilar).

## Cómo abrirla

- **Rápido:** doble clic en `index.html`.
- **Como PWA (instalable / sin conexión):** debe servirse por http, por ejemplo:

  ```bash
  python -m http.server 8080
  ```

  y abrir `http://localhost:8080`. Para instalarla en el teléfono hay que publicarla con **https**
  (GitHub Pages, Netlify, Vercel, etc.).

## Estructura

```
index.html                 Página principal (carga todo)
manifest.json              Datos de la PWA (nombre, colores, íconos)
sw.js                      Service worker (caché / modo sin conexión)
css/styles.css             Todos los estilos, divididos por secciones
icons/                     Íconos de la app
js/data.js                 DATOS: especialistas, categorías, reseñas, chats, perfil
js/state.js                Estado de la app (qué pestaña, qué modal está abierto…)
js/components.js           Piezas reutilizables: estrellas, tarjeta, íconos
js/screens/inicio.js       Pantalla Inicio + modal de emergencia
js/screens/busqueda.js     Pantalla Búsqueda
js/screens/chat.js         Pantalla Chat
js/screens/perfil.js       Pantalla Perfil
js/screens/especialista.js Ficha del especialista + confirmación y pago
js/app.js                  Une todo: pintado, navegación y eventos de clic
react-original/            Copia de la versión anterior en React (solo referencia)
```

## Dónde corregir cada cosa

- **Textos o datos** (nombres, precios, fotos): `js/data.js`.
- **Colores y fuentes:** variables al inicio de `css/styles.css` (`--g800`, `--lime`, etc.).
- **Diseño de una pantalla:** su archivo en `js/screens/` (HTML) y su sección en `css/styles.css`.
- **Qué hace un botón:** busca su `data-action="..."` en `js/app.js` (objeto `actions`).

Si publicas cambios y el teléfono sigue mostrando la versión vieja, sube la versión
`CACHE` en `sw.js` (por ejemplo `hogarix-v2`).
# servicios_hogar
# app_servicios

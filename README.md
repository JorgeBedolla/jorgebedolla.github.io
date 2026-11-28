<<<<<<< HEAD
# Portafolio

Proyecto base en React configurado con Vite.

## Estructura del proyecto

- `public/` — Archivos estáticos públicos
- `src/assets/` — Imágenes, iconos y recursos estáticos
- `src/components/` — Componentes reutilizables de UI
- `src/pages/` — Vistas o páginas principales (`Home`, `Projects`, `Contact`, `NotFound`)
- `src/router/` — Enrutador por hash (`RouterContext.jsx`) compatible con GitHub Pages
- `src/styles/` — Hojas de estilo globales
- `src/App.jsx` — Componente raíz y definición de rutas
- `src/main.jsx` — Punto de entrada de React

## Enrutamiento en GitHub Pages

El proyecto usa **Hash Routing** (`#/`, `#/proyectos`, `#/contacto`) mediante `RouterContext.jsx` junto con `base: './'` en `vite.config.js`:

- Al recargar o abrir una URL directa en GitHub Pages, el servidor siempre entrega `index.html` sin devolver error `404`.
- Los recursos compilados cargan correctamente tanto en subrutas (`https://usuario.github.io/Portafolio/`) como en dominios propios.
- Para agregar una nueva página, créala en `src/pages/` y regístrala en `src/App.jsx` con `<Route path="/mi-ruta" element={<MiPagina />} />`.

## Comandos disponibles

```bash
npm install
npm run dev
npm run build
```
=======
# jorgebedolla.github.io
Portafolio presentation
>>>>>>> cec4a891ba163f64b46ccc4b5aec61ac1cd32757

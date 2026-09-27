# Gym Tracker

App de seguimiento de entrenamiento (rutina, series, pesos, historial y progreso).
100% front-end: HTML + CSS + JS separados, sin backend ni base de datos. Los datos
viven en `localStorage` del navegador del dispositivo donde se usa.

## Estructura de archivos

```
index.html        → solo estructura/markup, sin CSS ni JS embebidos
css/
  styles.css       → todos los estilos (paleta Forge Master, dark + naranja)
js/
  app.js           → toda la lógica: estado, render, acciones, reporte, progreso
manifest.json      → metadatos para instalar como PWA
icon.svg           → ícono de la app
sw.js              → service worker (caché offline de los archivos de arriba)
```

Todos los archivos deben quedar en la misma carpeta raíz respetando estas
subcarpetas (`css/`, `js/`) porque `index.html` los referencia con rutas
relativas (`css/styles.css`, `js/app.js`). Si mueves algo de carpeta, hay que
actualizar esas rutas en `index.html` y en `sw.js`.

## Desplegar en Netlify

**Opción rápida (arrastrar y soltar):**
1. Entra a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra esta carpeta completa (con las subcarpetas `css/` y `js/` incluidas)
   al recuadro.
3. Netlify te da una URL pública en segundos (puedes cambiar el subdominio en
   *Site settings*).

**Opción con Git (recomendada si vas a seguir editando):**
1. Sube esta carpeta a un repositorio (GitHub/GitLab/Bitbucket), manteniendo
   la estructura de subcarpetas.
2. En Netlify: *Add new site → Import an existing project* → conecta el repo.
3. Build command: (vacío). Publish directory: `/` (raíz del repo).
4. Deploy. Cada push al repo vuelve a desplegar automáticamente.

No se necesita configurar variables de entorno, funciones ni base de datos: es
un sitio estático puro.

## Reglas del aplicativo

1. **Los datos son locales al navegador.** No hay servidor ni cuenta de
   usuario: cada navegador/dispositivo tiene su propio historial. Abrir la URL
   desde otro celular o navegador **no** trae tus datos — ahí es donde entra
   el respaldo.
2. **Un set solo cuenta si se marca "Listo".** Esa es la señal que alimenta el
   historial, la gráfica de progreso (📈) y el reporte semanal (📊). Escribir
   peso/reps sin marcar "Listo" queda como borrador, no como sesión hecha.
3. **La rutina es editable, no fija.** Se puede agregar o quitar ejercicios
   por día desde "+ Registrar nuevo ejercicio". El historial de un ejercicio
   eliminado de la rutina no se borra, solo deja de listarse activo.
4. **El respaldo (exportar/importar JSON) no es opcional, es la copia de
   seguridad real.** `localStorage` puede perderse si el usuario limpia datos
   de navegación, desinstala el navegador o cambia de equipo. La app recuerda
   exportar cada 7 días mediante un aviso discreto; se recomienda guardar el
   archivo exportado en Drive, correo u otro lugar fuera del navegador.
5. **Unidades (kg/lbs) son globales**, no por ejercicio — un cambio de unidad
   convierte la visualización de todo el historial, no reescribe los datos
   guardados (que se conservan internamente en kg).
6. **El almacenamiento está organizado en 4 claves** dentro de `localStorage`
   (`gymtracker_meta_v2`, `gymtracker_profile_v2`, `gymtracker_routine_v2`,
   `gymtracker_sessions_v2`), cada una con su propia función de guardado en
   `js/app.js`. Si necesitas depurar datos, se inspeccionan por separado desde
   las DevTools del navegador (Application → Local Storage).

## Buen uso para el usuario final

- Marca el set apenas lo completas, no al final del entrenamiento (evita
  olvidar valores).
- Revisa 📈 *Progreso* cada 1–2 semanas por ejercicio, no cada sesión — las
  variaciones día a día no son tendencia.
- Usa el reporte semanal (📊) los domingos/lunes para planear la semana
  siguiente con los comparativos (▲▼ vs. semana anterior) como guía.
- Instala la app en la pantalla de inicio ("Agregar a pantalla de inicio" en
  el navegador) para que funcione como una app normal, incluso sin conexión,
  gracias al service worker incluido.
- Exporta el JSON antes de cambiar de celular, formatear el equipo o limpiar
  caché del navegador.

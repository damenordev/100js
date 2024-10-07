---
title: 'Cómo crear una API Geo IP sencilla con JavaScript y CSS Vanilla'
description: 'Aprende a desarrollar una API Geo IP básica utilizando JavaScript y CSS nativo. Ideal para integrar geolocalización en tus proyectos web de manera simple y efectiva.'
published: true
technologies: ['HTML', 'CSS', 'JavaScript']
image: '/images/api-geo-ip/screenshot.png'
createdAt: 2024-04-27
---

¿Te gustaría crear una herramienta que localice una dirección IP y obtenga información sobre su ubicación de manera sencilla? En este tutorial, te mostraré cómo desarrollar una **API Geo IP** sencilla utilizando **JavaScript** y **CSS Vanilla**. Este proyecto es ideal para integrarlo en tus aplicaciones web y mejorar la experiencia del usuario con funcionalidades de geolocalización.

## Introducción al Proyecto

Una **API Geo IP** permite obtener información geográfica basada en una dirección IP. Esto puede incluir detalles como la ubicación del usuario, el proveedor de servicios de internet (ISP) y más. A continuación, te guiaré paso a paso para crear esta API utilizando **JavaScript** y **CSS Vanilla**, evitando el uso de frameworks adicionales para mantener la simplicidad y comprensión del proyecto.

## Paso 1: Preparar el Entorno de Desarrollo

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** y **npm**: para gestionar dependencias y compilación si decides expandir tu proyecto en el futuro.
- Un editor de código como **Visual Studio Code**.
- Conocimientos básicos de **JavaScript** y **HTML**.
- Familiaridad con **CSS** para estilizar tu proyecto.

## Paso 2: Crear la Estructura del Proyecto

Crea una carpeta para tu proyecto y navega hasta ella:

```bash
mkdir api-geo-ip
cd api-geo-ip
```

Dentro de esta carpeta, crea los siguientes archivos y carpetas:

```bash
touch index.html
mkdir styles
touch styles/styles.css
touch script.js
```

## Paso 3: Configurar la Página HTML y Estilos Básicos

### 3.1. Configurar el HTML Principal

Abre el archivo `index.html` y añade la siguiente estructura básica:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>API Geo IP - 100 JS</title>
    <link rel="stylesheet" href="styles/styles.css" />
  </head>
  <body class="container">
    <main>
      <h2>API Geo IP</h2>
      <p>Localiza la IP de un usuario y obtén información sobre su ubicación.</p>
      <form id="form">
        <label>
          IP del usuario
          <input id="input" type="text" placeholder="Introduce aquí la IP" required />
          <small>Por ejemplo: 54.85.132.205</small>
        </label>
        <button type="submit" id="submit">Buscar información de esta IP</button>
      </form>
      <div id="results" class="results hidden">
        <pre></pre>
      </div>
    </main>

    <footer>© 2024 Tu Nombre. Todos los derechos reservados.</footer>

    <script src="script.js"></script>
  </body>
</html>
```

### Explicación del Código

- **Estructura Básica**: Definimos la estructura básica de un documento HTML con las etiquetas `<html>`, `<head>`, y `<body>`.
- **Título y Metadatos**: Establecemos el título de la página y los metadatos necesarios para la responsividad.
- **Formulario**: Contiene un campo de entrada para la dirección IP y un botón de envío. Al enviar el formulario, se evita el comportamiento por defecto para manejar la solicitud de manera personalizada.
- **Elemento de Resultados**: Un `<div>` que contiene un `<pre>` para mostrar la información obtenida de la API. Inicialmente está oculto mediante la clase `hidden`.
- **Footer**: Añadimos un pie de página simple.
- **Enlace a CSS y JS**: Vinculamos el archivo de estilos `styles.css` y el script `script.js`.

### 3.2. Configurar los Estilos con CSS Vanilla

Abre el archivo `styles/styles.css` y añade los siguientes estilos:

```css
/* Reset de márgenes y padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Estilos del contenedor principal */
.container {
  min-height: 100vh;
  background-color: #1a202c; /* bg-neutral-950 */
  color: #f7fafc; /* text-neutral-50 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Arial', sans-serif;
}

/* Estilos del contenido principal */
main {
  flex: 1;
  max-width: 600px;
  margin: 0 auto;
  padding: 5rem 1rem;
  animation: fadeIn 1s ease-in-out;
}

/* Encabezado */
h2 {
  font-size: 2.5rem; /* text-4xl */
  font-weight: bold;
  margin-bottom: 1rem;
}

/* Párrafo descriptivo */
p {
  color: #a0aec0; /* text-neutral-400 */
  margin-bottom: 2rem;
}

/* Formulario */
form {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* gap-4 */
}

/* Etiqueta del formulario */
label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* gap-2 */
}

/* Campo de entrada */
input {
  background-color: #2d3748; /* bg-neutral-800 */
  color: #f7fafc; /* text-white */
  border: none;
  padding: 0.5rem;
  border-radius: 0.375rem; /* rounded-md */
}

/* Texto pequeño */
small {
  color: #a0aec0; /* text-neutral-400 */
}

/* Botón de envío */
button {
  background-color: #68d391; /* bg-emerald-400 */
  color: #1a202c; /* text-neutral-950 */
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.75rem; /* rounded-xl */
  cursor: pointer;
  transition: transform 0.2s;
}

button:active {
  transform: scale(0.99); /* active:scale-99 */
}

/* Resultados */
.results {
  margin-top: 2rem;
  background-color: #2d3748; /* bg-neutral-800 */
  padding: 1rem;
  border-radius: 0.375rem; /* rounded-md */
  color: #f7fafc;
}

.hidden {
  display: none;
}

/* Animación de fade-in */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Estilos del footer */
footer {
  background-color: #2d3748; /* bg-neutral-800 */
  color: #a0aec0; /* text-neutral-400 */
  text-align: center;
  padding: 1rem;
}
```

### Explicación del Código

- **Reset de Estilos**: Eliminamos márgenes y padding por defecto para todos los elementos y establecemos `box-sizing: border-box` para un mejor control del tamaño de los elementos.
- **Contenedor Principal**: Configuramos el contenedor principal para que ocupe toda la altura de la pantalla, con un fondo oscuro y texto claro. Utilizamos flexbox para distribuir el contenido verticalmente.

- **Contenido Principal**: Centramos el contenido con un ancho máximo y agregamos padding para espaciarlo del borde de la pantalla. Añadimos una animación de entrada suave.

- **Encabezados y Párrafos**: Definimos tamaños y colores para los encabezados y párrafos para una mejor legibilidad.
- **Formulario y Elementos**: Estilizamos el formulario y sus elementos para que sean claros y accesibles. Agregamos transiciones y efectos de transformación al botón de envío para una mejor interacción del usuario.

- **Resultados**: Diseñamos el área donde se mostrarán los resultados de la API con un fondo oscuro y texto claro, y redondeamos las esquinas.

- **Animaciones**: Incluimos una animación de fade-in para suavizar la aparición del contenido.

- **Footer**: Diseñamos un pie de página sencillo y consistente con el resto de la página.

## Paso 4: Añadir la Lógica con JavaScript

Crea un archivo llamado `script.js` en la raíz de tu proyecto y añade el siguiente código:

```javascript
const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'XXX', // Reemplaza con tu clave de RapidAPI
    'X-RapidAPI-Host': 'YYY',
  },
}

const fetchIpInfo = ip => {
  return fetch(`https://freeipapi.com/api/json/${ip}`, OPTIONS)
    .then(res => res.json())
    .catch(err => console.error(err))
}

const $ = selector => document.querySelector(selector)

const $form = $('#form')
const $input = $('#input')
const $submit = $('#submit')
const $results = $('#results')

$form.addEventListener('submit', async event => {
  event.preventDefault()
  const { value } = $input
  if (!value) return

  $submit.setAttribute('disabled', '')
  $submit.setAttribute('aria-busy', 'true')

  const ipInfo = await fetchIpInfo(value)

  if (ipInfo) {
    $results.querySelector('pre').textContent = JSON.stringify(ipInfo, null, 2)
    $results.classList.remove('hidden')
  } else {
    $results.querySelector('pre').textContent = 'No se pudo obtener la información de la IP.'
    $results.classList.remove('hidden')
  }

  $submit.removeAttribute('disabled')
  $submit.removeAttribute('aria-busy')
})
```

### Explicación del Código

- **Opciones de la Solicitud**: Definimos las opciones para la solicitud `fetch`, incluyendo el método y los encabezados necesarios. **Es crucial reemplazar `'XXX'` y `'YYY'` con tu propia clave de RapidAPI y el host correspondiente**.

- **Función `fetchIpInfo`**: Esta función realiza una solicitud a la API Geo IP utilizando la dirección IP proporcionada y retorna la respuesta en formato JSON. Maneja errores potenciales y los muestra en la consola.

- **Selección de Elementos del DOM**: Utilizamos una función simplificada `$` para seleccionar elementos del DOM mediante selectores CSS.

- **Evento de Envío del Formulario**:
  - **Prevención del Comportamiento por Defecto**: Evitamos que el formulario recargue la página al enviar.
  - **Validación de Entrada**: Verificamos que el usuario haya ingresado una dirección IP.
  - **Estado de Carga**: Deshabilitamos el botón de envío y añadimos un atributo `aria-busy` para indicar que la solicitud está en proceso.
  - **Obtención de Información**: Llamamos a `fetchIpInfo` con la IP ingresada y mostramos los resultados en el área designada.
  - **Reactivación del Botón**: Una vez finalizada la solicitud, reactivamos el botón de envío y removemos el estado de carga.

## Paso 5: Integrar Todo y Probar la Aplicación

Asegúrate de que todos los archivos estén correctamente enlazados y que los estilos se apliquen adecuadamente. Luego, abre el archivo `index.html` en tu navegador.

1. **Ingresar una IP**: Introduce una dirección IP válida en el campo de texto proporcionado.

2. **Enviar el Formulario**: Haz clic en el botón "Buscar información de esta IP".

3. **Visualizar Resultados**: La información geográfica correspondiente se mostrará en el área de resultados debajo del formulario.

## Optimización para SEO

Para optimizar tu página para motores de búsqueda, considera lo siguiente:

- **Metadatos Claros**: Asegúrate de que el título y la descripción sean precisos y contengan palabras clave relevantes como "API Geo IP", "JavaScript", y "geolocalización".

- **Contenido Semántico**: Utiliza etiquetas HTML5 adecuadas (`<main>`, `<form>`, `<label>`, `<input>`, etc.) para estructurar el contenido de manera lógica.

- **Velocidad de Carga**: Al utilizar CSS Vanilla y JavaScript puro, minimizas la carga de recursos adicionales, lo que mejora la velocidad de carga de la página.

- **Accesibilidad**: Asegúrate de que los elementos interactivos sean accesibles mediante teclados y lectores de pantalla.

## Conclusión

¡Felicidades! Has creado una **API Geo IP** sencilla utilizando **JavaScript** y **CSS Vanilla**. Este proyecto te ha permitido aprender cómo consumir una API externa, manejar eventos en el frontend y desplegar una interfaz interactiva para mostrar la información obtenida.

### Próximos Pasos

- **Validación de Entrada**: Añade validación más robusta para asegurarte de que la entrada del usuario es una dirección IP válida, utilizando expresiones regulares o APIs de validación.

- **Manejo de Errores Avanzado**: Mejora el manejo de errores para proporcionar retroalimentación más clara al usuario en diferentes escenarios de fallo, como IP inválida o problemas de conexión.

- **Mejora de Estilos**: Implementa diseños más avanzados o añade animaciones para una mejor experiencia de usuario, utilizando transiciones CSS o animaciones keyframes.

- **Integración con Mapas**: Utiliza APIs de mapas como Google Maps o Leaflet para visualizar la ubicación geográfica obtenida a partir de la IP, creando una representación visual más intuitiva.

- **Historial de Búsquedas**: Implementa una funcionalidad para guardar y mostrar un historial de las búsquedas realizadas, mejorando la utilidad de tu herramienta.

La programación es una habilidad en constante evolución. Sigue explorando y expandiendo tus proyectos para aprovechar todo su potencial. ¡El cielo es el límite!

---

Espero que este tutorial te haya sido útil y te inspire a seguir creando proyectos innovadores. ¡Disfruta programando!

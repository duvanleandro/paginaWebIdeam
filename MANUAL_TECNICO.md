# MANUAL TÉCNICO
## Portal Web IDEAM

---

### **Introducción**

Este manual técnico describe la estructura, tecnologías y funcionamiento del portal web del IDEAM. Está dirigido a desarrolladores y personal técnico que necesiten mantener o modificar el sistema.

---

## 1. REQUISITOS DEL SISTEMA

### 1.1 Tecnologías Utilizadas

- **HTML5**: Estructura de las páginas
- **CSS3**: Estilos y diseño visual
- **JavaScript**: Funcionalidad e interactividad
- **jQuery 3.7.1**: Manipulación del DOM y AJAX
- **Bootstrap 5.3.2**: Framework CSS para diseño responsive
- **Font Awesome 6.4.0**: Iconos
- **Leaflet 1.9.4**: Mapas interactivos
- **API Open-Meteo**: Pronóstico del clima en tiempo real

### 1.2 Navegadores Compatibles

- Google Chrome 90+
- Mozilla Firefox 88+
- Microsoft Edge 90+
- Safari 14+

### 1.3 Conexión a Internet

Se requiere conexión a internet para:
- Cargar librerías externas (CDN)
- Obtener datos del pronóstico del clima
- Mostrar mapas interactivos
- Cargar el contorno geográfico de Colombia

---

## 2. ESTRUCTURA DEL PROYECTO

### 2.1 Árbol de Archivos

```
paginaWebIdeam/
├── pagina principal/
│   ├── index.html           # Página principal
│   ├── region.html          # Página de región
│   ├── style.css            # Estilos principales
│   ├── region.css           # Estilos de la página de región
│   ├── script.js            # JavaScript principal
│   └── region.js            # JavaScript de la página de región
├── casos de uso/            # Documentación de casos de uso
├── MANUAL_DE_USUARIO.md     # Manual del usuario
├── MANUAL_TECNICO.md        # Manual técnico (este documento)
└── README.md                # Información general del proyecto
```

(Foto: Explorador de archivos mostrando la estructura del proyecto)

### 2.2 Descripción de Archivos Principales

**index.html**
- Página de inicio del portal
- Contiene el banner, alertas, pronóstico, guías y noticias
- Incluye modales para login y reportar incidencias

**region.html**
- Página específica por región
- Muestra contenido diferente según el rol del usuario (Brigadista o Investigador)
- Incluye mapas interactivos y formularios

**style.css**
- Estilos generales del portal
- Define colores, tipografías, espaciados
- Incluye estilos responsive para móviles

**region.css**
- Estilos específicos para la página de región
- Estilos para mapas, formularios y botones de acción

**script.js**
- Lógica principal del portal
- Manejo de eventos, navegación, autenticación
- Integración con API de clima y mapas

**region.js**
- Lógica específica para la página de región
- Carga de mapas con zonas de riesgo
- Funcionalidad para brigadistas e investigadores

---

## 3. ARQUITECTURA DEL SISTEMA

### 3.1 Modelo Cliente-Servidor

El portal funciona principalmente en el lado del cliente (navegador):

```
┌──────────────┐
│  Navegador   │
│   (Cliente)  │
└──────┬───────┘
       │
       ├─ HTML/CSS/JS (Local)
       │
       ├─ CDN (Bootstrap, jQuery, FontAwesome, Leaflet)
       │
       ├─ API Open-Meteo (Pronóstico del clima)
       │
       └─ GitHub (GeoJSON de Colombia)
```

(Foto: Diagrama de arquitectura dibujado a mano o en papel)

### 3.2 Almacenamiento de Datos

**LocalStorage**
- Se usa para guardar:
  - Lista de usuarios registrados
  - Usuario autenticado actualmente
  - Preferencias del usuario

**Estructura de datos en LocalStorage:**

```javascript
// Array de usuarios
usuarios = [
  {
    nombre: "Juan Pérez",
    correo: "juan@example.com",
    password: "12345",
    rol: "brigadista"
  },
  ...
]

// Usuario actual
usuarioActual = {
  nombre: "Juan Pérez",
  correo: "juan@example.com",
  password: "12345",
  rol: "brigadista"
}
```

---

## 4. COMPONENTES PRINCIPALES

### 4.1 Encabezado (Header)

**Ubicación**: `index.html` líneas 17-34

**Elementos**:
- Botón de menú hamburguesa (`botonMenuHamburguesa`)
- Barra de búsqueda con autocompletado
- Botón de usuario (`botonUsuario`)

**Estilos**: `style.css` líneas 13-85

(Foto: Encabezado con anotaciones señalando cada elemento)

### 4.2 Menú Lateral

**Ubicación**: `index.html` líneas 37-80

**Elementos**:
- Selector de regiones
- Lista de departamentos (generada dinámicamente)
- Enlaces rápidos
- Sección "¿Quiénes somos?"

**Estilos**: `style.css` líneas 88-190

**JavaScript**: `script.js` líneas 47-112

(Foto: Menú lateral abierto con las regiones y departamentos)

### 4.3 Sistema de Autenticación

**Ubicación**: `index.html` líneas 356-387 (modal)

**Funcionalidad**:
- Registro de usuarios
- Inicio de sesión
- Almacenamiento en LocalStorage
- Validación de credenciales

**JavaScript**: `script.js` líneas 156-244

(Foto: Diagrama de flujo del proceso de autenticación)

### 4.4 Barra de Búsqueda con Autocompletado

**JavaScript**: `script.js` líneas 246-416

**Funcionalidad**:
- Búsqueda en tiempo real
- Sugerencias de regiones y departamentos
- Navegación directa al hacer clic

**Datos**:
```javascript
datosAutocompletado = [
  {
    tipo: 'region',
    nombre: 'Amazonas / Caribe',
    valor: 'amazonica',
    departamentos: [...]
  },
  ...
]
```

(Foto: Barra de búsqueda mostrando sugerencias)

### 4.5 Mapa de Alertas (Leaflet)

**Ubicación**: `index.html` línea 124

**JavaScript**: `script.js` líneas 521-577

**Librerías**:
- Leaflet.js para el mapa
- GeoJSON de Colombia desde GitHub

**Funcionalidad**:
- Mapa interactivo de Colombia
- Marcadores de alertas con colores según nivel de riesgo
- Popups informativos

(Foto: Mapa con los marcadores de alertas)

### 4.6 Pronóstico del Clima

**Ubicación**: `index.html` líneas 148-187

**JavaScript**: `script.js` líneas 699-790

**API**: Open-Meteo (https://api.open-meteo.com/v1/forecast)

**Parámetros**:
- `latitude` y `longitude`: Coordenadas de la ciudad
- `hourly=temperature_2m,weathercode`: Variables a consultar
- `timezone=America/Bogota`: Zona horaria
- `forecast_days=2`: Días de pronóstico

**Proceso**:
1. Se obtienen las coordenadas de la ciudad seleccionada
2. Se hace una petición AJAX a la API
3. Se procesan los datos y se muestran en tarjetas
4. Se actualiza cada 10 minutos

(Foto: Sección de pronóstico con las tarjetas del clima)

### 4.7 Carrusel de Guías

**Ubicación**: `index.html` líneas 191-253

**JavaScript**: `script.js` líneas 580-614

**Funcionamiento**:
- 5 tarjetas en total
- La tarjeta central está activa
- Al hacer clic en una tarjeta lateral, se convierte en central
- Animación con CSS transforms

**Estilos**: `style.css` líneas 500-699

(Foto: Carrusel de guías con la tarjeta central destacada)

### 4.8 Modal de Reportar Incidencia

**Ubicación**: `index.html` líneas 389-421

**JavaScript**: `script.js` líneas 793-844

**Validación**:
- El usuario debe estar autenticado
- Campos obligatorios: tipo de incidencia y descripción
- Campo opcional: archivo adjunto

**Estilos**: `style.css` líneas 1010-1128

(Foto: Modal de reportar incidencia con los campos llenos)

---

## 5. PÁGINA DE REGIÓN

### 5.1 Parámetros URL

La página `region.html` recibe parámetros por URL:

```
region.html?region=andina&departamento=Santander
```

**Parámetros**:
- `region`: Código de la región (amazonica, pacifica, orinoquía, andina, insular)
- `departamento`: Nombre del departamento (opcional)

### 5.2 Vistas Según Rol

**Vista Brigadista**:
- Alertas de la región con mapa
- Notificar alerta
- Biblioteca de recursos (descarga de PDFs)
- Accesos rápidos

**Vista Investigador**:
- Consultar y registrar alertas tempranas
- Análisis de series históricas
- Descarga de datos en diferentes formatos
- Accesos rápidos

**JavaScript**: El archivo `region.js` detecta el rol del usuario y muestra/oculta secciones:

```javascript
if (usuario.rol === 'brigadista') {
  $('.seccion-brigadista').show();
} else if (usuario.rol === 'investigador') {
  $('.seccion-investigador').show();
}
```

(Foto: Vista de brigadista mostrando el mapa de alertas)

(Foto: Vista de investigador mostrando el formulario de análisis)

---

## 6. ESTILOS CSS

### 6.1 Paleta de Colores

```css
/* Verde principal */
#81c784

/* Verde oscuro */
#2e7d32

/* Verde muy oscuro */
#1b5e20

/* Rojo alerta alta */
#d32f2f

/* Naranja alerta media */
#ff9800

/* Amarillo alerta baja */
#ffeb3b

/* Fondo */
#f5f5f5

/* Bordes */
#333
```

(Foto: Paleta de colores en círculos o cuadrados)

### 6.2 Tipografía

- **Fuente principal**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Tamaños**:
  - Títulos principales (h2): 24px
  - Títulos secundarios (h3): 18px
  - Texto normal: 15px
  - Texto pequeño: 12-14px

### 6.3 Diseño Responsive

**Breakpoints**:
- **Desktop**: > 992px
- **Tablet**: 768px - 992px
- **Mobile**: < 768px

**Media Queries principales**:
```css
@media (max-width: 768px) {
  /* Estilos para tablet */
}

@media (max-width: 480px) {
  /* Estilos para móvil */
}
```

(Foto: Vista de la página en diferentes dispositivos - desktop, tablet, móvil)

---

## 7. JAVASCRIPT - EVENTOS PRINCIPALES

### 7.1 Eventos del Menú

```javascript
// Abrir menú lateral
$('#botonMenuHamburguesa').click(function() {...});

// Cerrar menú lateral
$('#botonCerrarMenu').click(cerrarMenuLateral);
$('#superposicion').click(cerrarMenuLateral);

// Cerrar con tecla ESC
$(document).keydown(function(e) {
  if (e.key === 'Escape') {...}
});
```

### 7.2 Eventos de Autenticación

```javascript
// Abrir modal de login
$('#botonUsuario').click(function() {...});

// Enviar formulario de registro
$('#formRegistro').submit(function(e) {...});

// Enviar formulario de login
$('#formLogin').submit(function(e) {...});
```

### 7.3 Eventos de Búsqueda

```javascript
// Escribir en barra de búsqueda
$inputBusqueda.on('input', function() {...});

// Presionar Enter
$inputBusqueda.keypress(function(e) {
  if (e.which === 13) {...}
});

// Click en botón de búsqueda
$('.barra-busqueda button').click(function(e) {...});
```

---

## 8. INTEGRACIÓN CON APIs EXTERNAS

### 8.1 API Open-Meteo (Clima)

**Endpoint**:
```
https://api.open-meteo.com/v1/forecast
```

**Ejemplo de petición**:
```javascript
const url = `https://api.open-meteo.com/v1/forecast?latitude=7.1193&longitude=-73.1227&hourly=temperature_2m,weathercode&timezone=America/Bogota&forecast_days=2`;

$.ajax({
  url: url,
  method: 'GET',
  success: function(data) {
    // Procesar datos
  }
});
```

**Respuesta** (simplificada):
```json
{
  "hourly": {
    "time": ["2024-10-24T00:00", "2024-10-24T01:00", ...],
    "temperature_2m": [22.5, 22.1, ...],
    "weathercode": [0, 1, 2, ...]
  }
}
```

**Códigos del clima**:
- 0: Despejado
- 1-3: Parcialmente nublado
- 45-48: Niebla
- 51-67: Lluvia
- 71-77: Nieve
- 80-82: Lluvia fuerte
- 95-99: Tormenta

(Foto: Captura de la respuesta JSON de la API)

### 8.2 GeoJSON de Colombia

**Fuente**:
```
https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson
```

**Uso**:
```javascript
fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
  .then(response => response.json())
  .then(data => {
    var colombia = data.features.find(feature =>
      feature.properties.ADMIN === 'Colombia'
    );
    L.geoJSON(colombia).addTo(mapa);
  });
```

---

## 9. MODIFICACIONES Y MANTENIMIENTO

### 9.1 Agregar una Nueva Región

1. Editar `script.js` línea 8 (objeto `datosRegiones`)
2. Agregar la nueva región y sus departamentos:
```javascript
const datosRegiones = {
  ...
  'nueva_region': [
    'Departamento 1',
    'Departamento 2'
  ]
};
```

3. Actualizar el selector en `index.html` línea 48:
```html
<option value="nueva_region">Nueva Región</option>
```

4. Actualizar también en `datosAutocompletado` (línea 250)

### 9.2 Cambiar Colores del Portal

Editar `style.css` y buscar los colores principales:
- Verde principal: buscar `#81c784`
- Verde oscuro: buscar `#2e7d32`
- Bordes: buscar `#333`

Reemplazar con los nuevos colores deseados.

### 9.3 Agregar una Nueva Ciudad al Pronóstico

1. Editar `script.js` línea 704 (objeto `coordenadas`)
2. Agregar la nueva ciudad:
```javascript
const coordenadas = {
  ...
  'nueva_ciudad': {
    lat: 4.5,
    lon: -74.0,
    nombre: 'Nueva Ciudad'
  }
};
```

3. Actualizar el selector en `index.html` línea 150:
```html
<option value="nueva_ciudad">Nueva Ciudad</option>
```

### 9.4 Personalizar Mensajes de Alerta

Buscar en `script.js` todas las funciones `alert()` y reemplazar con mensajes personalizados o modales más profesionales.

---

## 10. OPTIMIZACIÓN Y RENDIMIENTO

### 10.1 Recomendaciones

**Caché de Imágenes**:
- Las librerías CDN se cachean automáticamente
- Considerar usar Service Workers para caché offline

**Minificación**:
- Minificar CSS y JavaScript para producción
- Usar herramientas como UglifyJS o Webpack

**Lazy Loading**:
- Cargar imágenes solo cuando sean visibles
- Implementar para las tarjetas de noticias y guías

**Optimización de Peticiones**:
- El pronóstico se actualiza cada 10 minutos (puede ajustarse)
- Implementar caché local del pronóstico

### 10.2 Métricas de Rendimiento

**Tiempo de carga inicial**: ~2-3 segundos (depende de la conexión)

**Librerías externas**:
- jQuery: ~90 KB
- Bootstrap: ~150 KB
- Leaflet: ~140 KB
- Font Awesome: ~70 KB

**Total aproximado**: ~450 KB + archivos locales

---

## 11. SEGURIDAD

### 11.1 Consideraciones

**LocalStorage**:
- Las contraseñas se guardan en texto plano (NO recomendado para producción)
- Para producción, implementar hash de contraseñas (bcrypt, SHA-256)
- Usar tokens JWT para autenticación

**XSS (Cross-Site Scripting)**:
- jQuery sanitiza automáticamente la mayoría de inputs
- Validar siempre los datos del usuario

**HTTPS**:
- Para producción, usar siempre HTTPS
- Las APIs externas ya usan HTTPS

### 11.2 Mejoras Recomendadas para Producción

1. **Backend real**:
   - Implementar servidor (Node.js, PHP, Python)
   - Base de datos (MySQL, PostgreSQL, MongoDB)
   - API REST para autenticación y datos

2. **Encriptación de contraseñas**:
   - Usar bcrypt o Argon2
   - Nunca almacenar contraseñas en texto plano

3. **Tokens de sesión**:
   - Implementar JWT (JSON Web Tokens)
   - Expiración de sesiones

4. **Validación del lado del servidor**:
   - No confiar solo en validación del lado del cliente
   - Sanitizar todos los inputs

---

## 12. PRUEBAS

### 12.1 Pruebas Funcionales

**Casos de prueba**:

1. **Registro de usuario**:
   - Crear usuario nuevo → ✓ Debe guardarse en LocalStorage
   - Crear usuario con email duplicado → ✓ Debe mostrar error

2. **Inicio de sesión**:
   - Login con credenciales correctas → ✓ Debe mostrar mensaje de bienvenida
   - Login con credenciales incorrectas → ✓ Debe mostrar error

3. **Búsqueda**:
   - Escribir menos de 2 letras → ✓ No debe mostrar sugerencias
   - Escribir región válida → ✓ Debe mostrar sugerencias
   - Click en sugerencia → ✓ Debe navegar a la página correcta

4. **Pronóstico del clima**:
   - Seleccionar ciudad → ✓ Debe cargar pronóstico
   - Sin conexión → ✓ Debe mostrar error

5. **Reportar incidencia**:
   - Sin autenticación → ✓ Debe pedir login
   - Con autenticación → ✓ Debe abrir modal
   - Enviar sin completar campos → ✓ Debe mostrar error

### 12.2 Pruebas de Compatibilidad

**Navegadores**:
- ✓ Chrome
- ✓ Firefox
- ✓ Edge
- ✓ Safari

**Dispositivos**:
- ✓ Desktop (1920x1080, 1366x768)
- ✓ Tablet (768x1024)
- ✓ Móvil (375x667, 414x896)

(Foto: Tabla de pruebas con checkboxes marcados)

---

## 13. SOLUCIÓN DE PROBLEMAS TÉCNICOS

### 13.1 El mapa no se carga

**Causas posibles**:
- Falta de conexión a internet
- Error al cargar Leaflet.js
- Error en el fetch del GeoJSON

**Solución**:
1. Verificar conexión a internet
2. Abrir consola del navegador (F12) y revisar errores
3. Verificar que el CDN de Leaflet esté disponible

### 13.2 El pronóstico no se actualiza

**Causas posibles**:
- API de Open-Meteo caída
- Coordenadas incorrectas
- Error de CORS

**Solución**:
1. Verificar en consola si hay errores de red
2. Verificar que las coordenadas sean correctas
3. Probar con otra ciudad

### 13.3 LocalStorage no funciona

**Causas posibles**:
- Navegador en modo incógnito
- LocalStorage deshabilitado
- Cuota de almacenamiento excedida

**Solución**:
1. Salir del modo incógnito
2. Verificar configuración del navegador
3. Limpiar LocalStorage:
```javascript
localStorage.clear();
```

### 13.4 Estilos no se aplican

**Causas posibles**:
- Ruta incorrecta al archivo CSS
- Caché del navegador
- Conflicto con Bootstrap

**Solución**:
1. Verificar que la ruta sea correcta: `href="style.css"`
2. Limpiar caché: Ctrl + Shift + R
3. Inspeccionar elemento y verificar estilos aplicados

---

## 14. CONTACTO Y SOPORTE TÉCNICO

Para soporte técnico o reportar bugs:

**Repositorio del proyecto**: [(Ideam)](https://github.com/duvanleandro/paginaWebIdeam)

**Desarrollador**: Duvan Leandro Pedraza Gonzalez - Quinto Semestre

**Email de contacto**: contacto@ideam.gov.co

---

## ANEXOS

### Anexo A: Lista de Librerías y Versiones

| Librería | Versión | CDN |
|----------|---------|-----|
| jQuery | 3.7.1 | cdnjs.cloudflare.com |
| Bootstrap | 5.3.2 | cdnjs.cloudflare.com |
| Font Awesome | 6.4.0 | cdnjs.cloudflare.com |
| Leaflet | 1.9.4 | cdnjs.cloudflare.com |

### Anexo B: Códigos de Región

| Código | Nombre | Departamentos |
|--------|--------|---------------|
| amazonica | Amazonas / Caribe | Amazonas, Caquetá, Guainía, Guaviare, Putumayo, Vaupés |
| pacifica | Pacífica | Chocó, Valle del Cauca, Cauca, Nariño |
| orinoquía | Orinoquía | Arauca, Casanare, Meta, Vichada |
| andina | Andina | Antioquia, Boyacá, Caldas, Cundinamarca, Huila, Norte de Santander, Quindío, Risaralda, Santander, Tolima |
| insular | Insular | San Andrés y Providencia |

### Anexo C: Estructura de Directorios Recomendada (para expansión futura)

```
paginaWebIdeam/
├── assets/
│   ├── img/           # Imágenes
│   ├── fonts/         # Fuentes locales
│   └── icons/         # Iconos personalizados
├── css/
│   ├── style.css
│   └── region.css
├── js/
│   ├── script.js
│   ├── region.js
│   └── utils.js       # Funciones auxiliares
├── pages/
│   ├── index.html
│   └── region.html
├── docs/              # Documentación
│   ├── manual_usuario.md
│   └── manual_tecnico.md
└── README.md
```

(Foto: Diagrama de la estructura de directorios propuesta)

---

**Fin del Manual Técnico**

---

**Versión**: 1.0
**Fecha**: Noviembre 2025
**Autor**: Duvan Leandro Pedraza Gonzalez- Quinto Semestre


// Script JavaScript para Portal IDEAM



$(document).ready(function() {

    

    
    // ========================================
    // DATOS DE REGIONES Y DEPARTAMENTOS
    // ========================================
    const datosRegiones = {
        'amazonica': [
            'Amazonas',
            'Caquetá',
            'Guainía',
            'Guaviare',
            'Putumayo',
            'Vaupés'
        ],
        'pacifica': [
            'Chocó',
            'Valle del Cauca',
            'Cauca',
            'Nariño'
        ],
        'orinoquía': [
            'Arauca',
            'Casanare',
            'Meta',
            'Vichada'
        ],
        'andina': [
            'Antioquia',
            'Boyacá',
            'Caldas',
            'Cundinamarca',
            'Huila',
            'Norte de Santander',
            'Quindío',
            'Risaralda',
            'Santander',
            'Tolima'
        ],
        'insular': [
            'San Andrés y Providencia'
        ]
    };

    // ========================================
    // FUNCIONES PARA EL MENU LATERAL
    // ========================================
    
    // Abrir menu lateral
    $('#botonMenuHamburguesa').click(function() {
        $('#menuLateral').addClass('activo');
        $('#superposicion').addClass('activo');
        $('body').css('overflow', 'hidden'); // Evitar scroll cuando el menu esta abierto
    });

    // Cerrar menu lateral
    function cerrarMenuLateral() {
        $('#menuLateral').removeClass('activo');
        $('#superposicion').removeClass('activo');
        $('body').css('overflow', 'auto'); // Restaurar scroll
    }

    $('#botonCerrarMenu').click(cerrarMenuLateral);
    $('#superposicion').click(cerrarMenuLateral);

    // Cerrar menu al presionar ESC
    $(document).keydown(function(e) {
        if (e.key === 'Escape' && $('#menuLateral').hasClass('activo')) {
            cerrarMenuLateral();
        }
    });

    // ========================================
    // SELECTOR DE REGIONES Y SUBMENU
    // ========================================
    
    $('#selectorRegion').change(function() {
        const regionSeleccionada = $(this).val();
        const $listaSubmenu = $('#listaSubmenu');
        
        // Limpiar lista anterior
        $listaSubmenu.empty();
        
        // Si hay una region seleccionada, llenar con departamentos
        if (regionSeleccionada && datosRegiones[regionSeleccionada]) {
            datosRegiones[regionSeleccionada].forEach(function(departamento) {
                $listaSubmenu.append(`<li>${departamento}</li>`);
            });
            
            // Agregar animacion de fade-in
            $listaSubmenu.hide().fadeIn(300);
        }
    });

    // ========================================
    // CLICK EN ITEMS DE SUBMENU (DEPARTAMENTOS)
    // ========================================
    
    $(document).on('click', '.lista-submenu li', function() {
        const departamento = $(this).text();
        console.log('Departamento seleccionado:', departamento);
        
        // Aqui puedes agregar la logica para redirigir a la pagina especifica
        // Por ejemplo: window.location.href = 'region.html?dept=' + departamento;
        
        alert('Región seleccionada: ' + departamento + '\n\nAquí se cargaría la información específica de esta región.');
        
        // Cerrar menu despues de seleccionar
        cerrarMenuLateral();
    });

    // Agregar después de la sección "CLICK EN ITEMS DE SUBMENU (DEPARTAMENTOS)"

$(document).on('click', '.lista-submenu li', function() {
    const departamento = $(this).text();
    const region = $('#selectorRegion').val();
    
    console.log('Departamento seleccionado:', departamento);
    console.log('Región:', region);
    
    // Redirigir a la página de región
    if (region) {
        window.location.href = 'region.html?region=' + region;
    } else {
        alert('Por favor selecciona una región primero.');
    }
    
    cerrarMenuLateral();
});

 // ========================================
// ENLACES RAPIDOS DEL MENU
// ========================================

$('.enlaces-rapidos li').click(function() {
    const texto = $(this).text().trim();
    console.log('Enlace rápido seleccionado:', texto);
    
    let seccionID = '';
    
    // Mapear texto a IDs de secciones
    if (texto.includes('Alertas tempranas')) {
        seccionID = '#alertas-tempranas';
    } else if (texto.includes('Pronóstico meteorológico')) {
        seccionID = '#pronostico-meteorologico';
    } else if (texto.includes('Guías y protocolos')) {
        seccionID = '#guias-protocolos';
    } else if (texto.includes('Noticias y eventos')) {
        seccionID = '#noticias-eventos';
    } else if (texto.includes('Misión y Visión')) {
        seccionID = '#mision-vision';
    } else if (texto.includes('Sedes y contacto')) {
        seccionID = '.pie-pagina'; // Scroll al footer
    } else if (texto.includes('Reportar incidencia')) {
        seccionID = '.pie-pagina';
    }
    
    // Si hay una sección válida, hacer scroll
    if (seccionID && $(seccionID).length) {
        // Cerrar menú primero
        cerrarMenuLateral();
        
        // Hacer scroll suave
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: $(seccionID).offset().top - 80
            }, 800);
        }, 300); // Esperar a que el menú se cierre
    } else {
        // Para enlaces que no tienen sección (Reportar incidencia, etc.)
        alert('Navegando a: ' + texto);
        cerrarMenuLateral();
    }
});

    // ========================================
    // BOTON DE USUARIO (LOGIN/REGISTRO)
    // ========================================
    
// ========================================
// MODAL LOGIN / REGISTER
// ========================================

$('#botonUsuario').click(function() {
    $('#modalLogin').addClass('activo');
    $('#superposicion').addClass('activo');
    $('body').css('overflow', 'hidden');
  });
  
  $('#cerrarModal').click(cerrarModal);
  $('#superposicion').click(cerrarModal);
  
  function cerrarModal() {
    $('#modalLogin').removeClass('activo');
    $('#superposicion').removeClass('activo');
    $('body').css('overflow', 'auto');
  }
  
  // Cambiar entre formularios
  $('#mostrarRegistro').click(function(e){
    e.preventDefault();
    $('#formLogin').removeClass('activo');
    $('#formRegistro').addClass('activo');
  });
  
  $('#mostrarLogin').click(function(e){
    e.preventDefault();
    $('#formRegistro').removeClass('activo');
    $('#formLogin').addClass('activo');
  });
  
  // Registro
  $('#formRegistro').submit(function(e){
    e.preventDefault();
    const nombre = $('#registroNombre').val();
    const correo = $('#registroCorreo').val();
    const password = $('#registroPassword').val();
    const rol = $('#registroRol').val();
  
    if(!nombre || !correo || !password || !rol){
      alert('Por favor completa todos los campos.');
      return;
    }
  
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if(usuarios.find(u => u.correo === correo)){
      alert('Este correo ya está registrado.');
      return;
    }
  
    usuarios.push({ nombre, correo, password, rol });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    $('#mostrarLogin').click();
  });
  
  // Login
  $('#formLogin').submit(function(e){
    e.preventDefault();
    const usuario = $('#loginUsuario').val();
    const password = $('#loginPassword').val();
  
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = usuarios.find(u => (u.correo === usuario || u.nombre === usuario) && u.password === password);
  
    if(!user){
      alert('Usuario o contraseña incorrectos.');
      return;
    }
  
  // Guardar sesión del usuario
  localStorage.setItem('usuarioActual', JSON.stringify(user));
  cerrarModal();

  // Mostrar confirmación visual dentro de la misma página
  const mensaje = document.createElement('div');
  mensaje.classList.add('mensaje-login');
  mensaje.textContent = `Bienvenido ${user.nombre} (${user.rol})`;
  document.body.appendChild(mensaje);

  setTimeout(() => {
    mensaje.classList.add('visible');
    setTimeout(() => {
      mensaje.classList.remove('visible');
      setTimeout(() => mensaje.remove(), 500);
    }, 2500);
  }, 100);

  });
  

    // ========================================
    // BARRA DE BUSQUEDA
    // ========================================
    
    // Busqueda al hacer click en el boton
    $('.barra-busqueda button').click(function(e) {
        e.preventDefault();
        realizarBusqueda();
    });

    // Busqueda al presionar Enter
    $('.barra-busqueda input').keypress(function(e) {
        if (e.which === 13) { // Enter key
            e.preventDefault();
            realizarBusqueda();
        }
    });

    function realizarBusqueda() {
        const textoBusqueda = $('.barra-busqueda input').val().trim();
        
        if (textoBusqueda) {
            console.log('Buscando:', textoBusqueda);
            alert('Buscando: "' + textoBusqueda + '"\n\nAquí se mostrarían los resultados de búsqueda.');
            // Aqui se ejecutaria la busqueda real
            // window.location.href = 'busqueda.html?q=' + encodeURIComponent(textoBusqueda);
        } else {
            alert('Por favor ingrese un término de búsqueda');
        }
    }

    // ========================================
    // ALERTAS RECIENTES
    // ========================================
    
    $('.item-alerta').click(function() {
        const titulo = $(this).find('h4').text();
        const descripcion = $(this).find('p').text();
        const nivel = $(this).find('.nivel-alerta').text();
        
        console.log('Alerta seleccionada:', titulo);
        
        alert('Detalles de la Alerta\n\n' +
              'Región: ' + titulo + '\n' +
              'Descripción: ' + descripcion + '\n' +
              'Nivel: ' + nivel + '\n\n' +
              'Aquí se mostraría información detallada de la alerta.');
        
        // Redirigir a pagina de detalles
        // window.location.href = 'alerta-detalle.html?id=' + alertaId;
    });

    // ========================================
    // SELECTOR DE UBICACION (PRONOSTICO)
    // ========================================
    
    $('.selector-ubicacion').change(function() {
        const ubicacion = $(this).val();
        const nombreUbicacion = $(this).find('option:selected').text();
        
        if (ubicacion) {
            console.log('Ubicación seleccionada:', ubicacion);
            alert('Cargando pronóstico para: ' + nombreUbicacion + '\n\nAquí se actualizaría el pronóstico.');
            
            // Aqui se podria hacer una peticion AJAX para cargar datos reales
            // cargarPronostico(ubicacion);
        }
    });
/* 
    // ========================================
    // TARJETAS DE GUIAS
    // ========================================
    
    $('.tarjeta-guia').click(function() {
        const titulo = $(this).find('h3').text();
        const descripcion = $(this).find('p').text();
        
        console.log('Guía seleccionada:', titulo);
        
        alert('Abriendo guía:\n\n' + titulo + '\n\n' + descripcion + '\n\nAquí se descargaría o abriría el documento PDF.');
        
        // Redirigir a descarga o visualizador
        // window.location.href = 'descargar-guia.html?id=' + guiaId;
    });
*/
    // ========================================
    // TARJETAS DE NOTICIAS
    // ========================================
    
    $('.tarjeta-noticia').click(function() {
        const titulo = $(this).find('h3').text();
        const descripcion = $(this).find('p').text();
        
        console.log('Noticia seleccionada:', titulo);
        
        alert('Ver noticia:\n\n' + titulo + '\n\n' + descripcion);
        
        // Redirigir a pagina de noticia completa
        // window.location.href = 'noticia.html?id=' + noticiaId;
    });

    // ========================================
    // SCROLL SUAVE PARA ANCLAS
    // ========================================
    
    $('a[href^="#"]').click(function(e) {
        const href = $(this).attr('href');
        
        if (href !== '#' && $(href).length) {
            e.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(href).offset().top - 80 // 80px de offset para el header fijo
            }, 600);
        }
    });

    // ========================================
    // ANIMACIONES AL HACER SCROLL
    // ========================================
    
    // Funcion para detectar si un elemento esta visible
    function estaVisible(elemento) {
        const elementoTop = $(elemento).offset().top;
        const elementoBottom = elementoTop + $(elemento).outerHeight();
        const ventanaTop = $(window).scrollTop();
        const ventanaBottom = ventanaTop + $(window).height();
        
        return elementoBottom >= ventanaTop && elementoTop <= ventanaBottom;
    }

    // Animar elementos al hacer scroll
    $(window).scroll(function() {
        $('.seccion-informacion, .tarjeta-guia, .tarjeta-noticia').each(function() {
            if (estaVisible(this)) {
                $(this).addClass('visible');
            }
        });
    });

    // ========================================
    // CARRUSEL HORIZONTAL (GUIAS)
    // ========================================
    
    // Agregar controles de navegacion al carrusel si es necesario
    const $contenedorCarrusel = $('.contenedor-carrusel');
    
    if ($contenedorCarrusel.length) {
        // Detectar si hay scroll horizontal
        const tieneScroll = $contenedorCarrusel[0].scrollWidth > $contenedorCarrusel[0].clientWidth;
        
        if (tieneScroll) {
            // Aqui se podrian agregar botones de navegacion
            console.log('El carrusel tiene scroll horizontal');
        }
    }

    // ========================================
    // MANEJO DE ERRORES GLOBALES
    // ========================================
    
    window.onerror = function(mensaje, fuente, linea, columna, error) {
        console.error('Error capturado:', mensaje, 'en', fuente, 'línea', linea);
        return false;
    };

    // ========================================
    // INICIALIZACION COMPLETADA
    // ========================================
    
    console.log('Portal IDEAM inicializado correctamente');
    console.log('jQuery versión:', $.fn.jquery);

    // ========================================
// MAPA DE COLOMBIA CON CONTORNO REAL
// ========================================

// MAPA - debe estar DENTRO del ready
if (typeof L !== 'undefined') {
    var mapa = L.map('contenedor-mapa', {
        center: [4.5, -74],
        zoom: 6,
        minZoom: 5,
        maxZoom: 10
    });
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap, © CARTO',
        maxZoom: 19
    }).addTo(mapa);
    
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
        .then(response => response.json())
        .then(data => {
            var colombia = data.features.find(feature => feature.properties.ADMIN === 'Colombia');
            
            if (colombia) {
                L.geoJSON(colombia, {
                    style: {
                        fillColor: '#a5d6a7',
                        fillOpacity: 0.5,  // ✅ CORREGIDO
                        color: '#1b5e20',
                        weight: 5
                    }
                }).addTo(mapa);
            }
        })
        .catch(error => console.error('Error cargando GeoJSON:', error));
    
    // Iconos y marcadores...
    var iconoAlto = L.divIcon({
        className: 'marcador-alerta',
        html: '<div style="background-color: #d32f2f; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
    
    var iconoMedio = L.divIcon({
        className: 'marcador-alerta',
        html: '<div style="background-color: #ff9800; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>',
        iconSize: [25, 25],
        iconAnchor: [12.5, 12.5]
    });
    
    L.marker([7.1193, -73.1227], {icon: iconoAlto}).addTo(mapa)
        .bindPopup('<div style="text-align: center;"><b>Santander - Girón</b><br><span style="color: #d32f2f; font-weight: bold;">RIESGO ALTO</span></div>');
    
    L.marker([6.2442, -75.5812], {icon: iconoMedio}).addTo(mapa)
        .bindPopup('<div style="text-align: center;"><b>Antioquia - Medellín</b><br><span style="color: #ff9800; font-weight: bold;">RIESGO MEDIO</span></div>');
    
    L.marker([4.7110, -74.0721], {icon: iconoMedio}).addTo(mapa)
        .bindPopup('<div style="text-align: center;"><b>Cundinamarca - Bogotá</b><br><span style="color: #ff9800; font-weight: bold;">RIESGO MEDIO</span></div>');
}

// CARRUSEL - también DENTRO del ready
const totalCards = $('.tarjeta-guia').length;
let indiceActivo = 0;

function actualizarPosicionesGuias() {
    $('.tarjeta-guia').each(function() {
        const cardId = parseInt($(this).attr('data-id'));
        let posicionRelativa = cardId - indiceActivo;

        if (posicionRelativa > totalCards / 2) {
            posicionRelativa -= totalCards;
        } else if (posicionRelativa < -totalCards / 2) {
            posicionRelativa += totalCards;
        }

        $(this).attr('data-posicion', posicionRelativa);
    });
}

// ========================================
// LINEA DE HORA ACTUAL EN PRONOSTICO
// ========================================

function actualizarLineaHora() {
    const $linea = $('.linea-hora-actual');
    const $items = $('.item-clima');
    
    if ($linea.length === 0 || $items.length === 0) return;
    
    const ahora = new Date();
    const horaActual = ahora.getHours() + ahora.getMinutes() / 60;
    
    // Obtener todas las horas y sus posiciones
    const horasYPosiciones = [];
    $items.each(function(index) {
        let hora = parseInt($(this).attr('data-hora'));
        if (!isNaN(hora)) {
            // Ajustar horas de la madrugada (0-5 AM) sumando 24 para ordenamiento correcto
            if (hora < 6) hora += 24;
            horasYPosiciones.push({ hora: hora, indice: index });
        }
    });
    
    if (horasYPosiciones.length === 0) return;
    
    // Ordenar por hora
    horasYPosiciones.sort((a, b) => a.hora - b.hora);
    
    // Ajustar hora actual si es necesario
    let horaActualAjustada = horaActual;
    if (horaActual < 6) horaActualAjustada += 24;
    
    const horaMinima = horasYPosiciones[0].hora;
    const horaMaxima = horasYPosiciones[horasYPosiciones.length - 1].hora;
    
    // Verificar si la hora actual está dentro del rango
// En la parte donde ocultas la línea por estar fuera de rango
if (horaActualAjustada < horaMinima || horaActualAjustada > horaMaxima) {
    $linea.hide();
    console.log('Hora fuera de rango, recargando pronóstico...');
    // Recargar pronóstico si está fuera de rango
    cargarPronosticoOpenMeteo(ubicacionActual.lat, ubicacionActual.lon, ubicacionActual.nombre);
    return;
}
    
    // Encontrar entre qué dos cards está la hora actual
    let indiceInicio = 0;
    let indiceFin = horasYPosiciones.length - 1;
    
    for (let i = 0; i < horasYPosiciones.length - 1; i++) {
        if (horaActualAjustada >= horasYPosiciones[i].hora && 
            horaActualAjustada <= horasYPosiciones[i + 1].hora) {
            indiceInicio = i;
            indiceFin = i + 1;
            break;
        }
    }
    
    // Calcular posición interpolada entre las dos cards
    const horaInicio = horasYPosiciones[indiceInicio].hora;
    const horaFin = horasYPosiciones[indiceFin].hora;
    const progreso = (horaActualAjustada - horaInicio) / (horaFin - horaInicio);
    
    // Obtener posiciones físicas de las cards
    const $contenedor = $('.pronostico-clima');
    const anchoContenedor = $contenedor.width();
    const numCards = $items.length;
    
    // Calcular posición de cada card (asumiendo distribución uniforme)
    const anchoCard = anchoContenedor / numCards;
    const posicionInicio = (horasYPosiciones[indiceInicio].indice + 0.5) * anchoCard;
    const posicionFin = (horasYPosiciones[indiceFin].indice + 0.5) * anchoCard;
    
    const posicionFinal = posicionInicio + (posicionFin - posicionInicio) * progreso;
    
    $linea.css('left', posicionFinal + 'px').fadeIn();
    
    const horaFormateada = ahora.toLocaleTimeString('es-CO', { 
        hour: '2-digit', 
        minute: '2-digit'
    });
    $('.etiqueta-hora').text(horaFormateada);
}

// Ejecutar cuando todo esté listo
$(window).on('load', function() {
    setTimeout(actualizarLineaHora, 1000);
});

// Actualizar cada minuto
setInterval(actualizarLineaHora, 60000);

// Al redimensionar ventana
$(window).resize(actualizarLineaHora);

$(document).on('click', '.tarjeta-guia', function() {
    const cardId = parseInt($(this).attr('data-id'));
    const posicionActual = parseInt($(this).attr('data-posicion'));

    if (posicionActual === 0) {
        const titulo = $(this).find('.titulo-card').text();
        alert('Descargar guía:\n' + titulo + '\n\nAquí se descargaría el documento PDF.');
    } else {
        indiceActivo = cardId;
        actualizarPosicionesGuias();
    }
});

// ========================================
// PRONOSTICO DEL CLIMA CON API OPEN-METEO
// ========================================

let ubicacionActual = { lat: 7.1193, lon: -73.1227, nombre: 'Bucaramanga' };

function cargarPronosticoOpenMeteo(lat, lon, nombre) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&timezone=America/Bogota&forecast_days=2`;
    
    $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
            console.log('Pronóstico cargado para:', nombre);
            actualizarPronosticoDOM(data);
            setTimeout(actualizarLineaHora, 500);
        },
        error: function(error) {
            console.error('Error al cargar pronóstico:', error);
            alert('No se pudo cargar el pronóstico. Intenta de nuevo.');
        }
    });
}



function actualizarPronosticoDOM(data) {
    const $contenedor = $('.pronostico-clima');
    $contenedor.empty();
    
    const ahora = new Date();
    const horaActual = ahora.getHours();
    
    // Mostrar 6 intervalos de 3 horas cada uno
    for (let i = 0; i < 6; i++) {
        const indice = horaActual + (i * 3);
        if (indice >= data.hourly.time.length) break;
        
        const temperatura = Math.round(data.hourly.temperature_2m[indice]);
        const codigo = data.hourly.weathercode[indice];
        const fechaHora = new Date(data.hourly.time[indice]);
        const hora = fechaHora.getHours();
        
        const icono = obtenerIconoPorCodigo(codigo, hora);
        const claseClima = obtenerClaseClima(codigo);
        
        const horaFormateada = fechaHora.toLocaleTimeString('es-CO', {
            hour: 'numeric',
            hour12: true
        });
        
        const html = `
            <div class="item-clima ${claseClima}" data-hora="${hora}">
                <i class="fas ${icono}"></i>
                <div class="hora-clima">${horaFormateada}</div>
                <div class="temperatura-clima">${temperatura}°C</div>
            </div>
        `;
        
        $contenedor.append(html);
    }
}

function obtenerIconoPorCodigo(codigo, hora) {
    const esNoche = hora < 6 || hora > 19;
    
    if (codigo === 0) return esNoche ? 'fa-moon' : 'fa-sun';
    if (codigo <= 3) return esNoche ? 'fa-cloud-moon' : 'fa-cloud-sun';
    if (codigo <= 48) return 'fa-cloud';
    if (codigo <= 67) return 'fa-cloud-rain';
    if (codigo <= 77) return 'fa-snowflake';
    if (codigo <= 82) return 'fa-cloud-showers-heavy';
    if (codigo >= 95) return 'fa-bolt';
    return 'fa-cloud';
}

function obtenerClaseClima(codigo) {
    if (codigo === 0) return '';
    if (codigo <= 3) return 'nublado';
    if (codigo <= 82) return 'lluvioso';
    return 'nublado';
}

// Selector de ubicación
$('.selector-ubicacion').change(function() {
    const ubicacion = $(this).val();
    
    const coordenadas = {
        'bucaramanga': { lat: 7.1193, lon: -73.1227, nombre: 'Bucaramanga' },
        'bogota': { lat: 4.7110, lon: -74.0721, nombre: 'Bogotá' },
        'medellin': { lat: 6.2442, lon: -75.5812, nombre: 'Medellín' },
        'cali': { lat: 3.4516, lon: -76.5320, nombre: 'Cali' },
        'cartagena': { lat: 10.3910, lon: -75.4794, nombre: 'Cartagena' }
    };
    
    if (coordenadas[ubicacion]) {
        ubicacionActual = coordenadas[ubicacion];
        cargarPronosticoOpenMeteo(ubicacionActual.lat, ubicacionActual.lon, ubicacionActual.nombre);
    }
});

// Cargar pronóstico inicial
cargarPronosticoOpenMeteo(ubicacionActual.lat, ubicacionActual.lon, ubicacionActual.nombre);



// Actualizar cada 10 minutos
setInterval(function() {
    cargarPronosticoOpenMeteo(ubicacionActual.lat, ubicacionActual.lon, ubicacionActual.nombre);
}, 600000);

setInterval(actualizarLineaHora, 60000);


actualizarPosicionesGuias();

// ========================================
// BOTÓN DE REPORTAR INCIDENCIA (en el footer)
// ========================================

$('#btnReportarIncidencia').click(function() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
  
    if (!usuarioActual) {
      alert('⚠️ Debes iniciar sesión antes de reportar una incidencia.');
      return;
    }
  
    // Rellenar información del usuario
    $('#incidenciaNombre').val(usuarioActual.nombre);
    $('#incidenciaCorreo').val(usuarioActual.correo);
    $('#incidenciaRol').val(usuarioActual.rol);
  
    // Mostrar el modal
    $('#modalIncidencia').addClass('activo');
    $('#superposicion').addClass('activo');
    $('body').css('overflow', 'hidden');
  });
  
  // Cerrar modal
  $('#cerrarIncidencia').click(cerrarIncidencia);
  $('#superposicion').click(cerrarIncidencia);
  
  function cerrarIncidencia() {
    $('#modalIncidencia').removeClass('activo');
    $('#superposicion').removeClass('activo');
    $('body').css('overflow', 'auto');
  }
  
  // Enviar incidencia (simulado)
  $('#formIncidencia').submit(function(e){
    e.preventDefault();
  
    const tipo = $('#incidenciaTipo').val();
    const descripcion = $('#incidenciaDescripcion').val();
  
    if (!tipo || !descripcion) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }
  
    cerrarIncidencia();
  
    alert('✅ Incidencia enviada correctamente.\n\nTipo: ' + tipo + '\nDescripción: ' + descripcion);
  });
  

}); // ✅ Cierre del document.ready

// Funciones auxiliares fuera del ready
function cargarPronostico(ubicacion) {
console.log('Cargando pronóstico para:', ubicacion);
}

function actualizarPronostico(datos) {
console.log('Actualizando pronóstico con datos:', datos);
}


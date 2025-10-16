// Script JavaScript para Portal IDEAM - CORREGIDO

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
        $('body').css('overflow', 'hidden');
    });

    // Cerrar menu lateral
    function cerrarMenuLateral() {
        $('#menuLateral').removeClass('activo');
        $('#superposicion').removeClass('activo');
        $('body').css('overflow', 'auto');
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
        
        $listaSubmenu.empty();
        
        if (regionSeleccionada && datosRegiones[regionSeleccionada]) {
            datosRegiones[regionSeleccionada].forEach(function(departamento) {
                $listaSubmenu.append(`<li>${departamento}</li>`);
            });
            
            $listaSubmenu.hide().fadeIn(300);
        }
    });

    // ========================================
    // CLICK EN ITEMS DE SUBMENU (DEPARTAMENTOS)
    // ========================================
    
    $(document).on('click', '.lista-submenu li', function() {
        const departamento = $(this).text();
        const region = $('#selectorRegion').val();
        
        console.log('Departamento seleccionado:', departamento);
        console.log('Región:', region);
        
        // Redirigir a la página de región
        if (region) {
            window.location.href = 'region.html?region=' + region + '&departamento=' + departamento;
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
            seccionID = '.pie-pagina';
        } else if (texto.includes('Reportar incidencia')) {
            seccionID = '.pie-pagina';
        }
        
        if (seccionID && $(seccionID).length) {
            cerrarMenuLateral();
            
            setTimeout(function() {
                $('html, body').animate({
                    scrollTop: $(seccionID).offset().top - 80
                }, 800);
            }, 300);
        } else {
            alert('Navegando a: ' + texto);
            cerrarMenuLateral();
        }
    });

    // ========================================
    // MODAL LOGIN / REGISTER
    // ========================================

    $('#botonUsuario').click(function() {
        $('#modalLogin').addClass('activo');
        $('#superposicion').addClass('activo');
        $('body').css('overflow', 'hidden');
    });
    
    $('#cerrarModal').click(cerrarModal);
    
    function cerrarModal() {
        $('#modalLogin').removeClass('activo');
        if (!$('#modalIncidencia').hasClass('activo')) {
            $('#superposicion').removeClass('activo');
            $('body').css('overflow', 'auto');
        }
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

        // Mostrar confirmación visual
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
// BARRA DE BUSQUEDA - FUNCIONAL CON AUTOCOMPLETADO
// ========================================

// Datos para autocompletado
const datosAutocompletado = [
    { tipo: 'region', nombre: 'Amazonas / Caribe', valor: 'amazonica', departamentos: ['Amazonas', 'Caquetá', 'Guainía', 'Guaviare', 'Putumayo', 'Vaupés'] },
    { tipo: 'region', nombre: 'Pacífica', valor: 'pacifica', departamentos: ['Chocó', 'Valle del Cauca', 'Cauca', 'Nariño'] },
    { tipo: 'region', nombre: 'Orinoquía', valor: 'orinoquía', departamentos: ['Arauca', 'Casanare', 'Meta', 'Vichada'] },
    { tipo: 'region', nombre: 'Andina', valor: 'andina', departamentos: ['Antioquia', 'Boyacá', 'Caldas', 'Cundinamarca', 'Huila', 'Norte de Santander', 'Quindío', 'Risaralda', 'Santander', 'Tolima'] },
    { tipo: 'region', nombre: 'Insular', valor: 'insular', departamentos: ['San Andrés y Providencia'] }
];

// Crear array plano con todos los departamentos
const todosDepartamentos = [];
datosAutocompletado.forEach(region => {
    region.departamentos.forEach(dept => {
        todosDepartamentos.push({
            tipo: 'departamento',
            nombre: dept,
            region: region.valor,
            regionNombre: region.nombre
        });
    });
});

// Input de búsqueda
const $inputBusqueda = $('#inputBusqueda, .barra-busqueda input[type="text"]');
const $sugerencias = $('#sugerenciasBusqueda');

// Evento al escribir
$inputBusqueda.on('input', function() {
    const texto = $(this).val().trim().toLowerCase();
    
    if (texto.length < 2) {
        $sugerencias.removeClass('activo').empty();
        return;
    }
    
    // Buscar coincidencias
    const coincidencias = [];
    
    // Buscar en regiones
    datosAutocompletado.forEach(region => {
        if (region.nombre.toLowerCase().includes(texto)) {
            coincidencias.push({
                tipo: 'region',
                nombre: region.nombre,
                valor: region.valor,
                html: `<strong>${region.nombre}</strong> <span class="tipo-sugerencia tipo-region">REGIÓN</span>`
            });
        }
    });
    
    // Buscar en departamentos
    todosDepartamentos.forEach(dept => {
        if (dept.nombre.toLowerCase().includes(texto)) {
            coincidencias.push({
                tipo: 'departamento',
                nombre: dept.nombre,
                region: dept.region,
                regionNombre: dept.regionNombre,
                html: `<strong>${dept.nombre}</strong> <span class="tipo-sugerencia tipo-departamento">DEPARTAMENTO</span><br><small>${dept.regionNombre}</small>`
            });
        }
    });
    
    // Mostrar sugerencias
    if (coincidencias.length > 0) {
        $sugerencias.empty();
        coincidencias.slice(0, 8).forEach(item => {
            const $item = $(`<div class="item-sugerencia">${item.html}</div>`);
            $item.on('click', function() {
                if (item.tipo === 'region') {
                    // Redirigir a región
                    window.location.href = `region.html?region=${item.valor}`;
                } else {
                    // Redirigir a departamento específico
                    window.location.href = `region.html?region=${item.region}&departamento=${encodeURIComponent(item.nombre)}`;
                }
            });
            $sugerencias.append($item);
        });
        $sugerencias.addClass('activo');
    } else {
        $sugerencias.removeClass('activo').empty();
    }
});

// Cerrar sugerencias al hacer clic fuera
$(document).on('click', function(e) {
    if (!$(e.target).closest('.barra-busqueda').length) {
        $sugerencias.removeClass('activo');
    }
});

// Busqueda al hacer click en el boton (mantiene funcionalidad original)
$('.barra-busqueda button').click(function(e) {
    e.preventDefault();
    realizarBusqueda();
});

// Busqueda al presionar Enter
$inputBusqueda.keypress(function(e) {
    if (e.which === 13) {
        e.preventDefault();
        // Si hay sugerencias visibles, seleccionar la primera
        if ($sugerencias.hasClass('activo')) {
            $('.item-sugerencia').first().click();
        } else {
            realizarBusqueda();
        }
    }
});

function realizarBusqueda() {
    const textoBusqueda = $inputBusqueda.val().trim().toLowerCase();
    
    if (!textoBusqueda) {
        alert('Por favor ingrese un término de búsqueda');
        return;
    }

    // Cerrar sugerencias
    $sugerencias.removeClass('activo');

    // Limpiar búsquedas anteriores
    $('.highlight-busqueda').contents().unwrap();
    
    // Buscar en todo el contenido visible
    let resultadosEncontrados = 0;
    const elementosABuscar = $('.contenedor-principal *:not(script):not(style)');
    
    elementosABuscar.each(function() {
        const elemento = $(this);
        
        elemento.contents().filter(function() {
            return this.nodeType === 3;
        }).each(function() {
            const textoOriginal = this.nodeValue;
            const textoMinuscula = textoOriginal.toLowerCase();
            
            if (textoMinuscula.includes(textoBusqueda)) {
                resultadosEncontrados++;
                
                const regex = new RegExp('(' + textoBusqueda + ')', 'gi');
                const nuevoTexto = textoOriginal.replace(regex, '<span class="highlight-busqueda">$1</span>');
                $(this).replaceWith(nuevoTexto);
            }
        });
    });
    
    if (resultadosEncontrados > 0) {
        alert(`Se encontraron ${resultadosEncontrados} resultado(s) para "${textoBusqueda}". Los resultados están resaltados en amarillo.`);
        
        const primerResultado = $('.highlight-busqueda').first();
        if (primerResultado.length) {
            $('html, body').animate({
                scrollTop: primerResultado.offset().top - 100
            }, 500);
        }
    } else {
        alert(`No se encontraron resultados para "${textoBusqueda}"`);
    }
    
    console.log('Buscando:', textoBusqueda, '- Resultados:', resultadosEncontrados);
}

// Agregar estilos para resaltado
if (!$('#estilos-busqueda').length) {
    $('<style id="estilos-busqueda">.highlight-busqueda { background-color: #ffeb3b; padding: 2px 4px; border-radius: 3px; font-weight: bold; }</style>').appendTo('head');
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
    });

    // ========================================
    // SELECTOR DE UBICACION (PRONOSTICO)
    // ========================================
    
    $('.selector-ubicacion').change(function() {
        const ubicacion = $(this).val();
        const nombreUbicacion = $(this).find('option:selected').text();
        
        if (ubicacion) {
            console.log('Ubicación seleccionada:', ubicacion);
            
            if (coordenadas[ubicacion]) {
                ubicacionActual = coordenadas[ubicacion];
                cargarPronosticoOpenMeteo(ubicacionActual.lat, ubicacionActual.lon, ubicacionActual.nombre);
            }
        }
    });

    // ========================================
    // TARJETAS DE NOTICIAS
    // ========================================
    
    $('.tarjeta-noticia').click(function() {
        const titulo = $(this).find('h3').text();
        const descripcion = $(this).find('p').text();
        
        console.log('Noticia seleccionada:', titulo);
        
        alert('Ver noticia:\n\n' + titulo + '\n\n' + descripcion);
    });

    // ========================================
    // SCROLL SUAVE PARA ANCLAS
    // ========================================
    
    $('a[href^="#"]').click(function(e) {
        const href = $(this).attr('href');
        
        if (href !== '#' && $(href).length) {
            e.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(href).offset().top - 80
            }, 600);
        }
    });

    // ========================================
    // ANIMACIONES AL HACER SCROLL
    // ========================================
    
    function estaVisible(elemento) {
        const elementoTop = $(elemento).offset().top;
        const elementoBottom = elementoTop + $(elemento).outerHeight();
        const ventanaTop = $(window).scrollTop();
        const ventanaBottom = ventanaTop + $(window).height();
        
        return elementoBottom >= ventanaTop && elementoTop <= ventanaBottom;
    }

    $(window).scroll(function() {
        $('.seccion-informacion, .tarjeta-guia, .tarjeta-noticia').each(function() {
            if (estaVisible(this)) {
                $(this).addClass('visible');
            }
        });
    });

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
                            fillOpacity: 0.5,
                            color: '#1b5e20',
                            weight: 5
                        }
                    }).addTo(mapa);
                }
            })
            .catch(error => console.error('Error cargando GeoJSON:', error));
        
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

    // ========================================
    // CARRUSEL - Cards de guías
    // ========================================
    
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

    $(document).on('click', '.tarjeta-guia', function() {
        const cardId = parseInt($(this).attr('data-id'));
        const posicionActual = parseInt($(this).attr('data-posicion'));

        if (posicionActual === 0) {
            const titulo = $(this).find('.titulo-card').text();
            alert('Información de la guía:\n' + titulo + '\n\nEsta es una vista general. Para descargar guías específicas por región, accede a la sección de región como Brigadista.');
        } else {
            indiceActivo = cardId;
            actualizarPosicionesGuias();
        }
    });

    actualizarPosicionesGuias();

    // ========================================
    // LINEA DE HORA ACTUAL EN PRONOSTICO
    // ========================================

    function actualizarLineaHora() {
        const $linea = $('.linea-hora-actual');
        const $items = $('.item-clima');
        
        if ($linea.length === 0 || $items.length === 0) return;
        
        const ahora = new Date();
        const horaActual = ahora.getHours() + ahora.getMinutes() / 60;
        
        const horasYPosiciones = [];
        $items.each(function(index) {
            let hora = parseInt($(this).attr('data-hora'));
            if (!isNaN(hora)) {
                if (hora < 6) hora += 24;
                horasYPosiciones.push({ hora: hora, indice: index });
            }
        });
        
        if (horasYPosiciones.length === 0) return;
        
        horasYPosiciones.sort((a, b) => a.hora - b.hora);
        
        let horaActualAjustada = horaActual;
        if (horaActual < 6) horaActualAjustada += 24;
        
        const horaMinima = horasYPosiciones[0].hora;
        const horaMaxima = horasYPosiciones[horasYPosiciones.length - 1].hora;
        
        if (horaActualAjustada < horaMinima || horaActualAjustada > horaMaxima) {
            $linea.hide();
            console.log('Hora fuera de rango, recargando pronóstico...');
            cargarPronosticoOpenMeteo(ubicacionActual.lat, ubicacionActual.lon, ubicacionActual.nombre);
            return;
        }
        
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
        
        const horaInicio = horasYPosiciones[indiceInicio].hora;
        const horaFin = horasYPosiciones[indiceFin].hora;
        const progreso = (horaActualAjustada - horaInicio) / (horaFin - horaInicio);
        
        const $contenedor = $('.pronostico-clima');
        const anchoContenedor = $contenedor.width();
        const numCards = $items.length;
        
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

    $(window).on('load', function() {
        setTimeout(actualizarLineaHora, 1000);
    });

    setInterval(actualizarLineaHora, 60000);

    $(window).resize(actualizarLineaHora);

    // ========================================
    // PRONOSTICO DEL CLIMA CON API OPEN-METEO
    // ========================================

    let ubicacionActual = { lat: 7.1193, lon: -73.1227, nombre: 'Bucaramanga' };

    const coordenadas = {
        'bucaramanga': { lat: 7.1193, lon: -73.1227, nombre: 'Bucaramanga' },
        'bogota': { lat: 4.7110, lon: -74.0721, nombre: 'Bogotá' },
        'medellin': { lat: 6.2442, lon: -75.5812, nombre: 'Medellín' },
        'cali': { lat: 3.4516, lon: -76.5320, nombre: 'Cali' },
        'cartagena': { lat: 10.3910, lon: -75.4794, nombre: 'Cartagena' }
    };

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

    cargarPronosticoOpenMeteo(ubicacionActual.lat, ubicacionActual.lon, ubicacionActual.nombre);

    setInterval(function() {
        cargarPronosticoOpenMeteo(ubicacionActual.lat, ubicacionActual.lon, ubicacionActual.nombre);
    }, 600000);

    // ========================================
    // BOTON DE REPORTAR INCIDENCIA (en el footer)
    // AHORA REQUIERE AUTENTICACION
    // ========================================

    $('#btnReportarIncidencia').click(function() {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    
        if (!usuarioActual) {
            alert('⚠️ Debes iniciar sesión antes de reportar una incidencia.');
            // Abrir modal de login
            $('#botonUsuario').click();
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
    
    function cerrarIncidencia() {
        $('#modalIncidencia').removeClass('activo');
        if (!$('#modalLogin').hasClass('activo')) {
            $('#superposicion').removeClass('activo');
            $('body').css('overflow', 'auto');
        }
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

}); // Cierre del document.ready
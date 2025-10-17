// Script para la página de región - CORREGIDO

$(document).ready(function() {

    // ========================================
    // DATOS COMPLETOS POR REGIÓN Y DEPARTAMENTO
    // ========================================
    const datosCompletos = {
        'amazonica': {
            nombre: 'Región Amazónica',
            descripcion: 'La región amazónica colombiana comprende el 42% del territorio nacional y se caracteriza por su extensa cobertura de bosque tropical húmedo, alta biodiversidad y sistemas hidrológicos complejos.',
            coordenadas: {lat: -1.5, lon: -71.5},
            zoom: 6,
            departamentos: {
                'Amazonas': {
                    descripcion: 'El departamento del Amazonas es el más extenso de Colombia. Su capital es Leticia, ubicada en el extremo sur del país. Presenta clima ecuatorial húmedo con temperaturas promedio de 27°C y alta pluviosidad durante todo el año.',
                    alerta: 'Monitoreo de niveles de río. Temporada de lluvias constante.',
                    coordenadas: {lat: -3.4, lon: -70.0},
                    zoom: 7,
                    estaciones: ['Leticia - Aeropuerto', 'Puerto Nariño - Estación Fluvial', 'Tarapacá - Base Meteorológica'],
                    alertasActivas: [
                        {nombre: 'Leticia - Zona urbana', nivel: 'medio', coords: [-4.2, -69.9]},
                        {nombre: 'Puerto Nariño', nivel: 'bajo', coords: [-3.8, -70.4]}
                    ]
                },
                'Caquetá': {
                    descripcion: 'Caquetá se encuentra en la transición entre la región andina y amazónica. Su capital es Florencia. Presenta clima cálido húmedo con temperaturas entre 24-27°C y precipitaciones abundantes.',
                    alerta: 'Riesgo de deforestación e incendios forestales en áreas intervenidas.',
                    coordenadas: {lat: 1.6, lon: -75.6},
                    zoom: 7,
                    estaciones: ['Florencia - Centro Urbano', 'San Vicente del Caguán - Rural', 'Cartagena del Chairá - Estación Base'],
                    alertasActivas: [
                        {nombre: 'Florencia - Sector Norte', nivel: 'alto', coords: [1.7, -75.6]},
                        {nombre: 'San Vicente del Caguán', nivel: 'medio', coords: [2.1, -74.8]}
                    ]
                },
                'Guainía': {
                    descripcion: 'Guainía limita con Venezuela y Brasil. Su capital es Inírida. Presenta clima ecuatorial con temperaturas constantes alrededor de 27°C y alta humedad relativa.',
                    alerta: 'Condiciones de acceso limitado. Monitoreo satelital activo.',
                    coordenadas: {lat: 2.7, lon: -68.5},
                    zoom: 7,
                    estaciones: ['Inírida - Aeropuerto', 'Puerto Colombia - Río Inírida'],
                    alertasActivas: [
                        {nombre: 'Inírida', nivel: 'bajo', coords: [3.9, -67.9]}
                    ]
                },
                'Guaviare': {
                    descripcion: 'Guaviare está ubicado en la transición andino-amazónica. Su capital es San José del Guaviare. Temperatura promedio de 26°C con época seca de diciembre a marzo.',
                    alerta: 'Alerta por temporada seca. Riesgo moderado de incendios.',
                    coordenadas: {lat: 2.0, lon: -72.5},
                    zoom: 7,
                    estaciones: ['San José del Guaviare - Centro', 'Miraflores - Estación Rural'],
                    alertasActivas: [
                        {nombre: 'San José - Zona rural', nivel: 'alto', coords: [2.6, -72.6]},
                        {nombre: 'Miraflores', nivel: 'medio', coords: [1.3, -71.9]}
                    ]
                },
                'Putumayo': {
                    descripcion: 'Putumayo limita con Ecuador y Perú. Su capital es Mocoa. Presenta clima ecuatorial con temperaturas de 24-26°C y lluvias todo el año.',
                    alerta: 'Monitoreo de deslizamientos en zona montañosa.',
                    coordenadas: {lat: 0.8, lon: -76.0},
                    zoom: 7,
                    estaciones: ['Mocoa - Centro Urbano', 'Puerto Asís - Estación Fluvial', 'Valle del Guamuez'],
                    alertasActivas: [
                        {nombre: 'Mocoa - Centro', nivel: 'medio', coords: [1.2, -76.6]},
                        {nombre: 'Puerto Asís', nivel: 'bajo', coords: [0.5, -76.5]}
                    ]
                },
                'Vaupés': {
                    descripcion: 'Vaupés es uno de los departamentos menos poblados. Su capital es Mitú. Clima ecuatorial con 27°C promedio y alta pluviosidad durante todo el año.',
                    alerta: 'Sin alertas significativas. Monitoreo regular.',
                    coordenadas: {lat: 0.4, lon: -70.2},
                    zoom: 7,
                    estaciones: ['Mitú - Aeropuerto', 'Carurú - Base Remota'],
                    alertasActivas: [
                        {nombre: 'Mitú', nivel: 'bajo', coords: [1.3, -70.2]}
                    ]
                }
            }
        },
        'orinoquía': {
            nombre: 'Región Orinoquía',
            descripcion: 'La Orinoquía es una región de sabanas con dos estaciones marcadas: lluvias y sequía. Base económica ganadera y agrícola.',
            coordenadas: {lat: 5.5, lon: -70.5},
            zoom: 7,
            departamentos: {
                'Casanare': {
                    descripcion: 'Casanare es el departamento de los llanos orientales. Su capital es Yopal. Temperatura promedio de 26°C con marcada diferencia entre época seca y lluviosa.',
                    alerta: 'Temporada seca. Vigilancia de incendios de sabana.',
                    coordenadas: {lat: 5.3, lon: -71.5},
                    zoom: 7,
                    estaciones: ['Yopal - Aeropuerto', 'Paz de Ariporo - Sabana', 'Villanueva - Estación Rural'],
                    alertasActivas: [
                        {nombre: 'Yopal - Periferia', nivel: 'alto', coords: [5.3, -72.4]},
                        {nombre: 'Paz de Ariporo', nivel: 'alto', coords: [5.9, -71.9]},
                        {nombre: 'Villanueva', nivel: 'medio', coords: [4.6, -72.9]}
                    ]
                },
                'Meta': {
                    descripcion: 'Meta es el departamento más poblado de la Orinoquía. Su capital es Villavicencio. Clima de sabana tropical con 26-27°C promedio.',
                    alerta: 'Riesgo moderado de incendios en época seca.',
                    coordenadas: {lat: 4.0, lon: -73.0},
                    zoom: 7,
                    estaciones: ['Villavicencio - Vanguardia', 'Granada - Estación Rural', 'San Martín - Sabana'],
                    alertasActivas: [
                        {nombre: 'Villavicencio - Zona rural', nivel: 'medio', coords: [4.2, -73.6]},
                        {nombre: 'Granada', nivel: 'alto', coords: [3.5, -73.7]},
                        {nombre: 'San Martín', nivel: 'bajo', coords: [3.7, -73.7]}
                    ]
                }
            }
        },
        'andina': {
            nombre: 'Región Andina',
            descripcion: 'La región Andina concentra la mayor población colombiana. Presenta gran variedad de climas según pisos térmicos de las cordilleras.',
            coordenadas: {lat: 5, lon: -74},
            zoom: 6,
            departamentos: {
                'Santander': {
                    descripcion: 'Santander tiene topografía montañosa. Su capital es Bucaramanga. Clima variado: cálido en valles (28°C), templado en mesetas (20-24°C), frío en alturas (12-16°C).',
                    alerta: 'Condiciones de baja humedad en área metropolitana. Riesgo de incendios forestales.',
                    coordenadas: {lat: 7.1, lon: -73.1},
                    zoom: 7,
                    estaciones: ['Bucaramanga - Palonegro', 'Barrancabermeja - Puerto', 'San Gil - Río Fonce', 'Girón - Meseta'],
                    alertasActivas: [
                        {nombre: 'Bucaramanga - Zona norte', nivel: 'alto', coords: [7.2, -73.1]},
                        {nombre: 'Girón - Sector Menzuly', nivel: 'alto', coords: [7.1, -73.2]},
                        {nombre: 'Floridablanca - Cañón', nivel: 'medio', coords: [7.0, -73.0]}
                    ]
                }
            }
        }
    };

    // ========================================
    // MENU LATERAL
    // ========================================
    
    $('#botonMenuHamburguesa').click(function() {
        $('#menuLateral').addClass('activo');
        $('#superposicion').addClass('activo');
        $('body').css('overflow', 'hidden');
    });

    function cerrarMenuLateral() {
        $('#menuLateral').removeClass('activo');
        $('#superposicion').removeClass('activo');
        $('body').css('overflow', 'auto');
    }

    $('#botonCerrarMenu').click(cerrarMenuLateral);
    $('#superposicion').click(cerrarMenuLateral);

    $(document).keydown(function(e) {
        if (e.key === 'Escape' && $('#menuLateral').hasClass('activo')) {
            cerrarMenuLateral();
        }
    });

    // Selector de regiones
    $('#selectorRegion').change(function() {
        const regionSeleccionada = $(this).val();
        const $listaSubmenu = $('#listaSubmenu');
        
        $listaSubmenu.empty();
        
        if (regionSeleccionada && datosCompletos[regionSeleccionada]) {
            const departamentos = Object.keys(datosCompletos[regionSeleccionada].departamentos);
            departamentos.forEach(function(departamento) {
                $listaSubmenu.append(`<li data-departamento="${departamento}">${departamento}</li>`);
            });
            
            $listaSubmenu.hide().fadeIn(300);
        }
    });

    // Click en departamento desde el menú
    $(document).on('click', '.lista-submenu li', function() {
        const departamento = $(this).data('departamento');
        const region = $('#selectorRegion').val();
        
        if (region && departamento) {
            window.location.href = 'region.html?region=' + region + '&departamento=' + departamento;
        }
        
        cerrarMenuLateral();
    });

    // ========================================
    // CARGAR REGIÓN Y DEPARTAMENTO
    // ========================================
    
    let mapaLeaflet;
    let regionActual = '';
    let departamentoActual = '';

    function cargarContenido() {
        const params = new URLSearchParams(window.location.search);
        regionActual = params.get('region') || 'amazonica';
        departamentoActual = params.get('departamento') || null;

        const datosRegion = datosCompletos[regionActual];
        
        if (!datosRegion) return;

        if (departamentoActual && datosRegion.departamentos[departamentoActual]) {
            const datosDept = datosRegion.departamentos[departamentoActual];
            
            $('#bannerRegion').text(datosRegion.nombre + ' - ' + departamentoActual);
            $('#descripcionRegion').text(datosDept.descripcion);
            $('#mensajeAlerta').text(datosDept.alerta);

            const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
            if (usuarioActual && usuarioActual.rol === 'brigadista' && $('#seccionBrigadista').is(':visible')) {
                if (mapaLeaflet) {
                    mapaLeaflet.remove();
                }
                inicializarMapa(datosDept.coordenadas.lat, datosDept.coordenadas.lon, datosDept.zoom, datosDept.alertasActivas);
            }

            llenarDepartamentos(datosRegion, departamentoActual);
            llenarEstaciones(datosDept.estaciones);

        } else {
            $('#bannerRegion').text(datosRegion.nombre);
            $('#descripcionRegion').text(datosRegion.descripcion);
            $('#mensajeAlerta').text('Selecciona un departamento específico para ver alertas detalladas.');

            const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
            if (usuarioActual && usuarioActual.rol === 'brigadista' && $('#seccionBrigadista').is(':visible')) {
                if (mapaLeaflet) {
                    mapaLeaflet.remove();
                }
                inicializarMapa(datosRegion.coordenadas.lat, datosRegion.coordenadas.lon, datosRegion.zoom, []);
            }

            llenarDepartamentos(datosRegion, null);
        }
    }

    function llenarDepartamentos(datosRegion, deptSeleccionado) {
        const $filtroDept = $('#filtroDepartamento');
        $filtroDept.empty().append('<option value="">Seleccionar departamento</option>');
        
        Object.keys(datosRegion.departamentos).forEach(dept => {
            const selected = dept === deptSeleccionado ? 'selected' : '';
            $filtroDept.append(`<option value="${dept}" ${selected}>${dept}</option>`);
        });
        
        // Agregar también selector para series históricas
        const $inputDept = $('#inputDepartamento');
        if ($inputDept.length && $inputDept.is('select')) {
            $inputDept.empty().append('<option value="">Seleccionar departamento</option>');
            Object.keys(datosRegion.departamentos).forEach(dept => {
                $inputDept.append(`<option value="${dept}">${dept}</option>`);
            });
        }
    }

    function llenarEstaciones(estaciones) {
        const $inputEstacion = $('#inputEstacion');
        if ($inputEstacion.length && $inputEstacion.is('select')) {
            $inputEstacion.empty().append('<option value="">Seleccionar estación</option>');
            estaciones.forEach(estacion => {
                $inputEstacion.append(`<option value="${estacion}">${estacion}</option>`);
            });
        }
    }

    // ========================================
    // INICIALIZAR MAPA (SOLO BRIGADISTA)
    // ========================================
    
    function inicializarMapa(lat, lon, zoom, alertas) {
        if (typeof L === 'undefined') {
            console.error('Leaflet no está cargado');
            return;
        }

        mapaLeaflet = L.map('mapaRegion').setView([lat, lon], zoom);
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap, © CARTO',
            maxZoom: 19
        }).addTo(mapaLeaflet);

        alertas.forEach(alerta => {
            let icono;
            let colorTexto;
            
            if (alerta.nivel === 'alto') {
                icono = L.divIcon({
                    className: 'marcador-alerta',
                    html: '<div style="background-color: #d32f2f; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>',
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                colorTexto = '#d32f2f';
            } else if (alerta.nivel === 'medio') {
                icono = L.divIcon({
                    className: 'marcador-alerta',
                    html: '<div style="background-color: #ff9800; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>',
                    iconSize: [25, 25],
                    iconAnchor: [12.5, 12.5]
                });
                colorTexto = '#ff9800';
            } else {
                icono = L.divIcon({
                    className: 'marcador-alerta',
                    html: '<div style="background-color: #ffeb3b; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                });
                colorTexto = '#fbc02d';
            }

            L.marker(alerta.coords, {icon: icono}).addTo(mapaLeaflet)
                .bindPopup(`<div style="text-align: center;"><b>${alerta.nombre}</b><br><span style="color: ${colorTexto}; font-weight: bold;">RIESGO ${alerta.nivel.toUpperCase()}</span></div>`)
                .on('click', function() {
                    $('#zonaSeleccionada').text(`${alerta.nombre} - Coordenadas: ${alerta.coords[0]}, ${alerta.coords[1]}`);
                });
        });
    }

    // ========================================
    // CARGAR VISTA SEGÚN ROL
    // ========================================
    
    function cargarVistaPorRol() {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        
        if (usuarioActual) {
            if (usuarioActual.rol === 'brigadista') {
                $('#seccionBrigadista').show();
                $('#seccionInvestigador').hide();
            } else if (usuarioActual.rol === 'investigador') {
                $('#seccionBrigadista').hide();
                $('#seccionInvestigador').show();
            }
        } else {
            alert('Por favor inicia sesión para ver el contenido de la región');
            window.location.href = 'index.html';
        }
    }

    // ========================================
    // FUNCIONALIDAD BRIGADISTA
    // ========================================
    
    $('.btn-tipo').click(function() {
        $('.btn-tipo').removeClass('activo');
        $(this).addClass('activo');
        const tipo = $(this).data('tipo');
        console.log('Tipo de alerta seleccionado:', tipo);
    });

    $('.destinatario-item').click(function() {
        $(this).toggleClass('seleccionado');
        const tipo = $(this).data('tipo');
        console.log('Destinatario seleccionado:', tipo);
    });

    $('#btnModificar').click(function() {
        $('.mensaje-area').prop('readonly', false).focus();
    });

    $('#btnReiniciar').click(function() {
        $('.mensaje-area').val('');
    });

    // ENVIAR NOTIFICACIÓN
$('#btnEnviarNotificacion').click(function() {
    const zona = $('#zonaSeleccionada').text();
    const tipoAlerta = $('.btn-tipo.activo').data('tipo') || 'No seleccionado';
    const destinatarios = [];
    
    $('.destinatario-item.seleccionado').each(function() {
        destinatarios.push($(this).data('tipo'));
    });
    
    const mensaje = $('.mensaje-area').val();
    
    if (zona === 'Ninguna') {
        alert('⚠️ Por favor selecciona una zona en el mapa primero.');
        return;
    }
    
    if (destinatarios.length === 0) {
        alert('⚠️ Por favor selecciona al menos un destinatario.');
        return;
    }
    
    alert(`✅ Notificación enviada exitosamente!\n\nZona: ${zona}\nTipo de alerta: ${tipoAlerta}\nDestinatarios: ${destinatarios.join(', ')}\n\nLa brigada ha sido notificada.`);
    
    console.log('Notificación enviada:', {zona, tipoAlerta, destinatarios, mensaje});
});

// COMPARTIR ENLACE
$('#btnCompartirEnlace').click(function() {
    const zona = $('#zonaSeleccionada').text();
    const tipoAlerta = $('.btn-tipo.activo').data('tipo') || 'sin-tipo';
    
    if (zona === 'Ninguna') {
        alert('⚠️ Por favor selecciona una zona en el mapa primero.');
        return;
    }
    
    // Generar enlace simulado
    const enlace = `https://ideam.gov.co/alerta?zona=${encodeURIComponent(zona)}&tipo=${tipoAlerta}&fecha=${new Date().toISOString().split('T')[0]}`;
    
    // Crear modal si no existe
    if ($('#modalCompartir').length === 0) {
        const modalHTML = `
            <div id="modalCompartir" class="modal-compartir">
                <h3><i class="fas fa-share-alt"></i> Compartir Alerta</h3>
                <p>Comparte este enlace con tu equipo:</p>
                <div class="enlace-compartir" id="enlaceGenerado"></div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="btn-copiar" id="btnCopiarEnlace">
                        <i class="fas fa-copy"></i> Copiar enlace
                    </button>
                    <button class="btn-cerrar-modal" id="btnCerrarModalCompartir">
                        <i class="fas fa-times"></i> Cerrar
                    </button>
                </div>
            </div>
        `;
        $('body').append(modalHTML);
        
        // Evento copiar
        $(document).on('click', '#btnCopiarEnlace', function() {
            const enlaceTexto = $('#enlaceGenerado').text();
            navigator.clipboard.writeText(enlaceTexto).then(() => {
                $(this).html('<i class="fas fa-check"></i> ¡Copiado!');
                setTimeout(() => {
                    $(this).html('<i class="fas fa-copy"></i> Copiar enlace');
                }, 2000);
            });
        });
        
        // Evento cerrar
        $(document).on('click', '#btnCerrarModalCompartir', function() {
            $('#modalCompartir').removeClass('activo');
            $('#superposicion').removeClass('activo');
        });
    }
    
    // Mostrar modal con enlace
    $('#enlaceGenerado').text(enlace);
    $('#modalCompartir').addClass('activo');
    $('#superposicion').addClass('activo');
});

    $('.card-acceso').click(function() {
        const accion = $(this).data('accion');
        
        if (accion === 'pronostico') {
            window.location.href = 'index.html#pronostico-meteorologico';
        } else if (accion === 'reporte') {
            window.location.href = 'index.html';
            setTimeout(function() {
                $('#btnReportarIncidencia').click();
            }, 500);
        }
    });

    // DESCARGAR GUÍAS - BRIGADISTA
    $('.btn-descargar-guia').click(function() {
        const nombreGuia = $(this).data('guia');
        descargarPDF(nombreGuia);
    });

    function descargarPDF(nombreArchivo) {
        // Crear contenido PDF simulado
        const contenidoPDF = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/MediaBox [0 0 612 792]
/Contents 5 0 R
>>
endobj
4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
5 0 obj
<<
/Length 100
>>
stream
BT
/F1 24 Tf
100 700 Td
(${nombreArchivo}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000262 00000 n
0000000341 00000 n
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
492
%%EOF`;

        const blob = new Blob([contenidoPDF], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nombreArchivo + '.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        alert('✅ Guía descargada: ' + nombreArchivo + '.pdf');
    }

    // ========================================
    // FUNCIONALIDAD INVESTIGADOR - DESCARGAS CSV
    // ========================================
    
    $('#filtroDepartamento').change(function() {
        const deptSeleccionado = $(this).val();
        
        if (deptSeleccionado) {
            window.location.href = 'region.html?region=' + regionActual + '&departamento=' + deptSeleccionado;
        }
    });

    // DESCARGAR DATOS - ALERTAS TEMPRANAS
    $('#btnDescargarDatos').click(function() {
        const dept = $('#filtroDepartamento').val();
        const severidad = $('#filtroSeveridad').val();
        const fecha = $('#filtroFecha').val();
        
        if (!dept) {
            alert('Por favor selecciona un departamento.');
            return;
        }
        
        // Crear CSV con datos de ejemplo
        let csvContent = 'Fecha,Departamento,Municipio,Severidad,Temperatura,Humedad,Velocidad_Viento\n';
        csvContent += `2025-10-15,${dept},Zona Norte,${severidad || 'Alto'},32,25,15\n`;
        csvContent += `2025-10-14,${dept},Zona Sur,${severidad || 'Medio'},30,30,12\n`;
        csvContent += `2025-10-13,${dept},Zona Centro,${severidad || 'Bajo'},28,35,10\n`;
        
        descargarCSV(csvContent, `Alertas_${dept}_${fecha || 'todas_fechas'}.csv`);
    });

    $('#btnRegistrarDB').click(function() {
        const dept = $('#filtroDepartamento').val();
        
        if (!dept) {
            alert('Por favor selecciona un departamento.');
            return;
        }
        
        alert('✅ Datos registrados en base de datos.\n\nDepartamento: ' + dept + '\n\nLos datos quedarían almacenados para análisis futuro.');
    });

    $('#btnVerMapa').click(function() {
        const dept = $('#filtroDepartamento').val();
        
        if (!dept) {
            alert('Por favor selecciona un departamento.');
            return;
        }
        
        alert('Abriendo mapa interactivo de alertas...\n\nDepartamento: ' + dept + '\n\nSe mostraría un mapa detallado con todas las alertas históricas.');
    });

    // SERIES HISTÓRICAS
    $('#btnConsultar').click(function() {
        const departamento = $('#inputDepartamento').val();
        const estacion = $('#inputEstacion').val();
        const fechaInicio = $('#fechaInicio').val();
        const fechaFin = $('#fechaFin').val();
        
        const variables = [];
        $('input[name="variable"]:checked').each(function() {
            variables.push($(this).val());
        });
        
        if (!departamento || !estacion || !fechaInicio || !fechaFin || variables.length === 0) {
            alert('Por favor completa todos los campos antes de consultar.');
            return;
        }
        
        console.log('Consultando datos históricos:', {
            departamento, estacion, fechaInicio, fechaFin, variables
        });
        
        alert('✅ Consulta realizada.\n\nDepartamento: ' + departamento + '\nEstación: ' + estacion + '\nVariables: ' + variables.join(', ') + '\nPeriodo: ' + fechaInicio + ' a ' + fechaFin);
    });

    $('#btnDescargar').click(function() {
        const formato = $('input[name="formato"]:checked').val();
        const departamento = $('#inputDepartamento').val();
        const estacion = $('#inputEstacion').val();
        const fechaInicio = $('#fechaInicio').val();
        const fechaFin = $('#fechaFin').val();
        
        const variables = [];
        $('input[name="variable"]:checked').each(function() {
            variables.push($(this).val());
        });
        
        if (!departamento || !estacion) {
            alert('Por favor completa los campos de departamento y estación.');
            return;
        }
        
        if (!formato) {
            alert('Por favor selecciona un formato de archivo.');
            return;
        }
        
        // Crear CSV con datos históricos de ejemplo
        let csvContent = 'Fecha,' + variables.join(',') + '\n';
        
        // Generar datos simulados
        const inicio = new Date(fechaInicio || '2020-01-01');
        const fin = new Date(fechaFin || '2025-10-16');
        const diasTotal = Math.floor((fin - inicio) / (1000 * 60 * 60 * 24));
        const muestras = Math.min(diasTotal, 100); // Limitar a 100 registros
        
        for (let i = 0; i < muestras; i++) {
            const fecha = new Date(inicio);
            fecha.setDate(fecha.getDate() + Math.floor(i * diasTotal / muestras));
            const fechaStr = fecha.toISOString().split('T')[0];
            
            let fila = fechaStr;
            variables.forEach(variable => {
                if (variable === 'temperatura') {
                    fila += ',' + (20 + Math.random() * 15).toFixed(1);
                } else if (variable === 'precipitacion') {
                    fila += ',' + (Math.random() * 100).toFixed(1);
                } else if (variable === 'humedad') {
                    fila += ',' + (40 + Math.random() * 40).toFixed(1);
                } else if (variable === 'viento') {
                    fila += ',' + (5 + Math.random() * 20).toFixed(1);
                } else if (variable === 'radiacion') {
                    fila += ',' + (100 + Math.random() * 300).toFixed(1);
                }
            });
            csvContent += fila + '\n';
        }
        
        const nombreArchivo = `Series_Historicas_${departamento}_${estacion.replace(/\s/g, '_')}_${fechaInicio || '2020-01-01'}_${fechaFin || '2025-10-16'}.csv`;
        descargarCSV(csvContent, nombreArchivo);
    });

    $('#btnVisualizarGrafico').click(function() {
        const departamento = $('#inputDepartamento').val();
        
        if (!departamento) {
            alert('Por favor ingresa un departamento.');
            return;
        }
        
        alert('📊 Visualizando gráfico de datos...\n\nDepartamento: ' + departamento + '\n\nSe abriría una ventana con gráficos interactivos de las series históricas seleccionadas.');
    });

    function descargarCSV(contenido, nombreArchivo) {
        const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nombreArchivo;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        alert('✅ Archivo descargado: ' + nombreArchivo);
    }

    // ========================================
    // BOTÓN DE USUARIO
    // ========================================
    
    $('#botonUsuario').click(function() {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        
        if (usuarioActual) {
            const confirmar = confirm('¿Deseas cerrar sesión?\n\nUsuario: ' + usuarioActual.nombre + '\nRol: ' + usuarioActual.rol);
            if (confirmar) {localStorage.removeItem('usuarioActual');
                alert('Sesión cerrada correctamente.');
                window.location.href = 'index.html';
            }
        } else {
            alert('No hay sesión activa. Redirigiendo al inicio...');
            window.location.href = 'index.html';
        }
    });

    // ========================================
    // ENLACES RÁPIDOS DEL MENÚ
    // ========================================
    
    $('.enlaces-rapidos li').click(function() {
        const texto = $(this).text().trim();
        
        if (texto.includes('Alertas tempranas')) {
            cerrarMenuLateral();
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        } else if (texto.includes('Pronóstico meteorológico')) {
            window.location.href = 'index.html#pronostico-meteorologico';
        } else if (texto.includes('Guías y protocolos')) {
            window.location.href = 'index.html#guias-protocolos';
        } else if (texto.includes('Reportar incidencia')) {
            window.location.href = 'index.html';
            setTimeout(function() {
                $('#btnReportarIncidencia').click();
            }, 500);
        } else if (texto.includes('Noticias y eventos')) {
            window.location.href = 'index.html#noticias-eventos';
        } else if (texto.includes('Sedes y contacto') || texto.includes('Misión y Visión') || texto.includes('Nuestro equipo') || texto.includes('Sedes')) {
            window.location.href = 'index.html';
        }
    });

    // ========================================
    // BARRA DE BÚSQUEDA
    // ========================================
    
    $('.barra-busqueda button').click(function(e) {
        e.preventDefault();
        realizarBusqueda();
    });

    $('.barra-busqueda input').keypress(function(e) {
        if (e.which === 13) {
            e.preventDefault();
            realizarBusqueda();
        }
    });

    function realizarBusqueda() {
        const textoBusqueda = $('.barra-busqueda input').val().trim();
        
        if (textoBusqueda) {
            console.log('Buscando:', textoBusqueda);
            alert('Buscando: "' + textoBusqueda + '"\n\nAquí se mostrarían los resultados de búsqueda.');
        } else {
            alert('Por favor ingrese un término de búsqueda');
        }
    }

    // ========================================
    // INICIALIZACIÓN
    // ========================================
    
    console.log('Página de región inicializada');
    cargarVistaPorRol();
    cargarContenido();

}); // Fin del document.ready
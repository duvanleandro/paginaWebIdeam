// Script para la página de región

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
                    alertasActivas: [
                        {nombre: 'Inírida', nivel: 'bajo', coords: [3.9, -67.9]}
                    ]
                },
                'Guaviare': {
                    descripcion: 'Guaviare está ubicado en la transición andino-amazónica. Su capital es San José del Guaviare. Temperatura promedio de 26°C con época seca de diciembre a marzo.',
                    alerta: 'Alerta por temporada seca. Riesgo moderado de incendios.',
                    coordenadas: {lat: 2.0, lon: -72.5},
                    zoom: 7,
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
                    alertasActivas: [
                        {nombre: 'Mitú', nivel: 'bajo', coords: [1.3, -70.2]}
                    ]
                }
            }
        },
        'pacifica': {
            nombre: 'Región Pacífica',
            descripcion: 'La región Pacífica es una de las zonas más lluviosas del planeta, con bosques húmedos tropicales y gran riqueza en recursos hídricos.',
            coordenadas: {lat: 4.5, lon: -77},
            zoom: 7,
            departamentos: {
                'Chocó': {
                    descripcion: 'Chocó es el departamento con mayor pluviosidad de Colombia. Su capital es Quibdó. Registra precipitaciones superiores a 10,000 mm anuales en algunas zonas.',
                    alerta: 'Altas precipitaciones. Riesgo de inundaciones.',
                    coordenadas: {lat: 5.7, lon: -76.6},
                    zoom: 7,
                    alertasActivas: [
                        {nombre: 'Quibdó - Zona baja', nivel: 'alto', coords: [5.7, -76.7]},
                        {nombre: 'Istmina', nivel: 'medio', coords: [5.2, -76.7]},
                        {nombre: 'Condoto', nivel: 'medio', coords: [5.1, -76.6]}
                    ]
                },
                'Valle del Cauca': {
                    descripcion: 'Valle del Cauca tiene clima variado según altitud. Su capital es Cali. Zona pacífica con alta humedad y temperaturas de 24-28°C.',
                    alerta: 'Monitoreo de cuenca del río Cauca.',
                    coordenadas: {lat: 3.8, lon: -76.5},
                    zoom: 7,
                    alertasActivas: [
                        {nombre: 'Buenaventura - Puerto', nivel: 'medio', coords: [3.9, -77.0]},
                        {nombre: 'Cali - Ladera', nivel: 'bajo', coords: [3.4, -76.5]}
                    ]
                },
                'Cauca': {
                    descripcion: 'Cauca tiene territorio en costa pacífica y zona andina. Su capital es Popayán. En la costa presenta clima cálido húmedo con temperaturas de 26-28°C.',
                    alerta: 'Vigilancia de actividad volcánica cercana.',
                    coordenadas: {lat: 2.5, lon: -77.0},
                    zoom: 7,
                    alertasActivas: [
                        {nombre: 'Guapi - Costa', nivel: 'medio', coords: [2.6, -77.9]},
                        {nombre: 'Timbiquí', nivel: 'bajo', coords: [2.8, -77.7]}
                    ]
                },
                'Nariño': {
                    descripcion: 'Nariño tiene costa pacífica y zona andina. Su capital es Pasto. La costa presenta clima cálido húmedo con precipitaciones abundantes.',
                    alerta: 'Monitoreo volcánico del Galeras activo.',
                    coordenadas: {lat: 1.8, lon: -78.0},
                    zoom: 7,
                    alertasActivas: [
                        {nombre: 'Tumaco - Puerto', nivel: 'alto', coords: [1.8, -78.8]},
                        {nombre: 'Pasto - Volcán Galeras', nivel: 'medio', coords: [1.2, -77.3]}
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
                'Arauca': {
                    descripcion: 'Arauca limita con Venezuela. Su capital es Arauca. Presenta sabanas con estación seca (diciembre-marzo) y lluviosa (abril-noviembre).',
                    alerta: 'Riesgo de inundaciones en temporada de lluvias.',
                    coordenadas: {lat: 7.0, lon: -70.8},
                    zoom: 7,
                    alertasActivas: [
                        {nombre: 'Arauca - Río Arauca', nivel: 'medio', coords: [7.1, -70.8]},
                        {nombre: 'Arauquita', nivel: 'bajo', coords: [7.0, -71.4]}
                    ]
                },
                'Casanare': {
                    descripcion: 'Casanare es el departamento de los llanos orientales. Su capital es Yopal. Temperatura promedio de 26°C con marcada diferencia entre época seca y lluviosa.',
                    alerta: 'Temporada seca. Vigilancia de incendios de sabana.',
                    coordenadas: {lat: 5.3, lon: -71.5},
                    zoom: 7,
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
                    alertasActivas: [
                        {nombre: 'Villavicencio - Zona rural', nivel: 'medio', coords: [4.2, -73.6]},
                        {nombre: 'Granada', nivel: 'alto', coords: [3.5, -73.7]},
                        {nombre: 'San Martín', nivel: 'bajo', coords: [3.7, -73.7]}
                    ]
                },
                'Vichada': {
                    descripcion: 'Vichada es el segundo departamento más grande de Colombia. Su capital es Puerto Carreño. Presenta sabanas extensas con clima cálido de 27°C.',
                    alerta: 'Incendios de sabana en temporada seca.',
                    coordenadas: {lat: 5.5, lon: -68.5},
                    zoom: 7,
                    alertasActivas: [
                        {nombre: 'Puerto Carreño', nivel: 'alto', coords: [6.2, -67.5]},
                        {nombre: 'Cumaribo - Sabana', nivel: 'medio', coords: [4.5, -69.8]}
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
                'Antioquia': {
                    descripcion: 'Antioquia es uno de los departamentos más importantes. Su capital es Medellín. Clima variado: cálido en valles (28°C) a páramo (8°C) según altitud.',
                    alerta: 'Monitoreo de calidad del aire en valle de Aburrá.',
                    coordenadas: {lat: 6.5, lon: -75.5},
                    zoom: 7,
                    alertasActivas: [
                        {nombre: 'Medellín - Valle de Aburrá', nivel: 'medio', coords: [6.2, -75.6]},
                        {nombre: 'Urabá - Zona bananera', nivel: 'bajo', coords: [8.0, -76.6]}
                    ]
                },
                'Boyacá': {
                    descripcion: 'Boyacá tiene gran altitud andina. Su capital es Tunja. Temperaturas entre 8-18°C según altitud. Zona de páramos importantes.',
                    alerta: 'Heladas nocturnas en zonas altas.',
                    coordenadas: {lat: 5.5, lon: -73.0},
                    zoom: 7,
                    alertasActivas: [
                        {nombre: 'Tunja - Centro', nivel: 'bajo', coords: [5.5, -73.4]},
                        {nombre: 'Sogamoso', nivel: 'medio', coords: [5.7, -72.9]}
                    ]
                },
                'Caldas': {
                    descripcion: 'Caldas está en la región cafetera. Su capital es Manizales. Clima variado: cálido (24-28°C) en valles a frío (12-16°C) en zonas altas.',
                    alerta: 'Vigilancia actividad volcánica Nevado del Ruiz.',
                    coordenadas: {lat: 5.1, lon: -75.5},
                    zoom: 8,
                    alertasActivas: [
                        {nombre: 'Manizales - Zona volcánica', nivel: 'alto', coords: [5.1, -75.5]},
                        {nombre: 'Nevado del Ruiz', nivel: 'medio', coords: [4.9, -75.3]}
                    ]
                },
                'Cundinamarca': {
                    descripcion: 'Cundinamarca rodea a Bogotá. Su capital es Bogotá D.C. Clima de sabana (14°C) en altiplano, cálido en zonas bajas (24-28°C).',
                    alerta: 'Monitoreo de calidad del aire en Bogotá.',
                    coordenadas: {lat: 5.0, lon: -74.0},
                    zoom: 7,
                    alertasActivas: [
                        {nombre: 'Bogotá - Localidad Usme', nivel: 'medio', coords: [4.6, -74.1]},
                        {nombre: 'Soacha - Zona alta', nivel: 'medio', coords: [4.6, -74.2]}
                    ]
                },
                'Huila': {
                    descripcion: 'Huila tiene territorio entre cordilleras. Su capital es Neiva. Clima cálido seco en valle del Magdalena (28°C), templado en zonas altas.',
                    alerta: 'Riesgo de incendios forestales en época seca.',
                    coordenadas: {lat: 2.5, lon: -75.5},
                    zoom: 7,
                    alertasActivas: [
                        {nombre: 'Neiva - Periferia', nivel: 'alto', coords: [2.9, -75.3]},
                        {nombre: 'Desierto de la Tatacoa', nivel: 'alto', coords: [3.2, -75.2]}
                    ]
                },
                'Norte de Santander': {
                    descripcion: 'Norte de Santander limita con Venezuela. Su capital es Cúcuta. Clima cálido (28°C) en valles, templado en zonas montañosas.',
                    alerta: 'Monitoreo fronterizo. Condiciones de sequía.',
                    coordenadas: {lat: 7.9, lon: -72.5},
                    zoom: 7,
                    alertasActivas: [
                        {nombre: 'Cúcuta - Zona metropolitana', nivel: 'medio', coords: [7.9, -72.5]},
                        {nombre: 'Tibú - Catatumbo', nivel: 'alto', coords: [8.6, -72.7]}
                    ]
                },
                'Quindío': {
                    descripcion: 'Quindío es el departamento más pequeño. Su capital es Armenia. Clima templado cafetero (18-22°C) con lluvias bimodales.',
                    alerta: 'Sin alertas importantes. Condiciones normales.',
                    coordenadas: {lat: 4.5, lon: -75.7},
                    zoom: 9,
                    alertasActivas: [
                        {nombre: 'Armenia - Centro', nivel: 'bajo', coords: [4.5, -75.7]}
                    ]
                },
                'Risaralda': {
                    descripcion: 'Risaralda es parte del eje cafetero. Su capital es Pereira. Clima templado (18-22°C) en zona cafetera, cálido en valle del Cauca.',
                    alerta: 'Monitoreo de deslizamientos en zona montañosa.',
                    coordenadas: {lat: 5.0, lon: -75.9},
                    zoom: 8,
                    alertasActivas: [
                        {nombre: 'Pereira - Ladera', nivel: 'medio', coords: [4.8, -75.7]},
                        {nombre: 'Dosquebradas', nivel: 'bajo', coords: [4.8, -75.7]}
                    ]
                },
                'Santander': {
                    descripcion: 'Santander tiene topografía montañosa. Su capital es Bucaramanga. Clima variado: cálido en valles (28°C), templado en mesetas (20-24°C), frío en alturas (12-16°C). Presenta dos temporadas secas (diciembre-marzo y julio-agosto) y dos lluviosas (abril-junio y septiembre-noviembre).',
                    alerta: 'Condiciones de baja humedad en área metropolitana. Riesgo de incendios forestales en zonas de bosque seco. Temperatura elevada en el Valle del Magdalena.',
                    coordenadas: {lat: 7.1, lon: -73.1},
                    zoom: 7,
                    alertasActivas: [
                        {nombre: 'Bucaramanga - Zona norte', nivel: 'alto', coords: [7.2, -73.1]},
                        {nombre: 'Girón - Sector Menzuly', nivel: 'alto', coords: [7.1, -73.2]},
                        {nombre: 'Floridablanca - Cañón del Chicamocha', nivel: 'medio', coords: [7.0, -73.0]},
                        {nombre: 'San Gil - Río Fonce', nivel: 'medio', coords: [6.6, -73.1]},
                        {nombre: 'Barrancabermeja - Puerto', nivel: 'bajo', coords: [7.1, -73.9]}
                    ]
                },
                'Tolima': {
                    descripcion: 'Tolima tiene valles cálidos y zonas montañosas. Su capital es Ibagué. Clima cálido en valle del Magdalena (28°C), templado en Ibagué (22°C).',
                    alerta: 'Riesgo de incendios en temporada seca.',
                    coordenadas: {lat: 4.5, lon: -75.0},
                    zoom: 7,
                    alertasActivas: [
                        {nombre: 'Ibagué - Cañón del Combeima', nivel: 'medio', coords: [4.4, -75.2]},
                        {nombre: 'Espinal', nivel: 'alto', coords: [4.2, -74.9]}
                    ]
                }
            }
        },
        'insular': {
            nombre: 'Región Insular',
            descripcion: 'La región insular incluye San Andrés, Providencia y Santa Catalina en el Caribe. Clima tropical con influencia marítima.',
            coordenadas: {lat: 12.5, lon: -81.7},
            zoom: 10,
            departamentos: {
                'San Andrés y Providencia': {
                    descripcion: 'Archipiélago en el mar Caribe. Capital: San Andrés. Clima tropical con temperatura promedio de 27°C. Vulnerable a huracanes entre junio y noviembre.',
                    alerta: 'Temporada de huracanes. Monitoreo meteorológico intensivo.',
                    coordenadas: {lat: 12.6, lon: -81.7},
                    zoom: 10,
                    alertasActivas: [
                        {nombre: 'San Andrés - Costa este', nivel: 'medio', coords: [12.6, -81.7]},
                        {nombre: 'Providencia - Zona norte', nivel: 'bajo', coords: [13.4, -81.4]}
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

        // Si hay departamento específico, cargar sus datos
        if (departamentoActual && datosRegion.departamentos[departamentoActual]) {
            const datosDept = datosRegion.departamentos[departamentoActual];
            
            $('#bannerRegion').text(datosRegion.nombre + ' - ' + departamentoActual);
            $('#descripcionRegion').text(datosDept.descripcion);
            $('#mensajeAlerta').text(datosDept.alerta);

            // Inicializar mapa con coordenadas del departamento
            if ($('#seccionBrigadista').is(':visible')) {
                if (mapaLeaflet) {
                    mapaLeaflet.remove();
                }
                inicializarMapa(datosDept.coordenadas.lat, datosDept.coordenadas.lon, datosDept.zoom, datosDept.alertasActivas);
            }

            // Llenar dropdown de departamentos para investigador
            llenarDepartamentos(datosRegion, departamentoActual);

        } else {
            // Mostrar info general de la región
            $('#bannerRegion').text(datosRegion.nombre);
            $('#descripcionRegion').text(datosRegion.descripcion);
            $('#mensajeAlerta').text('Selecciona un departamento específico para ver alertas detalladas.');

            if ($('#seccionBrigadista').is(':visible')) {
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
    }

    // ========================================
    // INICIALIZAR MAPA
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

        // Agregar marcadores de alertas
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
    
    // Seleccionar tipo de alerta
    $('.btn-tipo').click(function() {
        $('.btn-tipo').removeClass('activo');
        $(this).addClass('activo');
        const tipo = $(this).data('tipo');
        console.log('Tipo de alerta seleccionado:', tipo);
    });

    // Seleccionar destinatarios
    $('.destinatario-item').click(function() {
        $(this).toggleClass('seleccionado');
        const tipo = $(this).data('tipo');
        console.log('Destinatario seleccionado:', tipo);
    });

    // Modificar mensaje
    $('#btnModificar').click(function() {
        $('.mensaje-area').prop('readonly', false).focus();
    });

    // Reiniciar mensaje
    $('#btnReiniciar').click(function() {
        $('.mensaje-area').val('');
    });

    // Accesos rápidos
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

    // ========================================
    // FUNCIONALIDAD INVESTIGADOR
    // ========================================
    
    // Cambio de departamento en filtro
    $('#filtroDepartamento').change(function() {
        const deptSeleccionado = $(this).val();
        
        if (deptSeleccionado) {
            // Recargar página con nuevo departamento
            window.location.href = 'region.html?region=' + regionActual + '&departamento=' + deptSeleccionado;
        }
    });

    // Botones de datos
    $('#btnDescargarDatos').click(function() {
        const dept = $('#filtroDepartamento').val();
        const severidad = $('#filtroSeveridad').val();
        const fecha = $('#filtroFecha').val();
        
        if (!dept) {
            alert('Por favor selecciona un departamento.');
            return;
        }
        
        console.log('Descargando datos:', {dept, severidad, fecha});
        alert('Descargando datos de alertas tempranas...\n\nDepartamento: ' + dept + '\nSeveridad: ' + (severidad || 'Todas') + '\nFecha: ' + (fecha || 'Todas las fechas') + '\n\nFormato: CSV');
    });

    $('#btnRegistrarDB').click(function() {
        const dept = $('#filtroDepartamento').val();
        
        if (!dept) {
            alert('Por favor selecciona un departamento.');
            return;
        }
        
        alert('Registrando información en la base de datos...\n\nDepartamento: ' + dept + '\n\nLos datos quedarían almacenados para análisis futuro.');
    });

    $('#btnVerMapa').click(function() {
        const dept = $('#filtroDepartamento').val();
        
        if (!dept) {
            alert('Por favor selecciona un departamento.');
            return;
        }
        
        alert('Abriendo mapa interactivo de alertas...\n\nDepartamento: ' + dept + '\n\nSe mostraría un mapa detallado con todas las alertas históricas de esta zona.');
    });

    // Botones de series históricas
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
        
        alert('Consultando series históricas...\n\nDepartamento: ' + departamento + '\nEstación: ' + estacion + '\nVariables: ' + variables.join(', ') + '\nPeriodo: ' + fechaInicio + ' a ' + fechaFin + '\n\nLos datos se mostrarían en la interfaz.');
    });

    $('#btnDescargar').click(function() {
        const formato = $('input[name="formato"]:checked').val();
        const departamento = $('#inputDepartamento').val();
        
        if (!departamento) {
            alert('Por favor ingresa un departamento.');
            return;
        }
        
        if (!formato) {
            alert('Por favor selecciona un formato de archivo.');
            return;
        }
        
        console.log('Descargando en formato:', formato);
        alert('Descargando archivo en formato ' + formato.toUpperCase() + '...\n\nDepartamento: ' + departamento + '\n\nEl archivo se descargaría automáticamente.');
    });

    $('#btnVisualizarGrafico').click(function() {
        const departamento = $('#inputDepartamento').val();
        
        if (!departamento) {
            alert('Por favor ingresa un departamento.');
            return;
        }
        
        alert('Visualizando gráfico de datos...\n\nDepartamento: ' + departamento + '\n\nSe abriría una ventana con gráficos interactivos de las series históricas seleccionadas.');
    });

    // ========================================
    // MODAL LOGIN
    // ========================================
    
    $('#botonUsuario').click(function() {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        
        if (usuarioActual) {
            const confirmar = confirm('¿Deseas cerrar sesión?\n\nUsuario: ' + usuarioActual.nombre + '\nRol: ' + usuarioActual.rol);
            if (confirmar) {
                localStorage.removeItem('usuarioActual');
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
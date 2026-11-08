# FIGMA_CONTEXT.md: Inventario Exhaustivo de las 41 Pantallas

Este documento contiene el mapeo detallado de las 41 pantallas del archivo `EFI Figma Alerta Vecinos (1).pdf`, su correspondencia visual, elementos de interfaz, inputs, acciones y módulos.

---

## Módulo 1: Inicio y Seguridad Comunitaria (Pantallas 1 a 10)

| ID | Pantalla | Wireframe PDF (Página) | Componentes Clave | Inputs / Controles | Acciones / Navegación |
|---|---|---|---|---|---|
| **P01** | Inicio / Dashboard | Pág. 1 | `AppHeader` ("Alerta Vecinos", "Bienvenido/a"), Quick Access Grid 2x2, Lista de Módulos, `SOSButton` flotante | Ninguno (Vista de navegación) | Links a P02, P03, P05, P08, P11, P10, P22, P26, P30, P37; Disparo SOS |
| **P02** | Mapa de Riesgo | Pág. 2 | Header con Volver, Canvas de mapa interactivo con zonas semafóricas, Tarjeta de Leyenda | Botones de filtro de zona (Verde, Amarilla, Roja) | Volver a P01; Tap en zonas para ver detalles |
| **P03** | Alertas Cercanas | Pág. 3 | Header con Volver, Lista de tarjetas de alerta (`AlertCard`), Card de Radio de Búsqueda actual (2 km) | Botón `[Configurar radio]`, Botón `[Ver incidente]` | Volver a P01; Ir a P04 (Configurar radio); Ir a P21 (Detalle de alerta) |
| **P04** | Configuración de Radio | Pág. 4 | Header con Volver, Indicador de radio seleccionado, Slider/selector segmentado de distancias (500m, 1km, 2km, 5km) | Slider de rango táctil, Botón primario "Guardar configuración" | Volver a P03; Guardar preferencia en LocalStorage |
| **P05** | Paradas Seguras | Pág. 5 | Header con Volver, Buscador rápido, Lista de paradas cercanas con distancia (ej. Plaza Roca 350m, Terminal 1km) | Input de búsqueda, Botones `[Ver ubicación]` | Volver a P01; Ir a P06 (Buscar); Ir a P07 (Ver ubicación en mapa) |
| **P06** | Buscar Paradas | Pág. 6 | Header con Volver, `SearchBar` enfocado con autocompletado, Lista de resultados filtrados en tiempo real | Input de texto con tecla Clear | Volver a P05; Seleccionar resultado para ir a P07 |
| **P07** | Ubicación de Parada | Pág. 7 | Header con Volver, Mapa con pin de parada, Ficha de detalles (nombre, distancia 350m, servicios: iluminación, cámara, pulsador) | Botón "Cómo llegar" / "Volver a paradas" | Volver a P05/P06 |
| **P08** | Consejos Preventivos | Pág. 8 | Header con Volver, Tarjetas de tips preventivos (iluminación nocturna, pertenencias, viajes solos), Accesos directos | Botón "Ver más recomendaciones", Botón "Números de emergencia" | Volver a P01; Ir a P09 (Recomendaciones); Ir a P10 (Emergencias) |
| **P09** | Recomendaciones | Pág. 9 | Header con Volver, Listado expandido de pautas de prevención ciudadana y autocuidado | Scroll interactivo | Volver a P08 |
| **P10** | Números de Emergencia | Pág. 10 | Header con Volver, Tarjetas de marcación directa: Policía (911), Ambulancia (107), Bomberos (100) | Botones de llamada táctil de alta visibilidad (`tel:`) | Volver a P01 o P08; Iniciar llamada |

---

## Módulo 2: Reportes y Autenticación (Pantallas 11 a 21)

| ID | Pantalla | Wireframe PDF (Página) | Componentes Clave | Inputs / Controles | Acciones / Navegación |
|---|---|---|---|---|---|
| **P11** | Hub de Reportes | Pág. 11 | Header con Volver, Opciones duales de acceso: "Crear reporte" y "Consultar reportes" | Botones de navegación primaria y secundaria | Volver a P01; Ir a P14/P15 (Crear); Ir a P12 (Públicos) |
| **P12** | Reportes Públicos | Pág. 12 | Header con Volver, Feed de reportes comunitarios con badges (Robo 500m Pendiente, Accidente 1,2km Verificado), Barra de acción | Botón "Filtrar reportes", Botón "Ver reporte" | Volver a P11; Ir a P13 (Filtros); Ir a P21 (Detalle) |
| **P13** | Filtrar Reportes | Pág. 13 | Header con Volver, Selectores de filtro: Cercanía (km), Categoría (Todas, Robo, etc.), Estado (Todos, Pendiente, Verificado) | Selects/Radios accesibles, Botones "Aplicar filtros" y "Limpiar filtros" | Volver a P12 aplicando criterios reactivos |
| **P14** | Iniciar Sesión / Auth | Pág. 14 | Header con Volver, Mensaje "Para crear un reporte logueate o registrate", Formulario de acceso | Inputs Email y Contraseña con validación, Botón "Iniciar Sesión", Enlace "Registrate" | Volver a P11; Iniciar sesión exitosa y redirigir a P15 |
| **P15** | Crear Reporte (Paso 1) | Pág. 15 | Header con Volver, Ilustración "¿Qué querés reportar?", Texto explicativo | Botón primario "Seleccionar tipo de reporte" | Volver a P11; Ir a P16 |
| **P16** | Tipo de Reporte (Paso 2) | Pág. 16 | Header con Volver, Cuadrícula de 6 categorías: Robo, Actividad Sospechosa, Accidente, Vandalismo, Incendio, Otro | Selector de tarjetas con estado seleccionado (radio semántico), Botón "Continuar" | Volver a P15; Ir a P17 con categoría elegida |
| **P17** | Completar Reporte (Paso 3)| Pág. 17 | Header con Volver, Ficha de categoría ("Accidente"), Selector de ubicación, Textarea descripción, Carga multimedia, Toggle Anónimo | Input ubicación (geoloc simulada), Textarea, File upload estilizado, Switch Sí/No, Botones Cancelar / Continuar | Volver a P16; Cancelar (P11); Continuar a P18 |
| **P18** | Resumen de Reporte (Paso 4)| Pág. 18 | Header con Volver, Tarjeta resumen con Tipo, Fecha/Hora, Estado inicial "Pendiente", Tracking generado (`REP-000123`), Descripción, Ubicación, Anónimo | Botones `[Editar reporte]`, `[Emergencias]`, "Cancelar", "Confirmar Reporte" | Volver a P17; Ir a P19 (Confirmar); Ir a P10 (Emergencias) |
| **P19** | Confirmar Reporte (Modal)| Pág. 19 | Diálogo modal accesible "¿Estás seguro de que querés enviar este reporte?", Texto de verificación | Botón primario "Sí, confirmar", Botón secundario "No, volver al resumen" | Confirmar -> P20; Rechazar -> P18 |
| **P20** | Reporte Exitoso | Pág. 20 | Icono check animado verde (`#10B981`), Mensaje "Reporte creado con éxito", Feedback de tracking | Botón "Ver reporte creado", Botón "Crear otro reporte", Botón "Volver al inicio" | Ir a P21 (Ver detalle); Ir a P15 (Nuevo); Ir a P01 (Inicio) |
| **P21** | Detalle del Reporte | Pág. 21 | Header con Volver, Ficha completa con Tipo, Badge de Estado, Fecha/Hora, Tracking ID, Descripción, Mapa con ubicación, Anónimo | Botón "Ir al inicio", Acciones comunitarias (comentar, compartir) | Volver a P12 o P01 |

---

## Módulo 3: Seguridad Personal / "Llegué Bien" (Pantallas 22 a 25)

| ID | Pantalla | Wireframe PDF (Página) | Componentes Clave | Inputs / Controles | Acciones / Navegación |
|---|---|---|---|---|---|
| **P22** | Preparar Trayecto | Pág. 22 | Header con Volver, Selector de Destino, Selector de Contacto de Seguridad, Chips de Lugares Frecuentes (Casa, Trabajo, Facultad) | Botones de selección rápida, Botón primario "Iniciar Trayecto" | Volver a P01; Ir a P23 (Destino); Ir a P24 (Contacto); Iniciar -> P25 |
| **P23** | Seleccionar Destino | Pág. 23 | Header con Volver, Ubicación actual detectada, Input de búsqueda de destino, Accesos a Favoritos | Input con autocompletado, Chips de favoritos, Botón "Continuar" | Volver a P22 con destino asignado |
| **P24** | Elegir Contacto | Pág. 24 | Header con Volver, Lista de contactos de seguridad (Juan Pérez, María Gómez, etc.) con radio visual | Radio buttons de selección única, Botón "Continuar" | Volver a P22 con contacto asignado |
| **P25** | Trayecto Activo | Pág. 25 | Header con Volver, Tarjeta de Estado "Trayecto en curso", Datos de Destino y Contacto notificado, Mapa de seguimiento | Botón "Llegué Bien" (éxito), Botón "Enviar Alerta" (preventivo), Botón "Finalizar Trayecto" | Volver a P01; Disparar alerta; Finalizar sesión |

---

## Módulo 4: Favoritos (Pantallas 26 a 29)

| ID | Pantalla | Wireframe PDF (Página) | Componentes Clave | Inputs / Controles | Acciones / Navegación |
|---|---|---|---|---|---|
| **P26** | Lista de Favoritos | Pág. 26 | Header con Volver, Tarjetas de lugares (Casa, Trabajo, Facultad) con botones contextuales de Editar y Eliminar | Botón "Agregar nuevo lugar", Acciones Editar/Eliminar por fila | Volver a P01; Ir a P27 (Agregar); Ir a P28 (Editar); Ir a P29 (Eliminar) |
| **P27** | Agregar Lugar | Pág. 27 | Header con Volver, Formulario de nuevo favorito | Input "Nombre del lugar", Input "Dirección / ubicación", Botones Cancelar / Guardar | Volver a P26; Guardar nuevo lugar en LocalStorage |
| **P28** | Editar Lugar | Pág. 28 | Header con Volver, Formulario precargado con datos del lugar existente | Inputs editables de Nombre y Dirección, Botones Cancelar / Guardar cambios | Volver a P26; Actualizar registro |
| **P29** | Eliminar Lugar (Confirmación)| Pág. 29 | Diálogo de advertencia "¿Está seguro que desea eliminar este lugar?" | Botón destructivo "Eliminar", Botón secundario "Cancelar" | Volver a P26 eliminando el registro o cancelando |

---

## Módulo 5: Perfil de Usuario e Historial (Pantallas 30 a 36)

| ID | Pantalla | Wireframe PDF (Página) | Componentes Clave | Inputs / Controles | Acciones / Navegación |
|---|---|---|---|---|---|
| **P30** | Mi Perfil | Pág. 30 | Header con Volver, Ficha de usuario (Avatar, Nombre y Apellido, Email), Lista de enlaces de configuración | Lista de botones de navegación | Volver a P01; Links a P31, P32, P33, P34, P35, P36 |
| **P31** | Editar Perfil | Pág. 31 | Header con Volver, Formulario de datos personales | Inputs Nombre, Apellido, Email, Botones Cancelar / Guardar cambios | Volver a P30; Guardar cambios en LocalStorage |
| **P32** | Notificaciones | Pág. 32 | Header con Volver, Lista de avisos (Nueva alerta cercana, Cambio de estado de reporte, Aviso de seguridad) | Filtro Leídas/No leídas, Switch de notificaciones activas | Volver a P30 |
| **P33** | Historial Personal | Pág. 33 | Header con Volver, Hub de actividad reciente con accesos a sub-historiales | Enlaces a Mis Reportes, Reportes Comentados, Mis Trayectos | Volver a P30; Links a P34, P35, P36 |
| **P34** | Mis Reportes | Pág. 34 | Header con Volver, Listado de reportes propios con fecha, estado y tracking ID | Botón "Ver detalle" por cada reporte | Volver a P30/P33; Ir a P21 (Detalle) |
| **P35** | Reportes Comentados | Pág. 35 | Header con Volver, Listado de incidencias en las que se comentó con fecha de interacción | Botón "Ver reporte" | Volver a P30/P33; Ir a P21 (Detalle) |
| **P36** | Mis Trayectos | Pág. 36 | Header con Volver, Historial de viajes "Llegué Bien" completados (Origen -> Destino, Fecha, Estado "Finalizado") | Lista de trayectos históricos | Volver a P30/P33 |

---

## Módulo 6: Administración y Moderación (Pantallas 37 a 41)

| ID | Pantalla | Wireframe PDF (Página) | Componentes Clave | Inputs / Controles | Acciones / Navegación |
|---|---|---|---|---|---|
| **P37** | Hub de Administración | Pág. 37 | Header con Volver, Banner de seguridad "Solo administradores" con role badge privilegiado, Lista de accesos de gestión | Botones de navegación administrativa | Volver a P01; Links a P38, P39, P40, P41 |
| **P38** | Moderación de Reportes | Pág. 38 | Header con Volver, Cola de reportes con metadatos de auditoría (tipo, fecha, anónimo/usuario, estado pendiente) | Botón "Revisar reporte", Botón "Aprobar", Botón "Rechazar" | Volver a P37; Cambiar estado del reporte en IndexedDB |
| **P39** | Estadísticas | Pág. 39 | Header con Volver, Tarjetas KPI (Total de reportes: 120), Gráficos de barra accesibles por categoría, estado y mapa de calor por zona | Filtro de período temporal | Volver a P37 |
| **P40** | Gestión de Usuarios | Pág. 40 | Header con Volver, `SearchBar` de usuarios, Lista con Nombre y Estado (Activo, Inactivo, Bloqueado) | Input de búsqueda, Botón "Ver / gestionar usuario" con toggle de estado | Volver a P37 |
| **P41** | Gestión de Reportes Global | Pág. 41 | Header con Volver, Barra de búsqueda, Filtros avanzados por categoría y estado, Tabla/tarjetas de gestión | Input búsqueda, Selects de filtro, Botón "Gestionar reporte" | Volver a P37; Ir a P21 o modal de resolución |

# IMPLEMENTATION_PLAN.md: Plan de Desarrollo por Etapas y Progreso

Este plan estructura la construcción incremental de "Alerta Vecinos" garantizando el cumplimiento de la Definition of Done (DoD) y la fidelidad absoluta a las 41 pantallas de Figma y `DESIGN.md`.

---

## Estado Global de Progreso
- **Etapa 1: Análisis, Inventario y Master Docs:** [x] 100% Completado.
- **Etapa 2: Setup Técnico y Sistema Base:** [x] 100% Completado (Vite 6 + TypeScript 5.7 estricto + Tailwind CSS 3.4).
- **Etapa 3: Módulo 1 - Inicio y Seguridad Comunitaria (P01-P10):** [x] 100% Completado.
- **Etapa 4: Módulo 2 - Reportes y Autenticación (P11-P21):** [x] 100% Completado.
- **Etapa 5: Módulo 3 - Seguridad Personal y "Llegué Bien" (P22-P25):** [x] 100% Completado.
- **Etapa 6: Módulo 4 - Favoritos (P26-P29):** [x] 100% Completado.
- **Etapa 7: Módulo 5 - Perfil de Usuario e Historial (P30-P36):** [x] 100% Completado.
- **Etapa 8: Módulo 6 - Administración y Moderación (P37-P41):** [x] 100% Completado.
- **Etapa 9: Auditoría de Accesibilidad WCAG 2.2 AA y Responsive:** [x] 100% Completado.
- **Etapa 10: Entrega Final y Documentación de Cierre:** [x] 100% Completado.

---

## Detalle de Etapas de Implementación

### Etapa 1: Análisis e Inventario (Completada)
- [x] Lectura integral de `DESIGN.md` y resolución de inconsistencias semánticas de color (ADR-001).
- [x] Inspección visual y extracción de las 41 páginas de `EFI Figma Alerta Vecinos (1).pdf`.
- [x] Generación del inventario completo en `FIGMA_CONTEXT.md`.
- [x] Modelado de flujos y diagramas Mermaid en `USER_FLOWS.md`.
- [x] Creación de documentos maestros en `docs/contexto/`.

### Etapa 2: Setup Técnico y Componentes Base (Completada)
- [x] Inicialización del proyecto con Vite 6 + TypeScript 5.7 estricto (`tsc --noEmit` limpio).
- [x] Configuración de Tailwind CSS con tokens de `DESIGN.md` y variables semánticas.
- [x] Incorporación de Google Fonts: `Outfit` (500, 600, 700) e `Inter` (400, 500, 600, 700).
- [x] Implementación de la suite de componentes reutilizables con los 5 estados obligatorios (`Default`, `Hover`, `Active`, `Focus`, `Disabled`): `AppHeader`, `PrimaryButton`, `SecondaryButton`, `SOSButton`, `ActionCard`, `ReportCard`, `StatusBadge`, `FormField`, `SearchBar`, `ConfirmationDialog`.
- [x] Implementación del router cliente hash-based reactivo y de los stores con persistencia LocalStorage / datos semilla de Argentina.
- [x] Herramienta flotante `ScreenNavigator` para auditoría directa de cualquiera de las 41 pantallas.

### Etapa 3: Módulo 1 - Inicio y Seguridad Comunitaria (Pantallas 1 a 10) (Completada)
- [x] P01: Dashboard principal con grid 2x2, accesos a módulos, badge de rol y SOS flotante en Thumb Zone.
- [x] P02: Mapa de riesgo vectorial interactivo con semáforo (Verde, Amarilla, Roja) y leyenda explicativa.
- [x] P03: Alertas cercanas con listado dinámico, distancias y radio actual.
- [x] P04: Selector interactivo táctil de radio de búsqueda (500m, 1km, 2km, 5km) con persistencia en store.
- [x] P05: Listado de Paradas Seguras con distancias relativas y servicios de seguridad.
- [x] P06: Buscador de paradas con filtro instantáneo en tiempo real por nombre, calle y línea.
- [x] P07: Vista detallada de parada en mapa con equipamiento de protección (LED, Domo 360°, SOS).
- [x] P08: Consejos preventivos barriales y accesos a emergencias.
- [x] P09: Recomendaciones ampliadas de seguridad ciudadana y autocuidado.
- [x] P10: Directorio de emergencias de marcación táctil directa sin costo (Policía 911, SAME 107, Bomberos 100, Defensa Civil 103, Violencia de Género 144).

### Etapa 4: Módulo 2 - Reportes y Autenticación (Pantallas 11 a 21) (Completada)
- [x] P11: Hub de Reportes (Crear / Consultar públicos).
- [x] P12: Lista de Reportes Públicos con distancias, categorías y badges de estado.
- [x] P13: Filtro multicriterio reactivo (distancia por slider, categoría, estado).
- [x] P14: Pantalla de Iniciar Sesión y Registro con validación de inputs.
- [x] P15: Paso 1 del Wizard: Introducción y propósito ("¿Qué querés reportar?").
- [x] P16: Paso 2: Selección de categoría (Robo, Actividad Sospechosa, Accidente, Vandalismo, Incendio, Otro).
- [x] P17: Paso 3: Formulario con selector de ubicación GPS, descripción multilínea, carga multimedia y toggle anónimo.
- [x] P18: Paso 4: Resumen con generación automática de tracking ID (`REP-XXXXXX`) y fecha/hora.
- [x] P19: Diálogo accesible de confirmación de envío con advertencia comunitaria.
- [x] P20: Pantalla de éxito con feedback positivo (check verde animado) y accesos directos.
- [x] P21: Ficha completa de detalle del reporte con mapa de localización e historial.

### Etapa 5: Módulo 3 - Seguridad Personal / "Llegué Bien" (Pantallas 22 a 25) (Completada)
- [x] P22: Preparar trayecto con selección de destino, contacto de seguridad y chips de lugares frecuentes.
- [x] P23: Selección de destino con autocompletado y selección directa de favoritos.
- [x] P24: Selección de contacto de seguridad con radio buttons accesibles.
- [x] P25: Pantalla de Trayecto Activo con trazado de ruta en tiempo real, botones "¡Llegué Bien!", "Enviar Alerta" preventiva y "Finalizar Trayecto".

### Etapa 6: Módulo 4 - Favoritos (Pantallas 26 a 29) (Completada)
- [x] P26: Listado de lugares guardados (Casa, Trabajo, Facultad) con acciones Editar y Eliminar.
- [x] P27: Formulario de agregar lugar con persistencia en LocalStorage.
- [x] P28: Formulario de editar lugar con precarga inmediata de datos.
- [x] P29: Modal de confirmación destructiva para eliminar lugar con advertencia visual.

### Etapa 7: Módulo 5 - Perfil e Historial (Pantallas 30 a 36) (Completada)
- [x] P30: Mi Perfil con resumen del vecino, avatar, role badge y accesos a configuraciones.
- [x] P31: Editar perfil personal con validación de inputs y guardado en store.
- [x] P32: Centro de Notificaciones con histórico de eventos y estado leído/no leído.
- [x] P33: Hub de Historial Personal.
- [x] P34: Historial de Mis Reportes con tracking y estado.
- [x] P35: Historial de Reportes Comentados con citas textuales y fecha.
- [x] P36: Historial de Mis Trayectos completados con duración y estado Finalizado.

### Etapa 8: Módulo 6 - Administración y Moderación (Pantallas 37 a 41) (Completada)
- [x] P37: Panel administrativo protegido con RoleBadge exclusivo "Solo administradores".
- [x] P38: Cola de Moderación de Reportes con acciones interactivas de Aprobar (Verificado) y Rechazar.
- [x] P39: Panel de Estadísticas con métricas acumuladas (120 reportes), gráficos de barra accesibles por categoría y desglose por zonas.
- [x] P40: Gestión de Usuarios (búsqueda, estado Activo/Bloqueado y modal informativo).
- [x] P41: Gestión Global de Reportes con filtros combinados y resolución directa de incidentes.

### Etapa 9: Auditoría y Verificación de Calidad (Completada)
- [x] Verificación de los 5 estados obligatorios en cada elemento interactivo (`Default`, `Hover`, `Active`, `Focus`, `Disabled`).
- [x] Auditoría de accesibilidad WCAG 2.2 AA (contraste >= 4.5:1 en texto normal, >= 3:1 en UI, foco visible `focus-visible:ring-2`, etiquetas ARIA).
- [x] Verificación en viewport móvil de 390px (centrado en 430px en desktop) y adaptación fluida.
- [x] Compilación TypeScript estricta sin errores (`npx tsc --noEmit` exit 0).
- [x] Build de producción optimizado con Vite (`npm run build` exit 0 en < 1s).

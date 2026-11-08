# COMPONENTS.md: Catálogo de Componentes Reutilizables

Este catálogo define los componentes transversales de la aplicación "Alerta Vecinos", su especificación visual según `DESIGN.md`, accesibilidad WCAG 2.2 AA y la implementación obligatoria de los **5 Estados de Componente**.

---

## 1. Matriz de los 5 Estados Obligatorios

Todo control interactivo debe contemplar explícitamente:
1. **Default:** Estado base en reposo con contraste visual adecuado.
2. **Hover:** Respuesta al pasar el cursor (en dispositivos con puntero): `hover:brightness-105 hover:-translate-y-0.5 transition-all`.
3. **Active:** Presionado táctil o clic: `active:scale-95 active:brightness-95`.
4. **Focus:** Navegación por teclado visible e inequívoca: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600`.
5. **Disabled:** Deshabilitado con contraste suficiente y cursor bloqueado: `disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`.

---

## 2. Inventario de Componentes

### 1. `AppHeader`
- **Propósito:** Barra superior móvil consistente en las 41 pantallas.
- **Anatomía:** Botón de retroceso contextual (`BackButton`), Título de pantalla (`Outfit SemiBold` 20px `#0F172A`), Badge de rol opcional (`AdminBadge`) o indicador de estado, y botón derecho opcional (Perfil o Notificaciones).
- **Accesibilidad:** Etiqueta `aria-label="Volver a la pantalla anterior"`, encabezado semántico `<h1>` o `<h2>`.

### 2. `PrimaryButton`
- **Propósito:** Botón principal para llamadas a la acción determinantes ("Continuar", "Confirmar Reporte", "Iniciar Trayecto", "Guardar").
- **Tokens Visuales:** Fondo `#2563EB` (Institutional Safety Blue), texto `#FFFFFF`, tipografía `Outfit Medium` (16px), radio `16px` (`rounded-lg`), altura mínima `48px` (52px recomendado).
- **Estados:** Default (`bg-blue-600 text-white`), Hover (`hover:bg-blue-700`), Active (`active:scale-95`), Focus (`focus-visible:ring-2 focus-visible:ring-blue-600`), Disabled (`opacity-50 cursor-not-allowed`).

### 3. `SecondaryButton` / `OutlineButton`
- **Propósito:** Acciones secundarias ("Cancelar", "Volver al resumen", "Editar reporte", "Limpiar filtros").
- **Tokens Visuales:** Fondo `#FFFFFF`, borde 1.5px `#CBD5E1`, texto `#0F172A`, radio `16px`, altura mínima `48px`.
- **Estados:** Default (`bg-white border-slate-300 text-slate-900`), Hover (`hover:bg-slate-50 hover:border-slate-400`), Active (`active:bg-slate-100`), Focus (`focus-visible:ring-2 focus-visible:ring-slate-400`), Disabled (`opacity-50`).

### 4. `SOSButton`
- **Propósito:** Activación crítica de auxilio inmediato y marcación 911.
- **Tokens Visuales:** Fondo `#EF4444` (Critical Emergency Red), texto `#FFFFFF`, icono de alarma, sombra Nivel 3 (`0px 12px 24px -4px rgba(239, 68, 68, 0.3)`), anillo de pulsación sutil.
- **Seguridad UX:** Aislado espacialmente de controles cotidianos para evitar clics accidentales. Diálogo de confirmación rápida o pulsación sostenida (press-and-hold de 1.5s).

### 5. `ActionCard` (Grid 2x2 de Inicio)
- **Propósito:** Accesos rápidos del Dashboard (Mapa de Riesgo, Alertas Cercanas, Paradas Seguras, Consejos Preventivos).
- **Tokens Visuales:** Relación de aspecto ~4:3 o 1:1, fondo `#FFFFFF`, borde 1px `#E2E8F0`, radio `16px`, padding `16px`, sombra Nivel 1.
- **Icon Badges:** Contenedor de 40x40px con fondos tonales:
  - Mapa de Riesgo: Fondo `#EFF6FF`, icono `#2563EB`.
  - Paradas Seguras: Fondo `#ECFDF5`, icono `#10B981`.
  - Consejos / Alertas: Fondo `#FEF3C7`, icono `#D97706`.

### 6. `ReportCard`
- **Propósito:** Elemento de lista en Reportes Públicos, Mis Reportes y Moderación.
- **Anatomía:** Icono de categoría, título de incidente, badge de estado (`StatusBadge`), distancia estimada, fecha/hora y botón de acción.
- **Tokens Visuales:** Fondo `#FFFFFF`, borde 1px `#E2E8F0`, padding `14px`, radio `16px`, hover interactivo.

### 7. `StatusBadge`
- **Propósito:** Señalización inequívoca del estado de un reporte o entidad.
- **Variantes Semánticas:**
  - *Verificado / Seguro:* Fondo `#ECFDF5`, texto `#065F46`, icono check.
  - *Precaución / Pendiente:* Fondo `#FEF3C7`, texto `#92400E`, icono reloj/alerta.
  - *Crítico / Emergencia:* Fondo `#FEF2F2`, texto `#991B1B`, icono exclamación.
  - *Resuelto / Finalizado:* Fondo `#EFF6FF`, texto `#1E40AF`.
  - *Admin Clearance:* Fondo `#0F172A`, texto `#F8FAFC`, icono candado.

### 8. `FormField` e `InputField`
- **Propósito:** Campos de texto, email, contraseña y áreas de texto multilínea.
- **Tokens Visuales:** Altura 48px, fondo `#FFFFFF`, borde 1.5px `#CBD5E1`, radio `12px`, padding horizontal `14px`, texto `#0F172A`, placeholder `#94A3B8`.
- **Estados y Validación:** Focus (`border-blue-600 ring-2 ring-blue-100`), Error (`border-red-500 ring-2 ring-red-100`), mensaje de error asociado por `aria-describedby`.

### 9. `SearchBar`
- **Propósito:** Búsqueda en tiempo real para Paradas Seguras, Usuarios y Reportes.
- **Anatomía:** Icono lupa a la izquierda, input de texto con debounce, botón de limpieza (`clear`) a la derecha.

### 10. `ConfirmationDialog` / `Modal`
- **Propósito:** Ventanas de confirmación para acciones irreversibles o de impacto (Confirmar reporte, Eliminar favorito, Salir del trayecto).
- **Accesibilidad:** `role="dialog"`, `aria-modal="true"`, encabezado `aria-labelledby`, foco retenido en el diálogo y cierre con tecla `Escape`.

### 11. `EmptyState`, `LoadingState` y `ErrorState`
- **`EmptyState`:** Mensaje explicativo con icono tonal y botón de llamada a la acción cuando no hay datos (ej. "No hay alertas en tu radio", "Sin reportes guardados").
- **`LoadingState`:** Skeleton cards con animación suave (`animate-pulse`) que preservan el layout sin salto visual.
- **`ErrorState` / `BannerAlert`:** Contenedor con `role="alert"` que comunica claramente fallas de validación o conectividad.

# Convenciones de Código y Estilo: Alerta Vecinos

## 1. Nomenclatura y Estructura
- **Archivos de Componentes:** PascalCase (ej. `ActionCard.ts`, `AppHeader.ts`, `ReportCard.ts`).
- **Módulos / Rutas:** kebab-case (ej. `mapa-riesgo.ts`, `crear-reporte.ts`, `trayecto-activo.ts`).
- **Constantes y Enums:** UPPER_SNAKE_CASE (ej. `REPORT_CATEGORIES`, `STORAGE_KEYS`).
- **Funciones y Variables:** camelCase (ej. `renderAlerts()`, `currentRadioKm`).
- **Interfaces y Tipos:** PascalCase con prefijo semántico si aplica (ej. `ReportItem`, `UserSession`, `StopLocation`).

## 2. Estándares TypeScript
- Strict mode activado (`"strict": true` en `tsconfig.json`).
- Cero uso de `any` implícito o explícito; tipar todos los parámetros de eventos y retornos.
- Tipado exhaustivo de los 5 estados en cada componente interactivo.

## 3. Estándares HTML5 Semántico y Accesibilidad (WCAG 2.2 AA)
- Uso de etiquetas estructurales nativas: `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`.
- Todo botón sin texto legible debe poseer `aria-label` explícito.
- Modales deben implementar `role="dialog"`, `aria-modal="true"`, foco atrapado y tecla `Escape` para cerrar.
- Mensajes de error y banners de estado deben utilizar `role="alert"` o `aria-live="polite"`.
- Los inputs de formulario deben estar asociados inequívocamente a su `<label>` mediante `id` y `for`.
- Altura mínima táctil de 48px × 48px para cualquier control interactivo.

## 4. Git y Commits Semánticos
- Formato: `tipo(alcance): descripción breve en español o inglés`.
- Ejemplos:
  - `feat(reportes): agregar wizard de 4 pasos con validación`
  - `fix(a11y): corregir contraste de badges en modo claro`
  - `docs(contexto): actualizar inventario de pantallas y decisiones`

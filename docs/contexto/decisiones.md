# Registro de Decisiones de Arquitectura (ADR)

## ADR-001: Unificación de Tokens Semánticos entre Frontmatter YAML y Brand & Style de DESIGN.md

- **Estado:** Aprobado / Propuesto para implementación.
- **Fecha:** 2026-11-03.
- **Contexto:**
  En `DESIGN.md`, existen dos fuentes de definición de color:
  1. El frontmatter YAML inicial utiliza una escala derivada de Material Design 3 donde `primary` es `#004ac6` y `primary-container` es `#2563eb`.
  2. La sección descriptiva oficial `## Colors` y `## Brand & Style` (junto con la Sección 4 del requerimiento del usuario) establece explícitamente:
     - Azul institucional: `#2563EB` (Primary Action & Brand)
     - Verde de seguridad y verificación: `#10B981` (Safe Zone & Paradas)
     - Ámbar preventivo: `#F59E0B` (Community Warning & Consejos)
     - Rojo exclusivo de emergencia crítica: `#EF4444` (SOS panic & 911)
     - Canvas base: `#F8FAFC`, Tarjeta: `#FFFFFF`, Borde: `#E2E8F0`, Texto: `#0F172A` / `#475569`.
- **Decisión:**
  Se adopta la paleta de `Brand & Style` / Requerimiento `#2563EB`, `#10B981`, `#F59E0B`, `#EF4444` como los tokens semánticos primarios del sistema de diseño, manteniendo los tokens de superficie neutra Slate (`#F8FAFC`, `#FFFFFF`, `#E2E8F0`, `#0F172A`, `#475569`) para garantizar un contraste WCAG AA superior a 4.5:1 en textos normales y 3:1 en componentes UI.
- **Justificación (Why):**
  La paleta de la sección descriptiva está calibrada para legibilidad en exteriores bajo la luz solar, evitando tonalidades apagadas o ambiguas. Protege la semántica del botón SOS reservando el rojo `#EF4444` exclusivamente para situaciones de peligro inminente.
- **Consecuencias (How):**
  Se configuran variables CSS raíz (`--color-primary`, `--color-secondary`, `--color-warning`, `--color-emergency`, etc.) y se extienden en la configuración de Tailwind CSS.

---

## ADR-002: Enrutamiento SPA Hash-Based con Historial y Breadcrumbs de Navegación

- **Estado:** Aprobado.
- **Fecha:** 2026-11-03.
- **Contexto:**
  El diseño de Figma contempla 41 pantallas conectadas con botones `← Volver`, recorridos paso a paso (Wizard de 4 pasos en Crear Reporte) y accesos directos desde el Dashboard. La aplicación debe ser desplegable en cualquier hosting estático (GitHub Pages, Vercel, Netlify, o localmente vía Vite) sin requerir reescritura de URLs en el servidor (`history.pushState` fallback).
- **Decisión:**
  Implementar un cliente router basado en hash (`#inicio`, `#reportes/crear/tipo`, `#seguridad/trayecto-activo`, etc.) que preserve una pila de navegación en memoria (`navigationStack`), permitiendo que el botón volver contextual (`AppHeader`) retorne de forma intuitiva a la pantalla anterior sin perder estados temporales de formularios.
- **Justificación (Why):**
  Garantiza portabilidad inmediata sin configuración de servidor y asegura la heurística de Nielsen #3 (Control y libertad del usuario) al permitir volver atrás de forma predecible.

---

## ADR-003: Almacenamiento Híbrido LocalStorage e IndexedDB para Modo Offline y Datos Simulados

- **Estado:** Aprobado.
- **Fecha:** 2026-11-03.
- **Contexto:**
  El proyecto no posee backend real y debe operar como una aplicación completamente interactiva y funcional con persistencia en el navegador del usuario.
- **Decisión:**
  - `LocalStorage`: Preferencias de interfaz (radio de búsqueda seleccionado, datos de perfil activo, lugares favoritos y estado del trayecto).
  - `IndexedDB`: Almacén de reportes comunitarios (creados por el usuario y los de muestra), registro de alertas y paradas seguras geolocalizadas.
  - Al iniciar por primera vez, se precargan datos semilla realistas contextualizados en Argentina (Córdoba/Buenos Aires con direcciones reales, tiempos, paradas seguras y números 911/107/100).
- **Justificación (Why):**
  Evita la pérdida de datos al recargar la página, permite que la creación y moderación de reportes sea persistente en la sesión de evaluación del profesor, y cumple con los estándares de la regla técnica mandatoria.

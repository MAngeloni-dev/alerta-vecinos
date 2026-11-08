---
name: dom-dynamism-vanilla
description: Guía de dinamismo y manipulación reactiva del DOM con JavaScript Vanilla limpio, validación de formularios y persistencia en LocalStorage para Alerta Vecinos.
---

# Skill: Dinamismo DOM con JavaScript Vanilla

Esta skill rige la arquitectura de interactividad sin librerías ni frameworks pesados para "Alerta Vecinos".

## Patrones de Interactividad
1. **Renderizado Reactivo de Tarjetas:**
   - Mantener un array de estado en memoria con fallback inicial de 4 reportes de muestra.
   - Función pura `renderAlerts(alertsList)` que genera los elementos `<article>` usando `innerHTML` o `document.createElement`.
2. **Filtrado Rápido por Categorías:**
   - Botones con `data-category="all|robo|sospecha|medica|servicios"`.
   - Filtrar la lista y re-renderizar instantáneamente con transición suave.
3. **Validación Accesible y Feedback sin Recarga:**
   - Capturar el evento `submit` con `e.preventDefault()`.
   - Validar campos requeridos antes de guardar.
   - Insertar el nuevo reporte al inicio del muro (`unshift`).
   - Disparar banner o alerta accesible (`role="alert"`, `aria-live="polite"`).
4. **Persistencia en LocalStorage:**
   - Guardar y recuperar listas con `localStorage.setItem('alerta_vecinos_data', JSON.stringify(data))`.
   - Manejo seguro de excepciones con `try/catch`.

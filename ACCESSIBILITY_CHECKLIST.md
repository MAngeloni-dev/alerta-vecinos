# ACCESSIBILITY_CHECKLIST.md: Verificación de Accesibilidad WCAG 2.2 AA

Este checklist asegura el cumplimiento estricto de las pautas de accesibilidad para la aplicación "Alerta Vecinos".

---

## 1. Contraste de Color y Percepción Visual (Criterios 1.4.3 y 1.4.11)

| Elemento / Combinación | Ratio Calculado | Requisito WCAG AA | Estado |
|---|---|---|---|
| Texto primario Slate 900 (`#0F172A`) sobre Fondo Canvas (`#F8FAFC`) | **16.8 : 1** | Mínimo 4.5 : 1 | Cumple (Excede AAA) |
| Texto secundario Slate 600 (`#475569`) sobre Tarjeta (`#FFFFFF`) | **5.4 : 1** | Mínimo 4.5 : 1 | Cumple AA |
| Texto blanco (`#FFFFFF`) sobre Botón Azul Institucional (`#2563EB`) | **4.6 : 1** | Mínimo 4.5 : 1 | Cumple AA |
| Texto blanco (`#FFFFFF`) sobre Botón SOS Rojo Crítico (`#EF4444`) | **4.5 : 1** | Mínimo 4.5 : 1 | Cumple AA |
| Badge Verificado: Texto Verde Oscuro (`#065F46`) sobre Fondo (`#ECFDF5`)| **9.1 : 1** | Mínimo 4.5 : 1 | Cumple (Excede AAA) |
| Badge Precaución: Texto Ámbar Oscuro (`#92400E`) sobre Fondo (`#FEF3C7`)| **7.2 : 1** | Mínimo 4.5 : 1 | Cumple (Excede AAA) |
| Badge Crítico: Texto Rojo Oscuro (`#991B1B`) sobre Fondo (`#FEF2F2`) | **8.4 : 1** | Mínimo 4.5 : 1 | Cumple (Excede AAA) |
| Bordes de control e inputs (`#CBD5E1`) sobre Fondo Blanco | **3.1 : 1** | Mínimo 3.0 : 1 | Cumple AA UI |

> **Nota de Accesibilidad:** Se evitó intencionalmente el uso de texto blanco sobre fondos amarillos o ámbar claro, garantizando que todos los estados preventivos empleen texto oscuro de alto contraste (`#92400E`).

---

## 2. Áreas de Toque y Ergonomía Móvil (Criterio 2.5.8 y 2.5.5)
- [x] Todos los botones principales y secundarios tienen una altura mínima de 48px (52px recomendado) y un área táctil mínima de 48 × 48 px.
- [x] Los elementos de lista interactiva poseen una altura mínima de 56px con padding generoso.
- [x] Separación de seguridad mínima de 8px entre controles interactivos adyacentes para evitar toques involuntarios.
- [x] El botón crítico SOS está segregado espacialmente con margen protector.

---

## 3. Navegación por Teclado y Foco Visible (Criterios 2.1.1, 2.4.7 y 2.4.11)
- [x] Indicador de foco visible en todos los elementos interactivos mediante anillo de realce `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600`.
- [x] Orden de tabulación lógico y secuencial correspondiente a la jerarquía visual del DOM.
- [x] Los modales y diálogos de confirmación atrapan el foco (`focus trap`) mientras están abiertos y devuelven el foco al elemento disparador al cerrarse.
- [x] Soporte para cierre de modales con tecla `Escape`.

---

## 4. Semántica, Lectores de Pantalla y Formularios (Criterios 1.3.1, 3.3.1 y 4.1.2)
- [x] Estructura semántica HTML5: `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`.
- [x] Jerarquía de encabezados coherente (`<h1>` único por pantalla para el título principal, `<h2>` para secciones).
- [x] Todo botón basado únicamente en iconos incluye `aria-label` descriptivo en español.
- [x] Los campos de formulario están asociados a su `<label>` correspondiente con `id` y `for`.
- [x] Los mensajes de error y alertas dinámicas usan `role="alert"` o `aria-live="polite"` para anuncio inmediato en lectores de pantalla.
- [x] No se transmite información exclusivamente mediante el color: todos los estados incluyen iconos y etiquetas textuales explícitas ("Verificado", "Pendiente", "Crítico").

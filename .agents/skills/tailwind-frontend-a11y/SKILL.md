---
name: tailwind-frontend-a11y
description: Guía de maquetación con Tailwind CSS CDN, arquitectura de diseño en modo oscuro/claro y accesibilidad WCAG AA para Alerta Vecinos.
---

# Skill: Tailwind Frontend & Accesibilidad (a11y)

Esta skill proporciona las directivas para maquetar interfaces modernas, reactivas y accesibles en "Alerta Vecinos".

## Principios Clave
1. **Tailwind CSS v3 CDN:** Emplear clases de utilidad para diseño responsivo (`sm:`, `md:`, `lg:`).
2. **Modo Oscuro con Clase `dark`:** El toggle alterna la clase `.dark` en la etiqueta `<html>`. Los colores de superficie deben usar variantes `dark:bg-slate-900`, `dark:text-slate-50`.
3. **Los 5 Estados Obligatorios:**
   - `Default`: Reposo de alto contraste.
   - `Hover`: `hover:brightness-110 hover:-translate-y-0.5 transition-all`.
   - `Active`: `active:scale-95`.
   - `Focus`: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`.
   - `Disabled`: `disabled:opacity-50 disabled:cursor-not-allowed`.
4. **Accesibilidad (a11y) WCAG AA:**
   - Contraste mínimo 4.5:1 en texto regular.
   - Texto forzado en blanco (`text-white`) en botones de acción y emergencias (`#ef4444`, `#0ea5e9`).
   - Dimensiones táctiles mínimas de 44px x 44px en móviles.

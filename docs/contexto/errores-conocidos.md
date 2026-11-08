# Errores Conocidos y Gotchas Documentados

Este registro documenta desafíos técnicos y trampas de UX identificadas durante el análisis y su resolución planificada.

1. **Gotcha: Ambigüedad en Botones de Retorno del Wireframe:**
   - *Problema:* El PDF utiliza inconsistentemente `<-- Volver`, `← Volver` e `Ir al inicio`.
   - *Solución:* Centralizar la navegación en un componente `AppHeader` estandarizado que renderiza una flecha SVG accesible con etiqueta clara "Volver" y navegación hacia la ruta previa o `#inicio`.

2. **Gotcha: Sobrescritura de Historial del Navegador:**
   - *Problema:* En flujos multipaso como el reporte (P15 a P20), un usuario que presiona "Atrás" en el navegador podría romper el estado del formulario o quedar atrapado en un bucle si el router no gestiona la pila.
   - *Solución:* El hash router almacena una pila interna de navegación (`navHistory`) y gestiona eventos `hashchange` para sincronizar los pasos sin pérdida de datos.

3. **Gotcha: Contraste de Texto sobre Badges y Botones:**
   - *Problema:* El uso de amarillos intensos (`#F59E0B`) con texto blanco suele fallar el ratio de contraste WCAG AA (requiere 4.5:1).
   - *Solución:* Para advertencias/precaución, utilizar fondo tonal `#FEF3C7` con texto oscuro `#92400E` (ratio superior a 7:1) como especifica `DESIGN.md`.

4. **Gotcha: Confusión entre Botón SOS y Botones de Formulario:**
   - *Problema:* Utilizar el color rojo en botones estándar de cancelar o resetear formularios confunde a los usuarios en apps de seguridad barrial.
   - *Solución:* El color rojo `#EF4444` se reserva con exclusividad estricta para emergencias críticas / SOS y llamadas al 911. Los errores de formulario usan tonos secundarios o bordes neutros con iconos de advertencia.

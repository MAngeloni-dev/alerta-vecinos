# UX_UI_DECISIONS.md: Fundamentación Teórica y Decisiones de Diseño

Este documento fundamenta las decisiones de diseño adoptadas en "Alerta Vecinos" según la psicología cognitiva, leyes de Gestalt y las 10 Heurísticas de Usabilidad de Nielsen.

---

## 1. Aplicación de las Leyes de Gestalt

1. **Ley de Proximidad:**
   - *Aplicación:* En `ActionCard` y `ReportCard`, los metadatos relacionados (icono, título, distancia y badge) se agrupan a distancias reducidas (`space-xs` = 4px a `space-sm` = 8px), mientras que las tarjetas individuales se distancian por `space-md` (16px). Esto permite al usuario percibir cada reporte como una unidad informativa diferenciada de un vistazo.
2. **Ley de Semejanza:**
   - *Aplicación:* Todos los botones primarios comparten el color `#2563EB`, la tipografía `Outfit Medium` y el radio de 16px. El usuario identifica de inmediato su función de avance sin necesidad de leer detalladamente cada etiqueta.
3. **Ley de Continuidad y Región Común:**
   - *Aplicación:* Las tarjetas y filas de navegación están delimitadas por bordes finos `#E2E8F0` sobre el lienzo `#F8FAFC`. Esta región común encierra los elementos interactivos, guiando el recorrido visual de arriba hacia abajo sin fricción.
4. **Ley de Figura y Fondo:**
   - *Aplicación:* Los diálogos de confirmación (P19, P29) y el botón SOS flotante utilizan elevación sombreada y fondos de alto contraste con desenfoque (`backdrop-blur-sm`), aislando visualmente el contenido crítico respecto al fondo secundario.

---

## 2. Aplicación de las 10 Heurísticas de Usabilidad de Jakob Nielsen

1. **Visibilidad del estado del sistema (#1):**
   - En el flujo de creación de reportes (P15 a P20), un indicador visual de pasos (`Paso 2 de 4`) y badges de estado (`Pendiente`, `Verificado`) informan permanentemente en qué etapa se encuentra la solicitud. En el trayecto activo (P25), un banner animado confirma "Trayecto en curso".
2. **Correspondencia entre el sistema y el mundo real (#2):**
   - Vocabulario contextualizado al dialecto argentino cotidiano ("Llegué Bien", "Paradas Seguras", "Facultad", "¿Qué querés reportar?", "Guardar cambios").
3. **Control y libertad del usuario (#3):**
   - En todas las pantallas secundarias existe un botón de retorno evidente `← Volver`. En acciones críticas o destructivas (eliminar favorito, confirmar envío de reporte), se ofrecen opciones explícitas de cancelación ("No, volver al resumen", "Cancelar").
4. **Consistencia y estándares (#4):**
   - El sistema de colores de `DESIGN.md` se aplica con rigor: Azul para navegación y marca, Verde para seguridad/verificación, Ámbar para advertencias y Rojo únicamente para emergencias graves.
5. **Prevención de errores (#5):**
   - El botón SOS está físicamente separado de controles habituales. Los formularios deshabilitan el botón de avance hasta que los campos obligatorios cumplen el formato esperado.
6. **Reconocimiento antes que recuerdo (#6):**
   - Al preparar un trayecto seguro (P22) o seleccionar destino (P23), los lugares frecuentes ("Casa", "Trabajo", "Facultad") se muestran como chips seleccionables directos sin obligar al usuario a tipear direcciones repetidas.
7. **Flexibilidad y eficiencia de uso (#7):**
   - Accesos directos 2x2 en el Dashboard para tareas inmediatas (Mapa, Paradas, Alertas) y buscador reactivo con autocompletado en tiempo real.
8. **Diseño estético y minimalista (#8):**
   - Densidad de información equilibrada; se descartan decoraciones superfluas o sobrecarga de texto que comprometan la lectura bajo el resplandor solar.
9. **Ayuda para que los usuarios reconozcan, diagnostiquen y se recuperen de errores (#9):**
   - Mensajes de validación en lenguaje claro al pie de cada input (`role="alert"`), con indicaciones precisas de cómo resolver la omisión.
10. **Ayuda y documentación (#10):**
    - Módulo dedicado de "Consejos Preventivos" (P08) y "Recomendaciones" (P09) con números directos de asistencia ciudadana (P10).

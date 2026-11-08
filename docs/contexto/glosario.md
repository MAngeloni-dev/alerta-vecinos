# Glosario del Dominio: Alerta Vecinos

Este documento define el vocabulario común del negocio, entidades clave del sistema y terminología técnica empleada en el proyecto.

---

## Entidades Principales

1. **Alerta Comunitaria (Community Alert):**
   Notificación geolocalizada emitida por vecinos o autoridades dentro de un radio determinado que advierte sobre un evento reciente (ej. actividad sospechosa, corte de luminaria, robo).
2. **Reporte (Incident Report):**
   Publicación formal creada por un vecino con categoría tipificada (Robo, Actividad Sospechosa, Accidente, Vandalismo, Incendio, Otro), ubicación específica, descripción, adjunto opcional y opción de anonimato. Posee un ciclo de vida con estados (`Pendiente`, `Verificado`, `Rechazado`, `Resuelto`) y un código único de tracking (`REP-XXXXXX`).
3. **Parada Segura (Safe Bus Stop):**
   Punto de transporte público o refugio urbano identificado en el mapa que cuenta con iluminación reforzada, pulsador de auxilio o cercanía a un comercio adherido a la red de protección barrial.
4. **Mapa de Riesgo (Risk Heatmap):**
   Visualización cartográfica clasificada por semáforo de seguridad:
   - *Zona Verde:* Área patrullada y con baja incidencia de reportes.
   - *Zona Amarilla:* Área de precaución moderada o iluminación deficiente.
   - *Zona Roja:* Área de riesgo elevado o reportes recientes sin resolver.
5. **Seguridad Personal ("Llegué Bien"):**
   Módulo de acompañamiento digital durante un traslado donde el usuario selecciona un destino (o favorito), un contacto de confianza, e inicia una sesión de trayecto activo. Permite enviar actualizaciones, disparar alerta preventiva o confirmar la llegada segura.
6. **Lugares Favoritos:**
   Destinos frecuentes del usuario (ej. Casa, Trabajo, Facultad) almacenados para agilizar la preparación de trayectos seguros o reportes.
7. **Botón SOS (Panic Dispatch):**
   Control de emergencia crítica de máxima visibilidad e interactividad aislada que permite llamar rápidamente al 911 o emitir una señal de auxilio a la red de contactos.

---

## Términos Técnicos y de Interfaz

- **Thumb Zone:** Zona ergonómica inferior de la pantalla del móvil (120px a 360px desde la base) donde el pulgar del usuario interactúa con mayor agilidad y menor fatiga muscular.
- **Micro-interacciones:** Respuestas táctiles y visuales instantáneas al presionar controles (ej. escala leve `scale-95`, elevación de sombra, pulso de ring en focus).
- **Los 5 Estados de Componente:**
  1. *Default:* Estado normal de reposo.
  2. *Hover:* Cursor posicionado sobre el elemento (en desktop/puntero).
  3. *Active:* Elemento presionado o en ejecución inmediata.
  4. *Focus:* Selección por teclado visible (`focus-visible:ring-2`).
  5. *Disabled:* Elemento inactivo con contraste apropiado y cursor `not-allowed`.

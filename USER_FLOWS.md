# USER_FLOWS.md: Recorridos de Usuario y Navegación

Este documento modela los recorridos funcionales principales y las transiciones entre las 41 pantallas de "Alerta Vecinos".

---

## 1. Recorrido Principal: Crear y Gestionar Reporte (Wizard de 7 pasos)

```mermaid
flowchart TD
    P11["P11: Hub de Reportes"] -->|Crear reporte| P14{"¿Usuario autenticado?"}
    P14 -->|No| P14_Auth["P14: Iniciar Sesión / Registro"]
    P14_Auth -->|Login exitoso| P15["P15: Crear Reporte (Intro)"]
    P14 -->|Sí| P15
    P15 -->|Seleccionar tipo| P16["P16: Elegir Categoría (Robo, Accidente, etc.)"]
    P16 -->|Continuar| P17["P17: Completar Datos (Ubicación, Texto, Adjunto, Anonimato)"]
    P17 -->|Continuar| P18["P18: Resumen del Reporte (Tracking REP-XXXXXX)"]
    P18 -->|Confirmar Reporte| P19["P19: Modal Confirmar Reporte"]
    P19 -->|Sí, confirmar| P20["P20: Reporte Exitoso (Feedback)"]
    P19 -->|No, volver| P18
    P18 -->|Editar| P17
    P20 -->|Ver detalle| P21["P21: Detalle del Reporte"]
    P20 -->|Volver al inicio| P01["P01: Dashboard Inicio"]
```

---

## 2. Recorrido de Seguridad Personal: "Llegué Bien"

```mermaid
flowchart TD
    P01["P01: Dashboard Inicio"] -->|Seguridad Personal| P22["P22: Preparar Trayecto"]
    P22 -->|Seleccionar destino| P23["P23: Seleccionar Destino (Búsqueda o Favoritos)"]
    P23 -->|Destino elegido| P22
    P22 -->|Elegir contacto| P24["P24: Elegir Contacto de Confianza"]
    P24 -->|Contacto asignado| P22
    P22 -->|Iniciar Trayecto| P25["P25: Trayecto Activo"]
    P25 -->|Llegué Bien| P25_Done["Feedback: Llegada Exitosa notificada"]
    P25 -->|Enviar Alerta| P25_Alert["Modal: Alerta preventiva enviada"]
    P25 -->|Finalizar Trayecto| P01
```

---

## 3. Recorrido de Consulta: Paradas Seguras y Radio

```mermaid
flowchart TD
    P01["P01: Dashboard Inicio"] -->|Alertas Cercanas| P03["P03: Alertas Cercanas"]
    P03 -->|Configurar radio| P04["P04: Slider Radio (500m a 5km)"]
    P04 -->|Guardar| P03
    P01 -->|Paradas Seguras| P05["P05: Paradas Seguras"]
    P05 -->|Buscar| P06["P06: Buscar Paradas (Filtro en tiempo real)"]
    P06 -->|Seleccionar parada| P07["P07: Ubicación de Parada en Mapa"]
    P05 -->|Ver ubicación| P07
```

---

## 4. Recorrido de Favoritos y Lugares Frecuentes

```mermaid
flowchart TD
    P01["P01: Dashboard Inicio"] -->|Favoritos| P26["P26: Lista de Favoritos (Casa, Trabajo, Facultad)"]
    P26 -->|Agregar nuevo lugar| P27["P27: Formulario Agregar Lugar"]
    P27 -->|Guardar| P26
    P26 -->|Editar lugar| P28["P28: Formulario Editar Lugar"]
    P28 -->|Guardar cambios| P26
    P26 -->|Eliminar lugar| P29["P29: Modal Confirmar Eliminación"]
    P29 -->|Confirmar| P26
    P29 -->|Cancelar| P26
```

---

## 5. Recorrido de Administración y Moderación

```mermaid
flowchart TD
    P01["P01: Dashboard Inicio"] -->|Administración (Badge Privilegiado)| P37["P37: Hub de Administración"]
    P37 -->|Moderación| P38["P38: Moderar Reportes (Aprobar / Rechazar)"]
    P37 -->|Estadísticas| P39["P39: Estadísticas (KPIs y Gráficos)"]
    P37 -->|Gestión Usuarios| P40["P40: Gestión de Usuarios (Activar / Bloquear)"]
    P37 -->|Gestión Reportes| P41["P41: Gestión Global de Reportes (Filtros y Resolución)"]
    P38 -->|Aprobar/Rechazar| P38
    P41 -->|Ver detalle| P21["P21: Detalle del Reporte"]
```

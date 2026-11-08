import { appStore } from '../state/store';
import { Icons } from '../components/icons';
import { renderAppHeader, renderActionCard } from '../components/common';

export function renderP01Inicio(): string {
  const state = appStore.getState();
  const unreadCount = state.notifications.filter((n) => !n.read).length;

  return `
    <div class="flex flex-col min-h-screen">
      <!-- Header de bienvenida -->
      <header class="bg-surface-canvas px-4 pt-5 pb-3 border-b border-surface-border">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-full bg-safety-blue text-white flex items-center justify-center font-outfit font-bold text-lg shadow-sm">
              AV
            </div>
            <div>
              <p class="text-xs font-medium text-content-muted">Bienvenido/a</p>
              <h1 class="font-outfit font-bold text-xl text-content-title leading-tight">
                Alerta Vecinos
              </h1>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a
              href="#p32-notificaciones"
              class="relative w-10 h-10 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-content-title hover:bg-slate-100 transition-colors"
              aria-label="Ver notificaciones (${unreadCount} nuevas)"
            >
              ${Icons.bell('w-5 h-5 text-content-title')}
              ${
                unreadCount > 0
                  ? `<span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-safety-red rounded-full ring-2 ring-white"></span>`
                  : ''
              }
            </a>
            <a
              href="#p30-mi-perfil"
              class="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 font-outfit font-semibold text-sm hover:ring-2 hover:ring-safety-blue transition-all"
              aria-label="Ver mi perfil"
            >
              ${state.user.avatar || 'MR'}
            </a>
          </div>
        </div>
      </header>

      <main class="flex-1 px-4 py-4 space-y-5">
        <!-- Quick Access 2x2 Grid -->
        <section aria-labelledby="quick-access-title">
          <h2 id="quick-access-title" class="sr-only">Accesos Rápidos de Seguridad</h2>
          <div class="grid grid-cols-2 gap-3">
            ${renderActionCard(
              'Mapa de Riesgo',
              'Zonas seguras y críticas',
              Icons.map('w-5 h-5'),
              '#p02-mapa-riesgo',
              'blue'
            )}
            ${renderActionCard(
              'Alertas Cercanas',
              'Incidentes en tu radio',
              Icons.alertTriangle('w-5 h-5'),
              '#p03-alertas-cercanas',
              'amber'
            )}
            ${renderActionCard(
              'Paradas Seguras',
              'Puntos iluminados y SOS',
              Icons.bus('w-5 h-5'),
              '#p05-paradas-seguras',
              'green'
            )}
            ${renderActionCard(
              'Consejos Preventivos',
              'Recomendaciones de cuidado',
              Icons.shield('w-5 h-5'),
              '#p08-consejos-preventivos',
              'amber'
            )}
          </div>
        </section>

        <!-- Lista de Módulos Operacionales -->
        <section aria-labelledby="modules-title" class="space-y-2">
          <h2 id="modules-title" class="font-outfit font-semibold text-sm text-content-muted tracking-wider uppercase px-1">
            Servicios Comunitarios
          </h2>
          <div class="bg-surface-card border border-surface-border rounded-lg shadow-level-1 divide-y divide-surface-border overflow-hidden">
            <a
              href="#p11-reportes"
              class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-safety-blue/10 group-hover:text-safety-blue transition-colors">
                  ${Icons.fileText('w-5 h-5')}
                </div>
                <span class="font-inter font-medium text-sm text-content-title">
                  Reportes
                </span>
              </div>
              <span class="text-content-muted group-hover:text-safety-blue transition-colors">
                ${Icons.chevronRight('w-4 h-4')}
              </span>
            </a>

            <a
              href="#p10-numeros-emergencia"
              class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-md bg-safety-red/10 text-safety-red flex items-center justify-center">
                  ${Icons.phone('w-5 h-5')}
                </div>
                <span class="font-inter font-medium text-sm text-content-title">
                  Emergencias (911 · 107 · 100)
                </span>
              </div>
              <span class="text-content-muted group-hover:text-safety-blue transition-colors">
                ${Icons.chevronRight('w-4 h-4')}
              </span>
            </a>

            <a
              href="#p22-seguridad-personal"
              class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-md bg-safety-green/10 text-safety-green flex items-center justify-center">
                  ${Icons.navigation('w-5 h-5')}
                </div>
                <div>
                  <span class="font-inter font-medium text-sm text-content-title block">
                    Seguridad Personal
                  </span>
                  <span class="text-xs text-content-muted">Acompañamiento "Llegué Bien"</span>
                </div>
              </div>
              <span class="text-content-muted group-hover:text-safety-blue transition-colors">
                ${Icons.chevronRight('w-4 h-4')}
              </span>
            </a>

            <a
              href="#p26-favoritos"
              class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-safety-blue/10 group-hover:text-safety-blue transition-colors">
                  ${Icons.heart('w-5 h-5')}
                </div>
                <span class="font-inter font-medium text-sm text-content-title">
                  Favoritos
                </span>
              </div>
              <span class="text-content-muted group-hover:text-safety-blue transition-colors">
                ${Icons.chevronRight('w-4 h-4')}
              </span>
            </a>

            <a
              href="#p30-mi-perfil"
              class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-safety-blue/10 group-hover:text-safety-blue transition-colors">
                  ${Icons.user('w-5 h-5')}
                </div>
                <span class="font-inter font-medium text-sm text-content-title">
                  Mi Perfil
                </span>
              </div>
              <span class="text-content-muted group-hover:text-safety-blue transition-colors">
                ${Icons.chevronRight('w-4 h-4')}
              </span>
            </a>

            ${appStore.getState().user.role === 'admin' ? `
            <a
              href="#p37-administracion"
              class="flex items-center justify-between p-3.5 hover:bg-indigo-50/50 transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-md bg-slate-900 text-slate-100 flex items-center justify-center">
                  ${Icons.lock('w-4 h-4 text-indigo-300')}
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-inter font-medium text-sm text-content-title">
                    Administración
                  </span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-slate-100 uppercase tracking-wider">
                    Privilegiado
                  </span>
                </div>
              </div>
              <span class="text-content-muted group-hover:text-indigo-600 transition-colors">
                ${Icons.chevronRight('w-4 h-4')}
              </span>
            </a>
            ` : ''}
          </div>
        </section>

        <!-- Botón SOS Flotante / Acceso Rápido Ergonómico en Thumb Zone -->
        <section class="pt-2 pb-6 flex flex-col items-center justify-center">
          <a
            href="#p10-numeros-emergencia"
            class="btn-sos w-full max-w-[280px] h-14 flex items-center justify-center gap-3 px-6"
            aria-label="Botón de emergencia SOS"
          >
            ${Icons.siren('w-6 h-6 animate-pulse')}
            <span class="font-outfit font-bold text-lg tracking-wide uppercase">
              Botón SOS · 911
            </span>
          </a>
          <p class="text-[11px] text-content-muted text-center mt-2">
            Llamada y despacho inmediato de auxilio policial
          </p>
        </section>
      </main>
    </div>
  `;
}

export function renderP02MapaRiesgo(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Mapa de riesgo', '#p01-inicio')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Canvas Interactivo del Mapa de Riesgo -->
        <div class="relative w-full h-80 bg-slate-200 rounded-lg overflow-hidden border border-surface-border shadow-level-1">
          <!-- Mapa Vectorial Estilizado -->
          <svg class="w-full h-full" viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
            <!-- Calles y Manzanas de fondo -->
            <rect width="400" height="320" fill="#E2E8F0"/>
            <rect x="20" y="20" width="80" height="60" rx="4" fill="#CBD5E1"/>
            <rect x="120" y="20" width="120" height="60" rx="4" fill="#CBD5E1"/>
            <rect x="260" y="20" width="120" height="60" rx="4" fill="#CBD5E1"/>
            <rect x="20" y="100" width="80" height="80" rx="4" fill="#CBD5E1"/>
            <rect x="120" y="100" width="120" height="80" rx="4" fill="#CBD5E1"/>
            <rect x="260" y="100" width="120" height="80" rx="4" fill="#CBD5E1"/>
            <rect x="20" y="200" width="80" height="90" rx="4" fill="#CBD5E1"/>
            <rect x="120" y="200" width="120" height="90" rx="4" fill="#CBD5E1"/>
            <rect x="260" y="200" width="120" height="90" rx="4" fill="#CBD5E1"/>

            <!-- Arterias Principales -->
            <line x1="0" y1="90" x2="400" y2="90" stroke="#FFFFFF" stroke-width="12"/>
            <line x1="0" y1="190" x2="400" y2="190" stroke="#FFFFFF" stroke-width="12"/>
            <line x1="110" y1="0" x2="110" y2="320" stroke="#FFFFFF" stroke-width="12"/>
            <line x1="250" y1="0" x2="250" y2="320" stroke="#FFFFFF" stroke-width="12"/>

            <!-- Zonas Semafóricas con Opacidad de Calor -->
            <!-- Zona Verde: Sector Norte / Centro -->
            <circle cx="180" cy="60" r="45" fill="#10B981" fill-opacity="0.3" stroke="#10B981" stroke-width="2"/>
            <text x="180" y="65" text-anchor="middle" font-family="Outfit" font-size="11" font-weight="bold" fill="#065F46">Zona Segura</text>

            <!-- Zona Amarilla: Sector Este -->
            <circle cx="310" cy="140" r="50" fill="#F59E0B" fill-opacity="0.3" stroke="#F59E0B" stroke-width="2"/>
            <text x="310" y="145" text-anchor="middle" font-family="Outfit" font-size="11" font-weight="bold" fill="#92400E">Precaución</text>

            <!-- Zona Roja: Sector Suroeste -->
            <circle cx="70" cy="240" r="40" fill="#EF4444" fill-opacity="0.35" stroke="#EF4444" stroke-width="2"/>
            <text x="70" y="245" text-anchor="middle" font-family="Outfit" font-size="11" font-weight="bold" fill="#991B1B">Riesgo Alto</text>

            <!-- Marcador de Posición Actual del Usuario -->
            <circle cx="180" cy="140" r="8" fill="#2563EB" stroke="#FFFFFF" stroke-width="3"/>
            <circle cx="180" cy="140" r="16" fill="#2563EB" fill-opacity="0.2"/>
          </svg>

          <!-- Floating Map Control -->
          <div class="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-md shadow-md p-1.5 flex flex-col gap-1 border border-surface-border text-content-title">
            <button class="w-8 h-8 flex items-center justify-center font-bold text-base hover:bg-slate-100 rounded" title="Acercar mapa">+</button>
            <div class="h-px bg-slate-200"></div>
            <button class="w-8 h-8 flex items-center justify-center font-bold text-base hover:bg-slate-100 rounded" title="Alejar mapa">-</button>
          </div>
        </div>

        <!-- Leyenda de Seguridad Semafórica -->
        <section class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-3">
          <h2 class="font-outfit font-semibold text-base text-content-title">
            Leyenda de Seguridad:
          </h2>
          <div class="space-y-2.5">
            <div class="flex items-center gap-3">
              <span class="w-4 h-4 rounded-full bg-safety-green ring-2 ring-safety-green/20 shrink-0"></span>
              <div>
                <p class="font-inter font-medium text-sm text-content-title leading-tight">Zona Verde</p>
                <p class="text-xs text-content-muted">Área patrullada frecuentemente, buena luminaria y baja incidencia.</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <span class="w-4 h-4 rounded-full bg-safety-amber ring-2 ring-safety-amber/20 shrink-0"></span>
              <div>
                <p class="font-inter font-medium text-sm text-content-title leading-tight">Zona Amarilla</p>
                <p class="text-xs text-content-muted">Precaución moderada. Circulación con pertenencias resguardadas.</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <span class="w-4 h-4 rounded-full bg-safety-red ring-2 ring-safety-red/20 shrink-0"></span>
              <div>
                <p class="font-inter font-medium text-sm text-content-title leading-tight">Zona Roja</p>
                <p class="text-xs text-content-muted">Riesgo elevado. Reportes recientes sin resolver o iluminación precaria.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA de reporte directo desde el mapa -->
        <div class="pt-2">
          <a href="#p15-crear-reporte-intro" class="btn-primary w-full gap-2">
            ${Icons.plus('w-5 h-5')}
            Reportar incidente en esta zona
          </a>
        </div>
      </main>
    </div>
  `;
}

export function renderP03AlertasCercanas(): string {
  const state = appStore.getState();

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Alertas Cercanas', '#p01-inicio')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Banner de Radio de Búsqueda -->
        <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 flex items-center justify-between">
          <div>
            <p class="text-xs text-content-muted">Alertas en tu zona</p>
            <p class="font-outfit font-semibold text-lg text-content-title">
              Radio actual: ${state.searchRadiusKm} km
            </p>
          </div>
          <a
            href="#p04-radio-busqueda"
            class="px-3 py-2 text-xs font-semibold text-safety-blue bg-safety-blue-subtle border border-safety-blue/20 rounded-md hover:bg-safety-blue/20 transition-colors"
          >
            Configurar radio
          </a>
        </div>

        <!-- Listado de Alertas en tu zona -->
        <section class="space-y-3" aria-labelledby="alertas-title">
          <h2 id="alertas-title" class="font-outfit font-semibold text-sm text-content-muted uppercase tracking-wider px-1">
            Incidentes Recientes Detectados
          </h2>

          <div class="space-y-3">
            <!-- Alerta 1: Actividad sospechosa -->
            <article class="p-4 bg-surface-card border-l-4 border-l-safety-amber border border-surface-border rounded-lg shadow-level-1 space-y-2">
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-safety-amber-dark bg-safety-amber-subtle px-2.5 py-0.5 rounded-full">
                  ${Icons.alertTriangle('w-3.5 h-3.5')}
                  Actividad sospechosa
                </span>
                <span class="text-xs font-medium text-content-muted">
                  a 800 m
                </span>
              </div>
              <p class="text-xs text-content-body leading-relaxed">
                Personas observando cerraduras de portones sobre calle Mariano Moreno. Vecinos alertados.
              </p>
              <div class="pt-2 border-t border-slate-100 flex justify-end">
                <a
                  href="#p21-detalle-reporte?id=rep-003"
                  class="btn-secondary min-h-[38px] px-3 py-1 text-xs font-semibold"
                >
                  Ver incidente
                </a>
              </div>
            </article>

            <!-- Alerta 2: Robo -->
            <article class="p-4 bg-surface-card border-l-4 border-l-safety-red border border-surface-border rounded-lg shadow-level-1 space-y-2">
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-safety-red-dark bg-safety-red-subtle px-2.5 py-0.5 rounded-full">
                  ${Icons.alertTriangle('w-3.5 h-3.5')}
                  Robo
                </span>
                <span class="text-xs font-medium text-content-muted">
                  a 500 m
                </span>
              </div>
              <p class="text-xs text-content-body leading-relaxed">
                Arrebato en parada de colectivo en Bv. San Juan. Móvil policial en camino.
              </p>
              <div class="pt-2 border-t border-slate-100 flex justify-end">
                <a
                  href="#p21-detalle-reporte?id=rep-002"
                  class="btn-secondary min-h-[38px] px-3 py-1 text-xs font-semibold"
                >
                  Ver incidente
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  `;
}

export function renderP04RadioBusqueda(): string {
  const currentRadius = appStore.getState().searchRadiusKm;
  const options = [0.5, 1, 2, 5];

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Radio de búsqueda', '#p03-alertas-cercanas')}

      <main class="flex-1 px-4 py-6 space-y-6">
        <div class="bg-surface-card border border-surface-border rounded-lg p-5 shadow-level-1 space-y-6">
          <div class="text-center space-y-1">
            <p class="text-xs text-content-muted">Configuración de Cobertura</p>
            <h2 id="radio-display" class="font-outfit font-bold text-2xl text-safety-blue">
              Radio seleccionado: ${currentRadius >= 1 ? `${currentRadius} km` : `${currentRadius * 1000} m`}
            </h2>
            <p class="text-xs text-content-body">
              Solo recibirás notificaciones y avisos de incidentes que ocurran dentro de esta distancia.
            </p>
          </div>

          <!-- Selector Segmentado Táctil -->
          <div class="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Seleccionar radio">
            ${options
              .map(
                (km) => `
                <button
                  type="button"
                  onclick="window.selectRadius(${km})"
                  class="radio-btn flex flex-col items-center justify-center p-3 rounded-lg border text-sm font-semibold transition-all ${
                    currentRadius === km
                      ? 'bg-safety-blue text-white border-safety-blue shadow-sm'
                      : 'bg-surface-card text-content-title border-slate-300 hover:bg-slate-50'
                  }"
                  role="radio"
                  aria-checked="${currentRadius === km}"
                >
                  <span>${km >= 1 ? `${km} km` : `${km * 1000} m`}</span>
                </button>
              `
              )
              .join('')}
          </div>

          <!-- Control Deslizante de Respaldo -->
          <div class="space-y-2 pt-2">
            <label for="range-slider" class="text-xs text-content-muted flex justify-between">
              <span>Rango visual:</span>
              <span>500 m — 5 km</span>
            </label>
            <input
              id="range-slider"
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value="${currentRadius}"
              onchange="window.selectRadius(parseFloat(this.value))"
              class="w-full accent-safety-blue cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>
        </div>

        <button
          onclick="window.saveRadius()"
          class="btn-primary w-full"
        >
          Guardar configuración
        </button>
      </main>
    </div>
  `;
}

export function renderP05ParadasSeguras(): string {
  const stops = appStore.getState().safeStops;

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Paradas Seguras', '#p01-inicio')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Buscador Rápido -->
        <a
          href="#p06-buscar-paradas"
          class="w-full min-h-[48px] px-4 bg-surface-card border border-slate-300 rounded-md flex items-center justify-between text-content-placeholder hover:border-slate-400 transition-colors shadow-sm"
        >
          <span class="flex items-center gap-2 text-sm text-content-muted">
            ${Icons.search('w-4 h-4')}
            Buscar Parada ...
          </span>
          <span class="text-xs text-safety-blue font-semibold">Buscar</span>
        </a>

        <!-- Lista de Paradas Cercanas -->
        <section class="space-y-3" aria-labelledby="paradas-list-title">
          <h2 id="paradas-list-title" class="font-outfit font-semibold text-sm text-content-muted uppercase tracking-wider px-1">
            Paradas en tu entorno
          </h2>

          <div class="space-y-3">
            ${stops
              .map(
                (stop) => `
                <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 hover:border-safety-green/30 transition-all">
                  <div class="flex items-start justify-between">
                    <div class="flex items-center gap-2.5">
                      <div class="w-9 h-9 rounded-md bg-safety-green-subtle text-safety-green flex items-center justify-center shrink-0">
                        ${Icons.bus('w-5 h-5')}
                      </div>
                      <div>
                        <h3 class="font-outfit font-semibold text-base text-content-title leading-tight">
                          ${stop.name}
                        </h3>
                        <p class="text-xs text-content-muted flex items-center gap-1 mt-0.5">
                          ${Icons.mapPin('w-3 h-3')} a ${stop.distance}
                        </p>
                      </div>
                    </div>
                    <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-safety-green-subtle text-safety-green-dark">
                      Segura
                    </span>
                  </div>

                  <p class="text-xs text-content-body mt-2">
                    ${stop.address}
                  </p>

                  <div class="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                    <span class="text-[11px] text-content-muted">
                      ${stop.lines.slice(0, 2).join(' · ')}
                    </span>
                    <a
                      href="#p07-ubicacion-parada?id=${stop.id}"
                      class="px-3 py-1.5 text-xs font-semibold text-safety-green-dark bg-safety-green-subtle border border-safety-green/20 rounded-md hover:bg-safety-green/20 transition-colors inline-flex items-center gap-1"
                    >
                      Ver ubicación ${Icons.chevronRight('w-3 h-3')}
                    </a>
                  </div>
                </article>
              `
              )
              .join('')}
          </div>
        </section>
      </main>
    </div>
  `;
}

export function renderP06BuscarParadas(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Buscar Paradas', '#p05-paradas-seguras')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Campo de Entrada Activo -->
        <div class="relative">
          <input
            id="search-stop-input"
            type="search"
            placeholder="Buscar por nombre, línea o calle..."
            class="form-input pl-10 pr-4"
            autofocus
            oninput="window.filterStops(this.value)"
          />
          <div class="absolute left-3 top-3.5 text-content-placeholder">
            ${Icons.search('w-4 h-4')}
          </div>
        </div>

        <!-- Resultados Filtrados en Tiempo Real -->
        <div id="stops-results-container" class="space-y-3">
          <!-- Renderizado dinámico -->
        </div>
      </main>
    </div>
  `;
}

export function renderP07UbicacionParada(stopId = 'stop-01'): string {
  const stops = appStore.getState().safeStops;
  const stop = stops.find((s) => s.id === stopId) || stops[0];

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Ubicación de Parada', '#p05-paradas-seguras')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Mapa de la Parada -->
        <div class="relative w-full h-64 bg-slate-200 rounded-lg overflow-hidden border border-surface-border shadow-level-1">
          <svg class="w-full h-full" viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="260" fill="#E2E8F0"/>
            <!-- Trazado de Calles -->
            <line x1="0" y1="130" x2="360" y2="130" stroke="#FFFFFF" stroke-width="20"/>
            <line x1="180" y1="0" x2="180" y2="260" stroke="#FFFFFF" stroke-width="20"/>

            <!-- Parada Segura con Halo Verde -->
            <circle cx="180" cy="130" r="30" fill="#10B981" fill-opacity="0.2"/>
            <circle cx="180" cy="130" r="14" fill="#10B981" stroke="#FFFFFF" stroke-width="3"/>

            <!-- Icono Bus / Parada -->
            <text x="180" y="175" text-anchor="middle" font-family="Outfit" font-size="12" font-weight="bold" fill="#065F46">
              ● ${stop.name}
            </text>
          </svg>
          <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-semibold text-safety-green-dark border border-safety-green/20">
            [ Mapa de la parada ]
          </div>
        </div>

        <!-- Ficha de Información de la Parada -->
        <section class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-3">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="font-outfit font-bold text-lg text-content-title">
                ● ${stop.name}
              </h2>
              <p class="text-xs font-medium text-safety-green-dark mt-0.5">
                Ubicación: a ${stop.distance} de tu posición actual
              </p>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-safety-green-subtle text-safety-green-dark">
              Verificada
            </span>
          </div>

          <p class="text-xs text-content-body">
            <strong>Dirección:</strong> ${stop.address}
          </p>

          <div class="space-y-1.5 pt-2 border-t border-slate-100">
            <p class="text-xs font-semibold text-content-title">Equipamiento de Protección:</p>
            <ul class="text-xs text-content-muted space-y-1">
              ${stop.features
                .map(
                  (f) => `
                <li class="flex items-center gap-2">
                  ${Icons.check('w-3.5 h-3.5 text-safety-green')}
                  <span>${f}</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>
        </section>

        <!-- Botones de Acción -->
        <div class="space-y-2 pt-2">
          <a
            href="#p22-seguridad-personal"
            class="btn-primary w-full gap-2"
          >
            ${Icons.navigation('w-5 h-5')}
            Ir a esta parada con "Llegué Bien"
          </a>
          <a
            href="#p05-paradas-seguras"
            class="btn-secondary w-full"
          >
            Volver a la lista de paradas
          </a>
        </div>
      </main>
    </div>
  `;
}

export function renderP08ConsejosPreventivos(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Consejos Preventivos', '#p01-inicio')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <div class="bg-safety-amber-subtle border border-safety-amber/20 rounded-lg p-4 space-y-1">
          <h2 class="font-outfit font-semibold text-base text-safety-amber-dark flex items-center gap-2">
            ${Icons.shield('w-5 h-5')}
            Consejos de prevención barrial
          </h2>
          <p class="text-xs text-safety-amber-dark/80">
            Pautas diseñadas por comités vecinales y personal de seguridad ciudadana.
          </p>
        </div>

        <section class="space-y-3">
          <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-1.5">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              1. Evitá circular por zonas poco iluminadas
            </h3>
            <p class="text-xs text-content-body leading-relaxed">
              Durante la noche, optá siempre por corredores comerciales o calles con luminaria LED activa, aun cuando implique caminar unas cuadras adicionales.
            </p>
          </article>

          <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-1.5">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              2. Mantené tus pertenencias a la vista
            </h3>
            <p class="text-xs text-content-body leading-relaxed">
              En paradas de transporte público o zonas de alto tránsito, evitá manipular el teléfono celular de forma descuidada.
            </p>
          </article>

          <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-1.5">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              3. Compartí tu ubicación al viajar
            </h3>
            <p class="text-xs text-content-body leading-relaxed">
              Utilizá el módulo "Llegué Bien" para que un contacto de confianza conozca tu trayecto en tiempo real.
            </p>
          </article>
        </section>

        <!-- Accesos Directos a Recomendaciones y Emergencias -->
        <div class="space-y-2 pt-2">
          <a
            href="#p09-recomendaciones"
            class="btn-primary w-full gap-2"
          >
            Ver más recomendaciones
          </a>
          <a
            href="#p10-numeros-emergencia"
            class="btn-secondary w-full text-safety-red border-safety-red/30 hover:bg-safety-red-subtle gap-2"
          >
            ${Icons.phone('w-4 h-4 text-safety-red')}
            Números de emergencia
          </a>
        </div>
      </main>
    </div>
  `;
}

export function renderP09Recomendaciones(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Recomendaciones', '#p08-consejos-preventivos')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <section class="bg-surface-card border border-surface-border rounded-lg p-5 shadow-level-1 space-y-4">
          <h2 class="font-outfit font-bold text-lg text-content-title border-b border-slate-100 pb-2">
            Recomendaciones de Autocuidado
          </h2>

          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-safety-blue-subtle text-safety-blue font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </span>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Evitá zonas poco iluminadas</h3>
                <p class="text-xs text-content-muted leading-relaxed">Buscá siempre transitar por paradas seguras monitoreadas por cámaras.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-safety-blue-subtle text-safety-blue font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </span>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Mantené tus pertenencias a la vista</h3>
                <p class="text-xs text-content-muted leading-relaxed">Llevá bolsos y mochilas hacia adelante en transportes concurridos.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-safety-blue-subtle text-safety-blue font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </span>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Compartí tu ubicación al viajar</h3>
                <p class="text-xs text-content-muted leading-relaxed">Avisá a un familiar o contacto de seguridad antes de salir.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-safety-blue-subtle text-safety-blue font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </span>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Verificá el entorno antes de ingresar a tu hogar</h3>
                <p class="text-xs text-content-muted leading-relaxed">Tené las llaves preparadas y observá que no haya movimientos inusuales.</p>
              </div>
            </div>
          </div>
        </section>

        <a href="#p08-consejos-preventivos" class="btn-secondary w-full">
          Volver a consejos
        </a>
      </main>
    </div>
  `;
}

export function renderP10NumerosEmergencia(): string {
  const numbers = [
    { title: 'Policía', number: '911', desc: 'Atención ciudadana y despacho de patrulleros', color: 'red' },
    { title: 'Ambulancia (SAME / Salud)', number: '107', desc: 'Urgencias médicas y emergentología', color: 'blue' },
    { title: 'Bomberos', number: '100', desc: 'Incendios, rescates y siniestros viales', color: 'amber' },
    { title: 'Defensa Civil', number: '103', desc: 'Tormentas, caídas de árboles y cables', color: 'blue' },
    { title: 'Atención a la Mujer', number: '144', desc: 'Línea nacional para situaciones de violencia', color: 'blue' }
  ];

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Números de emergencia', '#p01-inicio')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <div class="bg-safety-red-subtle border border-safety-red/20 rounded-lg p-3.5 flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-safety-red text-white flex items-center justify-center shrink-0 font-bold">
            SOS
          </div>
          <div>
            <h2 class="font-outfit font-bold text-sm text-safety-red-dark">
              Contactos de emergencia oficial
            </h2>
            <p class="text-xs text-safety-red-dark/80">
              Llamada telefónica directa sin costo desde cualquier dispositivo.
            </p>
          </div>
        </div>

        <section class="space-y-3" aria-label="Lista de teléfonos de emergencia">
          ${numbers
            .map(
              (item) => `
              <div class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 flex items-center justify-between">
                <div>
                  <h3 class="font-outfit font-bold text-base text-content-title">
                    ${item.title} · <span class="text-safety-blue">${item.number}</span>
                  </h3>
                  <p class="text-xs text-content-muted mt-0.5">
                    ${item.desc}
                  </p>
                </div>
                <a
                  href="tel:${item.number}"
                  class="btn-primary min-h-[44px] px-4 py-2 gap-1.5 shrink-0 ml-3"
                  aria-label="Llamar a ${item.title} al ${item.number}"
                >
                  ${Icons.phone('w-4 h-4')}
                  Llamar
                </a>
              </div>
            `
            )
            .join('')}
        </section>
      </main>
    </div>
  `;
}

import { isAdmin } from '../auth';
export interface ScreenInfo {
  id: string;
  name: string;
  module: string;
  page: number;
}

export const ALL_SCREENS: ScreenInfo[] = [
  // Módulo 1: Inicio y Seguridad Comunitaria
  { id: 'p01-inicio', name: 'Inicio / Dashboard', module: 'Inicio & Seguridad', page: 1 },
  { id: 'p02-mapa-riesgo', name: 'Mapa de riesgo', module: 'Inicio & Seguridad', page: 2 },
  { id: 'p03-alertas-cercanas', name: 'Alertas cercanas', module: 'Inicio & Seguridad', page: 3 },
  { id: 'p04-radio-busqueda', name: 'Configuración radio', module: 'Inicio & Seguridad', page: 4 },
  { id: 'p05-paradas-seguras', name: 'Paradas seguras', module: 'Inicio & Seguridad', page: 5 },
  { id: 'p06-buscar-paradas', name: 'Buscar paradas', module: 'Inicio & Seguridad', page: 6 },
  { id: 'p07-ubicacion-parada', name: 'Ubicación de parada', module: 'Inicio & Seguridad', page: 7 },
  { id: 'p08-consejos-preventivos', name: 'Consejos preventivos', module: 'Inicio & Seguridad', page: 8 },
  { id: 'p09-recomendaciones', name: 'Recomendaciones', module: 'Inicio & Seguridad', page: 9 },
  { id: 'p10-numeros-emergencia', name: 'Números de emergencia', module: 'Inicio & Seguridad', page: 10 },

  // Módulo 2: Reportes y Autenticación
  { id: 'p11-reportes', name: 'Reportes Hub', module: 'Reportes & Auth', page: 11 },
  { id: 'p12-reportes-publicos', name: 'Reportes públicos', module: 'Reportes & Auth', page: 12 },
  { id: 'p13-filtrar-reportes', name: 'Filtrar reportes', module: 'Reportes & Auth', page: 13 },
  { id: 'p14-iniciar-sesion', name: 'Iniciar sesión / Registro', module: 'Reportes & Auth', page: 14 },
  { id: 'p15-crear-reporte-intro', name: 'Crear reporte (Paso 1)', module: 'Reportes & Auth', page: 15 },
  { id: 'p16-tipo-reporte', name: 'Tipo de reporte (Paso 2)', module: 'Reportes & Auth', page: 16 },
  { id: 'p17-completar-reporte', name: 'Completar reporte (Paso 3)', module: 'Reportes & Auth', page: 17 },
  { id: 'p18-resumen-reporte', name: 'Resumen reporte (Paso 4)', module: 'Reportes & Auth', page: 18 },
  { id: 'p19-confirmar-reporte', name: 'Confirmar reporte (Modal)', module: 'Reportes & Auth', page: 19 },
  { id: 'p20-reporte-exitoso', name: 'Reporte exitoso', module: 'Reportes & Auth', page: 20 },
  { id: 'p21-detalle-reporte', name: 'Detalle del reporte', module: 'Reportes & Auth', page: 21 },

  // Módulo 3: Seguridad Personal
  { id: 'p22-seguridad-personal', name: 'Seguridad personal / Trayecto', module: 'Seguridad Personal', page: 22 },
  { id: 'p23-seleccionar-destino', name: 'Seleccionar destino', module: 'Seguridad Personal', page: 23 },
  { id: 'p24-elegir-contacto', name: 'Elegir contacto', module: 'Seguridad Personal', page: 24 },
  { id: 'p25-trayecto-activo', name: 'Trayecto activo "Llegué Bien"', module: 'Seguridad Personal', page: 25 },

  // Módulo 4: Favoritos
  { id: 'p26-favoritos', name: 'Lista de favoritos', module: 'Favoritos', page: 26 },
  { id: 'p27-agregar-lugar', name: 'Agregar lugar', module: 'Favoritos', page: 27 },
  { id: 'p28-editar-lugar', name: 'Editar lugar', module: 'Favoritos', page: 28 },
  { id: 'p29-eliminar-lugar', name: 'Eliminar lugar (Modal)', module: 'Favoritos', page: 29 },

  // Módulo 5: Perfil de Usuario
  { id: 'p30-mi-perfil', name: 'Mi perfil', module: 'Perfil & Historial', page: 30 },
  { id: 'p31-editar-perfil', name: 'Editar perfil', module: 'Perfil & Historial', page: 31 },
  { id: 'p32-notificaciones', name: 'Notificaciones', module: 'Perfil & Historial', page: 32 },
  { id: 'p33-historial-personal', name: 'Historial personal', module: 'Perfil & Historial', page: 33 },
  { id: 'p34-mis-reportes', name: 'Mis reportes', module: 'Perfil & Historial', page: 34 },
  { id: 'p35-reportes-comentados', name: 'Reportes comentados', module: 'Perfil & Historial', page: 35 },
  { id: 'p36-mis-trayectos', name: 'Mis trayectos', module: 'Perfil & Historial', page: 36 },

  // Módulo 6: Administración
  { id: 'p37-administracion', name: 'Administración Hub', module: 'Administración', page: 37 },
  { id: 'p38-moderacion-reportes', name: 'Moderación de reportes', module: 'Administración', page: 38 },
  { id: 'p39-estadisticas', name: 'Estadísticas', module: 'Administración', page: 39 },
  { id: 'p40-gestion-usuarios', name: 'Gestión de usuarios', module: 'Administración', page: 40 },
  { id: 'p41-gestion-reportes', name: 'Gestión global de reportes', module: 'Administración', page: 41 }
];

export function renderScreenNavigator(currentPath: string): string {
  const visibleScreens = ALL_SCREENS.filter(s => isAdmin() || s.module !== 'Administración');
  const current = ALL_SCREENS.find((s) => s.id === currentPath) || ALL_SCREENS[0];

  return `
    <!-- Floating Quick Screen Selector (Evaluator Tool) -->
    <aside class="fixed bottom-3 right-3 z-50 print:hidden" aria-label="Navegador de evaluación">
      <button
        id="toggle-screen-modal-btn"
        onclick="document.getElementById('screen-nav-modal').classList.toggle('hidden')"
        class="bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-full shadow-lg border border-slate-700 flex items-center gap-1.5 backdrop-blur-md transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-safety-blue"
        title="Abrir índice completo de las 41 pantallas"
      >
        <span class="w-2 h-2 rounded-full bg-safety-green"></span>
        <span>Pantalla P${String(current.page).padStart(2, '0')}/41</span>
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>
      </button>

      <!-- Modal de Índice Rápido -->
      <div
        id="screen-nav-modal"
        class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        onclick="if(event.target === this) this.classList.add('hidden')"
      >
        <div class="bg-surface-card w-full max-w-md max-h-[85vh] rounded-xl shadow-2xl flex flex-col border border-surface-border overflow-hidden">
          <header class="p-4 border-b border-surface-border flex items-center justify-between bg-surface-canvas">
            <div>
              <h2 class="font-outfit font-bold text-base text-content-title">
                Índice de las 41 Pantallas (Figma Wireframes)
              </h2>
              <p class="text-xs text-content-muted">Navegación directa para auditoría y evaluación</p>
            </div>
            <button
              onclick="document.getElementById('screen-nav-modal').classList.add('hidden')"
              class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold"
              aria-label="Cerrar índice"
            >
              ✕
            </button>
          </header>

          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            ${['Inicio & Seguridad', 'Reportes & Auth', 'Seguridad Personal', 'Favoritos', 'Perfil & Historial', ...(isAdmin() ? ['Administración'] : [])]
              .map((modName) => {
                const screensInModule = visibleScreens.filter((s) => s.module === modName);
                return `
                  <div class="space-y-1.5">
                    <h3 class="text-xs font-bold text-content-muted uppercase tracking-wider px-1">
                      ${modName}
                    </h3>
                    <div class="grid grid-cols-1 gap-1">
                      ${screensInModule
                        .map((s) => {
                          const isAct = s.id === currentPath;
                          return `
                            <a
                              href="#${s.id}"
                              onclick="document.getElementById('screen-nav-modal').classList.add('hidden')"
                              class="flex items-center justify-between px-3 py-2 rounded-md text-xs transition-colors ${
                                isAct
                                  ? 'bg-safety-blue text-white font-bold'
                                  : 'bg-slate-50 hover:bg-slate-100 text-content-title border border-slate-200/60'
                              }"
                            >
                              <span>
                                <strong>P${String(s.page).padStart(2, '0')}:</strong> ${s.name}
                              </span>
                              <span class="text-[10px] ${isAct ? 'text-white/80' : 'text-content-muted'}">
                                Pág. ${s.page}
                              </span>
                            </a>
                          `;
                        })
                        .join('')}
                    </div>
                  </div>
                `;
              })
              .join('')}
          </div>
        </div>
      </div>
    </aside>
  `;
}

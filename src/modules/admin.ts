import { listAccounts } from '../auth';
import { appStore } from '../state/store';
import { Icons } from '../components/icons';
import { renderAppHeader, renderStatusBadge } from '../components/common';

export function renderP37Administracion(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Administración', '#p01-inicio', {
        showAdminBadge: true
      })}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Banner de Privilegios -->
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg shadow-level-1 space-y-1">
          <div class="flex items-center gap-2">
            ${Icons.lock('w-4 h-4 text-indigo-400')}
            <h2 class="font-outfit font-bold text-sm tracking-wide uppercase text-indigo-200">
              Solo Administradores
            </h2>
          </div>
          <p class="text-xs text-slate-300">
            Panel de control, auditoría barrial y moderación comunitaria de Alerta Vecinos.
          </p>
        </div>

        <!-- Opciones de Gestión -->
        <section class="bg-surface-card border border-surface-border rounded-lg shadow-level-1 divide-y divide-surface-border overflow-hidden">
          <a
            href="#p38-moderacion-reportes"
            class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-safety-amber-subtle text-safety-amber-dark flex items-center justify-center">
                ${Icons.alertTriangle('w-5 h-5')}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">
                  Moderación de Reportes
                </h3>
                <p class="text-xs text-content-muted">Aprobar o desestimar alertas entrantes</p>
              </div>
            </div>
            ${Icons.chevronRight('w-4 h-4 text-content-muted')}
          </a>

          <a
            href="#p39-estadisticas"
            class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-safety-blue-subtle text-safety-blue flex items-center justify-center">
                ${Icons.barChart('w-5 h-5')}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">
                  Estadísticas y Métricas
                </h3>
                <p class="text-xs text-content-muted">KPIs de incidentes, zonas calientes y tiempos</p>
              </div>
            </div>
            ${Icons.chevronRight('w-4 h-4 text-content-muted')}
          </a>

          <a
            href="#p40-gestion-usuarios"
            class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center">
                ${Icons.user('w-5 h-5')}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">
                  Gestión de Usuarios
                </h3>
                <p class="text-xs text-content-muted">Vecinos activos, roles y suspensiones</p>
              </div>
            </div>
            ${Icons.chevronRight('w-4 h-4 text-content-muted')}
          </a>

          <a
            href="#p41-gestion-reportes"
            class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-safety-green-subtle text-safety-green flex items-center justify-center">
                ${Icons.fileText('w-5 h-5')}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">
                  Gestión Global de Reportes
                </h3>
                <p class="text-xs text-content-muted">Base histórica y resolución de casos</p>
              </div>
            </div>
            ${Icons.chevronRight('w-4 h-4 text-content-muted')}
          </a>
        </section>
      </main>
    </div>
  `;
}

export function renderP38ModeracionReportes(): string {
  const reports = appStore.getState().reports;

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Moderación de Reportes', '#p37-administracion', {
        showAdminBadge: true
      })}

      <main class="flex-1 px-4 py-4 space-y-4">
        <p class="text-xs text-content-body">
          Revisá los reportes comunitarios pendientes para verificarlos o rechazarlos.
        </p>

        <section class="space-y-3" aria-label="Cola de moderación">
          ${reports
            .map(
              (r) => `
              <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-3">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-outfit font-semibold text-sm text-content-title">
                      ${r.category} · ${r.timestamp.split('·')[0].trim()}
                    </h3>
                    <p class="text-xs text-content-muted">
                      Autor: ${r.isAnonymous ? 'Anónimo' : r.author} · ${r.location}
                    </p>
                  </div>
                  <div>
                    ${renderStatusBadge(r.status)}
                  </div>
                </div>

                <p class="text-xs text-content-body bg-slate-50 p-2.5 rounded border border-slate-100">
                  "${r.description}"
                </p>

                <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                  <a
                    href="#p21-detalle-reporte?id=${r.id}"
                    class="text-xs font-semibold text-safety-blue hover:underline"
                  >
                    Revisar reporte
                  </a>

                  <div class="flex items-center gap-2">
                    <button
                      onclick="window.moderateReport('${r.id}', 'Verificado')"
                      class="px-3 py-1.5 bg-safety-green-subtle text-safety-green-dark border border-safety-green/20 rounded text-xs font-semibold hover:bg-safety-green/20"
                    >
                      Aprobar
                    </button>
                    <button
                      onclick="window.moderateReport('${r.id}', 'Rechazado')"
                      class="px-3 py-1.5 bg-safety-red-subtle text-safety-red-dark border border-safety-red/20 rounded text-xs font-semibold hover:bg-safety-red/20"
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              </article>
            `
            )
            .join('')}
        </section>
      </main>
    </div>
  `;
}

export function renderP39Estadisticas(): string {

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Estadísticas', '#p37-administracion', {
        showAdminBadge: true
      })}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- KPI Card Total de Reportes -->
        <div class="p-5 bg-surface-card border border-surface-border rounded-lg shadow-level-1 text-center space-y-1">
          <p class="text-xs text-content-muted font-medium uppercase tracking-wider">Total de reportes acumulados</p>
          <p class="font-outfit font-bold text-4xl text-safety-blue">
            120
          </p>
          <p class="text-[11px] text-safety-green-dark font-medium">+14% respecto al mes anterior</p>
        </div>

        <!-- Desglose por Categoría con Barras Accesibles -->
        <section class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-3">
          <h3 class="font-outfit font-semibold text-sm text-content-title">
            Por categoría
          </h3>
          <div class="space-y-2.5 text-xs">
            <div>
              <div class="flex justify-between mb-1">
                <span>Robo y arrebatos</span>
                <span class="font-bold">45% (54)</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2.5">
                <div class="bg-safety-amber h-2.5 rounded-full" style="width: 45%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span>Accidentes viales</span>
                <span class="font-bold">25% (30)</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2.5">
                <div class="bg-safety-red h-2.5 rounded-full" style="width: 25%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span>Actividad sospechosa</span>
                <span class="font-bold">20% (24)</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2.5">
                <div class="bg-safety-blue h-2.5 rounded-full" style="width: 20%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span>Vandalismo / Otros</span>
                <span class="font-bold">10% (12)</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2.5">
                <div class="bg-slate-500 h-2.5 rounded-full" style="width: 10%"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Desglose por Estado -->
        <section class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-3">
          <h3 class="font-outfit font-semibold text-sm text-content-title">
            Por estado de resolución
          </h3>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="p-2.5 bg-safety-green-subtle rounded-lg border border-safety-green/20">
              <p class="font-outfit font-bold text-lg text-safety-green-dark">68%</p>
              <p class="text-[11px] text-safety-green-dark font-medium">Verificados</p>
            </div>
            <div class="p-2.5 bg-safety-amber-subtle rounded-lg border border-safety-amber/20">
              <p class="font-outfit font-bold text-lg text-safety-amber-dark">24%</p>
              <p class="text-[11px] text-safety-amber-dark font-medium">Pendientes</p>
            </div>
            <div class="p-2.5 bg-safety-blue-subtle rounded-lg border border-safety-blue/20">
              <p class="font-outfit font-bold text-lg text-safety-blue-dark">8%</p>
              <p class="text-[11px] text-safety-blue-dark font-medium">Resueltos</p>
            </div>
          </div>
        </section>

        <!-- Incidentes por Zona -->
        <section class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <h3 class="font-outfit font-semibold text-sm text-content-title">
            Incidentes por zona barrial
          </h3>
          <div class="space-y-1.5 text-xs text-content-body">
            <div class="flex justify-between p-2 bg-slate-50 rounded">
              <span>Sector Centro (Plaza Roca y peatonales)</span>
              <span class="font-bold text-content-title">42 reportes</span>
            </div>
            <div class="flex justify-between p-2 bg-slate-50 rounded">
              <span>Sector Norte (Corredor universitario)</span>
              <span class="font-bold text-content-title">31 reportes</span>
            </div>
            <div class="flex justify-between p-2 bg-slate-50 rounded">
              <span>Sector Sur (Terminal y accesos)</span>
              <span class="font-bold text-content-title">47 reportes</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  `;
}

export function renderP40GestionUsuarios(): string {
  const users = listAccounts();
  return `<div class="flex flex-col min-h-screen">${renderAppHeader('Gestión de usuarios', '#p37-administracion',{showAdminBadge:true})}
  <main class="flex-1 px-4 py-5 space-y-4"><h2 class="font-outfit font-bold text-lg text-content-title">Usuarios registrados</h2>
    <p class="text-xs text-content-muted">Solo administradores pueden conceder o revocar el rol de administrador. El superusuario principal está protegido.</p>
    <section class="space-y-3">${users.map(u => `<article class="rounded-xl bg-surface-card border border-surface-border p-4 flex items-center justify-between gap-2">
      <div class="min-w-0"><h3 class="font-semibold text-content-title text-sm"></h3><p class="text-xs text-content-muted truncate"></p><span class="text-xs font-semibold text-safety-blue">${u.role === 'admin' ? 'Administrador' : 'Vecino'}</span></div>
      ${u.id === 'root-admin' ? '<span class="text-xs text-content-muted">Superadmin</span>' : `<button type="button" data-role-id="${u.id}" class="role-change-btn btn-secondary text-xs whitespace-nowrap">${u.role === 'admin' ? 'Quitar admin' : 'Dar admin'}</button>`}
    </article>`).join('')}</section></main></div>`;
}

export function renderP41GestionReportes(): string {
  const reports = appStore.getState().reports;

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Gestión de Reportes', '#p37-administracion', {
        showAdminBadge: true
      })}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Buscador y Filtros -->
        <div class="space-y-2">
          <div class="relative">
            <input
              type="search"
              placeholder="Buscar por tracking, calle o palabra clave..."
              class="form-input pl-10"
            />
            <div class="absolute left-3 top-3.5 text-content-placeholder">
              ${Icons.search('w-4 h-4')}
            </div>
          </div>

          <div class="flex gap-2">
            <select class="form-input text-xs min-h-[38px] py-1 bg-surface-card">
              <option>Categoría: Todas</option>
              <option>Robo</option>
              <option>Accidente</option>
              <option>Vandalismo</option>
            </select>
            <select class="form-input text-xs min-h-[38px] py-1 bg-surface-card">
              <option>Estado: Todos</option>
              <option>Pendiente</option>
              <option>Verificado</option>
              <option>Resuelto</option>
            </select>
          </div>
        </div>

        <!-- Lista de Reportes Globales -->
        <section class="space-y-3" aria-label="Gestión global de reportes">
          ${reports
            .map(
              (r) => `
              <article class="p-3.5 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="text-[11px] font-mono font-bold text-safety-blue">${r.trackingId}</span>
                    <h3 class="font-outfit font-semibold text-sm text-content-title">
                      ${r.category} · ${r.timestamp}
                    </h3>
                    <p class="text-xs text-content-muted">${r.location}</p>
                  </div>
                  <div>
                    ${renderStatusBadge(r.status)}
                  </div>
                </div>

                <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span class="text-content-muted">Autor: ${r.author}</span>
                  <div class="flex items-center gap-1.5">
                    <button
                      onclick="window.moderateReport('${r.id}', 'Resuelto')"
                      class="px-2.5 py-1 text-xs font-semibold bg-safety-blue-subtle text-safety-blue rounded hover:bg-safety-blue/20"
                    >
                      Marcar Resuelto
                    </button>
                    <a
                      href="#p21-detalle-reporte?id=${r.id}"
                      class="px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-700 rounded hover:bg-slate-200"
                    >
                      Gestionar
                    </a>
                  </div>
                </div>
              </article>
            `
            )
            .join('')}
        </section>
      </main>
    </div>
  `;
}

import { appStore } from '../state/store';
import { Icons } from '../components/icons';
import { renderAppHeader, renderStatusBadge } from '../components/common';

export function renderP30MiPerfil(): string {
  const user = appStore.getState().user;

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Mi Perfil', '#p01-inicio')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Tarjeta de Identidad de Usuario -->
        <div class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 flex items-center gap-3">
          <div class="w-14 h-14 rounded-full bg-safety-blue text-white font-outfit font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
            ${user.avatar || 'MR'}
          </div>
          <div>
            <h2 class="font-outfit font-bold text-lg text-content-title leading-tight">
              ${user.name} ${user.lastName}
            </h2>
            <p class="text-xs text-content-muted">
              ${user.email}
            </p>
            <div class="flex items-center gap-2 mt-1">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-safety-blue-subtle text-safety-blue uppercase">
                Vecino Verificado
              </span>
              ${
                user.role === 'admin'
                  ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900 text-slate-100 uppercase">Admin</span>`
                  : ''
              }
            </div>
          </div>
        </div>

        <!-- Lista de Secciones y Ajustes -->
        <section class="bg-surface-card border border-surface-border rounded-lg shadow-level-1 divide-y divide-surface-border overflow-hidden">
          <a href="#p31-editar-perfil" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-content-title group-hover:text-safety-blue">
                ${Icons.edit('w-4 h-4')}
              </div>
              <span class="font-inter font-medium text-sm text-content-title">Editar Perfil</span>
            </div>
            ${Icons.chevronRight('w-4 h-4 text-content-muted')}
          </a>

          <a href="#p32-notificaciones" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-content-title group-hover:text-safety-blue">
                ${Icons.bell('w-4 h-4')}
              </div>
              <span class="font-inter font-medium text-sm text-content-title">Notificaciones</span>
            </div>
            ${Icons.chevronRight('w-4 h-4 text-content-muted')}
          </a>

          <a href="#p33-historial-personal" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-content-title group-hover:text-safety-blue">
                ${Icons.clock('w-4 h-4')}
              </div>
              <span class="font-inter font-medium text-sm text-content-title">Historial Personal</span>
            </div>
            ${Icons.chevronRight('w-4 h-4 text-content-muted')}
          </a>

          <a href="#p34-mis-reportes" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-content-title group-hover:text-safety-blue">
                ${Icons.fileText('w-4 h-4')}
              </div>
              <span class="font-inter font-medium text-sm text-content-title">Mis Reportes</span>
            </div>
            ${Icons.chevronRight('w-4 h-4 text-content-muted')}
          </a>

          <a href="#p35-reportes-comentados" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-content-title group-hover:text-safety-blue">
                ${Icons.info('w-4 h-4')}
              </div>
              <span class="font-inter font-medium text-sm text-content-title">Reportes Comentados</span>
            </div>
            ${Icons.chevronRight('w-4 h-4 text-content-muted')}
          </a>

          <a href="#p36-mis-trayectos" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-content-title group-hover:text-safety-blue">
                ${Icons.navigation('w-4 h-4')}
              </div>
              <span class="font-inter font-medium text-sm text-content-title">Mis Trayectos</span>
            </div>
            ${Icons.chevronRight('w-4 h-4 text-content-muted')}
          </a>
        </section>

        <button type="button" onclick="window.handleLogout()" class="btn-secondary w-full">Cerrar sesión</button>
      </main>
    </div>
  `;
}

export function renderP31EditarPerfil(): string {
  const user = appStore.getState().user;

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Editar Perfil', '#p30-mi-perfil')}

      <main class="flex-1 px-4 py-6 space-y-5">
        <form id="edit-profile-form" onsubmit="window.saveUserProfile(event)" class="bg-surface-card border border-surface-border rounded-lg p-5 shadow-level-1 space-y-4">
          <div class="space-y-1">
            <label for="prof-name" class="text-xs font-semibold text-content-title">
              Nombre:
            </label>
            <input
              id="prof-name"
              type="text"
              required
              value="${user.name}"
              class="form-input"
            />
          </div>

          <div class="space-y-1">
            <label for="prof-lastname" class="text-xs font-semibold text-content-title">
              Apellido:
            </label>
            <input
              id="prof-lastname"
              type="text"
              required
              value="${user.lastName}"
              class="form-input"
            />
          </div>

          <div class="space-y-1">
            <label for="prof-email" class="text-xs font-semibold text-content-title">
              Email:
            </label>
            <input
              id="prof-email"
              type="email"
              required
              value="${user.email}"
              class="form-input"
            />
          </div>

          <div class="space-y-2 pt-3">
            <button type="submit" class="btn-primary w-full">
              Guardar cambios
            </button>
            <a href="#p30-mi-perfil" class="btn-secondary w-full">
              Cancelar
            </a>
          </div>
        </form>
      </main>
    </div>
  `;
}

export function renderP32Notificaciones(): string {
  const notifs = appStore.getState().notifications;

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Notificaciones', '#p30-mi-perfil')}

      <main class="flex-1 px-4 py-4 space-y-3">
        ${notifs
          .map(
            (n) => `
            <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-1 ${
              !n.read ? 'border-l-4 border-l-safety-blue bg-blue-50/20' : ''
            }">
              <div class="flex items-center justify-between">
                <h3 class="font-outfit font-semibold text-sm text-content-title flex items-center gap-1.5">
                  ${
                    n.type === 'alerta'
                      ? Icons.alertTriangle('w-4 h-4 text-safety-amber')
                      : n.type === 'reporte'
                      ? Icons.fileText('w-4 h-4 text-safety-blue')
                      : Icons.shield('w-4 h-4 text-safety-green')
                  }
                  ${n.title}
                </h3>
                <span class="text-[11px] text-content-muted">${n.time}</span>
              </div>
              <p class="text-xs text-content-body leading-relaxed">
                ${n.message}
              </p>
            </article>
          `
          )
          .join('')}
      </main>
    </div>
  `;
}

export function renderP33HistorialPersonal(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Historial Personal', '#p30-mi-perfil')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-1">
          <h2 class="font-outfit font-semibold text-base text-content-title">
            Tu actividad reciente
          </h2>
          <p class="text-xs text-content-muted">
            Monitoreá tus intervenciones en la red comunitaria barrial.
          </p>
        </div>

        <section class="space-y-3">
          <a
            href="#p34-mis-reportes"
            class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 flex items-center justify-between hover:border-safety-blue/40 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-safety-blue-subtle text-safety-blue flex items-center justify-center">
                ${Icons.fileText('w-5 h-5')}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Mis Reportes</h3>
                <p class="text-xs text-content-muted">Incidentes que publicaste en la red</p>
              </div>
            </div>
            ${Icons.chevronRight('w-4 h-4 text-content-muted')}
          </a>

          <a
            href="#p35-reportes-comentados"
            class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 flex items-center justify-between hover:border-safety-blue/40 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center">
                ${Icons.info('w-5 h-5')}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Reportes Comentados</h3>
                <p class="text-xs text-content-muted">Comentarios y aportes en alertas de vecinos</p>
              </div>
            </div>
            ${Icons.chevronRight('w-4 h-4 text-content-muted')}
          </a>

          <a
            href="#p36-mis-trayectos"
            class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 flex items-center justify-between hover:border-safety-blue/40 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-safety-green-subtle text-safety-green flex items-center justify-center">
                ${Icons.navigation('w-5 h-5')}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Mis Trayectos</h3>
                <p class="text-xs text-content-muted">Historial de recorridos "Llegué Bien"</p>
              </div>
            </div>
            ${Icons.chevronRight('w-4 h-4 text-content-muted')}
          </a>
        </section>
      </main>
    </div>
  `;
}

export function renderP34MisReportes(): string {

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Mis Reportes', '#p33-historial-personal')}

      <main class="flex-1 px-4 py-4 space-y-3">
        <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              Accidente · 18/08
            </h3>
            ${renderStatusBadge('Pendiente')}
          </div>
          <p class="text-xs font-mono text-content-muted">Tracking: REP-000123</p>
          <p class="text-xs text-content-body">Colisión en Av. Colón y Jujuy.</p>
          <div class="pt-2 border-t border-slate-100 flex justify-end">
            <a href="#p21-detalle-reporte?id=rep-001" class="text-xs font-semibold text-safety-blue hover:underline">
              Ver detalle →
            </a>
          </div>
        </article>

        <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              Robo · 15/08
            </h3>
            ${renderStatusBadge('Verificado')}
          </div>
          <p class="text-xs font-mono text-content-muted">Tracking: REP-000108</p>
          <p class="text-xs text-content-body">Sustracción en parada Plaza Roca.</p>
          <div class="pt-2 border-t border-slate-100 flex justify-end">
            <a href="#p21-detalle-reporte?id=rep-002" class="text-xs font-semibold text-safety-blue hover:underline">
              Ver detalle →
            </a>
          </div>
        </article>
      </main>
    </div>
  `;
}

export function renderP35ReportesComentados(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Reportes Comentados', '#p33-historial-personal')}

      <main class="flex-1 px-4 py-4 space-y-3">
        <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              Robo · comentario del 17/08
            </h3>
            ${renderStatusBadge('Verificado')}
          </div>
          <p class="text-xs text-content-body italic">
            "Confirmé que la patrulla policial acudió a los 10 minutos."
          </p>
          <div class="pt-2 border-t border-slate-100 flex justify-end">
            <a href="#p21-detalle-reporte?id=rep-002" class="text-xs font-semibold text-safety-blue hover:underline">
              Ver reporte →
            </a>
          </div>
        </article>

        <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              Accidente · comentario del 15/08
            </h3>
            ${renderStatusBadge('Resuelto')}
          </div>
          <p class="text-xs text-content-body italic">
            "Semáforo ya reparado por cuadrilla municipal."
          </p>
          <div class="pt-2 border-t border-slate-100 flex justify-end">
            <a href="#p21-detalle-reporte?id=rep-001" class="text-xs font-semibold text-safety-blue hover:underline">
              Ver reporte →
            </a>
          </div>
        </article>
      </main>
    </div>
  `;
}

export function renderP36MisTrayectos(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Mis Trayectos', '#p33-historial-personal')}

      <main class="flex-1 px-4 py-4 space-y-3">
        <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              Casa → Trabajo
            </h3>
            ${renderStatusBadge('Finalizado')}
          </div>
          <p class="text-xs text-content-muted">18/08/2026 · Duración: 22 minutos</p>
          <p class="text-xs text-content-body">Contacto de seguridad notificado: Juan Pérez ("Llegué Bien confirmado").</p>
        </article>

        <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              Facultad → Casa
            </h3>
            ${renderStatusBadge('Finalizado')}
          </div>
          <p class="text-xs text-content-muted">16/08/2026 · Duración: 35 minutos</p>
          <p class="text-xs text-content-body">Contacto de seguridad notificado: María Gómez ("Llegué Bien confirmado").</p>
        </article>
      </main>
    </div>
  `;
}

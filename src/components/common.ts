import { Icons } from './icons';
import { ReportItem } from '../types';

export function renderAppHeader(
  title: string,
  backHash?: string,
  options?: {
    subtitle?: string;
    showAdminBadge?: boolean;
    rightHtml?: string;
  }
): string {
  const backButtonHtml = backHash
    ? `<a
        href="${backHash}"
        class="inline-flex items-center justify-center w-10 h-10 -ml-2 rounded-full text-content-title hover:bg-slate-200/60 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-safety-blue transition-colors"
        aria-label="Volver a la pantalla anterior"
      >
        ${Icons.arrowLeft('w-6 h-6')}
      </a>`
    : `<div class="w-2"></div>`;

  const adminBadgeHtml = options?.showAdminBadge
    ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-900 text-slate-100">
        ${Icons.lock('w-3 h-3 text-indigo-300')}
        Admin
      </span>`
    : '';

  return `
    <header class="sticky top-0 z-40 bg-surface-canvas/95 backdrop-blur-md border-b border-surface-border px-4 py-3 flex items-center justify-between min-h-[58px]">
      <div class="flex items-center gap-2">
        ${backButtonHtml}
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-outfit font-semibold text-lg text-content-title tracking-tight leading-tight">
              ${title}
            </h1>
            ${adminBadgeHtml}
          </div>
          ${
            options?.subtitle
              ? `<p class="text-xs text-content-muted leading-none mt-0.5">${options.subtitle}</p>`
              : ''
          }
        </div>
      </div>
      <div class="flex items-center gap-2">
        ${options?.rightHtml || ''}
      </div>
    </header>
  `;
}

export function renderStatusBadge(status: string): string {
  switch (status) {
    case 'Verificado':
    case 'Seguro':
    case 'Activo':
    case 'Activa':
      return `
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-safety-green-subtle text-safety-green-dark border border-safety-green/20">
          ${Icons.check('w-3 h-3')}
          ${status}
        </span>
      `;
    case 'Pendiente':
    case 'Precaución':
      return `
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-safety-amber-subtle text-safety-amber-dark border border-safety-amber/20">
          ${Icons.clock('w-3 h-3')}
          ${status}
        </span>
      `;
    case 'Crítico':
    case 'Rechazado':
    case 'Bloqueado':
      return `
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-safety-red-subtle text-safety-red-dark border border-safety-red/20">
          ${Icons.alertTriangle('w-3 h-3')}
          ${status}
        </span>
      `;
    case 'Resuelto':
    case 'Finalizado':
      return `
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-safety-blue-subtle text-safety-blue-dark border border-safety-blue/20">
          ${Icons.checkCircle('w-3 h-3')}
          ${status}
        </span>
      `;
    default:
      return `
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
          ${status}
        </span>
      `;
  }
}

export function renderActionCard(
  title: string,
  subtitle: string,
  iconHtml: string,
  targetHash: string,
  colorScheme: 'blue' | 'green' | 'amber' | 'red' = 'blue'
): string {
  const colorMap = {
    blue: 'bg-safety-blue-subtle text-safety-blue border-safety-blue/20',
    green: 'bg-safety-green-subtle text-safety-green border-safety-green/20',
    amber: 'bg-safety-amber-subtle text-safety-amber border-safety-amber/20',
    red: 'bg-safety-red-subtle text-safety-red border-safety-red/20',
  };

  return `
    <a
      href="${targetHash}"
      class="card-action h-36 flex flex-col justify-between p-4 group"
    >
      <div class="flex items-start justify-between">
        <div class="w-10 h-10 rounded-md flex items-center justify-center ${colorMap[colorScheme]} border transition-transform group-hover:scale-105">
          ${iconHtml}
        </div>
        <span class="text-content-muted group-hover:text-safety-blue transition-colors">
          ${Icons.chevronRight('w-4 h-4')}
        </span>
      </div>
      <div>
        <h3 class="font-outfit font-semibold text-base text-content-title group-hover:text-safety-blue transition-colors leading-tight">
          ${title}
        </h3>
        <p class="text-xs text-content-muted mt-0.5 line-clamp-1">
          ${subtitle}
        </p>
      </div>
    </a>
  `;
}

export function renderReportCard(report: ReportItem, targetHash = `#p21-detalle-reporte?id=${report.id}`): string {
  const iconByCategory = {
    'Robo': Icons.alertTriangle('w-5 h-5 text-safety-amber'),
    'Accidente': Icons.alertTriangle('w-5 h-5 text-safety-red'),
    'Actividad Sospechosa': Icons.shield('w-5 h-5 text-safety-blue'),
    'Vandalismo': Icons.alertTriangle('w-5 h-5 text-safety-amber'),
    'Incendio': Icons.siren('w-5 h-5 text-safety-red'),
    'Otro': Icons.info('w-5 h-5 text-slate-600')
  };

  return `
    <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 hover:border-safety-blue/30 transition-all duration-150">
      <div class="flex items-start justify-between gap-2 mb-2">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
            ${iconByCategory[report.category] || Icons.info('w-5 h-5')}
          </div>
          <div>
            <h4 class="font-outfit font-semibold text-sm text-content-title leading-tight">
              ${report.category}
            </h4>
            <p class="text-xs text-content-muted flex items-center gap-1">
              ${Icons.mapPin('w-3 h-3')} a ${report.distance} · ${report.timestamp.split('·')[0].trim()}
            </p>
          </div>
        </div>
        <div>
          ${renderStatusBadge(report.status)}
        </div>
      </div>
      <p class="text-xs text-content-body line-clamp-2 mb-3">
        ${report.description}
      </p>
      <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <span class="font-mono text-content-muted text-[11px] font-medium">
          ${report.trackingId}
        </span>
        <a
          href="${targetHash}"
          class="font-semibold text-safety-blue hover:text-safety-blue-hover hover:underline inline-flex items-center gap-1"
        >
          Ver reporte ${Icons.chevronRight('w-3.5 h-3.5')}
        </a>
      </div>
    </article>
  `;
}

export function renderBottomNav(currentScreen: string): string {
  const navItems = [
    { hash: '#p01-inicio', label: 'Inicio', icon: Icons.home('w-5 h-5') },
    { hash: '#p02-mapa-riesgo', label: 'Mapa', icon: Icons.map('w-5 h-5') },
    { hash: '#p11-reportes', label: 'Reportes', icon: Icons.fileText('w-5 h-5') },
    { hash: '#p22-seguridad-personal', label: 'Trayecto', icon: Icons.navigation('w-5 h-5') },
    { hash: '#p30-mi-perfil', label: 'Perfil', icon: Icons.user('w-5 h-5') },
  ];

  return `
    <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile z-40 bg-surface-card/95 backdrop-blur-md border-t border-surface-border py-2 px-3 flex justify-around items-center shadow-level-2" aria-label="Navegación principal">
      ${navItems
        .map((item) => {
          const isActive = currentScreen.startsWith(item.hash.replace('#', ''));
          return `
            <a
              href="${item.hash}"
              class="flex flex-col items-center justify-center py-1 px-3 rounded-md transition-colors ${
                isActive
                  ? 'text-safety-blue font-semibold'
                  : 'text-content-muted hover:text-content-title'
              }"
            >
              <div class="mb-0.5">${item.icon}</div>
              <span class="text-[11px] leading-tight">${item.label}</span>
            </a>
          `;
        })
        .join('')}
    </nav>
  `;
}

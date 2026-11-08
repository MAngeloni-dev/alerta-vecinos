import { appStore } from '../state/store';
import { Icons } from '../components/icons';
import { renderAppHeader, renderReportCard, renderStatusBadge } from '../components/common';
import { ReportCategory } from '../types';

export function renderP11Reportes(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Reportes', '#p01-inicio')}

      <main class="flex-1 px-4 py-8 flex flex-col justify-center space-y-6">
        <div class="text-center space-y-2">
          <div class="w-16 h-16 rounded-full bg-safety-blue-subtle text-safety-blue flex items-center justify-center mx-auto shadow-sm">
            ${Icons.fileText('w-8 h-8')}
          </div>
          <h2 class="font-outfit font-bold text-2xl text-content-title">
            Gestión de Reportes
          </h2>
          <p class="text-sm text-content-body max-w-xs mx-auto">
            Notificá incidentes a tus vecinos o consultá las alertas reportadas en la comunidad.
          </p>
        </div>

        <div class="space-y-3 pt-4">
          <a
            href="#p15-crear-reporte-intro"
            class="btn-primary w-full py-4 text-base font-semibold gap-2 shadow-md"
          >
            ${Icons.plus('w-5 h-5')}
            Crear reporte
          </a>

          <a
            href="#p12-reportes-publicos"
            class="btn-secondary w-full py-4 text-base font-semibold gap-2"
          >
            ${Icons.search('w-5 h-5 text-content-muted')}
            Consultar reportes públicos
          </a>
        </div>
      </main>
    </div>
  `;
}

export function renderP12ReportesPublicos(): string {
  const state = appStore.getState();
  const filter = state.reportFilter;

  // Filtrado reactivo de reportes
  let filtered = state.reports;
  if (filter.category && filter.category !== 'Todas') {
    filtered = filtered.filter((r) => r.category === filter.category);
  }
  if (filter.status && filter.status !== 'Todos') {
    filtered = filtered.filter((r) => r.status === filter.status);
  }

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Reportes Públicos', '#p11-reportes', {
        rightHtml: `
          <a
            href="#p13-filtrar-reportes"
            class="px-2.5 py-1.5 text-xs font-semibold text-safety-blue bg-safety-blue-subtle border border-safety-blue/20 rounded-md hover:bg-safety-blue/20 transition-colors flex items-center gap-1"
            aria-label="Filtrar lista de reportes"
          >
            ${Icons.filter('w-3.5 h-3.5')}
            Filtrar
          </a>
        `
      })}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Barra de estado de filtros activos -->
        <div class="flex items-center justify-between text-xs text-content-muted px-1">
          <span>Mostrando ${filtered.length} reportes en tu radio</span>
          ${
            filter.category !== 'Todas' || filter.status !== 'Todos'
              ? `<button onclick="window.clearFilters()" class="text-safety-blue hover:underline font-semibold">Limpiar filtros</button>`
              : ''
          }
        </div>

        <!-- Lista de Tarjetas de Reporte -->
        <section class="space-y-3" aria-label="Lista de reportes públicos">
          ${
            filtered.length > 0
              ? filtered.map((report) => renderReportCard(report)).join('')
              : `
              <div class="p-8 text-center bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-3">
                <div class="w-12 h-12 rounded-full bg-slate-100 text-content-muted flex items-center justify-center mx-auto">
                  ${Icons.fileText('w-6 h-6')}
                </div>
                <p class="font-outfit font-semibold text-base text-content-title">No hay reportes con estos filtros</p>
                <p class="text-xs text-content-muted">Probá ampliando el radio o seleccionando todas las categorías.</p>
                <button onclick="window.clearFilters()" class="btn-secondary text-xs min-h-[40px] px-4">Restablecer filtros</button>
              </div>
            `
          }
        </section>

        <!-- Botón Flotante / Crear Reporte -->
        <div class="pt-4">
          <a href="#p15-crear-reporte-intro" class="btn-primary w-full gap-2">
            ${Icons.plus('w-5 h-5')}
            Crear nuevo reporte
          </a>
        </div>
      </main>
    </div>
  `;
}

export function renderP13FiltrarReportes(): string {
  const currentFilter = appStore.getState().reportFilter;
  const categories: ReportCategory[] = [
    'Robo',
    'Actividad Sospechosa',
    'Accidente',
    'Vandalismo',
    'Incendio',
    'Otro'
  ];

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Filtrar Reportes', '#p12-reportes-publicos')}

      <main class="flex-1 px-4 py-4 space-y-5">
        <form id="filter-form" onsubmit="window.applyFilters(event)" class="space-y-5">
          <!-- Cercanía / Radio -->
          <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-2">
            <label class="font-outfit font-semibold text-sm text-content-title block">
              Cercanía máxima: <span id="filter-km-label" class="text-safety-blue font-bold">${currentFilter.radiusKm} km</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value="${currentFilter.radiusKm}"
              id="filter-radius-slider"
              oninput="document.getElementById('filter-km-label').textContent = this.value + ' km'"
              class="w-full accent-safety-blue cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div class="flex justify-between text-[11px] text-content-muted">
              <span>500 m</span>
              <span>2 km</span>
              <span>5 km</span>
            </div>
          </div>

          <!-- Categoría -->
          <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-2">
            <label for="filter-category" class="font-outfit font-semibold text-sm text-content-title block">
              Categoría
            </label>
            <select
              id="filter-category"
              class="form-input bg-surface-card"
            >
              <option value="Todas" ${currentFilter.category === 'Todas' ? 'selected' : ''}>Todas las categorías</option>
              ${categories
                .map(
                  (cat) => `
                  <option value="${cat}" ${currentFilter.category === cat ? 'selected' : ''}>${cat}</option>
                `
                )
                .join('')}
            </select>
          </div>

          <!-- Estado del Reporte -->
          <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-2">
            <label for="filter-status" class="font-outfit font-semibold text-sm text-content-title block">
              Estado del reporte
            </label>
            <select
              id="filter-status"
              class="form-input bg-surface-card"
            >
              <option value="Todos" ${currentFilter.status === 'Todos' ? 'selected' : ''}>Todos los estados</option>
              <option value="Pendiente" ${currentFilter.status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
              <option value="Verificado" ${currentFilter.status === 'Verificado' ? 'selected' : ''}>Verificado</option>
              <option value="Resuelto" ${currentFilter.status === 'Resuelto' ? 'selected' : ''}>Resuelto</option>
            </select>
          </div>

          <!-- Botones de Acción -->
          <div class="space-y-2 pt-2">
            <button type="submit" class="btn-primary w-full">
              Aplicar filtros
            </button>
            <button
              type="button"
              onclick="window.clearFilters()"
              class="btn-secondary w-full"
            >
              Limpiar filtros
            </button>
          </div>
        </form>
      </main>
    </div>
  `;
}

export function renderP14IniciarSesion(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Iniciar sesión', '#p01-inicio')}
      <main class="flex-1 px-4 py-8 flex flex-col justify-center gap-5">
        <div class="text-center"><div class="w-14 h-14 rounded-full bg-safety-blue text-white font-bold text-xl grid place-items-center mx-auto">AV</div>
          <h2 class="text-xl font-outfit font-bold text-content-title mt-3">Bienvenido a Alerta Vecinos</h2><p class="text-sm text-content-muted">Ingresá para usar tu cuenta</p></div>
        <form onsubmit="window.handleLogin(event)" class="rounded-xl bg-surface-card border border-surface-border p-5 space-y-4">
          <label class="block text-xs font-semibold text-content-title">Usuario o email<input id="login-email" type="text" autocomplete="username" required class="form-input mt-1" placeholder="Tu usuario" /></label>
          <label class="block text-xs font-semibold text-content-title">Contraseña<input id="login-password" type="password" autocomplete="current-password" required class="form-input mt-1" placeholder="Tu contraseña" /></label>
          <button type="submit" class="btn-primary w-full">Iniciar sesión</button>
          <a href="#register" class="btn-secondary block text-center w-full">Crear cuenta</a>
        </form>
      </main>
    </div>`;
}

export function renderRegister(): string {
  return `<div class="flex flex-col min-h-screen">
    ${renderAppHeader('Registrarse', '#login')}
    <main class="flex-1 px-4 py-6"><h2 class="font-outfit font-bold text-xl text-content-title mb-1">Crear cuenta</h2>
      <p class="text-sm text-content-muted mb-5">Las cuentas nuevas se crean con rol Vecino.</p>
      <form onsubmit="window.handleRegister(event)" class="rounded-xl bg-surface-card border border-surface-border p-5 space-y-4">
        <label class="block text-xs font-semibold text-content-title">Nombre completo<input id="register-name" required class="form-input mt-1" autocomplete="name" /></label>
        <label class="block text-xs font-semibold text-content-title">Usuario<input id="register-username" required minlength="3" maxlength="24" class="form-input mt-1" autocomplete="username" /></label>
        <label class="block text-xs font-semibold text-content-title">Email<input id="register-email" type="email" required class="form-input mt-1" autocomplete="email" /></label>
        <label class="block text-xs font-semibold text-content-title">Contraseña<input id="register-password" type="password" required minlength="6" class="form-input mt-1" autocomplete="new-password" /></label>
        <label class="block text-xs font-semibold text-content-title">Confirmar contraseña<input id="register-confirm" type="password" required minlength="6" class="form-input mt-1" autocomplete="new-password" /></label>
        <button type="submit" class="btn-primary w-full">Registrarme</button>
        <a href="#login" class="btn-secondary block text-center w-full">Ya tengo cuenta</a>
      </form></main></div>`;
}

export function renderP15CrearReporteIntro(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Crear Reporte', '#p11-reportes')}

      <main class="flex-1 px-4 py-8 flex flex-col justify-center text-center space-y-6">
        <div class="w-20 h-20 rounded-full bg-safety-amber-subtle text-safety-amber border border-safety-amber/20 flex items-center justify-center mx-auto">
          ${Icons.alertTriangle('w-10 h-10')}
        </div>

        <div class="space-y-2">
          <span class="text-xs font-bold text-safety-blue uppercase tracking-wider">Paso 1 de 4</span>
          <h2 class="font-outfit font-bold text-2xl text-content-title">
            ¿Qué querés reportar?
          </h2>
          <p class="text-sm text-content-body max-w-xs mx-auto">
            Seleccioná un tipo de incidente para comenzar a documentar lo sucedido y advertir a tu cuadrante.
          </p>
        </div>

        <div class="pt-4">
          <a
            href="#p16-tipo-reporte"
            class="btn-primary w-full py-4 text-base font-semibold gap-2 shadow-md"
          >
            Seleccionar tipo de reporte ${Icons.chevronRight('w-5 h-5')}
          </a>
        </div>
      </main>
    </div>
  `;
}

export function renderP16TipoReporte(): string {
  const categories: { label: ReportCategory; desc: string; icon: string }[] = [
    { label: 'Robo', desc: 'Asalto, arrebato o sustracción', icon: Icons.alertTriangle('w-6 h-6 text-safety-amber') },
    { label: 'Actividad Sospechosa', desc: 'Merodeo o conductas anómalas', icon: Icons.shield('w-6 h-6 text-safety-blue') },
    { label: 'Accidente', desc: 'Colisión vehicular o siniestro vial', icon: Icons.alertTriangle('w-6 h-6 text-safety-red') },
    { label: 'Vandalismo', desc: 'Daño a luminarias, plazas o frentes', icon: Icons.alertTriangle('w-6 h-6 text-safety-amber') },
    { label: 'Incendio', desc: 'Fuego en pastizales, casas o autos', icon: Icons.siren('w-6 h-6 text-safety-red') },
    { label: 'Otro', desc: 'Problemas de servicios u otros hechos', icon: Icons.info('w-6 h-6 text-slate-600') }
  ];

  const currentCategory = appStore.getState().newReportDraft.category || 'Accidente';

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Tipo de reporte', '#p15-crear-reporte-intro', {
        subtitle: 'Paso 2 de 4'
      })}

      <main class="flex-1 px-4 py-4 space-y-4">
        <div class="space-y-1">
          <h2 class="font-outfit font-bold text-lg text-content-title">
            Crear nuevo reporte
          </h2>
          <p class="text-xs text-content-muted">
            Elegí la categoría que mejor describa la situación:
          </p>
        </div>

        <!-- Cuadrícula 2 columnas de categorías -->
        <div class="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Categorías de reporte">
          ${categories
            .map(
              (cat) => `
              <button
                type="button"
                onclick="window.selectCategory('${cat.label}')"
                class="category-card p-3.5 bg-surface-card border rounded-lg shadow-level-1 flex flex-col justify-between text-left transition-all ${
                  currentCategory === cat.label
                    ? 'border-safety-blue ring-2 ring-safety-blue/20 bg-safety-blue-subtle/30'
                    : 'border-surface-border hover:border-slate-400'
                }"
                role="radio"
                aria-checked="${currentCategory === cat.label}"
              >
                <div class="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center mb-2 shadow-xs">
                  ${cat.icon}
                </div>
                <div>
                  <h3 class="font-outfit font-semibold text-sm text-content-title leading-tight">
                    ${cat.label}
                  </h3>
                  <p class="text-[11px] text-content-muted mt-0.5 line-clamp-1">
                    ${cat.desc}
                  </p>
                </div>
              </button>
            `
            )
            .join('')}
        </div>

        <div class="pt-4">
          <a
            href="#p17-completar-reporte"
            class="btn-primary w-full gap-2"
          >
            Continuar ${Icons.chevronRight('w-5 h-5')}
          </a>
        </div>
      </main>
    </div>
  `;
}

export function renderP17CompletarReporte(): string {
  const draft = appStore.getState().newReportDraft;
  const category = draft.category || 'Accidente';

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Completar Reporte', '#p16-tipo-reporte', {
        subtitle: 'Paso 3 de 4'
      })}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Ficha de tipo seleccionado -->
        <div class="bg-surface-card border border-surface-border rounded-lg p-3.5 shadow-level-1 flex items-center justify-between">
          <div>
            <span class="text-xs text-content-muted">Tipo de reporte:</span>
            <p class="font-outfit font-bold text-base text-safety-blue">“${category}”</p>
          </div>
          <a href="#p16-tipo-reporte" class="text-xs font-semibold text-safety-blue hover:underline">
            Cambiar
          </a>
        </div>

        <form id="complete-report-form" onsubmit="window.submitReportDetails(event)" class="space-y-4">
          <!-- Ubicación -->
          <div class="space-y-1">
            <label for="report-location" class="text-xs font-semibold text-content-title flex items-center gap-1">
              ${Icons.mapPin('w-3.5 h-3.5 text-safety-blue')}
              Ubicación del incidente
            </label>
            <div class="relative">
              <input
                id="report-location"
                type="text"
                required
                value="${draft.location || 'Av. Colón y Jujuy, Centro'}"
                placeholder="Ingresá la calle o esquina..."
                class="form-input pr-20"
              />
              <button
                type="button"
                onclick="document.getElementById('report-location').value = 'Ubicación GPS detectada'"
                class="absolute right-2 top-2 px-2 py-1 text-[11px] font-semibold text-safety-blue bg-safety-blue-subtle rounded border border-safety-blue/20"
              >
                Mi GPS
              </button>
            </div>
          </div>

          <!-- Descripción -->
          <div class="space-y-1">
            <label for="report-desc" class="text-xs font-semibold text-content-title">
              Descripción de lo sucedido
            </label>
            <textarea
              id="report-desc"
              required
              rows="3"
              placeholder="Escribí lo sucedido con el mayor detalle posible..."
              class="form-input py-2.5 min-h-[90px]"
            >${draft.description || 'Colisión entre dos vehículos en esquina semafórica. No hay heridos graves aparentes.'}</textarea>
          </div>

          <!-- Adjuntar Archivo / Multimedia -->
          <div class="space-y-1">
            <label class="text-xs font-semibold text-content-title">
              Foto / Video (Opcional)
            </label>
            <div class="border-2 border-dashed border-slate-300 rounded-lg p-3 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer" onclick="alert('Carga de imagen simulada activada.')">
              <div class="flex items-center justify-center gap-2 text-xs font-semibold text-safety-blue">
                ${Icons.camera('w-4 h-4')}
                <span>Adjuntar Archivo +</span>
              </div>
              <p class="text-[11px] text-content-muted mt-0.5">Formatos JPG, PNG o MP4 hasta 25 MB</p>
            </div>
          </div>

          <!-- Reporte Anónimo Switch -->
          <div class="bg-surface-card border border-surface-border rounded-lg p-3.5 shadow-level-1 flex items-center justify-between">
            <div>
              <p class="font-outfit font-semibold text-sm text-content-title">Reporte anónimo</p>
              <p class="text-xs text-content-muted">Tu nombre no será visible para otros vecinos.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                id="report-anonymous-toggle"
                type="checkbox"
                ${draft.isAnonymous ? 'checked' : ''}
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-safety-blue"></div>
            </label>
          </div>

          <!-- Botones de Acción -->
          <div class="space-y-2 pt-2">
            <button type="submit" class="btn-primary w-full gap-2">
              Continuar al resumen ${Icons.chevronRight('w-5 h-5')}
            </button>
            <a href="#p11-reportes" class="btn-secondary w-full">
              Cancelar
            </a>
          </div>
        </form>
      </main>
    </div>
  `;
}

export function renderP18ResumenReporte(): string {
  const draft = appStore.getState().newReportDraft;
  const category = draft.category || 'Accidente';
  const location = draft.location || 'Av. Colón y Jujuy, Centro';
  const desc = draft.description || 'Colisión entre dos vehículos en esquina semafórica.';
  const isAnon = draft.isAnonymous ? 'Sí' : 'No';

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Resumen Reporte', '#p17-completar-reporte', {
        subtitle: 'Paso 4 de 4 · Verificación'
      })}

      <main class="flex-1 px-4 py-4 space-y-4">
        <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <span class="text-xs text-content-muted">Tipo de reporte:</span>
            <span class="font-outfit font-bold text-base text-safety-blue">“${category}”</span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs py-1 border-b border-slate-100">
            <div>
              <p class="text-content-muted">Fecha y hora:</p>
              <p class="font-semibold text-content-title">18/08/2026 - 19:32</p>
            </div>
            <div>
              <p class="text-content-muted">Estado inicial:</p>
              <p class="font-semibold text-safety-amber-dark">Pendiente</p>
            </div>
          </div>

          <div class="py-1 border-b border-slate-100 text-xs">
            <p class="text-content-muted">Número de tracking sugerido:</p>
            <p class="font-mono font-bold text-sm text-content-title">REP-000123</p>
          </div>

          <div class="py-1 border-b border-slate-100 text-xs">
            <p class="text-content-muted">Ubicación:</p>
            <p class="font-semibold text-content-title">${location}</p>
          </div>

          <div class="py-1 border-b border-slate-100 text-xs">
            <p class="text-content-muted">Descripción:</p>
            <p class="text-content-body mt-0.5">${desc}</p>
          </div>

          <div class="flex justify-between items-center text-xs pt-1">
            <span class="text-content-muted">Reporte anónimo:</span>
            <span class="font-semibold text-content-title">${isAnon}</span>
          </div>
        </div>

        <!-- Enlaces auxiliares de edición y emergencia -->
        <div class="flex items-center justify-between px-1 text-xs">
          <a href="#p17-completar-reporte" class="text-safety-blue font-semibold hover:underline">
            [ Editar reporte ]
          </a>
          <a href="#p10-numeros-emergencia" class="text-safety-red font-semibold hover:underline">
            [ Emergencias ]
          </a>
        </div>

        <!-- Botones de Acción -->
        <div class="space-y-2 pt-2">
          <a
            href="#p19-confirmar-reporte"
            class="btn-primary w-full gap-2 shadow-md"
          >
            Confirmar Reporte
          </a>
          <a href="#p11-reportes" class="btn-secondary w-full">
            Cancelar
          </a>
        </div>
      </main>
    </div>
  `;
}

export function renderP19ConfirmarReporte(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Confirmar reporte', '#p18-resumen-reporte')}

      <main class="flex-1 px-4 py-8 flex flex-col justify-center space-y-6">
        <div class="p-6 bg-surface-card border border-surface-border rounded-xl shadow-level-2 text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-safety-amber-subtle text-safety-amber flex items-center justify-center mx-auto">
            ${Icons.alertTriangle('w-8 h-8')}
          </div>

          <div class="space-y-2">
            <h2 class="font-outfit font-bold text-xl text-content-title">
              ¿Estás seguro de que querés enviar este reporte?
            </h2>
            <p class="text-xs text-content-body max-w-xs mx-auto">
              Revisá los datos antes de confirmar. Tu reporte será visible para los vecinos y el equipo de moderación comunitaria.
            </p>
          </div>

          <div class="space-y-2 pt-2">
            <button
              onclick="window.executeConfirmReport()"
              class="btn-primary w-full font-semibold"
            >
              Sí, confirmar
            </button>
            <a
              href="#p18-resumen-reporte"
              class="btn-secondary w-full"
            >
              No, volver al resumen
            </a>
          </div>
        </div>
      </main>
    </div>
  `;
}

export function renderP20ReporteExitoso(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Reporte Exitoso', '#p01-inicio')}

      <main class="flex-1 px-4 py-8 flex flex-col justify-center text-center space-y-6">
        <div class="w-20 h-20 rounded-full bg-safety-green text-white flex items-center justify-center mx-auto shadow-level-1">
          ${Icons.check('w-10 h-10')}
        </div>

        <div class="space-y-2">
          <h2 class="font-outfit font-bold text-2xl text-content-title">
            Reporte creado con éxito
          </h2>
          <p class="text-xs text-content-body max-w-xs mx-auto">
            Se generó el seguimiento correspondiente y la alerta fue distribuida en tu radio barrial.
          </p>
        </div>

        <div class="space-y-2 pt-4">
          <a
            href="#p21-detalle-reporte?id=rep-001"
            class="btn-primary w-full gap-2 shadow-sm"
          >
            Ver reporte creado
          </a>
          <a
            href="#p15-crear-reporte-intro"
            class="btn-secondary w-full"
          >
            Crear otro reporte
          </a>
          <a
            href="#p01-inicio"
            class="btn-secondary w-full border-transparent hover:bg-slate-100"
          >
            Volver al inicio
          </a>
        </div>
      </main>
    </div>
  `;
}

export function renderP21DetalleReporte(reportId?: string): string {
  const reports = appStore.getState().reports;
  const report = reports.find((r) => r.id === reportId || r.trackingId === reportId) || reports[0];

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Detalle del reporte', '#p12-reportes-publicos')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Mapa de Localización -->
        <div class="relative w-full h-44 bg-slate-200 rounded-lg overflow-hidden border border-surface-border shadow-level-1">
          <svg class="w-full h-full" viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="180" fill="#E2E8F0"/>
            <line x1="0" y1="90" x2="360" y2="90" stroke="#FFFFFF" stroke-width="16"/>
            <line x1="180" y1="0" x2="180" y2="180" stroke="#FFFFFF" stroke-width="16"/>
            <circle cx="180" cy="90" r="18" fill="#EF4444" fill-opacity="0.25"/>
            <circle cx="180" cy="90" r="8" fill="#EF4444" stroke="#FFFFFF" stroke-width="2"/>
          </svg>
          <div class="absolute bottom-2 left-2 bg-white/95 px-2 py-0.5 rounded text-[11px] font-semibold text-content-title shadow-xs">
            ${report.location}
          </div>
        </div>

        <!-- Ficha de Detalles del Reporte -->
        <article class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-3">
          <div class="flex items-start justify-between border-b border-slate-100 pb-2">
            <div>
              <span class="text-xs text-content-muted">Categoría:</span>
              <h2 class="font-outfit font-bold text-lg text-content-title leading-tight">
                ${report.category}
              </h2>
            </div>
            <div>
              ${renderStatusBadge(report.status)}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs py-1 border-b border-slate-100">
            <div>
              <p class="text-content-muted">Fecha y hora:</p>
              <p class="font-semibold text-content-title">${report.timestamp}</p>
            </div>
            <div>
              <p class="text-content-muted">Código Tracking:</p>
              <p class="font-mono font-bold text-safety-blue">${report.trackingId}</p>
            </div>
          </div>

          <div class="py-1 border-b border-slate-100 text-xs">
            <p class="text-content-muted font-medium">Descripción:</p>
            <p class="text-content-body mt-1 leading-relaxed">${report.description}</p>
          </div>

          <div class="flex items-center justify-between text-xs pt-1">
            <div>
              <span class="text-content-muted">Autor:</span>
              <span class="font-semibold text-content-title ml-1">${report.author}</span>
            </div>
            <div>
              <span class="text-content-muted">Anónimo:</span>
              <span class="font-semibold text-content-title ml-1">${report.isAnonymous ? 'Sí' : 'No'}</span>
            </div>
          </div>
        </article>

        <a href="#p01-inicio" class="btn-primary w-full">
          Ir al inicio
        </a>
      </main>
    </div>
  `;
}

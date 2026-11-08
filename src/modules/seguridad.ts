import { appStore } from '../state/store';
import { Icons } from '../components/icons';
import { renderAppHeader } from '../components/common';

let selectedDestination = 'Casa';
let selectedContact = 'Juan Pérez';

export function renderP22PrepararTrayecto(): string {
  const favorites = appStore.getState().favorites;

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Seguridad Personal', '#p01-inicio')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <div class="bg-safety-green-subtle border border-safety-green/20 rounded-lg p-3.5 space-y-1">
          <h2 class="font-outfit font-semibold text-base text-safety-green-dark flex items-center gap-2">
            ${Icons.navigation('w-5 h-5')}
            Preparar Trayecto
          </h2>
          <p class="text-xs text-safety-green-dark/80">
            Acompañamiento digital "Llegué Bien". Tu contacto de seguridad recibirá alertas automáticas si te demorás.
          </p>
        </div>

        <!-- Selector de Destino -->
        <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-2">
          <label class="text-xs font-semibold text-content-muted uppercase tracking-wider block">
            Destino
          </label>
          <a
            href="#p23-seleccionar-destino"
            class="w-full min-h-[48px] px-3.5 bg-slate-50 border border-slate-300 rounded-md flex items-center justify-between hover:bg-slate-100 transition-colors"
          >
            <div class="flex items-center gap-2 text-sm font-semibold text-content-title">
              ${Icons.mapPin('w-4 h-4 text-safety-blue')}
              <span id="display-selected-destination">${selectedDestination || 'Seleccionar destino...'}</span>
            </div>
            <span class="text-xs text-safety-blue font-semibold">Cambiar</span>
          </a>
        </div>

        <!-- Selector de Contacto de Seguridad -->
        <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-2">
          <label class="text-xs font-semibold text-content-muted uppercase tracking-wider block">
            Contacto de seguridad
          </label>
          <a
            href="#p24-elegir-contacto"
            class="w-full min-h-[48px] px-3.5 bg-slate-50 border border-slate-300 rounded-md flex items-center justify-between hover:bg-slate-100 transition-colors"
          >
            <div class="flex items-center gap-2 text-sm font-semibold text-content-title">
              ${Icons.user('w-4 h-4 text-safety-green')}
              <span id="display-selected-contact">${selectedContact || 'Elegir contacto...'}</span>
            </div>
            <span class="text-xs text-safety-blue font-semibold">Cambiar</span>
          </a>
        </div>

        <!-- Chips de Lugares Frecuentes -->
        <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-2.5">
          <label class="text-xs font-semibold text-content-muted uppercase tracking-wider block">
            Lugares frecuentes
          </label>
          <div class="flex flex-wrap gap-2">
            ${favorites
              .map(
                (fav) => `
                <button
                  type="button"
                  onclick="window.quickSelectDestination('${fav.name}')"
                  class="px-3.5 py-2 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    selectedDestination === fav.name
                      ? 'bg-safety-blue text-white border-safety-blue shadow-xs'
                      : 'bg-white text-content-title border-slate-300 hover:bg-slate-50'
                  }"
                >
                  ${Icons.heart('w-3.5 h-3.5')}
                  ${fav.name}
                </button>
              `
              )
              .join('')}
          </div>
        </div>

        <!-- Botón Iniciar Trayecto -->
        <div class="pt-4">
          <button
            onclick="window.startSafetyTrip('${selectedDestination}', '${selectedContact}')"
            class="btn-primary w-full py-4 text-base font-semibold gap-2 shadow-md"
          >
            ${Icons.navigation('w-5 h-5')}
            Iniciar Trayecto
          </button>
        </div>
      </main>
    </div>
  `;
}

export function renderP23SeleccionarDestino(): string {
  const favorites = appStore.getState().favorites;

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Seleccionar Destino', '#p22-seguridad-personal')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Ubicación actual detectada -->
        <div class="p-3 bg-slate-100 border border-slate-200 rounded-md flex items-center gap-2 text-xs text-content-muted">
          <span class="w-2.5 h-2.5 rounded-full bg-safety-blue ring-2 ring-safety-blue/20"></span>
          <span>Origen: <strong>Ubicación actual</strong> (GPS Activo)</span>
        </div>

        <!-- Campo de Búsqueda -->
        <div class="space-y-1">
          <label for="destination-search-input" class="text-xs font-semibold text-content-title">
            Destino
          </label>
          <div class="relative">
            <input
              id="destination-search-input"
              type="text"
              placeholder="Buscar lugar, dirección o parada..."
              value="${selectedDestination}"
              class="form-input pl-10"
              autofocus
            />
            <div class="absolute left-3 top-3.5 text-content-placeholder">
              ${Icons.search('w-4 h-4')}
            </div>
          </div>
        </div>

        <!-- Favoritos Sugeridos -->
        <div class="space-y-2 pt-2">
          <p class="text-xs font-semibold text-content-muted uppercase tracking-wider">
            Favoritos directos:
          </p>
          <div class="space-y-2">
            ${favorites
              .map(
                (fav) => `
                <button
                  type="button"
                  onclick="document.getElementById('destination-search-input').value = '${fav.name}'; window.saveSelectedDestination('${fav.name}')"
                  class="w-full p-3 bg-surface-card border border-surface-border rounded-lg text-left flex items-center justify-between hover:border-safety-blue/40 transition-colors shadow-xs"
                >
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                      ${Icons.heart('w-4 h-4 text-safety-blue')}
                    </div>
                    <div>
                      <p class="font-outfit font-semibold text-sm text-content-title">${fav.name}</p>
                      <p class="text-xs text-content-muted">${fav.address}</p>
                    </div>
                  </div>
                  <span class="text-xs text-safety-blue font-semibold">Elegir</span>
                </button>
              `
              )
              .join('')}
          </div>
        </div>

        <div class="pt-4">
          <button
            onclick="window.saveSelectedDestination(document.getElementById('destination-search-input').value)"
            class="btn-primary w-full"
          >
            Continuar
          </button>
        </div>
      </main>
    </div>
  `;
}

export function renderP24ElegirContacto(): string {
  const contacts = [
    { name: 'Juan Pérez', phone: '+54 9 351 456-7890', relation: 'Hermano' },
    { name: 'María Gómez', phone: '+54 9 351 789-0123', relation: 'Amiga / Vecina' },
    { name: 'Contacto de seguridad familiar', phone: '+54 9 351 111-2233', relation: 'Guardia Barrial' }
  ];

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Elegir Contacto', '#p22-seguridad-personal')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <p class="text-xs text-content-body">
          Seleccioná a quién notificar cuando inicies el trayecto y al presionar <strong>"Llegué Bien"</strong>.
        </p>

        <!-- Lista de contactos con radio selector -->
        <div class="space-y-2" role="radiogroup" aria-label="Contactos de seguridad">
          ${contacts
            .map(
              (c) => `
              <label
                class="flex items-center justify-between p-3.5 bg-surface-card border rounded-lg shadow-level-1 cursor-pointer transition-all ${
                  selectedContact === c.name
                    ? 'border-safety-green ring-2 ring-safety-green/20 bg-safety-green-subtle/30'
                    : 'border-surface-border hover:bg-slate-50'
                }"
              >
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="contact-choice"
                    value="${c.name}"
                    ${selectedContact === c.name ? 'checked' : ''}
                    onchange="window.saveSelectedContact('${c.name}')"
                    class="w-4 h-4 text-safety-green focus:ring-safety-green"
                  />
                  <div>
                    <p class="font-outfit font-semibold text-sm text-content-title">
                      ${c.name}
                    </p>
                    <p class="text-xs text-content-muted">
                      ${c.relation} · ${c.phone}
                    </p>
                  </div>
                </div>
                <span class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-content-muted">
                  ${Icons.phone('w-4 h-4')}
                </span>
              </label>
            `
            )
            .join('')}
        </div>

        <div class="pt-4">
          <a
            href="#p22-seguridad-personal"
            class="btn-primary w-full"
          >
            Continuar
          </a>
        </div>
      </main>
    </div>
  `;
}

export function renderP25TrayectoActivo(): string {
  const trip = appStore.getState().activeTrip || {
    destination: selectedDestination || 'Casa',
    contactName: selectedContact || 'Juan Pérez',
    status: 'En curso',
    startTime: '19:40'
  };

  const isConfirmed = trip.status === 'Llegada confirmada';
  const isAlertSent = trip.status === 'Alerta enviada';

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Trayecto Activo', '#p01-inicio')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Mapa de Seguimiento del Trayecto -->
        <div class="relative w-full h-56 bg-slate-200 rounded-lg overflow-hidden border border-surface-border shadow-level-1">
          <svg class="w-full h-full" viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="220" fill="#E2E8F0"/>
            <!-- Ruta Activa en Verde -->
            <path d="M 60 180 L 160 110 L 220 110 L 300 40" fill="none" stroke="#10B981" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 60 180 L 160 110 L 220 110 L 300 40" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4 4"/>

            <!-- Origen -->
            <circle cx="60" cy="180" r="7" fill="#2563EB" stroke="#FFFFFF" stroke-width="2"/>
            <text x="60" y="200" text-anchor="middle" font-family="Outfit" font-size="10" font-weight="bold" fill="#0F172A">Origen</text>

            <!-- Posición en tiempo real animada -->
            <circle cx="180" cy="110" r="14" fill="#10B981" fill-opacity="0.3"/>
            <circle cx="180" cy="110" r="7" fill="#10B981" stroke="#FFFFFF" stroke-width="2"/>

            <!-- Destino -->
            <circle cx="300" cy="40" r="8" fill="#EF4444" stroke="#FFFFFF" stroke-width="2"/>
            <text x="300" y="30" text-anchor="middle" font-family="Outfit" font-size="10" font-weight="bold" fill="#0F172A">${trip.destination}</text>
          </svg>

          <div class="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded text-xs font-semibold text-safety-green-dark border border-safety-green/20 shadow-xs flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-safety-green animate-ping"></span>
            GPS en vivo · 15 min restantes
          </div>
        </div>

        <!-- Banner de Estado de Trayecto -->
        <section class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <p class="text-xs text-content-muted">Destino fijado</p>
              <h2 class="font-outfit font-bold text-lg text-content-title">${trip.destination}</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full text-xs font-bold ${
              isConfirmed
                ? 'bg-safety-green-subtle text-safety-green-dark'
                : isAlertSent
                ? 'bg-safety-red-subtle text-safety-red-dark'
                : 'bg-safety-blue-subtle text-safety-blue-dark'
            }">
              ${trip.status}
            </span>
          </div>

          <div class="flex items-center justify-between text-xs py-1">
            <div>
              <span class="text-content-muted">Contacto notificado:</span>
              <p class="font-semibold text-content-title">${trip.contactName}</p>
            </div>
            <div>
              <span class="text-content-muted">Hora de inicio:</span>
              <p class="font-semibold text-content-title">${trip.startTime}</p>
            </div>
          </div>

          ${
            isConfirmed
              ? `
              <div class="p-3 bg-safety-green-subtle border border-safety-green/30 rounded-lg text-center space-y-1">
                <p class="font-outfit font-bold text-sm text-safety-green-dark">✓ ¡Llegada confirmada con éxito!</p>
                <p class="text-[11px] text-safety-green-dark/80">Se envió mensaje automático a ${trip.contactName}.</p>
              </div>
            `
              : isAlertSent
              ? `
              <div class="p-3 bg-safety-red-subtle border border-safety-red/30 rounded-lg text-center space-y-1">
                <p class="font-outfit font-bold text-sm text-safety-red-dark">⚠ Alerta preventiva enviada a ${trip.contactName}</p>
                <p class="text-[11px] text-safety-red-dark/80">Tu ubicación actual compartida de urgencia.</p>
              </div>
            `
              : ''
          }
        </section>

        <!-- Botones de Acción Críticos del Trayecto -->
        <div class="space-y-2.5 pt-2">
          <!-- Botón "Llegué Bien" Principal -->
          <button
            onclick="window.executeLlegueBien()"
            class="btn-primary w-full bg-safety-green hover:bg-safety-green-hover text-white py-4 text-base font-bold shadow-md gap-2"
          >
            ${Icons.check('w-5 h-5')}
            ¡Llegué Bien!
          </button>

          <!-- Botón "Enviar Alerta" Preventiva -->
          <button
            onclick="window.executeSendTripAlert()"
            class="btn-secondary w-full border-safety-amber/40 text-safety-amber-dark hover:bg-safety-amber-subtle py-3 font-semibold gap-2"
          >
            ${Icons.alertTriangle('w-4 h-4 text-safety-amber')}
            Enviar Alerta preventiva
          </button>

          <!-- Finalizar Trayecto -->
          <button
            onclick="window.executeFinishTrip()"
            class="btn-secondary w-full text-slate-600 hover:bg-slate-100"
          >
            Finalizar Trayecto
          </button>
        </div>
      </main>
    </div>
  `;
}

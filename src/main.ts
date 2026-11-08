import './styles/main.css';
import { appStore } from './state/store';
import { setupRouter } from './router';
import { ReportCategory, ReportStatus } from './types';
import { initAuth, signIn, register, logOut, getCurrentAccount, changeRole, isAdmin } from './auth';

// Exponer acciones globales a window para micro-interacciones inmediatas y reactivas
declare global {
  interface Window {
    selectRadius: (km: number) => void;
    saveRadius: () => void;
    filterStops: (query: string) => void;
    selectCategory: (category: string) => void;
    submitReportDetails: (e: Event) => void;
    executeConfirmReport: () => void;
    startSafetyTrip: (dest: string, contact: string) => void;
    quickSelectDestination: (name: string) => void;
    saveSelectedDestination: (name: string) => void;
    saveSelectedContact: (name: string) => void;
    executeLlegueBien: () => void;
    executeSendTripAlert: () => void;
    executeFinishTrip: () => void;
    saveNewFavorite: (e: Event) => void;
    saveEditedFavorite: (e: Event, id: string) => void;
    executeDeleteFavorite: (id: string) => void;
    saveUserProfile: (e: Event) => void;
    handleLogin: (e: Event) => void;
    moderateReport: (id: string, status: ReportStatus) => void;
    handleRegister: (e: Event) => void;
    handleLogout: () => void;
    changeUserRole: (id: string) => void;
    clearFilters: () => void;
    applyFilters: (e: Event) => void;
  }
}

let tempSelectedRadius = appStore.getState().searchRadiusKm;

// --- Configuración de Radio ---
window.selectRadius = (km: number) => {
  tempSelectedRadius = km;
  const label = document.getElementById('radio-display');
  if (label) {
    label.textContent = `Radio seleccionado: ${km >= 1 ? `${km} km` : `${km * 1000} m`}`;
  }
  const slider = document.getElementById('range-slider') as HTMLInputElement | null;
  if (slider) slider.value = String(km);

  document.querySelectorAll('.radio-btn').forEach((btn) => {
    btn.classList.remove('bg-safety-blue', 'text-white', 'border-safety-blue', 'shadow-sm');
    btn.classList.add('bg-surface-card', 'text-content-title', 'border-slate-300');
  });

  const activeBtn = Array.from(document.querySelectorAll('.radio-btn')).find((b) =>
    b.textContent?.includes(km >= 1 ? `${km} km` : `${km * 1000} m`)
  );
  if (activeBtn) {
    activeBtn.classList.remove('bg-surface-card', 'text-content-title', 'border-slate-300');
    activeBtn.classList.add('bg-safety-blue', 'text-white', 'border-safety-blue', 'shadow-sm');
  }
};

window.saveRadius = () => {
  appStore.setSearchRadius(tempSelectedRadius);
  alert(`Radio de búsqueda actualizado a ${tempSelectedRadius} km.`);
  window.location.hash = '#p03-alertas-cercanas';
};

// --- Buscador de Paradas ---
window.filterStops = (query: string) => {
  const container = document.getElementById('stops-results-container');
  if (!container) return;

  const q = (query || '').toLowerCase().trim();
  const stops = appStore.getState().safeStops.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.lines.some((l) => l.toLowerCase().includes(q))
  );

  if (stops.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-xs text-content-muted bg-surface-card border border-surface-border rounded-lg">
        No se encontraron paradas para "${query}".
      </div>
    `;
    return;
  }

  container.innerHTML = stops
    .map(
      (stop) => `
      <article class="p-3.5 bg-surface-card border border-surface-border rounded-lg shadow-level-1 flex items-center justify-between">
        <div>
          <h4 class="font-outfit font-semibold text-sm text-content-title">
            ● ${stop.name} · <span class="text-xs text-content-muted">${stop.distance}</span>
          </h4>
          <p class="text-xs text-content-body mt-0.5">${stop.address}</p>
          <span class="text-[11px] text-content-muted mt-1 block">${stop.lines.join(' · ')}</span>
        </div>
        <a
          href="#p07-ubicacion-parada?id=${stop.id}"
          class="px-3 py-1.5 text-xs font-semibold text-safety-green-dark bg-safety-green-subtle border border-safety-green/20 rounded hover:bg-safety-green/20 transition-colors ml-2 shrink-0"
        >
          Ver ubicación
        </a>
      </article>
    `
    )
    .join('');
};

// --- Wizard de Reportes ---
window.selectCategory = (cat: string) => {
  appStore.setReportDraft({ category: cat as ReportCategory });
  document.querySelectorAll('.category-card').forEach((btn) => {
    btn.classList.remove('border-safety-blue', 'ring-2', 'ring-safety-blue/20', 'bg-safety-blue-subtle/30');
    btn.classList.add('border-surface-border');
  });
  const clickedBtn = Array.from(document.querySelectorAll('.category-card')).find((b) =>
    b.textContent?.includes(cat)
  );
  if (clickedBtn) {
    clickedBtn.classList.remove('border-surface-border');
    clickedBtn.classList.add('border-safety-blue', 'ring-2', 'ring-safety-blue/20', 'bg-safety-blue-subtle/30');
  }
};

window.submitReportDetails = (e: Event) => {
  e.preventDefault();
  const locationInput = document.getElementById('report-location') as HTMLInputElement | null;
  const descInput = document.getElementById('report-desc') as HTMLTextAreaElement | null;
  const anonToggle = document.getElementById('report-anonymous-toggle') as HTMLInputElement | null;

  appStore.setReportDraft({
    location: locationInput?.value.trim() || 'Av. Colón y Jujuy',
    description: descInput?.value.trim() || 'Sin descripción.',
    isAnonymous: anonToggle?.checked ?? false
  });

  window.location.hash = '#p18-resumen-reporte';
};

window.executeConfirmReport = () => {
  appStore.createReport();
  window.location.hash = '#p20-reporte-exitoso';
};

// --- Seguridad Personal ("Llegué Bien") ---
window.startSafetyTrip = (dest: string, contact: string) => {
  appStore.startTrip(dest || 'Casa', contact || 'Juan Pérez', '+54 9 351 456-7890');
  window.location.hash = '#p25-trayecto-activo';
};

window.quickSelectDestination = (name: string) => {
  const display = document.getElementById('display-selected-destination');
  if (display) display.textContent = name;
  window.saveSelectedDestination(name);
};

window.saveSelectedDestination = (_name: string) => {
  window.location.hash = '#p22-seguridad-personal';
};

window.saveSelectedContact = (_name: string) => {
  window.location.hash = '#p22-seguridad-personal';
};

window.executeLlegueBien = () => {
  appStore.confirmArrival();
};

window.executeSendTripAlert = () => {
  appStore.sendTripAlert();
};

window.executeFinishTrip = () => {
  appStore.finishTrip();
  window.location.hash = '#p01-inicio';
};

// --- Favoritos CRUD ---
window.saveNewFavorite = (e: Event) => {
  e.preventDefault();
  const nameInput = document.getElementById('fav-name') as HTMLInputElement | null;
  const addrInput = document.getElementById('fav-address') as HTMLInputElement | null;
  if (nameInput?.value && addrInput?.value) {
    appStore.addFavorite(nameInput.value, addrInput.value);
    window.location.hash = '#p26-favoritos';
  }
};

window.saveEditedFavorite = (e: Event, id: string) => {
  e.preventDefault();
  const nameInput = document.getElementById('edit-fav-name') as HTMLInputElement | null;
  const addrInput = document.getElementById('edit-fav-address') as HTMLInputElement | null;
  if (nameInput?.value && addrInput?.value) {
    appStore.updateFavorite(id, nameInput.value, addrInput.value);
    window.location.hash = '#p26-favoritos';
  }
};

window.executeDeleteFavorite = (id: string) => {
  appStore.removeFavorite(id);
  window.location.hash = '#p26-favoritos';
};

// --- Perfil & Auth ---
window.saveUserProfile = (e: Event) => {
  e.preventDefault();
  const nameInput = document.getElementById('prof-name') as HTMLInputElement | null;
  const lastInput = document.getElementById('prof-lastname') as HTMLInputElement | null;
  const emailInput = document.getElementById('prof-email') as HTMLInputElement | null;

  if (nameInput && lastInput && emailInput) {
    appStore.updateUserProfile({
      name: nameInput.value.trim(),
      lastName: lastInput.value.trim(),
      email: emailInput.value.trim()
    });
    alert('Perfil actualizado con éxito.');
    window.location.hash = '#p30-mi-perfil';
  }
};

function refreshUser(): void {
  const a = getCurrentAccount();
  appStore.syncSessionUser(a ? {name:a.name, lastName:'',email:a.email,phone:'',role:a.role,avatar:a.name.slice(0,2).toUpperCase()} : {name:'Invitado',lastName:'',email:'',phone:'',role:'vecino',avatar:'IV'});
}
window.handleLogin = async (e: Event) => {
  e.preventDefault();
  const identifier = (document.getElementById('login-email') as HTMLInputElement).value;
  const password = (document.getElementById('login-password') as HTMLInputElement).value;
  try {
    if (!await signIn(identifier,password)) { alert('Usuario o contraseña incorrectos.'); return; }
    refreshUser(); window.location.hash = '#p01-inicio';
  } catch { alert('No se pudo iniciar sesión.'); }
};
window.handleRegister = async (e: Event) => {
  e.preventDefault();
  const value = (id: string) => (document.getElementById(id) as HTMLInputElement).value;
  if (value('register-password') !== value('register-confirm')) { alert('Las contraseñas no coinciden.'); return; }
  try { await register(value('register-username'),value('register-name'),value('register-email'),value('register-password')); refreshUser(); window.location.hash = '#p01-inicio'; }
  catch (error) { alert(error instanceof Error ? error.message : 'No se pudo registrar el usuario.'); }
};
window.handleLogout = () => { logOut(); refreshUser(); window.location.hash = '#login'; };
window.changeUserRole = (id: string) => {
  try { if (!isAdmin()) throw new Error('Acceso denegado.'); if (!confirm('¿Cambiar el permiso de este usuario?')) return; changeRole(id); refreshUser(); }
  catch (error) { alert(error instanceof Error ? error.message : 'Acceso denegado.'); }
};

// --- Filtros de Reportes ---
window.clearFilters = () => {
  appStore.clearReportFilter();
  window.location.hash = '#p12-reportes-publicos';
};

window.applyFilters = (e: Event) => {
  e.preventDefault();
  const catSelect = document.getElementById('filter-category') as HTMLSelectElement | null;
  const statusSelect = document.getElementById('filter-status') as HTMLSelectElement | null;
  const radiusSlider = document.getElementById('filter-radius-slider') as HTMLInputElement | null;

  appStore.setReportFilter({
    category: catSelect?.value || 'Todas',
    status: statusSelect?.value || 'Todos',
    radiusKm: parseFloat(radiusSlider?.value || '2')
  });

  window.location.hash = '#p12-reportes-publicos';
};

// --- Moderación Admin ---
window.moderateReport = (id: string, status: ReportStatus) => {
  if (!isAdmin()) { alert('Acceso restringido a administradores.'); return; }
  appStore.updateReportStatus(id, status);
  alert(`Reporte ${id} marcado como "${status}".`);
};

// Arrancar router
initAuth().then(() => { refreshUser(); setupRouter(); }).catch(() => { alert('No se pudo iniciar el almacenamiento local de usuarios.'); setupRouter(); });


// --- Tema claro / oscuro (persistente y disponible en todas las pantallas) ---
const themeButton = document.getElementById('theme-toggle') as HTMLButtonElement | null;
const themeLabel = document.getElementById('theme-toggle-label');
const themeIcon = document.getElementById('theme-toggle-icon');

function refreshThemeButton(): void {
  const isDark = document.documentElement.classList.contains('dark');
  if (themeLabel) themeLabel.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
  if (themeIcon) themeIcon.textContent = isDark ? '☀' : '☾';
  if (themeButton) {
    themeButton.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
    themeButton.setAttribute('aria-pressed', String(isDark));
  }
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  themeMeta?.setAttribute('content', isDark ? '#0f172a' : '#2563EB');
}

themeButton?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('alerta-vecinos-theme', isDark ? 'dark' : 'light'); } catch (_) { /* opcional */ }
  refreshThemeButton();
});
refreshThemeButton();

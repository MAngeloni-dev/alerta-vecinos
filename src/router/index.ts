import { appStore } from '../state/store';
import { getCurrentAccount, isAdmin, listAccounts } from '../auth';
import { renderBottomNav } from '../components/common';
import { renderScreenNavigator } from '../components/screenNavigator';
import {
  renderP01Inicio,
  renderP02MapaRiesgo,
  renderP03AlertasCercanas,
  renderP04RadioBusqueda,
  renderP05ParadasSeguras,
  renderP06BuscarParadas,
  renderP07UbicacionParada,
  renderP08ConsejosPreventivos,
  renderP09Recomendaciones,
  renderP10NumerosEmergencia
} from '../modules/inicio';
import {
  renderP11Reportes,
  renderP12ReportesPublicos,
  renderP13FiltrarReportes,
  renderP14IniciarSesion,
  renderRegister,
  renderP15CrearReporteIntro,
  renderP16TipoReporte,
  renderP17CompletarReporte,
  renderP18ResumenReporte,
  renderP19ConfirmarReporte,
  renderP20ReporteExitoso,
  renderP21DetalleReporte
} from '../modules/reportes';
import {
  renderP22PrepararTrayecto,
  renderP23SeleccionarDestino,
  renderP24ElegirContacto,
  renderP25TrayectoActivo
} from '../modules/seguridad';
import {
  renderP26Favoritos,
  renderP27AgregarLugar,
  renderP28EditarLugar,
  renderP29EliminarLugar
} from '../modules/favoritos';
import {
  renderP30MiPerfil,
  renderP31EditarPerfil,
  renderP32Notificaciones,
  renderP33HistorialPersonal,
  renderP34MisReportes,
  renderP35ReportesComentados,
  renderP36MisTrayectos
} from '../modules/perfil';
import {
  renderP37Administracion,
  renderP38ModeracionReportes,
  renderP39Estadisticas,
  renderP40GestionUsuarios,
  renderP41GestionReportes
} from '../modules/admin';

export function setupRouter(): void {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  function getRouteInfo(): { path: string; params: URLSearchParams } {
    const rawHash = window.location.hash.slice(1) || 'p01-inicio';
    const [pathPart, queryPart] = rawHash.split('?');
    const params = new URLSearchParams(queryPart || '');
    return { path: pathPart.toLowerCase(), params };
  }

  function renderCurrentScreen(): void {
    const { path, params } = getRouteInfo();
    const idParam = params.get('id') || undefined;
    const adminRoutes = ['admin','p37-administracion','p38-moderacion-reportes','p39-estadisticas','p40-gestion-usuarios','p41-gestion-reportes'];
    if (adminRoutes.includes(path) && !isAdmin()) {
      window.location.replace('#login');
      if (appContainer) appContainer.innerHTML = '<div class="p-8 text-center text-content-title">Acceso reservado para administradores.</div>';
      return;
    }
    const protectedRoutes = ['p15-crear-reporte-intro','p16-tipo-reporte','p17-completar-reporte','p18-resumen-reporte','p19-confirmar-reporte','p20-reporte-exitoso','p30-mi-perfil','perfil','p31-editar-perfil'];
    if (protectedRoutes.includes(path) && !getCurrentAccount()) { window.location.replace('#login'); return; }

    let html = '';
    let showBottomNav = false;

    switch (path) {
      // Módulo 1: Inicio y Seguridad Comunitaria
      case 'p01-inicio':
      case 'inicio':
        html = renderP01Inicio();
        showBottomNav = true;
        break;
      case 'p02-mapa-riesgo':
      case 'mapa':
        html = renderP02MapaRiesgo();
        showBottomNav = true;
        break;
      case 'p03-alertas-cercanas':
      case 'alertas':
        html = renderP03AlertasCercanas();
        break;
      case 'p04-radio-busqueda':
      case 'radio':
        html = renderP04RadioBusqueda();
        break;
      case 'p05-paradas-seguras':
      case 'paradas':
        html = renderP05ParadasSeguras();
        break;
      case 'p06-buscar-paradas':
        html = renderP06BuscarParadas();
        break;
      case 'p07-ubicacion-parada':
        html = renderP07UbicacionParada(idParam);
        break;
      case 'p08-consejos-preventivos':
      case 'consejos':
        html = renderP08ConsejosPreventivos();
        break;
      case 'p09-recomendaciones':
        html = renderP09Recomendaciones();
        break;
      case 'p10-numeros-emergencia':
      case 'emergencias':
        html = renderP10NumerosEmergencia();
        break;

      // Módulo 2: Reportes y Autenticación
      case 'p11-reportes':
      case 'reportes':
        html = renderP11Reportes();
        showBottomNav = true;
        break;
      case 'p12-reportes-publicos':
        html = renderP12ReportesPublicos();
        showBottomNav = true;
        break;
      case 'p13-filtrar-reportes':
        html = renderP13FiltrarReportes();
        break;
      case 'p14-iniciar-sesion':
      case 'login':
        html = renderP14IniciarSesion();
        break;
      case 'register':
      case 'registro':
        html = renderRegister();
        break;
      case 'p15-crear-reporte-intro':
        html = renderP15CrearReporteIntro();
        break;
      case 'p16-tipo-reporte':
        html = renderP16TipoReporte();
        break;
      case 'p17-completar-reporte':
        html = renderP17CompletarReporte();
        break;
      case 'p18-resumen-reporte':
        html = renderP18ResumenReporte();
        break;
      case 'p19-confirmar-reporte':
        html = renderP19ConfirmarReporte();
        break;
      case 'p20-reporte-exitoso':
        html = renderP20ReporteExitoso();
        break;
      case 'p21-detalle-reporte':
        html = renderP21DetalleReporte(idParam);
        break;

      // Módulo 3: Seguridad Personal / "Llegué Bien"
      case 'p22-seguridad-personal':
      case 'seguridad':
        html = renderP22PrepararTrayecto();
        showBottomNav = true;
        break;
      case 'p23-seleccionar-destino':
        html = renderP23SeleccionarDestino();
        break;
      case 'p24-elegir-contacto':
        html = renderP24ElegirContacto();
        break;
      case 'p25-trayecto-activo':
        html = renderP25TrayectoActivo();
        break;

      // Módulo 4: Favoritos
      case 'p26-favoritos':
      case 'favoritos':
        html = renderP26Favoritos();
        break;
      case 'p27-agregar-lugar':
        html = renderP27AgregarLugar();
        break;
      case 'p28-editar-lugar':
        html = renderP28EditarLugar(idParam);
        break;
      case 'p29-eliminar-lugar':
        html = renderP29EliminarLugar(idParam);
        break;

      // Módulo 5: Perfil de Usuario e Historial
      case 'p30-mi-perfil':
      case 'perfil':
        html = renderP30MiPerfil();
        showBottomNav = true;
        break;
      case 'p31-editar-perfil':
        html = renderP31EditarPerfil();
        break;
      case 'p32-notificaciones':
        html = renderP32Notificaciones();
        break;
      case 'p33-historial-personal':
        html = renderP33HistorialPersonal();
        break;
      case 'p34-mis-reportes':
        html = renderP34MisReportes();
        break;
      case 'p35-reportes-comentados':
        html = renderP35ReportesComentados();
        break;
      case 'p36-mis-trayectos':
        html = renderP36MisTrayectos();
        break;

      // Módulo 6: Administración y Moderación
      case 'p37-administracion':
      case 'admin':
        html = renderP37Administracion();
        break;
      case 'p38-moderacion-reportes':
        html = renderP38ModeracionReportes();
        break;
      case 'p39-estadisticas':
        html = renderP39Estadisticas();
        break;
      case 'p40-gestion-usuarios':
        html = renderP40GestionUsuarios();
        break;
      case 'p41-gestion-reportes':
        html = renderP41GestionReportes();
        break;

      default:
        html = renderP01Inicio();
        showBottomNav = true;
        break;
    }

    if (showBottomNav) {
      html += renderBottomNav(path);
      // Espaciador para no solapar la barra fija
      html += '<div class="h-16"></div>';
    }

    // Herramienta flotante de navegación directa para evaluación de las 41 pantallas
    html += renderScreenNavigator(path);

    if (appContainer) {
      appContainer.innerHTML = html;
      window.scrollTo(0, 0);

      if (path === 'p40-gestion-usuarios') {
        const users = listAccounts();
        appContainer.querySelectorAll('article').forEach((article, i) => {
          const u = users[i]; if (!u) return;
          const heading = article.querySelector('h3'); const detail = article.querySelector('p');
          if (heading) heading.textContent = u.name;
          if (detail) detail.textContent = `@${u.username} · ${u.email}`;
        });
        appContainer.querySelectorAll<HTMLButtonElement>('.role-change-btn').forEach(button => {
          button.addEventListener('click', () => (window as any).changeUserRole(button.dataset.roleId));
        });
      }
      // Si estamos en la pantalla P06, auto-renderizar resultados de búsqueda
      if (path === 'p06-buscar-paradas' && typeof (window as any).filterStops === 'function') {
        (window as any).filterStops('');
      }
    }
  }

  window.addEventListener('hashchange', renderCurrentScreen);
  appStore.subscribe(renderCurrentScreen);

  // Primera carga
  if (!window.location.hash) {
    window.location.hash = '#p01-inicio';
  } else {
    renderCurrentScreen();
  }
}

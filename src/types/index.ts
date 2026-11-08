export type ReportCategory =
  | 'Robo'
  | 'Actividad Sospechosa'
  | 'Accidente'
  | 'Vandalismo'
  | 'Incendio'
  | 'Otro';

export type ReportStatus = 'Pendiente' | 'Verificado' | 'Rechazado' | 'Resuelto';

export interface ReportItem {
  id: string;
  trackingId: string;
  category: ReportCategory;
  description: string;
  location: string;
  distance: string;
  timestamp: string;
  status: ReportStatus;
  isAnonymous: boolean;
  author: string;
  mediaUrl?: string;
  commentsCount?: number;
}

export interface SafeStop {
  id: string;
  name: string;
  distance: string;
  address: string;
  lines: string[];
  features: string[]; // ['Iluminación LED', 'Cámara 360°', 'Pulsador SOS', 'Monitoreo 24hs']
  latitude?: number;
  longitude?: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface FavoritePlace {
  id: string;
  name: string;
  address: string;
  icon?: string;
}

export interface SafetyTrip {
  id: string;
  origin: string;
  destination: string;
  contactName: string;
  contactPhone: string;
  status: 'Iniciado' | 'En curso' | 'Llegada confirmada' | 'Alerta enviada' | 'Finalizado';
  startTime: string;
  estimatedMinutes: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alerta' | 'reporte' | 'seguridad';
}

export interface UserProfile {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'vecino' | 'admin';
  avatar?: string;
}

export type ScreenId =
  | 'p01-inicio'
  | 'p02-mapa-riesgo'
  | 'p03-alertas-cercanas'
  | 'p04-radio-busqueda'
  | 'p05-paradas-seguras'
  | 'p06-buscar-paradas'
  | 'p07-ubicacion-parada'
  | 'p08-consejos-preventivos'
  | 'p09-recomendaciones'
  | 'p10-numeros-emergencia'
  | 'p11-reportes'
  | 'p12-reportes-publicos'
  | 'p13-filtrar-reportes'
  | 'p14-iniciar-sesion'
  | 'p15-crear-reporte-intro'
  | 'p16-tipo-reporte'
  | 'p17-completar-reporte'
  | 'p18-resumen-reporte'
  | 'p19-confirmar-reporte'
  | 'p20-reporte-exitoso'
  | 'p21-detalle-reporte'
  | 'p22-seguridad-personal'
  | 'p23-seleccionar-destino'
  | 'p24-elegir-contacto'
  | 'p25-trayecto-activo'
  | 'p26-favoritos'
  | 'p27-agregar-lugar'
  | 'p28-editar-lugar'
  | 'p29-eliminar-lugar'
  | 'p30-mi-perfil'
  | 'p31-editar-perfil'
  | 'p32-notificaciones'
  | 'p33-historial-personal'
  | 'p34-mis-reportes'
  | 'p35-reportes-comentados'
  | 'p36-mis-trayectos'
  | 'p37-administracion'
  | 'p38-moderacion-reportes'
  | 'p39-estadisticas'
  | 'p40-gestion-usuarios'
  | 'p41-gestion-reportes';

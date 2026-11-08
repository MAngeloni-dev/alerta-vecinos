import {
  ReportItem,
  ReportCategory,
  ReportStatus,
  SafeStop,
  FavoritePlace,
  SafetyTrip,
  NotificationItem,
  UserProfile
} from '../types';

interface StoreState {
  user: UserProfile;
  searchRadiusKm: number;
  reports: ReportItem[];
  safeStops: SafeStop[];
  favorites: FavoritePlace[];
  activeTrip: SafetyTrip | null;
  notifications: NotificationItem[];
  newReportDraft: Partial<ReportItem>;
  reportFilter: {
    category: string;
    status: string;
    radiusKm: number;
    searchQuery: string;
  };
}

const STORAGE_KEY = 'alerta_vecinos_state_v1';

const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep-001',
    trackingId: 'REP-000123',
    category: 'Accidente',
    description: 'Colisión menor entre dos automóviles en esquina semafórica. Tránsito parcialmente demorado.',
    location: 'Av. Colón y Jujuy, Centro',
    distance: '1,2 km',
    timestamp: '18/08/2026 · 19:32',
    status: 'Pendiente',
    isAnonymous: false,
    author: 'Matías Rodríguez',
    commentsCount: 3
  },
  {
    id: 'rep-002',
    trackingId: 'REP-000120',
    category: 'Robo',
    description: 'Arrebato de mochila en parada de colectivo por dos personas en motocicleta.',
    location: 'Bv. San Juan y Belgrano',
    distance: '500 m',
    timestamp: '18/08/2026 · 18:15',
    status: 'Pendiente',
    isAnonymous: true,
    author: 'Vecino Anónimo',
    commentsCount: 7
  },
  {
    id: 'rep-003',
    trackingId: 'REP-000115',
    category: 'Actividad Sospechosa',
    description: 'Dos individuos observando cerraduras de portones en horario nocturno.',
    location: 'Mariano Moreno 340',
    distance: '800 m',
    timestamp: '17/08/2026 · 23:40',
    status: 'Verificado',
    isAnonymous: false,
    author: 'Carla Méndez',
    commentsCount: 2
  },
  {
    id: 'rep-004',
    trackingId: 'REP-000108',
    category: 'Vandalismo',
    description: 'Luminaria comunitaria dañada intencionalmente, dejando la cuadra a oscuras.',
    location: 'Plaza Roca, Sector Norte',
    distance: '350 m',
    timestamp: '16/08/2026 · 21:10',
    status: 'Verificado',
    isAnonymous: false,
    author: 'Juan Pérez',
    commentsCount: 1
  }
];

const INITIAL_STOPS: SafeStop[] = [
  {
    id: 'stop-01',
    name: 'Plaza Roca',
    distance: '350 m',
    address: 'Av. San Martín 450, frente al centro cívico',
    lines: ['Línea 10', 'Línea 12', 'Línea 17'],
    features: ['Iluminación LED reforzada', 'Cámara de domo 360°', 'Pulsador SOS directo', 'Comercio adherido 24hs']
  },
  {
    id: 'stop-02',
    name: 'Terminal de Ómnibus',
    distance: '1,0 km',
    address: 'Bv. Perón 380, Plataforma 4',
    lines: ['Línea 20', 'Línea 25', 'Interurbanos'],
    features: ['Puesto policial permanente', 'Pulsador de auxilio', 'Cámaras de seguridad', 'Zona cardioprotegida']
  },
  {
    id: 'stop-03',
    name: 'Paseo Buen Pastor',
    distance: '700 m',
    address: 'Av. Hipólito Yrigoyen 325',
    lines: ['Línea 30', 'Línea 34', 'Línea 41'],
    features: ['Cámaras de vigilancia conectadas al 911', 'Iluminación solar', 'Tótem de emergencia']
  },
  {
    id: 'stop-04',
    name: 'Facultad de Ciencias Exactas',
    distance: '1,8 km',
    address: 'Av. Vélez Sársfield 1611, Ciudad Universitaria',
    lines: ['Línea 50', 'Línea 52', 'Línea 65'],
    features: ['Guardia universitaria nocturna', 'Corredor seguro para estudiantes', 'Iluminación LED']
  }
];

const INITIAL_FAVORITES: FavoritePlace[] = [
  { id: 'fav-1', name: 'Casa', address: 'Av. Pueyrredón 450', icon: 'home' },
  { id: 'fav-2', name: 'Trabajo', address: 'Bv. San Juan 120', icon: 'briefcase' },
  { id: 'fav-3', name: 'Facultad', address: 'Ciudad Universitaria, Pabellón Perú', icon: 'bookOpen' }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Nueva alerta cercana',
    message: 'Se reportó Robo a 500 m en Bv. San Juan.',
    time: 'Hace 15 min',
    read: false,
    type: 'alerta'
  },
  {
    id: 'notif-2',
    title: 'Cambio de estado de reporte',
    message: 'Tu reporte REP-000108 sobre luminaria pasó a "Verificado".',
    time: 'Hace 2 horas',
    read: false,
    type: 'reporte'
  },
  {
    id: 'notif-3',
    title: 'Aviso de seguridad barrial',
    message: 'Patrullaje reforzado activado en cuadrante Plaza Roca.',
    time: 'Ayer',
    read: true,
    type: 'seguridad'
  }
];

class Store {
  private state: StoreState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.loadFromStorage();
  }

  private loadFromStorage(): StoreState {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error loading state from localStorage:', e);
    }

    return {
      user: {
        name: 'Matías',
        lastName: 'Rodríguez',
        email: 'correo@ejemplo.com',
        phone: '+54 9 351 234-5678',
        role: 'vecino',
        avatar: 'MR'
      },
      searchRadiusKm: 2,
      reports: INITIAL_REPORTS,
      safeStops: INITIAL_STOPS,
      favorites: INITIAL_FAVORITES,
      activeTrip: null,
      notifications: INITIAL_NOTIFICATIONS,
      newReportDraft: {},
      reportFilter: {
        category: 'Todas',
        status: 'Todos',
        radiusKm: 2,
        searchQuery: ''
      }
    };
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Error saving to localStorage:', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((l) => l());
  }

  public getState(): StoreState {
    return this.state;
  }

  // --- Search Radius ---
  public setSearchRadius(km: number): void {
    this.state.searchRadiusKm = km;
    this.saveToStorage();
  }

  // --- Reports CRUD ---
  public setReportDraft(draft: Partial<ReportItem>): void {
    this.state.newReportDraft = { ...this.state.newReportDraft, ...draft };
    this.saveToStorage();
  }

  public clearReportDraft(): void {
    this.state.newReportDraft = {};
    this.saveToStorage();
  }

  public createReport(): ReportItem {
    const draft = this.state.newReportDraft;
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const trackingId = `REP-${randomSuffix}`;

    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      trackingId,
      category: (draft.category as ReportCategory) || 'Otro',
      description: draft.description || 'Sin descripción detallada.',
      location: draft.location || 'Ubicación actual detectada',
      distance: '300 m',
      timestamp: new Date().toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Pendiente',
      isAnonymous: draft.isAnonymous ?? false,
      author: draft.isAnonymous ? 'Vecino Anónimo' : `${this.state.user.name} ${this.state.user.lastName}`,
      commentsCount: 0
    };

    this.state.reports.unshift(newReport);
    this.state.newReportDraft = {};

    // Agregar notificación automática
    this.state.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'Reporte enviado con éxito',
      message: `Tu reporte ${trackingId} ha sido registrado para moderación.`,
      time: 'Recién',
      read: false,
      type: 'reporte'
    });

    this.saveToStorage();
    return newReport;
  }

  public updateReportStatus(reportId: string, newStatus: ReportStatus): void {
    const report = this.state.reports.find((r) => r.id === reportId || r.trackingId === reportId);
    if (report) {
      report.status = newStatus;
      this.saveToStorage();
    }
  }

  public setReportFilter(filter: Partial<StoreState['reportFilter']>): void {
    this.state.reportFilter = { ...this.state.reportFilter, ...filter };
    this.notify();
  }

  public clearReportFilter(): void {
    this.state.reportFilter = {
      category: 'Todas',
      status: 'Todos',
      radiusKm: this.state.searchRadiusKm,
      searchQuery: ''
    };
    this.notify();
  }

  // --- Favorites CRUD ---
  public addFavorite(name: string, address: string, icon = 'mapPin'): void {
    const newFav: FavoritePlace = {
      id: `fav-${Date.now()}`,
      name: name.trim(),
      address: address.trim(),
      icon
    };
    this.state.favorites.push(newFav);
    this.saveToStorage();
  }

  public updateFavorite(id: string, name: string, address: string): void {
    const fav = this.state.favorites.find((f) => f.id === id);
    if (fav) {
      fav.name = name.trim();
      fav.address = address.trim();
      this.saveToStorage();
    }
  }

  public removeFavorite(id: string): void {
    this.state.favorites = this.state.favorites.filter((f) => f.id !== id);
    this.saveToStorage();
  }

  // --- Safety Trip ("Llegué Bien") ---
  public startTrip(destination: string, contactName: string, contactPhone: string): SafetyTrip {
    const trip: SafetyTrip = {
      id: `trip-${Date.now()}`,
      origin: 'Ubicación actual',
      destination,
      contactName,
      contactPhone,
      status: 'En curso',
      startTime: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: 20
    };
    this.state.activeTrip = trip;
    this.saveToStorage();
    return trip;
  }

  public confirmArrival(): void {
    if (this.state.activeTrip) {
      this.state.activeTrip.status = 'Llegada confirmada';
      this.saveToStorage();
    }
  }

  public sendTripAlert(): void {
    if (this.state.activeTrip) {
      this.state.activeTrip.status = 'Alerta enviada';
      this.saveToStorage();
    }
  }

  public finishTrip(): void {
    this.state.activeTrip = null;
    this.saveToStorage();
  }

  // --- Profile & Auth ---
  public updateUserProfile(profile: Partial<UserProfile>): void {
    const { name, lastName, email, phone, avatar } = profile;
    this.state.user = { ...this.state.user, ...(name !== undefined ? {name} : {}), ...(lastName !== undefined ? {lastName} : {}), ...(email !== undefined ? {email} : {}), ...(phone !== undefined ? {phone} : {}), ...(avatar !== undefined ? {avatar} : {}) };
    this.saveToStorage();
  }

  public syncSessionUser(user: UserProfile): void {
    this.state.user = user;
    this.saveToStorage();
  }

  // --- Reset All Data ---
  public resetToSeed(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.loadFromStorage();
    this.notify();
  }
}

export const appStore = new Store();

import { appStore } from '../state/store';
import { Icons } from '../components/icons';
import { renderAppHeader } from '../components/common';

export function renderP26Favoritos(): string {
  const favorites = appStore.getState().favorites;

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Favoritos', '#p01-inicio')}

      <main class="flex-1 px-4 py-4 space-y-4">
        <p class="text-xs text-content-body">
          Guardá tus destinos habituales para preparar trayectos rápidos en "Llegué Bien".
        </p>

        <!-- Lista de Lugares -->
        <section class="space-y-3" aria-label="Lista de lugares favoritos">
          ${favorites
            .map(
              (fav) => `
              <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-md bg-slate-100 text-safety-blue flex items-center justify-center">
                      ${Icons.mapPin('w-5 h-5')}
                    </div>
                    <div>
                      <h3 class="font-outfit font-semibold text-base text-content-title">
                        ${fav.name}
                      </h3>
                      <p class="text-xs text-content-muted">
                        ${fav.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <a
                    href="#p28-editar-lugar?id=${fav.id}"
                    class="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded hover:bg-slate-200 transition-colors inline-flex items-center gap-1"
                  >
                    ${Icons.edit('w-3.5 h-3.5')}
                    Editar
                  </a>
                  <a
                    href="#p29-eliminar-lugar?id=${fav.id}"
                    class="px-3 py-1.5 text-xs font-semibold text-safety-red bg-safety-red-subtle rounded hover:bg-safety-red/20 transition-colors inline-flex items-center gap-1"
                  >
                    ${Icons.trash('w-3.5 h-3.5')}
                    Eliminar
                  </a>
                </div>
              </article>
            `
            )
            .join('')}
        </section>

        <!-- Botón Agregar Nuevo Lugar -->
        <div class="pt-4">
          <a
            href="#p27-agregar-lugar"
            class="btn-primary w-full gap-2 shadow-sm"
          >
            ${Icons.plus('w-5 h-5')}
            Agregar nuevo lugar
          </a>
        </div>
      </main>
    </div>
  `;
}

export function renderP27AgregarLugar(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Agregar Lugar', '#p26-favoritos')}

      <main class="flex-1 px-4 py-6 space-y-5">
        <form id="add-favorite-form" onsubmit="window.saveNewFavorite(event)" class="bg-surface-card border border-surface-border rounded-lg p-5 shadow-level-1 space-y-4">
          <div class="space-y-1">
            <label for="fav-name" class="text-xs font-semibold text-content-title">
              Nombre del lugar:
            </label>
            <input
              id="fav-name"
              type="text"
              required
              placeholder="Ej. Casa de mamá, Gimnasio..."
              class="form-input"
              autofocus
            />
          </div>

          <div class="space-y-1">
            <label for="fav-address" class="text-xs font-semibold text-content-title">
              Dirección / ubicación:
            </label>
            <input
              id="fav-address"
              type="text"
              required
              placeholder="Calle y número o intersección..."
              class="form-input"
            />
          </div>

          <div class="space-y-2 pt-3">
            <button type="submit" class="btn-primary w-full">
              Guardar lugar
            </button>
            <a href="#p26-favoritos" class="btn-secondary w-full">
              Cancelar
            </a>
          </div>
        </form>
      </main>
    </div>
  `;
}

export function renderP28EditarLugar(id = 'fav-1'): string {
  const fav = appStore.getState().favorites.find((f) => f.id === id) || {
    name: 'Casa',
    address: 'Av. Pueyrredón 450'
  };

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Editar Lugar', '#p26-favoritos')}

      <main class="flex-1 px-4 py-6 space-y-5">
        <form id="edit-favorite-form" onsubmit="window.saveEditedFavorite(event, '${id}')" class="bg-surface-card border border-surface-border rounded-lg p-5 shadow-level-1 space-y-4">
          <div class="space-y-1">
            <label for="edit-fav-name" class="text-xs font-semibold text-content-title">
              Nombre:
            </label>
            <input
              id="edit-fav-name"
              type="text"
              required
              value="${fav.name}"
              class="form-input"
            />
          </div>

          <div class="space-y-1">
            <label for="edit-fav-address" class="text-xs font-semibold text-content-title">
              Dirección / ubicación:
            </label>
            <input
              id="edit-fav-address"
              type="text"
              required
              value="${fav.address}"
              class="form-input"
            />
          </div>

          <div class="space-y-2 pt-3">
            <button type="submit" class="btn-primary w-full">
              Guardar cambios
            </button>
            <a href="#p26-favoritos" class="btn-secondary w-full">
              Cancelar
            </a>
          </div>
        </form>
      </main>
    </div>
  `;
}

export function renderP29EliminarLugar(id = 'fav-1'): string {
  const fav = appStore.getState().favorites.find((f) => f.id === id) || { name: 'este lugar' };

  return `
    <div class="flex flex-col min-h-screen">
      ${renderAppHeader('Eliminar Lugar', '#p26-favoritos')}

      <main class="flex-1 px-4 py-8 flex flex-col justify-center space-y-6">
        <div class="p-6 bg-surface-card border border-surface-border rounded-xl shadow-level-2 text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-safety-red-subtle text-safety-red flex items-center justify-center mx-auto">
            ${Icons.trash('w-8 h-8')}
          </div>

          <div class="space-y-1">
            <h2 class="font-outfit font-bold text-xl text-content-title">
              ¿Está seguro que desea eliminar este lugar?
            </h2>
            <p class="text-sm font-semibold text-safety-blue">
              "${fav.name}"
            </p>
            <p class="text-xs text-content-muted">
              Esta acción no se puede deshacer. Dejará de aparecer en tus accesos rápidos.
            </p>
          </div>

          <div class="space-y-2 pt-2">
            <button
              onclick="window.executeDeleteFavorite('${id}')"
              class="btn-primary w-full bg-safety-red hover:bg-safety-red-hover font-semibold"
            >
              Eliminar
            </button>
            <a
              href="#p26-favoritos"
              class="btn-secondary w-full"
            >
              Cancelar
            </a>
          </div>
        </div>
      </main>
    </div>
  `;
}

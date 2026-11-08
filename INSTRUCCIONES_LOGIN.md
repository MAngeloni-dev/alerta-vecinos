# Alerta Vecinos — Login, registro y roles (prototipo)

## Instalar
Copiá el contenido de este ZIP en la raíz del proyecto (sobrescribí los archivos coincidentes).
Ejecutá `npm install` y `npm run dev`.

## Acceso de demostración
- Usuario: `admin`
- Contraseña: `admin`
- Ir a `#login` para ingresar o `#register` para registrarse.
- Solo el admin puede ir a Administración → Gestión de usuarios → Dar admin / Quitar admin.
- Los usuarios nuevos se registran como **vecino**.
- El administrador original no puede ser degradado desde la interfaz.
- Para cerrar sesión: Mi Perfil → Cerrar sesión.

## IMPORTANTE
Es una demo de frontend: cuentas guardadas en localStorage y sesión en sessionStorage, por lo que se comparten únicamente dentro del mismo navegador y origen; no existen usuarios compartidos entre dispositivos. Las contraseñas se derivan con PBKDF2 y sal aleatoria, pero los roles y cuentas en el navegador pueden manipularse mediante herramientas del desarrollador: **NO ES SEGURIDAD REAL**. No publicar ni usar con datos reales. Para producción se requiere backend con autorización en el servidor, base de datos y configuración segura de credenciales. Cambiá `admin/admin` al migrarlo.

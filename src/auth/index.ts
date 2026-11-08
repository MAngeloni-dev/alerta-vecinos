// Autenticación local SOLO para prototipo. La autorización real requiere backend.
export type Role = 'admin' | 'vecino';
export interface Account { id: string; username: string; name: string; email: string; role: Role; salt: string; hash: string; }
const USERS_KEY = 'av_demo_accounts_v1';
const SESSION_KEY = 'av_demo_session_v1';
const encoder = new TextEncoder();
function accounts(): Account[] { try { const data = JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); return Array.isArray(data) ? data : []; } catch { return []; } }
function write(accounts: Account[]): void { localStorage.setItem(USERS_KEY, JSON.stringify(accounts)); }
function randomHex(): string { return Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join(''); }
async function passwordHash(password: string, salt: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bytes = await crypto.subtle.deriveBits({name: 'PBKDF2', salt: encoder.encode(salt), iterations: 120000, hash: 'SHA-256'}, key, 256);
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
}
export async function initAuth(): Promise<void> {
  if (!accounts().some(u => u.username === 'admin')) {
    const salt = randomHex();
    write([...accounts(), {id: 'root-admin', username: 'admin', name: 'Administrador', email: 'admin@alertavecinos.local', role: 'admin', salt, hash: await passwordHash('admin', salt)}]);
  }
}
export function getCurrentAccount(): Account | null {
  const id = sessionStorage.getItem(SESSION_KEY);
  return accounts().find(a => a.id === id) || null;
}
export function isAdmin(): boolean { return getCurrentAccount()?.role === 'admin'; }
export function listAccounts(): Pick<Account,'id'|'username'|'name'|'email'|'role'>[] {
  return isAdmin() ? accounts().map(({id,username,name,email,role}) => ({id,username,name,email,role})) : [];
}
export async function signIn(identifier: string, password: string): Promise<boolean> {
  const account = accounts().find(a => a.username.toLowerCase() === identifier.trim().toLowerCase() || a.email.toLowerCase() === identifier.trim().toLowerCase());
  if (!account || await passwordHash(password, account.salt) !== account.hash) return false;
  sessionStorage.setItem(SESSION_KEY, account.id); return true;
}
export async function register(username: string, name: string, email: string, password: string): Promise<void> {
  username = username.trim(); name = name.trim(); email = email.trim().toLowerCase();
  if (!/^[a-z0-9_]{3,24}$/i.test(username)) throw new Error('El usuario debe tener 3 a 24 letras, números o guiones bajos.');
  if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || password.length < 6) throw new Error('Completá los datos y usá una contraseña de al menos 6 caracteres.');
  if (accounts().some(a => a.username.toLowerCase() === username.toLowerCase() || a.email === email)) throw new Error('Ese usuario o email ya está registrado.');
  const salt = randomHex(); const id = randomHex();
  write([...accounts(), {id,username,name,email,role:'vecino',salt,hash:await passwordHash(password,salt)}]);
  sessionStorage.setItem(SESSION_KEY,id);
}
export function logOut(): void { sessionStorage.removeItem(SESSION_KEY); }
export function changeRole(id: string): void {
  if (!isAdmin()) throw new Error('Solo un administrador puede asignar roles.');
  if (id === 'root-admin') throw new Error('No se puede modificar el superusuario principal.');
  const users = accounts(); const target = users.find(a => a.id === id);
  if (!target) throw new Error('Usuario no encontrado.');
  if (target.id === getCurrentAccount()?.id) throw new Error('No podés modificar tu propio rol.');
  target.role = target.role === 'admin' ? 'vecino' : 'admin'; write(users);
}

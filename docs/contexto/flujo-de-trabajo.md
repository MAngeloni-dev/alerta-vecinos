# Flujo de Trabajo y Protocolo de Desarrollo (SDD)

## 1. Ciclo SDD (Spec-Driven Development)
1. **Explore:** Inspeccionar requisitos, contrastar wireframes del PDF contra `DESIGN.md` e identificar dependencias.
2. **Propose:** Explicar el **Why** antes del **How** para cada módulo o componente.
3. **Tasks:** Descomponer el trabajo en pasos atómicos y verificables.
4. **Apply:** Implementar el código respetando los 5 estados obligatorios y las directivas de accesibilidad.
5. **Verify:** Ejecutar comprobaciones de tipos (`tsc --noEmit`), linter, pruebas de navegación por teclado y contraste WCAG AA.

## 2. Definición de Hecho (Definition of Done - DoD)
Una tarea o pantalla solo se considera finalizada cuando:
- Cumple con la estructura funcional definida en el PDF de Figma.
- Aplica fielmente los tokens, tipografías y estilos de `DESIGN.md`.
- Posee los 5 estados interactivos (Default, Hover, Active, Focus, Disabled).
- El contraste WCAG AA es mayor a 4.5:1 en textos normales y 3:1 en elementos de interfaz.
- No contiene console.logs de depuración, imports huérfanos ni código muerto.
- El tipado estricto compila sin ningún error (`tsc --noEmit`).

## 3. Comandos de Operación
- `npm run dev`: Inicia el servidor de desarrollo Vite local.
- `npm run build`: Compila el bundle de producción para verificación estática.
- `npx tsc --noEmit`: Comprobación estricta de tipos TypeScript.

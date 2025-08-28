# 🧱 Proyecto Base Frontend

> Propiedad de **Raul Farias S.**

Proyecto base frontend moderno, configurado con buenas prácticas de desarrollo, que incluye:

- ![standardjs](https://img.shields.io/badge/-263238?logo=standardjs) Linter de **JavaScript** con [StandardJS](https://standardjs.com/)
- ![stylelint](https://img.shields.io/badge/-263238?logo=stylelint) Linter de **CSS** con [Stylelint](https://stylelint.io/)
- ![git](https://img.shields.io/badge/-263238?logo=git) Validación previa al commit con [Husky](https://typicode.github.io/husky/) y [Lint-Staged](https://github.com/lint-staged/lint-staged/)
- ![git](https://img.shields.io/badge/-263238?logo=git) Convención de commits con [Commitlint](https://commitlint.js.org/) de [Conventional Commits](https://www.conventionalcommits.org/)
- ![MSW](https://img.shields.io/badge/-263238?logo=mockServiceWorker) Mocking de APIs con [Mock Service Worker (MSW)](https://mswjs.io/)
- ![vitest](https://img.shields.io/badge/-263238?logo=vitest) Pruebas unitarias con [Vitest](https://vitest.dev/)
- ![testing-library](https://img.shields.io/badge/-263238?logo=testinglibrary) Testing de componentes con [Testing Library](https://testing-library.com/)
- ![vite](https://img.shields.io/badge/-263238?logo=vite) Entorno de desarrollo rápido con [Vite](https://vite.dev/)

Este proyecto está preparado para iniciar desarrollos frontend escalables, garantizando una base de código limpia, consistente y testeada desde el comienzo.



## 🚀 Requisitos

| Paquete              | Versión   | Badge                                                                  |
|----------------------|-----------|------------------------------------------------------------------------|
| Node                 | `22.17.1` | ![node](https://img.shields.io/badge/node-22.17.1-339933?logo=node.js) |
| pnpm                 | `10.13.1` | ![pnpm](https://img.shields.io/badge/pnpm-10.13.1-F69220?logo=pnpm)    |
| Vite                 | `7.0.4`   | ![vite](https://img.shields.io/badge/vite-7.0.4-646CFF?logo=vite)      |
| React                | `19.1.0`  | ![react](https://img.shields.io/badge/react-19.1.0-61DAFB?logo=react)  |



## 🔧 Instalación

1. Clona el repositorio con el método que prefieras:

   **HTTPS** o **SSH:**
   ```bash
   git clone <URL>
   ```

   **GitHub CLI:**
   ```bash
   gh repo clone <URL>
    ```

2. Instala las dependencias:

   **PNPM**
   ```bash
   pnpm install
   ```



## ⚙️ Scripts disponibles

```bash
pnpm run dev         # Ejecuta el entorno de desarrollo con Vite
pnpm run build       # Compila el proyecto para producción
pnpm run preview     # Previsualiza la app en modo producción (Vite)
pnpm run lint        # Ejecuta linter JS y CSS
pnpm run lint:js     # Lint JS con StandardJS
pnpm run lint:css    # Lint CSS con Stylelint
pnpm run test        # Ejecuta los tests con Vitest
pnpm run prepare     # Inicializa Husky (Git Hooks)
```



## 📂 Estructura de Carpetas

```
|--------------------------------------------------------------------------------------------------------|
| Carpeta                     | Descripción                                                              |
|--------------------------------------------------------------------------------------------------------|
| fontend-base                | Carpeta raíz del proyecto                                                |
| ├── mocks                   | Mocks para pruebas y desarrollo local.                                   |
| ├── test                    | Archivos de testing del proyecto.                                        |
| └── src                     |                                                                          |
|     └── config              | Archivos de configuración del proyecto.                                  |
|--------------------------------------------------------------------------------------------------------|
```



## 📦 Dependencias

### 🌍 Producción

| Paquete              | Versión   | Badge                                                                  |
|----------------------|-----------|------------------------------------------------------------------------|

---

### 💻 Desarrollo

| Paquete                         | Versión   | Badge                                                                  |
|---------------------------------|-----------|------------------------------------------------------------------------|
| StandardJS                      | `17.1.2`  | ![standard](https://img.shields.io/badge/standard-17.1.2-F3DF49?logo=standardjs) |
| Stylelint                       | `16.23.0` | ![stylelint](https://img.shields.io/badge/stylelint-16.23.0-263238?logo=stylelint) |
| Stylelint Config Standard       | `39.0.0`  | ![stylelint-config](https://img.shields.io/badge/stylelint--config--standard-39.0.0-263238?logo=stylelint) |
| Husky                           | `9.1.7`   | ![husky](https://img.shields.io/badge/husky-9.1.7-263238?style=flat) |
| Lint-Staged                     | `16.1.2`  | ![lint-staged](https://img.shields.io/badge/lint--staged-16.1.2-263238?style=flat) |
| @commitlint/cli                 | `19.8.1`  | ![commitlint-cli](https://img.shields.io/badge/@commitlint/cli-19.8.1-000000?logo=commitlint)     |
| @commitlint/config-conventional | `19.8.1`  | ![commitlint-config](https://img.shields.io/badge/@commitlint/config--conventional-19.8.1-FE5196?logo=conventionalcommits) |
| MSW                             | `2.10.4`  | ![msw](https://img.shields.io/badge/Mock%20Service%20Worker-2.10.4-FF6A33?logo=mockserviceworker) |
| jsdom                           | `26.1.0`  | ![jsdom](https://img.shields.io/badge/jsdom-26.1.0-FFCA28?logo=javascript) |
| jest-dom                        | `6.6.4`   | ![jest-dom](https://img.shields.io/badge/@testing--library/jest--dom-6.6.4-1E4A8C?logo=testinglibrary) |
| react-testing-library           | `16.3.0`  | ![react-testing-library](https://img.shields.io/badge/@testing--library/react-16.3.0-E33332?logo=testinglibrary) |
| user-event                      | `14.6.1`  | ![user-event](https://img.shields.io/badge/@testing--library/user--event-14.6.1-FFB400?logo=testinglibrary) |
| vitest                          | `3.2.4`   | ![vitest](https://img.shields.io/badge/vitest-3.2.4-6E4AFF?logo=vitest) |
| vitest-ui                       | `3.2.4`   | ![vitest-ui](https://img.shields.io/badge/@vitest/ui-3.2.4-6E4AFF?logo=vitest) |
| coverage-v8                     | `3.2.4`   | ![coverage-v8](https://img.shields.io/badge/@vitest/coverage--v8-3.2.4-6E4AFF?logo=vitest) |


## 📄 Licencia

MIT © Raul Farias S. | [Ver licencia completa](./LICENSE.md)

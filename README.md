# 🎬 JibbleFlix App

![App Screenshot](https://github.com/user-attachments/assets/646dc0ba-8a35-4adb-a599-80550a1671e5)

**JibbleFlix** is a demo movie listing application built with **Vue 3**, **TypeScript**, and **Tailwind CSS**.  
It showcases modern frontend development practices including component-based architecture, responsive UI, and testing with **Vitest** and **Cypress**.

---

## 🚀 Features

- Movie searching
- Pagination for browsing movie results
- Favorite movie list with local persistence
- Fully responsive layout
- Unit testing with Vitest  
- End-to-end testing with Cypress

### 🎁 Bonus Features

- CI/CD integration for automated test runs on pull requests  
- ESLint + Prettier combo for consistent and standard code quality  

---

## 🛠️ Tech Stack

- [Vue 3](https://vuejs.org/) (Composition API)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (build tool)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) (unit testing)
- [Cypress](https://www.cypress.io/) (e2e testing)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) (linting and formatting)

---

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

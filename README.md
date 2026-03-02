# 🎬 JibbleFlix App

![App Screenshot](https://github.com/user-attachments/assets/646dc0ba-8a35-4adb-a599-80550a1671e5)

**JibbleFlix** is a movie listing application built with **Vue 3**, **TypeScript**, and **Tailwind CSS**.

This project was completed as part of a **Frontend Developer technical assessment**. The goal was to build a movie listing app that consumes a mock API and implements search, pagination, and favorites functionality while following specific technical constraints.

---

## 📝 Assessment Context

### Objective  
Create a movie listing app using Vue 3 that retrieves data from a mock API and renders it.

### Core Requirements  

- Use **Vue 3** with the **Composition API**
- All scripts written in **TypeScript**
- Use a **CSS preprocessor**
- Implement **pagination** (10 items per page)
- Implement **search by movie title**
- Allow users to **star/unstar movies**
- Persist favorites using **browser storage**
- Include **automated unit tests** (E2E optional)
- Publish in a **public GitHub repository**
- Optional deployment to a public hosting platform

### Mock API  

```
https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}&page=${page}
```

This repository contains my implementation of all required features, along with additional quality improvements.

---

## 🚀 Features

- Movie searching via API
- Pagination (10 results per page)
- Favorite movie list with localStorage persistence
- Fully responsive layout
- Unit testing with Vitest  
- End-to-end testing with Cypress  

### 🎁 Additional Improvements

- CI/CD integration for automated test runs on pull requests  
- ESLint + Prettier for consistent code quality  
- Clean component architecture using Composition API  
- Type-safe API integration  

---

## 🛠️ Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Vite (build tool)
- Tailwind CSS
- Vitest (unit testing)
- Cypress (end-to-end testing)
- ESLint + Prettier

---

## 📦 Project Setup

```sh
npm install
```

### Run Development Server

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

### Run Unit Tests

```sh
npm run test:unit
```

### Run End-to-End Tests (Dev Mode)

```sh
npm run test:e2e:dev
```

This runs the E2E tests against the Vite development server.  
It is faster than running against the production build.

To test the production build:

```sh
npm run build
npm run test:e2e
```

### Lint the Codebase

```sh
npm run lint
```

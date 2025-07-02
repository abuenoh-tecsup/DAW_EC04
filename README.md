# EC04 - Sistema de Gestión de Tareas (Profesor y Estudiante)

Este proyecto corresponde al laboratorio EC04 del curso **Desarrollo de Aplicaciones Web Avanzado**, donde se desarrolló una aplicación web full stack utilizando **Spring Boot (backend)** y **React (frontend)**. 

Permite a **profesores** crear, actualizar y eliminar tareas, mientras que los **estudiantes** pueden subir y gestionar sus entregas asociadas a dichas tareas.

---

## 🔐 Credenciales de Prueba

- 👨‍🏫 **Profesor**  
  - **Usuario:** `profesor`  
  - **Contraseña:** `profesor`

- 🧑‍🎓 **Estudiante**  
  - **Usuario:** `estudiante`  
  - **Contraseña:** `estudiante`

---

## 🚀 Enlaces del Proyecto

- 🔗 **Repositorio GitHub:**  
  [https://github.com/abuenoh-tecsup/DAW_EC04](https://github.com/abuenoh-tecsup/DAW_EC04)

- ⚙️ **Backend desplegado en Railway:**  
  [https://ec04backend-production.up.railway.app/](https://ec04backend-production.up.railway.app/)

- 🌐 **Frontend desplegado (React):**  
  [https://ec04frontend-production.up.railway.app/login](https://ec04frontend-production.up.railway.app/login)

- 📄 **Swagger UI - Documentación de la API:**  
  [https://ec04backend-production.up.railway.app/swagger-ui/index.html](https://ec04backend-production.up.railway.app/swagger-ui/index.html)

---

## 🧩 Tecnologías Utilizadas

### Backend:
- Java 17
- Spring Boot 3
- Spring Security + JWT
- Spring Data JPA (Hibernate)
- MySQL
- Swagger / OpenAPI

### Frontend:
- React
- Zustand (gestión de estado)
- Axios (consumo de API REST)
- Tailwind CSS (estilos)

---

## 🛠️ Funcionalidades

### Profesor:
- Autenticación con JWT
- Crear, listar, actualizar y eliminar tareas (CRUD)
- Visualización de entregas por tarea
- Calificar entregas de estudiantes

### Estudiante:
- Autenticación con JWT
- Visualización de tareas asignadas
- Subir, actualizar y eliminar entregas
- Ver notas y estado de sus entregas

---

## ⚙️ Arquitectura y Buenas Prácticas

- Separación en capas: `Controller`, `Service`, `Repository`, `Entity`, `DTO`, `Security`, `Exception`
- Uso de anotaciones de validación (`@NotNull`, `@Size`, etc.)
- Manejo global de excepciones
- Seguridad basada en roles (`ROLE_PROFESOR`, `ROLE_ESTUDIANTE`)
- Integración y documentación con Swagger

---

## 🗃️ Modelo de Datos

- `User`: información de acceso y rol (profesor o estudiante)
- `Task`: tareas asignadas por los profesores
- `Submission`: entregas realizadas por los estudiantes, asociadas a una tarea

---

## 📦 Despliegue

El sistema fue desplegado en Railway, incluyendo:
- Backend con base de datos MySQL persistente
- Frontend accesible desde navegador
- Swagger para pruebas de API

---

## 📋 Consideraciones Finales

Este proyecto demuestra el dominio de desarrollo de aplicaciones web full stack con seguridad, validación, documentación y despliegue en la nube.


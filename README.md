# 🧠 OCR API con Autenticación y Gestión de Usuario

Esta es una API RESTful básica construida con **Node.js**, **Express** y **TypeScript**. Su propósito es realizar autenticación de usuarios, extracción de texto OCR (como datos de INE), y manejo de información adicional del usuario, con documentación integrada usando Swagger.

## 🚀 Tecnologías Utilizadas

- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **JWT** para autenticación
- **bcrypt** para encriptacion de contraseñas
- **Swagger** para documentación
- **Docker** + **Docker Compose**
- **class-validator** – Validaciones de DTO

---

## 🚀 Características

- Autenticación de usuarios con JWT
- Registro e inicio de sesión
- Extracción de texto de imágenes con OCR de la API de Google Vision Cloud
- Gestión de información adicional del usuario
- MongoDB para el guardado de datos
- Validaciones con DTOs (`class-validator`)
- Documentación con Swagger (disponible en `/api/docs`)
- Organización del código por capas (controllers, services, models, routes)

---

## 📦 Instalación Local

```bash
git clone https://github.com/NoxSlow99/apiRestTopico.git
cd API_OCR
npm install
npm run dev
```

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto, puedes apoyarte con el archivo `.env.template`

---

## 🔐 Autenticación

Usa JWT. Después de iniciar sesión, incluye el token en el header:

```bash
Authorization: Bearer <token>
```

## 📌 Endpoints principales

| Método | Ruta                    | Descripción                            | Autenticación |
|--------|-------------------------|----------------------------------------|----------------|
| POST   | `/auth/register`        | Registro de usuario                    | ❌             |
| POST   | `/auth/login`           | Inicio de sesión                       | ❌             |
| POST   | `/extract/ine`          | Procesamiento de imagen INE (OCR)      | ✅             |
| POST   | `/user/add-information` | Agrega o actualiza info del usuario    | ✅             |
| PATCH  | `/user/update`          | Actualiza nombre, username o contraseña| ✅             |
| DELETE | `/user/delete`          | Elimina cuenta del usuario             | ✅             |

---

## 📚 Documentación Swagger

La documentación de la API está disponible en:

```
http://localhost:3000/api/docs
```

Incluye:
- Esquemas de request y response
- Validaciones (tamaño, tipo, campos requeridos)
- Autenticación Bearer Token (JWT)

---

## 🧱 Estructura del proyecto

```
src/
├── config/
├── controller/
├── dto/
│   ├── request/
│   └── response/
├── interface/
├── middleware/
├── model/
├── routes/
├── services/
├── utils/
│   └── errors/
└── app.ts
```

---

## 🛡️ Seguridad

- Contraseñas encriptadas con `bcrypt`
- Protección de rutas mediante `JWT`
- Validación de entrada con DTOs
- Límite de tamaño de imágenes a 10 MB

---

## 🐳 Docker & Docker Compose

Este proyecto incluye un archivo `docker-compose.yml` para levantar levantar fácilmente la base de datos MongoDB.

### Requisitos

- Docker instalado: https://docs.docker.com/get-docker
- Docker Compose instalado (ya viene incluido en Docker Desktop)

### Levantar el proyecto

```bash
docker-compose up -d
```

Esto levantará un contenedor:

- `mongo-db`: base de datos MongoDB (puerto 27017)

### Volúmenes

Los datos de MongoDB se guardan en un volumen llamado mongo que se queda alojado en la carpeta raíz del proyecto, por lo que no se perderán entre reinicios.

---

## ✍️ Autor

**Angel Colli**  
📧 angel_jcc99@gmail.com  
📍 Quintana Roo, México

---

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.
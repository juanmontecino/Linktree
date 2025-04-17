# Linktree Clone

Un clon de Linktree construido con Next.js, Tailwind CSS, Prisma y Clerk para autenticación.

# Aplicacion desplegada en :
## https://linktree-five-gamma.vercel.app/

## Pasos
### 1. Iniciar sesion / Crear cuenta:
iniciar sesion con google/facebook o crear una cuenta.
### 2. Realizar la confiracion basica del perfil:
Definir nombre, username, redes sociales, links y un avatar
### 3. Clickear sobre el boton "Copy"
Si lo pegas sobre el navegador te llevara a la vision publica de tu perfil
### 4.Modificar informacion
Puedes modificar la informacion de tu perfil a gusto en sus respectivos apartados


## Características

- Perfiles personalizables con nombre, biografía, imagen y fondo
- Gestión de enlaces a redes sociales
- Vista previa en tiempo real del perfil
- Autenticación con Clerk
- Base de datos PostgreSQL con Prisma
- Subida de imágenes con UploadThing

## Requisitos previos (para correr en local)

- Node.js (v18 o superior)
- npm (v9 o superior) o pnpm (v8 o superior)
- PostgreSQL (local o servicio en la nube)
- Cuenta en [Clerk](https://clerk.dev/) y [UploadThing](https://uploadthing.com/)

## Instalación

1. Clona el repositorio:
git clone https://github.com/tu-usuario/juanmontecino-linktree.git
cd juanmontecino-linktree
npm install

## Backend
Realisado con Next.js API Routes + TypeScript + Prisma ORM (PostgreSQL).
Documentacion de la api https://go.postman.co/workspace/d3560f72-3e41-4295-8795-865755791960/documentation/29846482-a6bd5f0b-b97d-4d49-a944-31ab61042b71?entity=folder-800f1897-584a-4f60-bd82-b26fc0731fa9

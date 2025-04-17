import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(async (auth, request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Rutas públicas: sign-in, sign-up, uploadthing, perfiles de usuario y API de info-user
  const isAuthRoute = path.startsWith('/sign-in') || path.startsWith('/sign-up');
  const isUploadthingRoute = path.startsWith('/api/uploadthing');
  const isUserProfileRoute = /^\/[^\/]+$/.test(path);
  const isUserInfoAPIRoute = path.startsWith('/api/info-user/');
  
  // Si es una ruta pública, permitir acceso sin autenticación
  if (isAuthRoute || isUploadthingRoute || isUserProfileRoute || isUserInfoAPIRoute) {
    return;
  }
  
  // Para cualquier otra ruta, proteger
  await auth.protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
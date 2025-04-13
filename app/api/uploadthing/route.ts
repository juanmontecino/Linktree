import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Exportar como objeto con GET y POST
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
// Nota: Las credenciales (UPLOADTHING_SECRET y UPLOADTHING_APP_ID)
// se leen automáticamente de process.env si están presentes.

/* ============================================
   NOVEDADES NOELY — Plantilla de variables de entorno
   js/env.example.js

   COPIA ESTE ARCHIVO A:  js/env.js
   y rellena los valores reales. js/env.js NO se sube a git.

   Para producción en Vercel: define estas variables en el panel
   de Vercel y usa el endpoint /api/env (ver carpeta /api).
   ============================================ */

window.__ENV = {
  // URL del proyecto en Supabase, p. ej. https://abcd1234.supabase.co
  SUPABASE_URL: '',

  // Clave pública anónima (anon key). NUNCA pegues aquí la service_role key.
  SUPABASE_ANON_KEY: ''
};

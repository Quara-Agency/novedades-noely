/* ============================================
   NOVEDADES NOELY — Conexión a Supabase
   js/supabase.js
   ============================================ */

/*
  CONFIGURACIÓN DE CREDENCIALES

  Las credenciales NO se hardcodean en este archivo. Se inyectan en
  tiempo de ejecución desde uno de estos dos lugares:

  1) /js/env.js  → archivo local generado por la dueña (NO se sube a git).
                   Define una constante global `window.__ENV` con:
                     window.__ENV = {
                       SUPABASE_URL: 'https://xxxx.supabase.co',
                       SUPABASE_ANON_KEY: 'eyJ...'
                     };

  2) En Vercel → variables de entorno SUPABASE_URL y SUPABASE_ANON_KEY
                 inyectadas vía el script /api/env (ver carpeta /api).

  Si no se encuentran, el cliente NO se inicializa y se muestra un aviso.
*/

const SUPABASE_URL      = (window.__ENV && window.__ENV.SUPABASE_URL)      || '';
const SUPABASE_ANON_KEY = (window.__ENV && window.__ENV.SUPABASE_ANON_KEY) || '';

// --- Inicializar cliente de Supabase ---
// El SDK se carga vía CDN en cada HTML:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
let supabaseClient = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  // Aviso visible para que la dueña sepa que falta configurar credenciales,
  // sin filtrar detalles internos por la consola en producción.
  document.addEventListener('DOMContentLoaded', () => {
    const aviso = document.createElement('div');
    aviso.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#FEE2E2;color:#991B1B;padding:12px 16px;font-family:system-ui;font-size:13px;text-align:center;z-index:99999;';
    aviso.textContent = 'Configuración pendiente: faltan credenciales de Supabase.';
    document.body.appendChild(aviso);
  });
}

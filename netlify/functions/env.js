/* ============================================
   NOVEDADES NOELY — Netlify Function: env
   Sirve las credenciales de Supabase como JS
   leyéndolas desde variables de entorno.

   En Netlify: configurar en Site settings →
   Environment variables → Add variable:
     SUPABASE_URL
     SUPABASE_ANON_KEY
   ============================================ */

exports.handler = async function () {
  const url = process.env.SUPABASE_URL      || '';
  const key = process.env.SUPABASE_ANON_KEY || '';

  const body = `window.__ENV = ${JSON.stringify({ SUPABASE_URL: url, SUPABASE_ANON_KEY: key })};`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type':  'application/javascript; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
    body,
  };
};

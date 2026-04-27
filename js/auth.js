/* ============================================
   NOVEDADES NOELY — Autenticación
   js/auth.js

   Requiere que supabase.js ya haya inicializado
   la variable global `supabaseClient`.
   ============================================ */

/* Verifica si hay sesión activa. Si no, redirige a login. */
async function verificarSesion() {
  if (!supabaseClient) return;

  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session) {
    window.location.replace('login.html');
  }
}

/* Cierra la sesión y redirige al login. */
async function cerrarSesion() {
  if (!supabaseClient) {
    window.location.replace('login.html');
    return;
  }
  await supabaseClient.auth.signOut();
  window.location.replace('login.html');
}

/* Llama verificarSesion en cuanto carga el script */
verificarSesion();

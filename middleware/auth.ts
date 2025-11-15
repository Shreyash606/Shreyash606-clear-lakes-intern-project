export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem("supabase_token");

    // If no token and trying to access protected pages, redirect to login
    if (!token && to.path !== "/login" && to.path !== "/signup") {
      return navigateTo("/login");
    }

    // If logged in and trying to access login/signup, redirect to home
    if (token && (to.path === "/login" || to.path === "/signup")) {
      return navigateTo("/");
    }
  }
});

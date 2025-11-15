<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center">
        <img
          src="../public/full_logo.png"
          alt="Clear Lakes Dental"
          class="h-12"
        />
      </div>

      <nav class="flex items-center gap-4">
        <NuxtLink
          v-if="isLoggedIn"
          to="/"
          class="px-4 py-2 text-gray-700 hover:text-blue-500 transition"
        >
          View Data
        </NuxtLink>

        <NuxtLink
          v-if="isLoggedIn"
          to="/addData"
          class="px-4 py-2 text-gray-700 hover:text-blue-500 transition"
        >
          Add Data
        </NuxtLink>

        <NuxtLink
          v-if="isLoggedIn"
          to="/photos"
          class="px-4 py-2 text-gray-700 hover:text-blue-500 transition"
        >
          Photos
        </NuxtLink>

        <button
          v-if="isLoggedIn"
          @click="handleLogout"
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>

        <div v-if="isLoggedIn && userEmail" class="text-sm text-gray-600">
          {{ userEmail }}
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const isLoggedIn = ref(false);
const userEmail = ref("");

onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem("supabase_token");
    const user = localStorage.getItem("supabase_user");

    isLoggedIn.value = !!token;

    if (user) {
      const userData = JSON.parse(user);
      userEmail.value = userData.email;
    }
  }
});

const handleLogout = async () => {
  try {
    await $fetch("/api/auth/logout", { method: "POST" });

    localStorage.removeItem("supabase_token");
    localStorage.removeItem("supabase_user");

    navigateTo("/login");
  } catch (e) {
    console.error("Logout failed:", e);
    // Still clear local storage and redirect even if API call fails
    localStorage.removeItem("supabase_token");
    localStorage.removeItem("supabase_user");
    navigateTo("/login");
  }
};
</script>

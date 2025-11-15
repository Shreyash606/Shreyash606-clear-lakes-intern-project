<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {{ loading ? "Loading..." : "Login" }}
        </button>
      </form>

      <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>

      <p class="mt-4 text-center text-gray-600">
        Don't have an account?
        <NuxtLink to="/signup" class="text-blue-500 hover:underline"
          >Sign up</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });

    if (response.session) {
      localStorage.setItem("supabase_token", response.session.access_token);
      localStorage.setItem("supabase_user", JSON.stringify(response.user));
    }

    navigateTo("/");
  } catch (e: any) {
    error.value = e.data?.message || "Login failed";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">Sign Up</h1>

      <form @submit.prevent="handleSignup">
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
            minlength="6"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {{ loading ? "Loading..." : "Sign Up" }}
        </button>
      </form>

      <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
      <p v-if="success" class="text-green-500 mt-4 text-center">
        {{ success }}
      </p>

      <p class="mt-4 text-center text-gray-600">
        Already have an account?
        <NuxtLink to="/login" class="text-blue-500 hover:underline"
          >Login</NuxtLink
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
const success = ref("");

const handleSignup = async () => {
  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    await $fetch("/api/auth/signup", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });

    success.value = "Account created! Redirecting to login...";

    setTimeout(() => {
      navigateTo("/login");
    }, 2000);
  } catch (e: any) {
    error.value = e.data?.message || "Signup failed";
  } finally {
    loading.value = false;
  }
};
</script>

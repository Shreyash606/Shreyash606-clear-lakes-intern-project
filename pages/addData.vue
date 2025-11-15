<template>
  <div>
    <Header />
    <div class="container mx-auto p-8">
      <h1 class="text-3xl font-bold mb-6">Add New Submission</h1>

      <form
        @submit.prevent="handleSubmit"
        class="max-w-lg bg-white p-6 rounded-lg shadow"
      >
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Title</label>
          <input
            v-model="formData.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Description</label>
          <textarea
            v-model="formData.description"
            required
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {{ loading ? "Submitting..." : "Submit" }}
        </button>
      </form>

      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
      <p v-if="success" class="text-green-500 mt-4">{{ success }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const formData = ref({
  title: "",
  description: "",
  user_id: "",
});

const loading = ref(false);
const error = ref("");
const success = ref("");

onMounted(() => {
  if (process.client) {
    const user = localStorage.getItem("supabase_user");
    if (user) {
      const userData = JSON.parse(user);
      formData.value.user_id = userData.id;
    }
  }
});

const handleSubmit = async () => {
  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    await $fetch("/api/postData", {
      method: "POST",
      body: formData.value,
    });

    success.value = "Submission added successfully!";
    formData.value.title = "";
    formData.value.description = "";

    setTimeout(() => {
      navigateTo("/");
    }, 1500);
  } catch (e: any) {
    error.value = e.message || "Failed to add submission";
  } finally {
    loading.value = false;
  }
};
</script>

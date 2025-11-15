<template>
  <div>
    <Header />
    <div class="container mx-auto p-8">
      <h1 class="text-3xl font-bold mb-6">Submissions Table</h1>

      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2 border">ID</th>
              <th class="px-4 py-2 border">Title</th>
              <th class="px-4 py-2 border">Description</th>
              <th class="px-4 py-2 border">User ID</th>
              <th class="px-4 py-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in tableData"
              :key="item.id"
              class="hover:bg-gray-50"
            >
              <td class="px-4 py-2 border">{{ item.id }}</td>
              <td class="px-4 py-2 border">{{ item.title }}</td>
              <td class="px-4 py-2 border">{{ item.description }}</td>
              <td class="px-4 py-2 border">{{ item.user_id }}</td>
              <td class="px-4 py-2 border">
                {{ new Date(item.created_at).toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>

        <p v-if="tableData.length === 0" class="text-center text-gray-500 mt-4">
          No submissions yet. Add some data!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const tableData = ref<any[]>([]);
const loading = ref(true);
const error = ref("");

const fetchData = async () => {
  try {
    loading.value = true;
    const data = await $fetch("/api/fetchData", { method: "POST", body: {} });
    tableData.value = data || [];
  } catch (e: any) {
    error.value = e.message || "Failed to fetch data";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

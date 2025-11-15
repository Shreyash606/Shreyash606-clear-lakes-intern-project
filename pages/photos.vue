<template>
  <div>
    <Header />
    <div class="container mx-auto p-8">
      <h1 class="text-3xl font-bold mb-6">Photo Gallery</h1>

      <!-- Upload Section -->
      <div class="bg-white p-6 rounded-lg shadow mb-8 max-w-lg">
        <h2 class="text-xl font-semibold mb-4">Upload Photo</h2>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Choose Image</label>
          <input
            type="file"
            accept="image/*"
            @change="handleFileSelect"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div v-if="preview" class="mb-4">
          <img :src="preview" alt="Preview" class="max-w-xs rounded" />
        </div>

        <button
          @click="handleUpload"
          :disabled="!selectedFile || uploading"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {{ uploading ? "Uploading..." : "Upload Photo" }}
        </button>

        <p v-if="uploadError" class="text-red-500 mt-2">{{ uploadError }}</p>
        <p v-if="uploadSuccess" class="text-green-500 mt-2">
          {{ uploadSuccess }}
        </p>
      </div>

      <!-- Gallery Section -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Your Photos</h2>

        <div v-if="loadingPhotos" class="text-center">Loading photos...</div>
        <div v-else-if="photoError" class="text-red-500">{{ photoError }}</div>

        <div v-else-if="photos.length === 0" class="text-gray-500 text-center">
          No photos uploaded yet. Upload your first photo above!
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            v-for="photo in photos"
            :key="photo.name"
            class="bg-white rounded-lg shadow overflow-hidden"
          >
            <img
              :src="photo.url"
              :alt="photo.name"
              class="w-full h-64 object-cover"
            />
            <div class="p-4">
              <p class="text-sm text-gray-600 truncate">{{ photo.name }}</p>
              <p class="text-xs text-gray-400">
                {{ new Date(photo.created_at).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const selectedFile = ref<File | null>(null);
const preview = ref("");
const uploading = ref(false);
const uploadError = ref("");
const uploadSuccess = ref("");

const photos = ref<any[]>([]);
const loadingPhotos = ref(true);
const photoError = ref("");

const userId = ref("");

onMounted(() => {
  if (process.client) {
    const user = localStorage.getItem("supabase_user");
    if (user) {
      const userData = JSON.parse(user);
      userId.value = userData.id;
      fetchPhotos();
    }
  }
});

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    selectedFile.value = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const handleUpload = async () => {
  if (!selectedFile.value) return;

  uploading.value = true;
  uploadError.value = "";
  uploadSuccess.value = "";

  try {
    // Convert file to base64
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile.value);

    reader.onload = async () => {
      const base64Data = reader.result as string;

      try {
        await $fetch("/api/photos/upload", {
          method: "POST",
          body: {
            fileName: selectedFile.value!.name,
            fileData: base64Data,
            userId: userId.value,
          },
        });

        uploadSuccess.value = "Photo uploaded successfully!";
        selectedFile.value = null;
        preview.value = "";

        // Refresh photo list
        await fetchPhotos();

        // Clear success message after 3 seconds
        setTimeout(() => {
          uploadSuccess.value = "";
        }, 3000);
      } catch (e: any) {
        uploadError.value = e.message || "Upload failed";
      } finally {
        uploading.value = false;
      }
    };

    reader.onerror = () => {
      uploadError.value = "Failed to read file";
      uploading.value = false;
    };
  } catch (e: any) {
    uploadError.value = e.message || "Upload failed";
    uploading.value = false;
  }
};

const fetchPhotos = async () => {
  loadingPhotos.value = true;
  photoError.value = "";

  try {
    const data = await $fetch("/api/photos/list", {
      method: "POST",
      body: { userId: userId.value },
    });

    photos.value = data || [];
  } catch (e: any) {
    photoError.value = e.message || "Failed to load photos";
  } finally {
    loadingPhotos.value = false;
  }
};
</script>

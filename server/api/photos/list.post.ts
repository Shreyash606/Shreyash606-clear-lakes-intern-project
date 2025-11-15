export default defineEventHandler(async (event) => {
  const supabase = useSupabaseServer();

  // List all files (no user filtering for public bucket)
  const { data, error } = await supabase.storage.from("photos").list("", {
    limit: 100,
    offset: 0,
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error) {
    console.error("List error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  // Get public URLs for each file
  const filesWithUrls = data.map((file) => {
    const { data: urlData } = supabase.storage
      .from("photos")
      .getPublicUrl(file.name);

    return {
      name: file.name,
      url: urlData.publicUrl,
      created_at: file.created_at,
    };
  });

  return filesWithUrls;
});

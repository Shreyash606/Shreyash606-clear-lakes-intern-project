export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const supabase = useSupabaseServer();

  const { fileName, fileData, userId } = body;

  // Convert base64 to buffer
  const base64Data = fileData.split(",")[1];
  const buffer = Buffer.from(base64Data, "base64");

  // Generate unique filename with timestamp
  const timestamp = Date.now();
  const uniqueFileName = `${timestamp}-${fileName}`;

  // Upload to Supabase storage (no user folder for public bucket)
  const { data, error } = await supabase.storage
    .from("photos")
    .upload(uniqueFileName, buffer, {
      contentType: "image/jpeg",
      upsert: false,
      cacheControl: "3600",
    });

  if (error) {
    console.error("Upload error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return data;
});

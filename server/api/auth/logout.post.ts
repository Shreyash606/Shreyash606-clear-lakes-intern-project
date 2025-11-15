export default defineEventHandler(async (event) => {
  const supabase = useSupabaseServer();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message,
    });
  }

  return { success: true };
});

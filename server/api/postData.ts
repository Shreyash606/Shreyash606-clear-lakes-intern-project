export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const supabase = useSupabaseServer();

  const { data, error } = await supabase
    .from("submissions")
    .insert([body])
    .select();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return data;
});

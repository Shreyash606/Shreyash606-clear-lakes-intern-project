export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const supabase = useSupabaseServer();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw createError({
      statusCode: 401,
      message: error.message,
    });
  }

  return {
    user: data.user,
    session: data.session,
  };
});

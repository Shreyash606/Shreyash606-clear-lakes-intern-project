export default defineEventHandler(async (event) => {
  const supabase = useSupabaseServer()
  const { data, error } = await supabase.from('submissions').select('*')
  
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }
  
  return data
})
import { supabase } from "../supabaseClient"
import handleRequest from "./requestHandler"

export const fetchAllLogCategoriesByUserId = async () => {
  return handleRequest(async ({ userSession }) => {
    return await supabase
      .from('log_categories')
      .select('*')
      .eq('user_id', userSession.user.id)
  })
}

export const insertLogCategory = async (logCategory) => {
  return handleRequest(async ({ userSession }) => {
    return await supabase.from('log_categories').insert({
      ...logCategory,
      user_id: userSession.user.id
    })
  })
}

export const insertLogCategoryAndFetchLast = async (logCategory) => {
  return handleRequest(async ({ userSession }) => {
    return await supabase.from('log_categories').insert({
      ...logCategory,
      user_id: userSession.user.id
    })
    .select()
  })
}
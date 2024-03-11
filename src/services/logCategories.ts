import http from '../https'
import { supabase } from '../supabase'
import handleRequest from './requestHandler'

export const fetchAllLogCategoriesByUserId = async () => {
  return handleRequest(async ({ userSession }) => {
    return await http.get(`log_categories/user/${userSession.user.id}/all`)
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

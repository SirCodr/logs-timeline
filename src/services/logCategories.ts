import http from '../https'
import { supabase } from '../supabase'
import { httpResponse } from '../types/http'
import { LogCategory } from '../types/log'
import handleRequest from './requestHandler'

export async function fetchAllLogCategoriesByUserId<T>(): Promise<httpResponse<T>> {
  return handleRequest(async ({ userSession }) => {
    return await http.get(`log_categories/user/${userSession.user.id}/all`)
  })
}

export async function insertLogCategory(logCategory: LogCategory): Promise<httpResponse> {
  return handleRequest(async ({ userSession }) => {
    return await supabase.from('log_categories').insert({
      ...logCategory,
      user_id: userSession.user.id
    })
  })
}

export async function insertLogCategoryAndFetchLast(logCategory: LogCategory): Promise<httpResponse> {
  return handleRequest(async ({ userSession }) => {
    return await supabase.from('log_categories').insert({
      ...logCategory,
      user_id: userSession.user.id
    })
      .select()
  })
}

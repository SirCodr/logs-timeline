import http from '../https'
import { httpResponse } from '../types/http'
import { LogCategory } from '../types/log'
import handleRequest from './requestHandler'

export async function fetchAllLogCategoriesByUserId<T = unknown>(): Promise<httpResponse<T>> {
  return handleRequest(async ({ userSession }) => {
    return await http.get(`log_categories/user/${userSession.user.id}/all`)
  })
}

export async function insertLogCategory<T = unknown>(logCategory: LogCategory): Promise<httpResponse<T>> {
  return handleRequest(async ({ userSession }) => {
    return await http.post('log_categories', logCategory, {
      params: {
        user_id: userSession.user.id
      }
    })
  })
}

export async function insertLogCategoryAndFetchLast(logCategory: Omit<LogCategory, 'id'>): Promise<httpResponse> {
  return handleRequest(async ({ userSession }) => {
    return await http.post('log_categories', logCategory, {
      params: {
        user_id: userSession.user.id,
        fetchNewRecord: true
      }
    })
  })
}

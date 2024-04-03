import http from '../https'
import { LogForServer } from '../types/log'
import handleRequest from './requestHandler'
import { httpResponse } from '../types/http'

export async function fetchAllLogs<T>(): Promise<httpResponse<T>> {
  return handleRequest(async () => {
    return await http.get('logs/all')
  })
}

export async function fetchAllLogsByUserId<T>(): Promise<httpResponse<T>> {
  return handleRequest(async ({ userSession }) => {
    return await http.get(`logs/user/${userSession.user.id}`)
  })
}

export async function insertLog<T>(log: LogForServer): Promise<httpResponse<T>> {
  return handleRequest(async ({ userSession }) => {
    return await http.post(
      'logs', log,
      {
        params: {
          user_id: userSession.user.id
        }
      }
    )
  })
}

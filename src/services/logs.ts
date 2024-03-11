import { AxiosResponse } from 'axios'
import http from '../https'
import { LogForServer } from '../types/log'
import handleRequest from './requestHandler'

export async function fetchAllLogs(): Promise<AxiosResponse> {
  return handleRequest(async () => {
    return await http.get('logs/all')
  })
}

export async function fetchAllLogsByUserId(): Promise<AxiosResponse> {
  return handleRequest(async ({ userSession }) => {
    return await http.get(`logs/user/${userSession.user.id}`)
  })
}

export async function insertLog(log: LogForServer): Promise<AxiosResponse> {
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

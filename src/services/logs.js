import { supabase } from '../supabaseClient'
import handleRequest from './requestHandler'

export const fetchAllLogsByUserId = async () => {
  return handleRequest(async ({ userSession }) => {
    return await supabase.rpc('get_all_logs_by_user_id', {
      userid: userSession.user.id
    })
  })
}

export const fetchAllLogs = async () => {
  return handleRequest(async () => {
    return await supabase
      .from('logs')
      .select('*')
      .order('date', { ascending: false })
  })
}

export const insertLog = async (log) => {
  return handleRequest(async ({ userSession }) => {
    return await supabase.from('logs').insert({
      ...log,
      user_id: userSession.user.id
    })
  })
}

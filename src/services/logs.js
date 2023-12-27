import { supabase } from '../supabaseClient'
import handleRequest from './requestHandler'

export const fetchAllLogsByUserId = async () => {
  return handleRequest(async ({ userSession }) => {
    return await supabase
      .from('logs')
      .select('*')
      .eq('user_id', userSession.user.id)
      .order('date', { ascending: false })
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

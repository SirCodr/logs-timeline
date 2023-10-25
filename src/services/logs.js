import { supabase } from '../supabaseClient'

export const fetchAllLogs = async () => {
  try {
    const { data, error } = await supabase.from('logs').select('*').order('date', { ascending: false })

    return error ?? data
  } catch (error) {
    console.error('Error on fetch all logs: ', error)
  } 
}

export const insertLog = async (log) => {
  try {
    const { data, error } = await supabase.from('logs').insert(log)

    return error ?? data
  } catch (error) {
    console.error('Error on insert log: ', error)
  }
}
import { AxiosResponse } from "axios";
import http from "../https";

export async function fetchAllLogs(): Promise<AxiosResponse> {
  return await http.get('logs/all')
}

export async function fetchAllLogsByUserId(): Promise<AxiosResponse> {
  return await http.get('logs/user/b52edebd-1101-4226-a4a6-bd3cff45b859')
}
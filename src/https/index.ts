import axios from 'axios'
import { IS_DEV_MODE } from '../consts/environment'

const http = axios.create()
console.log(IS_DEV_MODE);

http.defaults.baseURL = IS_DEV_MODE ? 'http://localhost:3000' : 'https://logs-timeline-api.vercel.app/'

export default http
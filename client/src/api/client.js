import { ACCESS_TOKEN } from './constants'
import axios from 'axios'

const sanare = import.meta.env.VITE_SANARE_API_BASE_URL

const api = axios.create({
  baseURL: sanare,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    // console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api

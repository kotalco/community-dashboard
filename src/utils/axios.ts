import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)

export default instance

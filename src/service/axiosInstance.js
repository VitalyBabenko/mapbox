import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://panel.lamap.ch',
  timeout: 10000,
  withCredentials: true,
})

export default axiosInstance

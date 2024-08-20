import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://777.adm-devs.com',
  timeout: 10000,
  withCredentials: true,
})

export default axiosInstance

import axios from 'axios'
import { getHostname } from '../utils/getHostname'

const axiosInstance = axios.create({
  baseURL: getHostname(),
  timeout: 1000000,
})

export default axiosInstance

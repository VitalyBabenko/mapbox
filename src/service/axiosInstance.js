import axios from 'axios'
import { getHostname } from '../utils/getHostname'

const axiosInstance = axios.create({
  baseURL: getHostname(),
  timeout: 10000,
})

export default axiosInstance

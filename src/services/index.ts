import axios from 'axios'
import { BASE_URL, TIME_OUT } from './request.config'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

const requestInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

// 添加请求拦截器
const token = localCache.getCache(LOGIN_TOKEN)
requestInstance.interceptors.request.use(
  function (config) {
    // 在请求头里的授权，添加token
    if (token && config.headers) {
      // 类型缩小
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
requestInstance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default requestInstance

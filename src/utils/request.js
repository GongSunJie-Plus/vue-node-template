import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:2333'

function getService(baseURL) {
  const service = axios.create({
    baseURL,
    timeout: 15000,
    withCredentials: true
  })

  service.interceptors.request.use(
    (config) => {
      config.baseURL = BASE_URL
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  return service
}

export default getService(BASE_URL)
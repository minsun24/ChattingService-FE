import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // 공통 prefix
  headers: {
    'Content-Type': 'application/json'
  }
})

//  요청 인터셉터 (예: 토큰 자동 삽입)
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user?.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`
  }
  return config
})

export default api
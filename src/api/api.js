import axios from 'axios'
import { useUserStore } from '@/stores/userStore'


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL+"/api",  // 공통 prefix
  headers: {
    'Content-Type': 'application/json'
  }
})

//  요청 인터셉터 (로컬 스토리지에서 토큰 가져와서 자동 삽입하는 방식)
// api.interceptors.request.use((config) => {
//   const user = JSON.parse(localStorage.getItem('user'))
//   if (user?.accessToken) {
//     config.headers.Authorization = `Bearer ${user.accessToken}`
//   }
//   return config
// })

// pinia에서 accessToken 을 가져와서 자동 삽입하는 방식
api.interceptors.request.use((config) => {
  const userStore = useUserStore()

  //  store 초기화가 선행되어야 함.
  if (userStore.accessToken) {
    config.headers.Authorization = `Bearer ${userStore.accessToken}`
  }

  return config
})


export default api
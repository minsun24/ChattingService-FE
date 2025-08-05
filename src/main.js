import 'vuetify/styles'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router/index.js'
import App from './App.vue'
import vuetify from '@/plugins/vuetify.js'
import { useUserStore } from '@/stores/userStore'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

const userStore = useUserStore()
const savedUser = JSON.parse(localStorage.getItem('user'))
if (savedUser?.accessToken) {
  userStore.setUser(savedUser)
}
else {
  userStore.clearUser()
}

app.use(router)
app.use(vuetify)

app.mount('#app')

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
userStore.initializeUserFromStorage()

app.use(router)
app.use(vuetify)

app.mount('#app')
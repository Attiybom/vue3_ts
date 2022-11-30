import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "normalize.css"

import App from './App.vue'
import router from './router'

import './assets/main.css'
import registerIcons from './global/register-icons'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(registerIcons)


app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "normalize.css"

import App from './App.vue'
import router from './router'
import useLoginStore from './stores/login/login'

import './assets/main.css'
import registerIcons from './global/register-icons'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())

// 加载本地数据
const loginStore = useLoginStore()
loginStore.loadLocalCacheAction()

app.use(router)
app.use(registerIcons)


app.mount('#app')

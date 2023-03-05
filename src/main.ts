import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import './assets/main.css'
import "./firebase/config.ts"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify).mount('#app')

//app.mount('#app')

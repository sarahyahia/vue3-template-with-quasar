import { createApp } from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'
import './assets/sass/black-dashboard.scss'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from "./router";
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(Quasar, quasarUserOptions)


app.mount('#app')

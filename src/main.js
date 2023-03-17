import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import './index.css'

createApp(App).use(BootstrapIconsPlugin).use(router).mount('#app')

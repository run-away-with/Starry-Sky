import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import HeaderNav from './components/HeaderNav.vue';

const app = createApp(App);
app.component('HeaderNav', HeaderNav);
app.use(router);
app.mount('#app');

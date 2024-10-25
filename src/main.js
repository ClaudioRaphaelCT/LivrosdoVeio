import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './vuetify'; // Importa a configuração do Vuetify

const app = createApp(App);

app.use(vuetify); // Adiciona o Vuetify ao app
app.mount('#app');

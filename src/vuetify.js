// src/vuetify.js
import 'vuetify/styles'; // Importa os estilos do Vuetify
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Opcional, para configurar os ícones

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light', // Pode ser configurado para 'dark' se desejar
  },
});

export default vuetify;

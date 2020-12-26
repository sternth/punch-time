import { createApp, Component } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

createApp(App as unknown as Component)
  .use(store)
  .use(router)
  .mount('#app');

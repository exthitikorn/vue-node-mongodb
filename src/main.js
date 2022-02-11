import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

import 'semantic-ui-css/semantic.css';
import router from './Router'
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAawAiPuxBuqa6XZCaD3IXPAmvNM-pBEkY",
  },
  installComponents: true,
});

new Vue({
  render: h => h(App),
  router,
  VueSimpleAlert,
}).$mount('#app')
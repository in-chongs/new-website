import Vue from 'vue';
import AntDesign from 'ant-design-vue';
import App from './App.vue';
import i18n from './utils/i18n'; // todo remove i18n
import router from './router';
// import './utils/resize';
import 'ant-design-vue/dist/antd.css';
import './styles/index.scss';

Vue.config.productionTip = false;

Vue.use(AntDesign);

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app');

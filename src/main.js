// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' //饿了么组件
import preview from 'vue-photo-preview' //浏览图片组件

Vue.use(preview)

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render : h => h(App),
  router, //使用vue-router
  store, //使用vuex
})

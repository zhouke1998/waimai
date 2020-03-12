// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import {InfiniteScroll, Spinner, Lazyload} from 'mint-ui'
import preview from 'vue-photo-preview' //浏览图片组件
import 'vue-photo-preview/dist/skin.css' //图片查看css

import BaiduMap from "vue-baidu-map"
Vue.use(BaiduMap,{
  ak:"Mob1UYjgvybGBKiWxsGjaeeyiHHkotW2"
});

import 'babel-polyfill'
// import Swiper from "swiper"
// window.Swiper = Swiper

Vue.use(preview);


Vue.use(Lazyload);
Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render : h => h(App),
  router, //使用vue-router
  store, //使用vuex
})

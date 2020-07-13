import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import {Toast} from 'mint-ui';

const Home = () => import ('../pages/Home/Home') //组件懒加载
const Order = () => import ('../pages/Order/Order')
const Search = () => import ('../pages/Search/Search')
const Mine = () => import ('../pages/Mine/Mine')
const Login = () => import ('../pages/Login/Login')
const LoginPwd = () => import ('../pages/Login/LoginPwd')
const Restaurant = () => import ("../pages/Restaurant/Restaurant")
const MapAddress = () => import ("../pages/MapAddress/MapAddress")
const deliveryAddress = () => import ("../pages/PersonInfo/deliveryAddress/deliveryAddress")
const deliveryMapAddress = () => import ("../pages/MapAddress/deliveryMapAddress")

import Classify from '../pages/Home/Classify' //分类店铺界面
import RestaurantApp from "../pages/Restaurant/RestaurantApp"
import Story from "../pages/Story/Story"
import Certification from '../pages/Certification/Certification'
import PayMoney from '../pages/PayMoney/PayMoney' //订单提交页面
import PayOnline from '../pages/PayOnline/PayOnLine' //在线支付
import PersonInfoApp from '../pages/PersonInfo/PersonInfoApp'
import PersonInfo from '../pages/PersonInfo/PersonInfo'
import modifyUsername from '../pages/PersonInfo/Username/Username' //修改用户名
import modifyPhone from '../pages/PersonInfo/Phone/Phone' //修改手机
import modifyPassword from '../pages/PersonInfo/Password/Password'
import AddAddress from '../pages/PersonInfo/deliveryAddress/AddAddress/AddAddress'
import EditAddress from '../pages/PersonInfo/deliveryAddress/EditAddress/EditAddress'

Vue.use(Router)

let mode = "hash";

if(window.location.href.indexOf("index.html")===-1){
  mode = "history";
}
console.log(window.location.href.substr(-10));
const router =  new Router({
  mode,
  routes: [
    {
      path: '/home',
      component:Home,
      meta:{
        FootGuide: true,
        slide_index:1,
      },
      redirect:'/'
    },
    {
      path: '/classify',
      component:Classify,
      meta:{
        FootGuide: false,
        slide_index:2,
      }
    },
    {
      path: '/order',
      component:Order,
      meta:{
        FootGuide: true,
        slide_index:3,
      }
    },
    {
      path: '/search',
      component:Search,
      meta:{
        FootGuide: true,
        slide_index:2,
      }
    },
    {
      path: '/mine',
      component:Mine,
      meta:{
        FootGuide: true,
        slide_index:4,
      }
    },
    {
      path: '/',
      component:Home,
      meta:{
        FootGuide: true,
        slide_index:1,
      }
    },
    {
      component:Login,
      path:'/login',
      meta:{
        slide_index:5,
      }
    },
    {
      component:LoginPwd,
      path:'/loginPwd',
      meta:{
        slide_index:6,
      }
    },
    {
      component: MapAddress,
      path: '/address',
      meta: {
        slide_index: 3,
      }
    },
    {
      component: deliveryMapAddress,
      path: '/deliveryMapAddress',
      meta: {
        slide_index: 8,
      }
    },
    {
      component: RestaurantApp,
      path: '/restaurant',
      mode:'hash',
      children:[
        {
          path:'',
          component: Restaurant,
          meta:{
            slide_index:3,
          },
        },
        {
          component:Story,
          path:'story',
          meta:{
            slide_index:4,
          }
        },
        {
          component:Certification,
          path:'certification',
          meta:{
            slide_index:4,
          }
        },
        {
          component:PayMoney,
          name:'payMoney',
          path:'checkOrder',
          meta:{
            slide_index:4,
            require_login:true,
            tips:true, //提示请先登录
          }
        }
      ]
    },
    {
      component: PayOnline,
      name:'payOnline',
      path: '/PayOnline',
    },
    {
      component:PersonInfoApp,
      path:'/personInfo',
      children:[
        {
          path:'',
          component:PersonInfo,
          meta:{
            slide_index:5,
            require_login:true
          }
        },
        {
          path:'username',
          component:modifyUsername,
          name:'modifyUsername',
          meta:{
            slide_index:6,
          }
        },
        {
          path:'phone',
          component:modifyPhone,
          meta:{
            slide_index:6,
            require_login:true
          }
        },
        {
          path:'password',
          component:modifyPassword,
          meta:{
            slide_index:6,
            require_login:true
          }
        },
        {
          path: 'deliveryAddress',
          name:"deliveryAddress",
          meta: {
            slide_index: 6,
            require_login:true,
            tips:true, //提示请先登录
          },
          component: deliveryAddress
        },
        {
          path: 'addAddress',
          meta: {
            slide_index: 7,
          },
          component: AddAddress
        },
        {
          path: 'editAddress',
          meta: {
            slide_index: 7,
          },
          component: EditAddress
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  let nextPath = false;
  if(to.meta.require_login){
    const isLogin = !!(store.state.user && store.state.user.phone);
    if(!isLogin){ //未登录
      nextPath = {  //next参数
        path:"/login"
      };
      if(to.meta.tips){
        Toast({
          message: '请先登录',
          position: 'middle',
          duration: 1500
        });
      }
      next(nextPath);
      return
    }
  }
  next();
});

export default router;

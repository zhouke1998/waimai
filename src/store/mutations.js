/*
直接更新state的多个方法对象
*/
import Vue from 'vue'
import {checkExitAndAdd,checkExitAndSub} from "../utils/getImagePath";
import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_TYPE_LIST,
  RECEIVE_USER,
  RECEIVE_FOODS_SHOP,
  INCREASEFOOD,
  DECREASEFOOD,
  CLEARCARTFOODS,
  PAYMONEY,
  CHANGEPHONE,
  CHANGEUSERNAME,
  CHANGEPASSWORD,
} from "./mutation-types";

export default {
  [RECEIVE_ADDRESS] (state,address){
    state.address = address
  },
  [RECEIVE_TYPE_LIST] (state,type_list){
    state.type_list = type_list
  },
  [RECEIVE_SHOPS] (state,shops){
    state.shops = shops
  },
  [RECEIVE_USER] (state,user){
    state.user = user
  },
  [RECEIVE_FOODS_SHOP] (state,foodsShop){
    state.foodsShop = foodsShop
  },
/*  [ADDCARTFOOD] (state,cartFoods){
    state.cartFoods = cartFoods
  },*/
  [INCREASEFOOD] (state,{food,selected}){
    let spec = selected.specification,attr =selected.attrsValue
    if(!food.cartNumber){ //未定义或商品为0时
      if(selected){ //选择了有种类的商品,检查购物车里是否存在
        checkExitAndAdd(state.cartFoods,food,spec,attr)
      }else {
        Vue.set(food, 'cartNumber', 1)
        state.cartFoods.push(food)
      }
    }else{
      food.cartNumber++
    }
  },
  [DECREASEFOOD] (state,{food,selected}){
    if(!food.cartNumber){ //未定义或商品为0时
      Vue.set (food,'cartNumber',0)
    }else {
      //food.cartNumber--
      if (food.cartNumber == 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
    //if(selected){ //选择了有种类的商品
    checkExitAndSub(state.cartFoods,food)
  },
  [CLEARCARTFOODS] (state){
    //清空食物中的cartNumber
    state.cartFoods.forEach((food)=>{
      food.cartNumber = 0
    })
    state.cartFoods = []
  },

  [ PAYMONEY ] (state,money){
    state.payMoney = money
  },
  //修改手机号和用户名
  [CHANGEUSERNAME] (state,name){
    state.user.username = name
    state.user.has_change_name = true
  },

  [CHANGEPHONE] (state,phone){
    state.user.phone = phone
  },
  //修改密码
  [CHANGEPASSWORD] (state){
    state.user.password = "true"
  }
}

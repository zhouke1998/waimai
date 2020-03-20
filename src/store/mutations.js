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
  LOGOUT,
  RECEIVE_FOODS_SHOP,
  INCREASEFOOD,
  DECREASEFOOD,
  CLEARCARTFOODS,
  PAYMONEY,
  CHANGEPHONE,
  CHANGEUSERNAME,
  CHANGEPASSWORD,
  CHANGEHEADPHOTO,
  CHANGESELECTMAPADDRESSSTATUS,
  CHANGESELECTMAPADDRESSS,
  RECEIVEDELIVERYADDRESS,
  CHANGESETTLEADDRESS
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
  [LOGOUT] (state){
    state.user = {};
    state.deliveryAddress = {
      status:1,
        selected:-1,
        address:[

      ]
    }
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
  },
  //修改头像
  [CHANGEHEADPHOTO](state, path) {
    state.user.photoPath = path
  },
  // 修改选择地址的状态值 （编辑/新增）
  [CHANGESELECTMAPADDRESSSTATUS](state,{activeStatus,address_info}){
    state.deliveryAddress_select.active = activeStatus
    if(activeStatus==="edit"){
      state.deliveryAddress_select.edit = address_info  //
    }else if(activeStatus==="add"){
      state.deliveryAddress_select.add.address = state.address;
    }
  },
  // 修改选择地址
  [CHANGESELECTMAPADDRESSS](state,{deliveryAddress,onlyAddress,onlyInfo}){
    let activeStatus = state.deliveryAddress_select.active
    if(activeStatus!==-1){
      if(onlyAddress){
        state.deliveryAddress_select[activeStatus].address = deliveryAddress
      }else if(onlyInfo){
        state.deliveryAddress_select[activeStatus].baseInfo = deliveryAddress
      }else{
        if(!deliveryAddress){
          state.deliveryAddress_select[activeStatus] = {
            id:101,
            baseInfo: {
              phone: "",
              door: "",
              name: "",
              gender: -1,//0男士 1女士
              addressTip: -1
            },
            address:{
              status:1,
              address:'',
              location:{
                lat:39.90, //纬度
                lng:116.40  //经度
              },
              addressComponent:{
                country:"",
                province:"",
                city:"",
              }
            }
          }   //重置
        }else{
          state.deliveryAddress_select[activeStatus] = deliveryAddress
        }
      }
    }
  },
  // 接收用户保存的地址
  [RECEIVEDELIVERYADDRESS](state,deliveryAddress){
    state.deliveryAddress.status = 0;
    state.deliveryAddress.address = deliveryAddress;
  },
  // 结算界面选择的地址
  [CHANGESETTLEADDRESS](state,address_id){
    state.deliveryAddress.selected = address_id;
  }
}

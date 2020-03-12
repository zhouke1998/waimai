/*
通过mutation间接更新state的多个方法对象
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_TYPE_LIST,
  RECEIVE_LONGITUDE,
  RECEIVE_LATITUDE,
  RECEIVE_USER,
  RECEIVE_FOODS_SHOP,
  INCREASEFOOD,
  DECREASEFOOD,
  CLEARCARTFOODS,
  PAYMONEY,
  CHANGEUSERNAME,//修改用户名
  CHANGEPHONE, //修改手机号
  CHANGEPASSWORD, //密码
  CHANGEHEADPHOTO,//头像
} from "./mutation-types";

import {
  reqAddress,
  reqAddress2,
  reqType_list,
  autoLogin,
  logout,
  getFoodShop,
} from "../api";
export default {
  async getAddressByLL({commit},geo){
    const  result = await reqAddress(geo)
    if(result.status===0){
      commit(RECEIVE_ADDRESS,result)
    }
  },
  async getAddress2({commit},ip){
    const  result = await reqAddress2(ip)
    if(result.status===0){
      commit(RECEIVE_ADDRESS,result)
    }else{
      console.log("获取地址信息失败");
    }
  },
  //获取分类列表
  async getType_list({commit}){
    const  result = await reqType_list()
    if(result.status===0){
      const type_list = result.type_list
      commit(RECEIVE_TYPE_LIST,type_list)
    }else{
      console.log("获取分类列表失败");
    }
  },
  //存储用户信息
  storeUserInfo({commit},user){
    commit(RECEIVE_USER,user)
  },
  //自动登录
  async autoLogin({commit}){
    const result = await autoLogin()
    if(result.status===0){
      commit(RECEIVE_USER,result.user)
    }
  },

  //退出登录
  async logout({commit}){
    const result = await logout()
    if(result.status ===0){
      commit(RECEIVE_USER,{})
    }
  },

  //获取店铺信息
  async getFoodsShop({commit},restaurant_id){
    const result = await getFoodShop(restaurant_id)
    if(result.restaurant_id){
      commit(RECEIVE_FOODS_SHOP,result)
    }
  },
  //添加商品到购物车
  addCartFoods({commit},{isAdd,food,selected=''}){
    if(isAdd){
      commit(INCREASEFOOD,{food,selected})
    }else{
      commit(DECREASEFOOD,{food,selected})
    }
  },
  //
  clearCartFoods({commit}){
    commit(CLEARCARTFOODS)
  },

  payMoney({commit},money){
    commit(PAYMONEY,money)
  },
  //修改用户名和手机
  changeUsername({commit},newName){
    commit(CHANGEUSERNAME,newName)
  },
  changeNewPhone({commit},newPhone){
    commit(CHANGEPHONE,newPhone)
  },
  //修改密码
  changePassword({commit}){
    commit(CHANGEPASSWORD)
  },
  //
  changeHeadPhoto({commit}, path) {
    commit(CHANGEHEADPHOTO, path)
  }
}

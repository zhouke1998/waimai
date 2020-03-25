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
  LOGOUT,
  RECEIVE_FOODS_SHOP,
  INCREASEFOOD,
  DECREASEFOOD,
  CLEARCARTFOODS,
  PAYMONEY,
  CHANGEUSERNAME,//修改用户名
  CHANGEPHONE, //修改手机号
  CHANGEPASSWORD, //密码
  CHANGEHEADPHOTO,//头像
  CHANGESELECTMAPADDRESSSTATUS, //  修改选择地址的状态值 （编辑/新增）
  CHANGESELECTMAPADDRESSS,
  RECEIVEDELIVERYADDRESS,
  CHANGESETTLEADDRESS
} from "./mutation-types";

import {
  reqAddress,
  reqAddress2,
  reqType_list,
  autoLogin,
  logout,
  getFoodShop,
  receiveDeliveryAddress,
  getUserIp
} from "../api";
export default {
  async getAddressByLL({commit},geo){
    const  result = await reqAddress(geo)
    if(result.status===0){
      commit(RECEIVE_ADDRESS,result)
    }
  },
  async getAddress2({commit},ip2){
    let ip = 0;
    const ip_result = await getUserIp().catch(()=>{
      //ip = "117.169.226.36"; //江西萍乡ip
    });
    if(ip_result && ip_result.status===0){
      ip = ip_result.ip;
    }else{
      //ip = "117.169.226.36"
    }
    const  result = await reqAddress2(ip);
    if(result.status===0){
      commit(RECEIVE_ADDRESS,result)
    }else{
      console.log("获取地址信息失败");
    }
  },
  setAddress({commit},address){
    if(address.status===0){
      commit(RECEIVE_ADDRESS,address);
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
      commit(LOGOUT)
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
  },
  // 修改选择地址的状态值 （编辑/新增）
  changeSelectMapAddressStatus({commit},{activeStatus,address_info}){
    commit(CHANGESELECTMAPADDRESSSTATUS,{activeStatus,address_info})
  },
  changeSelectMapAddress({commit},{deliveryAddress,onlyAddress,onlyInfo}){
    commit(CHANGESELECTMAPADDRESSS,{deliveryAddress,onlyAddress,onlyInfo})
  },

  async receiveDeliveryAddress({commit}){
    const result = await receiveDeliveryAddress()
    if(result.status === 0){
      commit(RECEIVEDELIVERYADDRESS,result.address)
    }
  },

  changeSettleAddress({commit},address_id){
    commit(CHANGESETTLEADDRESS,address_id)
  }

}

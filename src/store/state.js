/*

*/

export default {
  // latitude:22.704232, //默认经纬度
  // longitude:114.25597,
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
  },//地址信息
  type_list: [],//分类列表
  shops:[], //商家列表
  user:{}, //用户信息
  foodsShop:{}, //店铺里的商品信息
  cartFoods:[],//购物车里的物品
  cartAnimate:false, //购物车图标动画,true表示开始动画
  payMoney:0,
  deliveryAddress:{
    status:1,
    selected:-1,
    address:[

    ]
  },  //配送地址
  deliveryAddress_select: { //  编辑/添加零时保存地址
    active: -1,
    add:{
      baseInfo:{
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
    },
    edit:{
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
    }
  }
}

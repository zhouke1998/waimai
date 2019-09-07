import ajax from './ajax'
const api = '/waimai_api'

export const reqAddress = geo =>ajax(`${api}/getAddressByLL/${geo}`); //通过经纬度获取地址

export const reqAddress2 = ip =>ajax(`${api}/getAddressByIp/${ip}`); //通过ip获取地址

export const reqType_list = () =>ajax(`${api}/type_list/get_type_list`); //获取分类信息

export const reqRestaurants = (offset,limit=2)=>ajax(`${api}/shops/restaurants`,{offset,limit}); //获取店铺信息

export const getLoginCode = phone=>ajax(`${api}/users/getPhoneCode`,{phone},'post'); //获取手机登录验证码

export const loginPhone = code=>ajax(`${api}/users/login`,{code},'post'); //手机登录验证码验证

export const loginPwd = (username,password,code)=>ajax(`${api}/users/loginPwd`,{username,password,code},'post'); //账号密码登录

export const autoLogin = ()=>ajax(`${api}/users/autoLogin`,{},'post'); //自动登录

export const logout = ()=>ajax(`${api}/users/logout`,{},'post'); //退出登录

export const getFoodShop = (restaurant_id='E1695702492583732806')=>ajax(`${api}/food/getFoods/${restaurant_id}`,{}); //请求店铺里的具体商品信息

export const getDetails = (restaurant_id='E1695702492583732806')=>ajax(`${api}/food/details/${restaurant_id}`,{}); //请求店铺红包信息

export const getComment = ({restaurant_id='E1695702492583732806',firstQuery=true,offset=0,limit=10})=>ajax(`${api}/food/comments/${restaurant_id}`,{firstQuery,offset,limit}); //获取评价信息

export const getStory = (restaurant_id='E1695702492583732806')=>ajax(`${api}/food/story/${restaurant_id}`); //请求店铺历史信息

export const getCertification = (restaurant_id='E1695702492583732806')=>ajax(`${api}/food/certification/${restaurant_id}`);//请求店铺营业资质信息

export const changeUserName = (newName)=>ajax(`${api}/users/changeUsername`,{newName},'post'); //修改用户名

export const checkOldPhone = (code)=>ajax(`${api}/users/checkOldPhone`,{code},'post'); //验证旧手机

export const checkNewPhone = (code,newPhone)=>ajax(`${api}/users/checkNewPhone`,{code,newPhone},'post'); //验证新手机

export const changePassword = (newPassword,oldPassword='')=>ajax(`${api}/users/changePassword`,{newPassword,oldPassword},'post'); //验证新手机

export const uploadImage = (image) => ajax(`${api}/users/upload`, image, 'post', true) //上传头像

export const searchRestaurants = (offset, limit = 2, keyWord) => ajax(`${api}/shops/restaurants/${keyWord}`, {
  offset,
  limit
}); //搜索店铺

export const getALiPayUrl = ({subject,outTradeNo,totalAmount}) => ajax(`${api}/api/pay/alipay/url`, {
  subject,
  outTradeNo,
  totalAmount
},"post"); //支付宝支付api




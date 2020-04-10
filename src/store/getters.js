/*
包含多个基于state的getter计算属性的对象
*/

export default {
  getTotalPrice(state){  //特价商品不参与店铺满减
    let total = 0;
    let isDiscount = false;
    state.cartFoods.forEach((food)=>{
      let price = 0;
      if(food.specfoods.length>1){
        price = food.specfoods[food.spec].price;
        if(food.specfoods[food.spec].original_price){  //购物车中有特价商品
          isDiscount=true
        }
      }else{
        price = food.lowest_price;
        if(food.specfoods[0].original_price){
          isDiscount=true
        }
      }
      total+=food.cartNumber*price; //总价等于数量*单价
    });
    if(!isDiscount){  //如果没有特价商品，则享受店铺满减
      let isSub = false;
      let last_ammount = 0; //最终满减的价格
      let attr = state.foodsShop.rst?state.foodsShop.rst.activities[0].attribute:''; //满减信息
      attr  = attr?JSON.parse(attr):{};
      for(let price in attr){  //循环计算满减的价格
        let temp = attr[price][1];
        if(total<price){ //总价大于满减所需最低价格，享受满减
          total-=last_ammount;
          isSub = true;
          break;
        }
        last_ammount = temp
      }
      if(!isSub){
        total-=last_ammount
      }
    }
    return total
  },
  getOriginalTotalPrice(state){
    let total = 0;
    let isDiscount = false;
    state.cartFoods.forEach((food)=>{
      let price = 0;
      if(food.specfoods.length>1){
        price = food.specfoods[food.spec].original_price;
        isDiscount = true;
      }else{
        if(food.specfoods[0].original_price){
          price = food.specfoods[0].original_price;
          isDiscount = true;
        }else{
          price = food.lowest_price;
        }
      }
      total+=food.cartNumber*price;
    });
    return {isDiscount,total}
  },

  getTotalCount(state){
    let total = 0;
    state.cartFoods.forEach((food)=>{
      total+=food.cartNumber
    });
    return total
  },

  getHeadPhoto(state) {
    return state.user.photoPath ? ('waimai_api/images/headPhoto/' + state.user.photoPath) : null
  },

  getPhone(state){
    const phone = state.user.phone || "";
    if(phone){
      return phone.substring(0,3)+"****"+phone.substring(7)
    }else{
      return phone;
    }
  },

  getOriginalPhone(state){
    const phone = state.user.phone || "";
    return phone;
  },

  getSelectedSettleAddress(state){
    let selected = state.deliveryAddress.selected;
    if(selected!==-1){
      for(let address of state.deliveryAddress.address){
        if(address.id === selected){
          return address
        }
      }
    }
    return null;
  }
}

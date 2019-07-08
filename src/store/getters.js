/*
包含多个基于state的getter计算属性的对象
*/

export default {
  getTotalPrice(state){
    let total = 0
    let isDiscount = false
    state.cartFoods.forEach((food)=>{
      let price = 0
      if(food.specfoods.length>1){
        price = food.specfoods[food.spec].price
        if(food.specfoods[food.spec].original_price){
          isDiscount=true
        }
      }else{
        price = food.lowest_price
        if(food.specfoods[0].original_price){
          isDiscount=true
        }
      }
      total+=food.cartNumber*price
    })
    if(!isDiscount){
      let isSub = false
      let last_ammount = 0
      let attr = state.foodsShop.rst?state.foodsShop.rst.activities[0].attribute:''
      attr  = attr?JSON.parse(attr):{}
      for(let price in attr){
        let temp = attr[price][1]
        if(total<price){
          total-=last_ammount
          isSub = true
          break
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
    let total = 0
    let isDiscount = false
    state.cartFoods.forEach((food)=>{
      let price = 0
      if(food.specfoods.length>1){
        price = food.specfoods[food.spec].original_price
        isDiscount = true
      }else{
        if(food.specfoods[0].original_price){
          price = food.specfoods[0].original_price
          isDiscount = true
        }else{
          price = food.lowest_price
        }
      }
      total+=food.cartNumber*price
    })
    return {isDiscount,total}
  },

  getTotalCount(state){
    let total = 0
    state.cartFoods.forEach((food)=>{
      total+=food.cartNumber
    })
    return total
  }
}


export const getImagePath = ({prefix="https://fuss10.elemecdn.com",image_hash,suffix})=>{//https://cube.elemecdn.com
  let end
  let suffixs = ['png','jpeg','gif']
  for(let index=image_hash.length-2;index>0;index--){
    end = image_hash.substring(index)
    //!/^[a-zA-Z]+$/.test(end) ||
    if(suffixs.includes(end.toLowerCase())){
      end = image_hash.substring(index)
      break
    }
  }
  let url = `${prefix}/${image_hash.substr(0,1)}/${image_hash.substr(1,2)}/${image_hash.substring(3)}.${end}?${suffix}`
  return url
}

export const getUrlParams = (name)=>{
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return '';
}

export const checkExitAndAdd = (cartFoods,ori_food,spec,attr) =>{ //检查购物车是否存在此商品
  let {item_id} = ori_food
  for(let food of cartFoods){
    if(food.item_id===item_id){
      if(food.spec===spec && food.attr===attr){
        food.cartNumber++
        return
      }
    }
  }
  let newFood = {...ori_food}
  newFood.spec = spec
  newFood.cartNumber = 1
  newFood.attr = attr
  cartFoods.push(newFood)
}

export const checkExitAndSub = (cartFoods,ori_food) =>{ //检查购物车是否存在此商品
  let {item_id} = ori_food
  for(let i=0;i<cartFoods.length;i++){
    if(cartFoods[i].item_id===item_id){
      if(ori_food.spec!==undefined){ //是选了规格的物品
        if(cartFoods[i].spec===ori_food.spec && cartFoods[i].attr===ori_food.attr){
          if(cartFoods[i].cartNumber>1){
            cartFoods[i].cartNumber--
          }else{
            cartFoods.splice(i,1)
          }
        }
      }else{
        cartFoods[i].cartNumber--
        if(cartFoods[i].cartNumber===0){
          cartFoods.splice(i,1)
        }
      }
      return
    }
  }
}

export const formateMoney = (money)=>{
  if((typeof money) !== "number"){
    money = parseFloat(money)
  }
  let money2 = money.toFixed(2);
  return parseFloat(money2)
}

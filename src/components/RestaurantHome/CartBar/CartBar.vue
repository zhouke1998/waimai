<template>
  <p>
    <svg @click.stop="clickSub({isAdd:false,food})" v-if="getCartNumber.cartNumber"  :class="{icon:true,noSub:getCartNumber.kinds>1}" aria-hidden="true">
      <use xlink:href="#icon-jian2"></use>
    </svg>
    <span v-if="getCartNumber.cartNumber">{{getCartNumber.cartNumber}}</span>
    <svg @click.stop="addCartFood2({isAdd:true,food})" class="icon" aria-hidden="true">
      <use xlink:href="#icon-jia"></use>
    </svg>
    <span class="tips" v-if="kinds">多规格以及带属性的商品<br/>只能去购物车删减哦</span>
  </p>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {mapActions,mapState} from 'vuex'
    export default {
      name: "CartBar",
      data(){
        return{
          kinds:false, //多规格商品
        }
      },
      props:{
        food:Object
      },
      computed:{
        ...mapState({cartFoods:'cartFoods'}),
        getCartNumber(){
          let cartNumber = 0
          let kinds = 0
          for(let cartFood of this.cartFoods){
            if((cartFood.spec!==undefined && cartFood.item_id === this.food.item_id && cartFood.spec===this.food.spec && cartFood.attr ===this.food.attr) || (cartFood.spec===undefined &&cartFood.item_id === this.food.item_id)) { //购物车里的信息
              cartNumber = cartFood.cartNumber
              return {cartNumber, kinds:1}
            }else if(cartFood.item_id === this.food.item_id){
              cartNumber += cartFood.cartNumber
              kinds++
            }
          }
          return {cartNumber,kinds} //商品主页的信息
        }
      },
      methods:{
        ...mapActions({addCartFood:'addCartFoods'}),
        addCartFood2({isAdd,food}){ //检查是否多规格
          if((food.attrs.length || food.specifications.length) && food.spec===undefined){
           if(this.$parent.showSelectFood){
             this.$parent.showSelectFood({food})
           }else{
             this.$parent.$parent.showSelectFood({food})
           }
          }else{
            this.addCartFood({isAdd,food})
          }
          this.cartAnimate()
        },
        clickSub({isAdd,food}){
          if(this.getCartNumber.kinds>1 && food.spec===undefined){ //!food.cartNumber从商品页面传来的商品信息无此属性
            /*this.kinds = true
            setTimeout(()=>{
              this.kinds = false
            },2000)*/
            Toast({
              message: '多规格以及带属性的商品只能去购物车删减哦',
              position: 'middle',
              duration: 2000
            });
          }else{
            this.addCartFood({isAdd,food})
          }
        },
        cartAnimate(){
          this.$store.state.cartAnimate = 1
          setTimeout(()=>{
            this.$store.state.cartAnimate=2
          },120)
          setTimeout(()=>{
            this.$store.state.cartAnimate=3
          },240)
          setTimeout(()=>{
            this.$store.state.cartAnimate=0
          },360)
        }
      }
    }
</script>

<style scoped>
.icon{
  font-size: 1.5rem;
}
.noSub{
  color: #eeeeee;
}
p{
  display: flex;
  line-height: 1.5rem;
  padding-right: 15px;
}
p span{
  width: 1rem;
  text-align: center;
}
  .tips{
    background-color: rgba(0,0,0,.6);
    color: #fff;
    display: inline-block;
    position: fixed;
    left: 50%;
    top: 50%;
    width: 150px;
    font-size: .75rem;
    border-radius: 5px;
    z-index: 19;
  }
</style>

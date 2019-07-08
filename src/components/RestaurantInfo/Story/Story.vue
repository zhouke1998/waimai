<template>
  <div v-if="brand_intros.brand_intros" class="history">
    <router-link :to="{path:`story?id=${$store.state.foodsShop.restaurant_id}`}" append>
      <img :src="$parent.getImagePath({image_hash:brand_intros.brand_intros.header_image,suffix:'imageMogr/format/webp/thumbnail/!460x260r/gravity/Center/crop/460x260/'})" />
      <h3>{{brand_intros.brand_intros.title}}</h3>
      <p class="desc">{{calBrief(brand_intros.brand_intros.brand_intros[0].brief)}}</p>
      <p class="look">查看品牌故事</p>
    </router-link>
  </div>
</template>

<script>
  import {getStory} from "../../../api";
    export default
    {
      name: "Story",
      data(){
        return{
          brand_intros:{},
        }
      },
      mounted(){
          this._getStory()
      },
      methods:{
        async _getStory(){
          let brand_intros = await getStory(this.$store.state.foodsShop.restaurant_id)
          this.brand_intros = brand_intros
        },
        calBrief(brief){  //超过50个字的计算
          if(brief.length>50){
            return brief.substring(0,50)+'...'
          }else{
            return brief
          }
        },
      }
    }
</script>

<style scoped>
  .history{
    background-color: #fff;
    padding: 1rem;
    box-sizing: border-box;
    margin-bottom: .8rem;
  }
  a{
    display: inline-block;
    text-decoration: none;
    color: inherit;
    width: 100%;
  }
  .history img{
    width: 100%;
    margin-bottom: 10px;
  }
  .history h3{
    color: #333;
    margin-bottom: 5px;
  }
  .history p{
    color: #666;
    font-size: .8rem;
  }
  .history .look{
    text-align: center;
    margin-top: 1.5rem;
  }
</style>

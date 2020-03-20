<template>
  <section>
    <Backtop title="品牌故事"></Backtop>
    <div v-if="brand_intros.brand_intros" class="story">
      <img :src="getImagePath({image_hash:brand_intros.brand_intros.header_image,suffix:'imageMogr/format/webp/thumbnail/!750x422r/gravity/Center/crop/750x422/'})" />
      <div class="content">
        <p>品牌故事|{{brand_intros.brand_intros.restaurant_name}}</p>
        <div class="video">
        <h1>{{brand_intros.brand_intros.title}}</h1>
        <video v-if="brand_intros.brand_intros.video" :src="brand_intros.brand_intros.video+'#t=1'" width="686" controls="controls" autoplay="autoplay" playsinline="" muted="muted">

        </video>
        </div>
        <div class="main_story">
          <h2>品牌介绍</h2>
          <article>{{brand_intros.brand_intros.brand_intros[0].brief}}</article>
          <img :src="getImagePath({image_hash:brand_intros.brand_intros.brand_intros[0].image_hash ,suffix:'imageMogr/format/webp/thumbnail/686x/'})" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Backtop from '../../components/Headertop/Backtop'
  import {getStory} from "../../api";
  import {getImagePath,getUrlParams} from "../../utils/getImagePath";
  import {MessageBox} from 'mint-ui';
    export default {
      name: "Story",
      data(){
        return{
          brand_intros:{},
          url_id:'',
        }
      },
      mounted(){
        setTimeout(()=>{
          this.url_id = getUrlParams('id');
          if(!this.url_id || !this.isRestaurant){
            this.alertInfo()
          }else{
            this._getStory(this.url_id)
          }
        },500)
      },
      computed:{
        isRestaurant(){
          if(this.$store.state.foodsShop && this.$store.state.foodsShop.restaurant_id){
            return true
          }
          return false
        }
      },
      methods:{
        alertInfo(text='店铺不存在！！！'){ //弹出框
          MessageBox.alert(text)
            .then(action => {
              this.$router.replace('/home')
            })
        },
        async _getStory(restaurant_id){
          let id = restaurant_id || this.$store.state.foodsShop.restaurant_id
          let brand_intros = await getStory(id)
          if(brand_intros.brand_intros){
            this.brand_intros = brand_intros
          }else{
            this.alertInfo('不存在！')
          }
        },
        getImagePath(info){
          return getImagePath(info)
        },
      },
      components:{
        Backtop
      }
    }
</script>

<style scoped>
  .back{
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
  }
  .story{
    position: relative;
  }
  .story:before{
    content: '';
    width: 100%;
    height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    background-image:linear-gradient(180deg,rgba(0,0,0,.5),rgba(0,0,0,0));
  }
  .story img{
    width: 100%;
  }
  .content{
    padding: 1.5rem .7rem;
  }
  .content>p{
    font-size: .9rem;
    color: #999;
    margin-bottom: .6rem;
  }
  .content h1{
    font-size: 1.75rem;
    color: #333;
    margin-bottom: .7rem;
  }
  .video{
    margin-bottom: 1.5rem;
  }
  .video video{
    width: 100%;
  }
  .main_story h2{
    font-weight: 500;
    font-size: 1.25rem;
    color: #333;
    margin-bottom: 1rem;
  }
  .main_story article{
    font-size: 1rem;
    color: #999;
    line-height: 1.75rem;
    margin-bottom: 2rem;
  }
</style>

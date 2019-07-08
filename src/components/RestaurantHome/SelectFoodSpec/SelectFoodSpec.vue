<template>
  <transition name="bounce">
    <section v-if="selectShow" class="selectSpec">
    <div class="content">
      <span @click="selectShow = false">×</span>
      <div class="info">
        <div class="photo">
          <img :src="$parent.getImagePath({image_hash:foodInfo.image_path,suffix:'x-oss-process=image/resize,m_lfit,w_377,h_377/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp'})">
        </div>
        <div class="desc">
          <div class="row1">
            <p class="ellipsis">{{foodInfo.name}}</p>
          </div>
          <div class="row2">
            <p class="ellipsis">已选：
              <span v-if="foodInfo.attrs.length">{{foodInfo.attrs[0].values[selected.attrsValue]}}
              </span> <span v-if="foodInfo.specifications.length">{{foodInfo.specifications[0].values[selected.specification]}}</span>
            </p>
          </div>
          <div class="row3">
            <small>￥</small>
            <span v-if="foodInfo.specifications.length">{{foodInfo.specfoods[selected.specification].price}}</span>
            <span v-else>{{foodInfo.lowest_price}}</span>
          </div>
        </div>
      </div>
      <div class="bott">
        <div class="select" v-if="foodInfo.attrs.length">
            <p class="title">{{foodInfo.attrs[0].name}}</p>
            <p class="selection">
              <span v-for="(value,index_attr) in foodInfo.attrs[0].values" @click="selectAttrs(index_attr)" :index_attr="index_attr" :class="{active:index_attr==selected.attrsValue}">{{value}}</span>
            </p>
          </div>
        <div class="select" v-if="foodInfo.specifications.length">
          <p class="title">{{foodInfo.specifications[0].name}}</p>
          <p class="selection">
            <span v-for="(value,index_spec) in foodInfo.specifications[0].values" @click="selectSpec(index_spec)" :key2="index_spec" :class="{active:index_spec==selected.specification}">{{value}}</span>
          </p>
        </div>
      </div>
      <div class="btn" @click="selectOk"><p>选好了</p></div>
    </div>
    <div class="mask" @click="selectShow=false"></div>
  </section>
  </transition>
</template>

<script>
    export default {
      data(){
        return{
          selectShow:false,
          selected:{attrsValue:0,specification:0} //选择
        }
      },
      props:{
        foodInfo:Object
      },
      methods:{
        selectAttrs(index){
          this.selected.attrsValue = index //
        },
        selectSpec(index){
          this.selected.specification = index
        },
        selectOk(){ //点击选好了
          this.$store.dispatch('addCartFoods',{isAdd:true,food:this.foodInfo,selected:this.selected})
          this.selectShow = false
        }
      }
    }
</script>

<style scoped>
  .selectSpec{
    z-index: 21;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 85%;
  }
  .mask{
  position: fixed;
  top: 0;
  left:0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,.4);
  z-index: -1;
}
  .content{
    position: relative;
    height: 100%;
    background-color: #fff;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  .content>span{
    position: absolute;
    right: 1rem;
    top: 1rem;
    color: #fff;
    font-size: 2.5rem;
    font-weight: lighter;
    height: 2rem;
    width: 2rem;
    text-align: center;
    line-height: 2rem;
    background: rgba(0,0,0,.2);
    border-radius: 50%;
  }
  .bott{
    flex: 1;
  }
  .info{
    display: flex;
    justify-content: flex-start;
    margin-bottom: .7rem;
    width: 100%;
  }
  .photo{
    width: 30%;
    margin-right: .6rem;
    max-width: 100px;
  }
  .photo img{
    width: 100%
  }
  .desc{
    display: flex;
    flex-direction: column;
  }
  .row1{
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .row2{
    color: #666;
    font-size: .65rem;
    flex: 1;
  }
  .row3{
    color: red;
    font-size: 1.5rem;
  }
  .row3>span{
    margin-left: -10px;
  }
  .title{
    color: #666;
    font-size: .85rem;
    margin-bottom: .7rem;
  }
  .selection{
    display: flex;
  }
  .selection span{
    background-color: #f5f5f5;
    display: inline-block;
    margin-right: .7rem;
    height: 2rem;
    width: 100px;
    text-align: center;
    line-height: 2rem;
    color: #333;
    font-size: .75rem;
  }
  .selection .active{
    background-color: rgba(35, 149, 255, 0.2);
    color: rgb(35, 149, 255);
    font-weight: bold;
  }
  .btn{
    background-color: rgb(35, 149, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    height: 2rem;
    border-radius: 2px;
  }
  /*点击展开活动动画*/
  .bounce-enter{
    height: 0px;
  }
  .bounce-enter-active{
    transition:height .3s;
  }
  .bounce-leave{
    /*height: 100%;*/
  }
  .bounce-leave-active{
    height: 0;
    transition:height .3s;
  }
</style>

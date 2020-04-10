<template>
  <section>
    <div class="content">
      <div class="classify-nav" ref="classifyNav">
          <div v-for="(name,index) in classify_nameArr" :class="{'one-classify':true,'classify-active':classify_index===index}" :key="index" @click="changeActiveClassify(index)">
            <span>{{name}}</span>
          </div>
      </div>
      <ClassifyShopList :list_bottom="0" :classify_index="classify_index">

      </ClassifyShopList>
    </div>
  </section>
</template>

<script>
  import ClassifyShopList from "../../components/ShopList/ClassifyShopList"
  export default {
    components:{
      ClassifyShopList
    },
    mounted() {
      try {
        const classify = this.$route.query.classify.toString();
        const index = parseInt(classify);
        if(index<0 || index>16 || !index){
          this.classify_index = 0;
        }else{
          this.classify_index = index;
        }
      }catch (e) {
        this.classify_index = 0;
      }
      setTimeout(()=>{
        this.setNavOffsetLeft();
      },200);
    },
    data(){
      return{
        classify_index:-1
      }
    },
    name: "Classify",
    methods:{
      changeActiveClassify(index){
        this.classify_index = index;
      },
      /*进入时设置类别导航的位置*/
      setNavOffsetLeft(){
        let leftArr = [0];
        let tempLeft = 0;
        for (let one of  this.$refs.classifyNav.getElementsByClassName('one-classify')){
          tempLeft+=one.getBoundingClientRect().width;
          leftArr.push(tempLeft)
        }
        this.$refs.classifyNav.scrollLeft = leftArr[this.classify_index-1]
      }
    },
    computed:{
      classify_nameArr(){
        let type_list = this.$store.state.type_list;
        let arr = [];
        type_list.forEach((value)=>{
          arr.push(value.name)
        });
        return arr;
      },
    },
    created(){
      if(!this.$store.state.type_list.length){
        this.$store.dispatch("getType_list")
      }
    },
  }
</script>

<style scoped>
  section{

  }
  .content{

  }
  .classify-nav{
    width: 100%;
    overflow-x: auto;
    height: 40px;
    background-color: #02a774;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .one-classify{
    color: #eee;
    font-size: .8rem;
    justify-content: center;
    padding: 0 10px;
    flex-shrink: 0;
  }
  .classify-nav .classify-active{
    color: #fff;
    font-weight: bold;
  }
  .classify-active span{
    position: relative;
    text-wrap: none;
  }
  .classify-active span:after{
    content: "";
    width: 100%;
    height: 2px;
    border-bottom: 2px solid #ffffff;
    position: absolute;
    left: 0;
    bottom: -5px;
  }
</style>


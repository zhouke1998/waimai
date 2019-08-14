<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="Home,Search">
        <router-view CLASS="Router"></router-view>
      </keep-alive>
    </transition>
    <FootGuide v-if="$route.meta.FootGuide" />
  </div>
</template>

<script>
  import FootGuide from './components/FootGuide/FootGuide.vue'
  import {mapActions} from 'vuex'
  export default {
    data(){
      return{
        transitionName: 'slide-right'  // 默认动态路由变化为slide-right
      }
    },
    components: {
      FootGuide
    },
    computed:{

    },
    mounted(){
      if (this.$store.state.address.status == 1) {
        this.$store.state.address.address = "正在获取地址..."
        this.getAddress()
      }
      this.autoLogin()
    },
    watch: {
      '$route'(to, from) {
        //let isBack = this.$router.isBack //  监听路由变化时的状态为前进还是后退
        //console.log(isBack);
        if (to.meta.slide_index>from.meta.slide_index) {
          this.transitionName = 'slide-left'
        } else if (to.meta.slide_index<from.meta.slide_index){
          this.transitionName = 'slide-right'
        }else{
          this.transitionName = 'fade'
        }
      }
    },
    methods:{
      ...mapActions(['autoLogin','getAddressByLL','getAddress2']),
      getAddress(){
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(this.showPosition,this.showError,{
            // 指示浏览器获取高精度的位置，默认为false
            enableHighAcuracy: true,
            // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
            timeout: 5000,
            // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
            maximumAge: 1000
          });
        }else{
          alert('获取地址失败!');
          let timer = setInterval(() => {
            if (returnCitySN) {
              this.getAddressByIp(returnCitySN["cip"])
              clearInterval(timer)
            }
          }, 1000)
        }
      },
      showPosition(position){
        let lat=position.coords.latitude;
        let lng=position.coords.longitude;
        //alert(lat, lng);
        this.getAddressByLL(lat+','+lng)
      },
      showError(error){
        switch(error.code)
        {
          case error.PERMISSION_DENIED:
            console.log("用户拒绝对获取地理位置的请求。")
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("位置信息是不可用的。")
            break;
          case error.TIMEOUT:
            console.log("请求用户地理位置超时。")
            break;
          case error.UNKNOWN_ERROR:
            console.log("未知错误。")
            break;
        }
        let timer = setInterval(() => {
          if (returnCitySN) {
            this.getAddressByIp(returnCitySN["cip"])
            clearInterval(timer)
          }
        }, 1000)
      },
      getAddressByIp(ip) {
        this.getAddress2(ip)
      }
    }
}
</script>

<style scoped>
  section{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
<style>
  html{
    font-size: 16px;
  }
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  ::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
  }
  .top1px{
    position: relative;
    top:-1px;
  }

  /*弹出框居中
  .el-message-box{
    width: 200px;
    height: 150px;
  }
  */
  /*0.5px细线*/
  .miniLine{
    position: relative;
  }
  .miniLine:after{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    background-color: #ddd;
    transform: scaleY(.25);
  }
</style>
<style>
  /*淡入淡出效果*/
  /*.Router {
    position: absolute;
    width: 100%;
    transition: all .8s ease;
    top: 40px;
  }*/
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all .5s;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .fade-enter {
    opacity:0;
  }
  .fade-leave{
    opacity:.5;
  }
  .fade-enter-active{
    transition:opacity .8s;
  }
  .fade-leave-active{
    opacity:0;
    transition:opacity .5s;
  }
  .bounce2-enter{
    height: 0px;
  }
  .bounce2-enter-active{
    transition:height .5s;
  }
  .bounce2-leave{
    height: 0px;
  }
  .bounce2-leave-active{
    transition:height .2s;
  }
</style>

<template>
    <section>
      <HeaderTop title="我的"></HeaderTop>
      <div class="content">
        <div class="login">
          <router-link :to="!getUser.username?'/login':'/personInfo'">
            <div class="left">
              <span class="ph">
                <img :src="$store.getters.getHeadPhoto || 'waimai_api/images/headPhoto/zkwaimai.gif'"/>
              </span>
              <p class="login_tip">
                <i>
                  {{!getUser.username?'立即登录':getUser.username}}
                </i>
                <span v-if="!getUser.phone">
                  登录后可享受更多特权
                </span>
                <span v-else>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tel"></use>
                  </svg>
                  {{getPhone}}
                </span>
              </p>
            </div>
            <div class="right">
              <span class="iconfont icon-jiantou">
              </span>
            </div>
          </router-link>
        </div>
        <div class="mine">
          <span>
            <ul>
              <li>
                <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-qianbao"></use>
            </svg>
              </li>
              <li>
                <span>钱包</span>
              </li>
            </ul>
          </span>
          <span>
            <ul>
              <li>
                <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-hongbao"></use>
            </svg>
              </li>
              <li>
                <span>红包</span>
              </li>
            </ul>
          </span>
          <span>
            <ul>
              <li>
                <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jinbi"></use>
            </svg>
              </li>
              <li>
                <span>金币</span>
              </li>
            </ul>
          </span>
        </div>
        <div class="list">
          <ul>
            <li class="one_type">
              <p>
                <span class="iconfont icon-tuanduicankaoxian-4"></span>
                <span>我的收藏</span>
              </p>
              <span class="iconfont icon-jiantou"></span>
            </li>
            <li class="one_type">
              <p>
                <span class="iconfont icon-jinbi"></span>
                <span>金币商城</span>
              </p>
              <span class="iconfont icon-jiantou"></span>
            </li>
            <li class="one_type">
              <p>
                <span class="iconfont icon-kefu"></span>
                <span>我的客服</span>
              </p>
              <span class="iconfont icon-jiantou"></span>
            </li>
            <li class="top1px">
              <p>
                <span class="iconfont icon-shangcheng"></span>
                <span>加盟合作</span>
              </p>
              <span class="iconfont icon-jiantou"></span>
            </li>
          </ul>
        </div>
        <div v-if="getUser.phone && false" class="logoutBtn">
          <button @click="logout" type="success">退出登录</button>
        </div>
      </div>
    </section>
</template>

<script>
  import HeaderTop from "../../components/Headertop/HeaderTop";
  import {MessageBox} from 'mint-ui';
  export default {
    components:{
      HeaderTop
    },
    data(){
      return {

      }
    },
    mounted(){
      //console.log(this.user);
    },
    computed:{
      getPhone(){
        const phone = this.getUser.phone
        return phone.substring(0,3)+"****"+phone.substring(7)
      },
      getUser(){
        return this.$store.state.user
      },
    },
    methods:{
      logout(){
        MessageBox.confirm('确定退出?')
          .then(() => {
            this.$store.dispatch('logout')
            this.$message({
              type: 'info',
              message: '退出成功'
            });
            this.$router.replace('/mine')
          })
          .catch(action => {
          });
      },
    }
  }
</script>
<style scoped>
  section{
    background-color:#f5f5f5;
    overflow: hidden;
  }
  .content{
    height: 100%;
  }
  .login{
    height: 15%;
    min-height: 80px;
    max-height: 200px;
    background-color: #02a774;
  }
  .login div{
    height: 100%;
  }
  .login>a {
    display: inline-block;
    zoom: 1;
    height: 100%;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
  }
  .login .left{
    float: left;
  }
  .login .right{
    float: right;
    padding-top: 20px;
    color: #fff;
  }
  .login .ph{
      display: inline-block;
      height: 70%;
      float: left;
    }
  .login .ph img{
    border-radius: 50%;
    height: 100%;
  }
  .login .login_tip{
    padding-left: 10px;
    /*margin-top: 5px;*/
    float: left;
  }
  .login .login_tip i{
    display: block;
    font-style: normal;
    color:#fff;
    font-size: 1rem;
    font-weight: lighter;
  }
  .login .login_tip span{
    display: block;
    color: #fff;
    font-weight: lighter;
    font-size: 0.7rem;
    margin-top: 10px;
  }
  .mine{
    display: flex;
    height: 10%;
    background-color: #fff;
    border-bottom:1px solid #eee;
  }
  .mine>span{
    flex: 1;
    border-left:1px solid #eee;
    display: inline-block;
  }
  .mine>span:last-child{
    border-right:1px solid #eee;
  }
  .mine ul{
    padding-top: 15px;
  }
  .mine li{
    text-align: center;
  }
  .mine li svg{
    font-size: 1.5rem;
  }
  .mine li span{
    color:#666666;
    font-size: 0.75rem;
  }
  .list .one_type{
    margin-top: 10px;
  }
  .list li{
    height: 50px;
    padding: 0 15px;
    background-color: #fff;
    line-height: 50px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .list li>p{
    float: left;
    font-size: 1rem;
    color: #333;
    letter-spacing: 1px;
    font-weight: 300;
  }
  .list li>span{
    float: right;
    font-size: 0.7rem;
    color: #aaa;
  }

  .list .icon-tuanduicankaoxian-4 {
    color: orange;
  }

  .list .icon-jinbi {
    color: yellow;
  }
  .list .icon-kefu,.list .icon-shangcheng{
    color: #4da6f0;
  }
  /*
  退出登录按钮
  */
  .logoutBtn{
    text-align: center;
    margin-top: 20px;
  }
  .logoutBtn button{
    width: 90%;
    background-color: red;
  }
  .logoutBtn button:active{
    background-color: #4dc060;
  }
</style>

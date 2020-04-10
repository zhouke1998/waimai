<template>
    <section>
      <div class="headPhoto miniLine bgf">
        <span>头像</span>
        <p>
          <input @change="imgChange()" type="file" accept="image/jpeg,image/jpg,image/png" class="photo_load">
          <img :src="$store.getters.getHeadPhoto || 'waimai_api/images/headPhoto/zkwaimai.gif'"/>
          <span class="iconfont icon-jiantou"></span>
        </p>
      </div>
      <div @click="modifyName()" class="bgf username">
        <span>用户名</span>
        <p>
          <span>{{user.username}}</span>
          <span class="iconfont icon-jiantou"></span>
        </p>
      </div>
      <div class="account s-item">
        <p>账号绑定</p>
        <div class="bgf" @click="modifyphone()">
          <p>
            <span class="iconfont icon-tel"></span>
            <span>手机</span>
          </p>
          <p>
            <span>{{getPhone}}</span>
            <span class="iconfont icon-jiantou"></span>
          </p>
        </div>
      </div>
      <div class="secure s-item">
        <p>安全设置</p>
        <div @click="$router.push('/personInfo/password')" class="bgf">
          <p>
            <span>登录密码</span>
          </p>
          <p>
            <span class="bgb">修改</span>
            <span class="iconfont icon-jiantou"></span>
          </p>
        </div>
      </div>
      <div class="qita s-item">
        <p>其它</p>
        <div @click="$router.push('/personInfo/deliveryAddress')" class="bgf">
          <p>
            <span>收货地址</span>
          </p>
          <p>
            <span class="bgb">管理</span>
            <span class="iconfont icon-jiantou"></span>
          </p>
        </div>
      </div>
      <div @click="logout" class="logout bgf"><p>退出登录</p></div>
    </section>
</template>

<script>
  import {cutImage} from "../../utils/getExifImage";
  import {uploadImage} from "../../api";
  import {MessageBox, Toast} from 'mint-ui';
  import {mapGetters} from 'vuex';
  export default {
    name: "PersonInfo",
    data(){
      return{
        src:"https://fuss10.elemecdn.com/b/7f/432619fb21a40b05cd25d11eca02djpeg.jpeg?imageMogr/format/webp/thumbnail/!172.8x172.8r/gravity/Center/crop/172.8x172.8/"
      }
    },
    mounted(){
    },
    methods:{
      modifyName(){
        if(this.user.has_change_name){
          this.alertInfo('您已经修改过了！')
        }else{
          this.$router.push({name:'modifyUsername'})
        }
      },
      modifyphone(){
        this.$router.push('/personInfo/phone')
      },
      alertInfo(text){ //弹出框
        MessageBox.alert(text)
      },
      logout(){
        MessageBox.confirm('确定退出?')
          .then(() => {
            this.$store.dispatch('logout')
            Toast({
              message: '退出成功',
              position: 'top',
              duration: 1000
            });
            this.$router.replace('/mine')
          })
          .catch(action => {
          });
      },
      imgChange(){
        if(event.target.files.length){
          const options = {
            img:event.target.files[0],
            name:event.target.files[0].name,
            width:200,
            height:200,
            status:1,
          }
          cutImage(options)
          let totalTime = 0
          let timer = setInterval(()=>{
            totalTime++
            if (options.status === 0) {
              const formData = new FormData()
              const image = options.img
              formData.append('headPhoto', image)
              this.uploadImage(formData)
              clearInterval(timer)
            } else if (options.status === -1 || totalTime >= 10) {
              this.alertInfo('修改失败')
              clearInterval(timer)
            }
          },1000)
        }
      },
      async uploadImage(image) {
        const result = await uploadImage(image)
        //console.log(result);
        if (result.status === 0) {
          this.$store.dispatch('changeHeadPhoto', result.path)
        } else {
          this.alertInfo(result.message)
        }
      }
    },
    computed:{
      ...mapGetters(["getPhone"]),
      user(){
        return this.$store.state.user
      }
    },
  }
</script>

<style scoped>
  section{
    background-color: #f5f5f5;
  }
  .bgf{
    background-color: #fff !important;
  }
  section>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .95rem;
    color: #333;
    padding:.5rem .7rem;
  }
  section >div>span{
    font-weight: bold;
  }
  .headPhoto{
    position: relative;
  }
  .headPhoto p{
    display: flex;
    align-items: center;
  }
  .headPhoto input{
    opacity: 0;
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .headPhoto img{
    width: 3.5rem;
    border-radius: 50%;
  }
  .icon-jiantou{
    font-size: .75rem !important;
    color: #ccc !important;
  }
  .s-item{
    display: block;
    padding: 0;
  }
  .s-item>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .7rem;
  }
  .s-item>div p:first-child{
    font-weight: bold;
    color: #333;
  }
  div p:last-child span{
    color: #777;
    font-size: 1rem;
  }
  .username{
    padding: 1rem .7rem;
  }
  .s-item>p{
    font-size: .65rem;
    color: #999;
    padding:.7rem;
  }
  .s-item div{
    padding: 1rem .7rem;
  }
  .bgb{
    color: #0097ff !important;
  }
  .logout{
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    color: #ff5339;
    font-size: .95rem;
    font-weight: bold;
    line-height: 2rem;
    text-shadow: 1px 1px #ddd;
  }

  .icon-tel {
    color: #02a774;
  }
</style>

<template>
    <section>
      <div class="headPhoto miniLine bgf">
        <span>头像</span>
        <p>
          <input @change="imgChange()" type="file" accept="image/jpeg,image/jpg,image/png" class="photo_load">
          <img src="https://fuss10.elemecdn.com/b/7f/432619fb21a40b05cd25d11eca02djpeg.jpeg?imageMogr/format/webp/thumbnail/!172.8x172.8r/gravity/Center/crop/172.8x172.8/" />
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
      <div class="account">
        <p>账号绑定</p>
        <div class="bgf" @click="modifyphone()">
          <p>
            <!--<span></span>-->
            <span>手机</span>
          </p>
          <p>
            <span>{{getPhone()}}</span>
            <span class="iconfont icon-jiantou"></span>
          </p>
        </div>
      </div>
      <div class="secure">
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
      <div @click="logout" class="logout bgf"><p>退出登录</p></div>
      <img :src="src" />
    </section>
</template>

<script>
  import {cutImage} from "../../utils/getExifImage";
  export default {
    name: "PersonInfo",
    data(){
      return{
        src:"https://fuss10.elemecdn.com/b/7f/432619fb21a40b05cd25d11eca02djpeg.jpeg?imageMogr/format/webp/thumbnail/!172.8x172.8r/gravity/Center/crop/172.8x172.8/"
      }
    },
    mounted(){
      if(!this.user.phone){
        this.$router.replace("/mine")
      }
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
        this.$alert("提示",{
          title:'提示',
          confirmButtonText: '确定',
          type: 'warning',
          center: true,
          message:text,
          showClose:false,
        })
      },
      logout(){
        this.$confirm('确定退出登录吗', '确认', {
          distinguishCancelAndClose: false,//区分取消按钮和关闭按钮
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$store.dispatch('logout')
            this.$message({
              type: 'info',
              message: '退出成功'
            });
          })
          .catch(action => {
          });
      },
      getPhone(){
        const phone = this.$store.state.user.phone
        return phone?phone.substring(0,3)+"****"+phone.substring(7):''
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
          let timer = setInterval(()=>{
            console.log(options);
            if(options.status===0 || options.status===-1){
              this.src = options.base64
              clearInterval(timer)
            }
          },1000)
        }
      },
      cutImage(){

        cutImage()
      }
    },
    computed:{
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
  }
  .icon-jiantou{
    font-size: .75rem !important;
    color: #ccc !important;
  }
  .account,.secure{
    display: block;
    padding: 0;
  }
  .account>div,.secure>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .7rem;
  }
  .account>div p:first-child,.secure>div p:first-child{
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
  .account>p,.secure>p{
    font-size: .65rem;
    color: #999;
    padding:.7rem;
  }
  .secure div{
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
</style>

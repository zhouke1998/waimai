<template>
    <section>
      <LoginHeader title="密码登录">
      </LoginHeader>
      <div class="content">
        <div class="form-group">
          <div :style="{'z-index':zIndex[0]}">
            <span v-show="focus1" @click="clearText(0)" class="iconfont icon-chuyidong"></span>
            <input
              @focus="getIndex(0)"
              placeholder="手机/邮箱/用户名"
              v-model="phone"
              maxlength=16/>
          </div>
          <div class="password" :style="{'z-index':zIndex[1]}">
            <span v-show="focus2" @click="clearText(1)" class="iconfont icon-chuyidong"></span>
            <svg @click="passwordShow=false" v-show="passwordShow && focus2" class="icon" aria-hidden="true">
              <use xlink:href="#icon-yanjing"></use>
            </svg>
            <svg @click="passwordShow=true" v-show="!passwordShow && focus2" class="icon" aria-hidden="true">
              <use xlink:href="#icon-yanjing1"></use>
            </svg>
            <input :type="passwordShow?'text':'password'" @focus="getIndex(1)" maxlength="16" class="top1px" placeholder="请输入密码" v-model="password"/>
          </div>
          <div class="codeImageWrap">
            <input
              class="codeCheak"
              placeholder="请输入验证码"
              v-model="code"
              maxlength=6/>
            <img :src="baseURL" @click="changeCaptcha" />
          </div>
          <div class="loginbtn"><p @click="loginPwd" type="success">登录</p></div>
          <div class="forget">
            <div>
              <a @click="alertInfo('请用手机验证码登录后修改密码')">忘记密码?</a>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
  import LoginHeader from '../../components/LoginHeader/LoginHeader'
  import {loginPwd} from '../../api/index'
  import {MessageBox} from 'mint-ui';

  export default {
    data(){
      return{
        password:'123456',
        phone:'zhouke',
        zIndex:[2,1],
        code:'',
        baseURL:'waimai_api/users/getCaptchaCode?'+Date.now(),
        passwordShow:false,
      }
    },
    name: "LoginPwd",
    components:{
      LoginHeader
    },
    mounted() {
      if (this.$store.state.user.phone) {
        this.$router.replace('/personInfo')
      }
    },
    methods:{
      alertInfo(text){ //弹出框
        MessageBox.alert(text)
      },
      loginPwd(){
        if(!/^\w{3,16}$/.test(this.phone)){
          this.alertInfo("请正确填写账号")
        }else if(!/^\w{3,16}$/.test(this.password)){
          this.alertInfo("密码格式不正确")
        }else if(!/^\d{1,3}$/.test(this.code)){
          this.alertInfo("验证码填写错误")
        }else{
          loginPwd(this.phone, this.password, this.code)
            .then(data=>{
              if(data.status==0){
                //console.log("登陆成功");
                this.$store.dispatch('storeUserInfo',data.user)
                this.$router.replace('/mine')
              }else{
                this.changeCaptcha()
                this.alertInfo(data.message)
              }
            })
          //后台验证
          //console.log("后台验证");
        }
      },
      getIndex(index){//设置输入框的z-index
        let temp = [...this.zIndex]
        if(temp[1-index]>temp[index]){ //交换z-index
          temp[index]=2
          temp[1-index]=1
        }
        this.zIndex = temp
      },
      changeCaptcha(){
        this.baseURL = this.baseURL+Date.now()
      },
      clearText(index){
        if(index===0){
          this.phone = ''
        }else{
          this.password=''
        }
      }
    },
    computed:{
      focus1(){ //第一个输入框clear图标
        return this.phone.length>0
      },
      focus2(){ //第二个输入框clear图标
        return this.password.length>0
      }
    }
  }
</script>

<style scoped>
  .codeImageWrap{
    position: relative;
    margin-top: 10px;
  }
  .codeImageWrap>img{
    height: 40px;
    position: absolute;
    right: 10px;
    top: 0;
    z-index: 2;
  }
  section{
    background-color:#f5f5f5;
    overflow: hidden;
  }
  .content{
    margin-top:10px;
  }
  .form-group{
    position: relative;
  }
  .forget{
    text-align: center;
    padding-top: 20px;
  }
  .forget>div{
    width: 88%;
    text-align: right;
    margin: 0 auto;
  }
  .forget a{
    font-size: 0.75rem;
    color: #5f95ff;
  }

  .form-group > div {
    position: relative;
  }

  .form-group input {
    border: none;
    outline: none;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    padding: 0 15px;
    box-sizing: border-box;
    border-radius: 0;
    font-size: .9rem;
    letter-spacing: 1px;
    color: #606266;
  }

  .form-group input:hover {
    border-color: #C0C4CC;
  }

  .form-group input:focus {
    border-color: #409EFF;
  }

  .loginbtn {
    margin-top: 20px;
  }

  .loginbtn p {
    background-color: #67C23A;
    border: 1px solid #67C23A;
    width: 90%;
    margin: 0 auto;
    color: #fff;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    font-size: .9rem;
    font-weight: 500;
    text-align: center;
  }
  /*clear图标*/
  .icon-chuyidong,.password svg{
    position: absolute;
    right: 20px;
    top: 10px;
    color: #ccc;
    z-index: 2;
  }
  .password .icon-chuyidong{
    right: 50px;
  }
  .password svg{
    font-size: 1rem;
  }
  .right_clear{
    right: 20px;
  }
</style>

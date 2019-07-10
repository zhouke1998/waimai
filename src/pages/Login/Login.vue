<template>
  <section>
    <LoginHeader left_title="登录">
      <router-link to="/loginPwd" slot="right_link">密码登录</router-link>
    </LoginHeader>
    <div class="content">
      <div class="form-group">
        <span :class="{code:true,active:rightPhoneComputed&&!isGettingCode}"
              @click="getLoginCode">{{buttonContent}}</span>
        <div :style="{'z-index':zIndex[0]}">
          <input
            @focus="getIndex(0)"
            placeholder="手机号"
            v-model="phone"
            maxlength=11
            minlength=11
          />
        </div>
        <div class="top1px" :style="{'z-index':zIndex[1]}">
          <input @focus="getIndex(1)"
                 placeholder="验证码"
                 v-model="code"
                 maxlength="6"
          />
        </div>
        <p>温馨提示：未注册外卖账号的手机号，登录时自动注册，且代表您已同意
          <a>《用户服务协议》</a>
          <a>《隐私协议》</a>
        </p>
        <div class="loginbtn"><p @click="loginPhone" type="success">登录</p></div>
      </div>
    </div>
  </section>
</template>

<script>
  import LoginHeader from '../../components/LoginHeader/LoginHeader'
  import {getLoginCode,loginPhone} from '../../api/index'
  import {MessageBox, Toast} from 'mint-ui';
  export default {
    components:{
      LoginHeader
    },
    mounted() {
      if (this.$store.state.user.phone) {
        this.$router.replace('/personInfo')
      }
    },
    data(){
      return{
        phone:'',//手机号
        code:'',//验证码
        rightPhone:false,//手机号格式是否正确
        isGettingCode:false,//正在获取验证码
        buttonContent : "获取验证码",
        hasGetCode:false,//，
        zIndex:[2,1],//两个输入框的z-index
      }
    },
    name: "Login",
    methods:{
      alertInfo(text){ //弹出框
        MessageBox.alert(text)
      },
      async getLoginCode(){
        if (this.isGettingCode || !this.rightPhoneComputed) {
          return
        }
        this.hasGetCode = this.isGettingCode= true
        let phone = this.phone
        let res = await getLoginCode(phone)
        const h = this.$createElement;
        if(res.status==0) { //发送成功
          Toast({
            message: '发送验证码成功！',
            position: 'top',
            duration: 1000
          });
          let timeOut = 30
          let interval1 = setInterval(() => {
            this.buttonContent = `${timeOut--}秒后重新获取`
            if (timeOut < 0) {
              clearInterval(interval1)
              this.isGettingCode = false
              this.buttonContent = "获取验证码"
            }
          }, 1000)
        }else{//发送失败
          Toast({
            message: res.message,
            position: 'top',
            duration: 1000
          });
          this.hasGetCode = false//立即设置 不能获取验证码状态
          setTimeout(()=>{
            this.isGettingCode= false
            },1000)
        }
      },
      //手机号登录
      loginPhone(){
        if(!this.rightPhoneComputed){
          this.alertInfo("请正确填写手机号码")
        }else if(!this.hasGetCode){
          this.alertInfo("请先获取验证码")
        }else if(!this.rightCode){
          this.alertInfo("验证码格式不正确")
        }else{
          loginPhone(this.code)
            .then(data=>{
              if(data.status==0){
                //console.log("登录成功")
                this.$store.dispatch('storeUserInfo',data.user)
                this.$router.replace('/mine')
              }else{
                const h = this.$createElement;
                Toast({
                  message: data.message,
                  position: 'top',
                  duration: 1000
                });
              }
            })
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
    },
    computed:{
      rightPhoneComputed(){
        return /^[1]\d{10}$/.test(this.phone)
      },
      /*验证码*/
      rightCode(){
        return /^[a-zA-Z0-9]{4,6}$/.test(this.code)
      }
    }
  }
</script>

<style scoped>
  section{
    background-color:#f5f5f5;
    overflow: hidden;
  }
  .form-group{
    position: relative;
  }
  .code{
    display: flex;
    align-items: center;
    height: 34px;
    padding: 0 5px;
    font-size: 0.8rem;
    position: absolute;
    right: 10px;
    top: 3px;
    z-index: 3;
    background-color: #ddd;
    border-radius: 2px;
    color: #fff;
  }

  .form-group .active {
    background-image: linear-gradient(90deg, #02a774, #2ca75e);
  }

  .form-group > p {
    padding: 0 10px;
    font-size: 0.7rem;
    color: #888888;
    margin-top: 20px;
  }
  .form-group p a{
    color: #4da6f0;
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
  .loginbtn{
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
</style>


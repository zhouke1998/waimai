<template>
  <section>
    <LoginHeader left_title="登录">
      <router-link to="/loginPwd" slot="right_link">密码登录</router-link>
    </LoginHeader>
    <div class="content">
      <div class="form-group">
        <el-button  style="z-index:3" type="info" class="code" :class="{active:rightPhoneComputed&&!isGettingCode}" :disabled="!rightPhoneComputed||isGettingCode" @click="getLoginCode">{{buttonContent}}</el-button>
        <el-input
          :style="{'z-index':zIndex[0]}" @focus="getIndex(0)"
          placeholder="手机号"
          v-model="phone"
          maxlength=11
          minlength=11
          clearable>
        </el-input>
        <el-input class="top1px"
          :style="{'z-index':zIndex[1]}" @focus="getIndex(1)"
          placeholder="验证码"
          v-model="code"
          clearable>
        </el-input>
        <p>温馨提示：未注册外卖账号的手机号，登录时自动注册，且代表您已同意
          <a>《用户服务协议》</a>
          <a>《隐私协议》</a>
        </p>
        <div class="loginbtn"><el-button @click="loginPhone" type="success">登录</el-button></div>
      </div>
    </div>
  </section>
</template>

<script>
  import LoginHeader from '../../components/LoginHeader/LoginHeader'
  import 'element-ui/lib/theme-chalk/index.css'
  import {getLoginCode,loginPhone} from '../../api/index'
  export default {
    components:{
      LoginHeader
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
        this.$alert("提示",{
          title:'提示',
          confirmButtonText: '确定',
          type: 'warning',
          center: true,
          message:text,
          showClose:false,
        })
      },
      async getLoginCode(){
        if(this.isGettingCode){
          return
        }
        this.hasGetCode = this.isGettingCode= true
        let phone = this.phone
        let res = await getLoginCode(phone)
        const h = this.$createElement;
        if(res.status==0) { //发送成功
          this.$message({
            message: h('p', {}, [
              h('span', { style: 'color: #000' }, '发送验证码成功！')
            ]),
            center: true
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
          this.$message({
            message: h('p', {}, [
              h('span', { style: 'color: #000' }, res.message)
            ]),
            center: true
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
                console.log("登录成功")
                this.$store.dispatch('storeUserInfo',data.user)
                this.$router.replace('/mine')
              }else{
                const h = this.$createElement;
                this.$message({
                  message: h('p', {}, [
                    h('span', { style: 'color: #000' }, data.message)
                  ]),
                  center: true
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
      /*获取验证码*/
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
    padding: 10px;
    font-size: 0.8rem;
    position: absolute;
    right: 5px;
    top: 3px;
    z-index: 2;
    height: 34px;
    border-radius: 1px;
  }
  .active{
    background-color: green;
  }
  .form-group p{
    padding: 0 10px;
    font-size: 0.7rem;
    color: #888888;
    margin-top: 20px;
  }
  .form-group p a{
    color: #4da6f0;
  }
  .loginbtn{
    text-align: center;
    margin-top: 20px;
  }
  .loginbtn button{
    width: 90%;
  }
  .loginbtn button:active{
    background-color: #4dc060;
  }
  .al-right>a{
    color: #fff;
    text-decoration: none;
  }
</style>
<style>
  /*.el-message-box{
    width: 200px;
    height: 150px;
  }*/
  .el-input>input{
    border: none;
    border-radius: 0;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    font-size: .9rem;
    letter-spacing: 1px;
  }
  /*.el-input>input:focus{
    border-color: #dddddd;
  }*/
</style>


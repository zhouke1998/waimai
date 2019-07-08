<template>
    <section>
      <LoginHeader left_title="密码登录">
      </LoginHeader>
      <div class="content">
        <div class="form-group">
          <el-input
            :style="{'z-index':zIndex[0]}"
            @focus="getIndex(0)"
            placeholder="手机/邮箱/用户名"
            v-model="phone"
            maxlength=16
            clearable>
          </el-input>
          <el-input :style="{'z-index':zIndex[1]}" @focus="getIndex(1)" class="top1px" placeholder="请输入密码" v-model="password" show-password clearable></el-input>
          <div class="codeImageWrap">
            <el-input
              class="codeCheak"
              placeholder="请输入验证码"
              v-model="code"
              maxlength=6 >
            </el-input>
            <img :src="baseURL" @click="changeCaptcha" />
          </div>
          <div class="loginbtn"><el-button @click="loginPwd" type="success">登录</el-button></div>
          <div class="forget">
            <div>
              <el-link :underline="false" type="primary">忘记密码?</el-link>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
  import LoginHeader from '../../components/LoginHeader/LoginHeader'
  import {loginPwd} from '../../api/index'
    export default {
    data(){
      return{
        password:'',
        phone:'',
        zIndex:[2,1],
        code:'',
        baseURL:'waimai_api/users/getCaptchaCode?'+Date.now(),
      }
    },
    name: "LoginPwd",
    components:{
        LoginHeader
    },
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
      loginPwd(){
        if(!/^\w{3,16}$/.test(this.phone)){
          this.alertInfo("请正确填写账号")
        }else if(!/^\w{3,16}$/.test(this.password)){
          this.alertInfo("密码格式不正确")
        }else if(!/^\d{1,3}$/.test(this.code)){
          this.alertInfo("验证码填写错误")
        }else{
          let res = loginPwd(this.phone,this.password,this.code)
            .then(data=>{
              if(data.status==0){
                console.log("登陆成功");
                this.$store.dispatch('storeUserInfo',data.user)
                this.$router.replace('/mine')
              }else{
                this.changeCaptcha()
                this.alertInfo(data.message)
              }
            })
          //后台验证
          console.log("后台验证");
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
    },
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
  .form-group{
    position: relative;
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
    font-size: 0.7rem;
  }
</style>
<!--提示格式错误弹出框-->
<style>
  .codeCheak input{
    height: -50px;
  }
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

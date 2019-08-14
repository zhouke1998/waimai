<template>
  <ul class="newPhone">
    <li class="modify">
      <span>新手机号</span>
      <div>
        <input v-model="newPhone" type="text" maxlength="11"/>
        <span @click="getCode()" :class="{getCode:true,isGettingCode:isGettingCode}">{{buttonContent}}</span>
      </div>
    </li>
    <li>
      <span>验证码</span>
      <div>
        <input id="code_input" placeholder="请输入验证码" type="text" maxlength="6" v-model="code"/>
      </div>
    </li>
    <div class="btn">
      <p @click="checkCode()" :class="{checkOk:isFit}">确认绑定</p>
    </div>
  </ul>
</template>

<script>
  import {getLoginCode,checkNewPhone} from "../../api";
  import {MessageBox} from 'mint-ui';
    export default {
      name: "New",
      data(){
        return{
          newPhone:'',
          code:'',
          isGettingCode:false, //正在获取验证码
          hasSendCode:false, //是否发送了验证码
          buttonContent:'获取验证码',
        }
      },
      computed:{
        isFit(){
          return this.code.length===6&&this.newPhone.length===11
        },
      },
      methods:{
        checkCode(){
          if(!this.isFit){
            return
          }else if(!this.hasSendCode){
            this.$parent.alertInfo('验证无效')
          }else{
            checkNewPhone(this.code)
              .then(data=>{
                if(data.status===0){
                  this.$parent.alertInfo("修改成功!")
                  this.$store.dispatch('changeNewPhone',this.newPhone)
                }else{
                  const h = this.$createElement;
                  MessageBox.alert(data.message)
                }
              })
          }
        },
        async getCode(){
          if(!/^1[0-9]{10}$/.test(this.newPhone)) {
            this.$parent.alertInfo('手机号不正确')
            return
          }
          if(this.isGettingCode){
            return
          }
          this.isGettingCode =true
          let phone = this.newPhone //this.$store.state.user.phone
          let res = await getLoginCode(phone)
          const h = this.$createElement;
          if(res.status===0) { //发送成功
            document.getElementById('code_input').focus()
            this.hasSendCode = true
            MessageBox.alert('发送验证码成功！')
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
            MessageBox.alert(res.message)
            setTimeout(()=>{
              this.isGettingCode= false
            },1000)
          }
        },
      }
    }
</script>

<style scoped>
  li{
    display: flex;
    align-items: center;
    padding: .5rem 1rem;
    background-color: #fff;
    justify-content: space-between;
    font-size: 1rem;
    color: #555;
  }
  li>span{
    width: 20%;
  }
  li div{
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  }
  li div>span:first-child{
    font-size: .95rem;
    font-weight: 500;
    padding-left: 1rem;
    vertical-align: middle;
    padding-top: 1px;
    color: #333;
  }
  ul li div .getCode{
    font-size: .9rem;
    color: #fff;
    background-color: #0097ff;
    padding: 5px .5rem;
    border-radius: 2px;
    white-space: nowrap;
  }
  div input{
    border: none;
    padding-left: 1rem;
    outline: none;
    font-size: .9rem;
  }
  .btn{
    margin-top: 1rem;
    padding: 0 1rem;
  }
  .btn p{
    width: 100%;
    text-align: center;
    color: #fff;
    font-weight: 700;
    font-size: .9rem;
    background-color: #ccc;
    line-height: 2.5rem;
    border-radius: 2px;
  }
  .btn .checkOk{
    background-color: #4cd964;
  }
  .newPhone input{
    display: inline-block;
    width: 60%;
    max-width: 150px;
  }
  .isGettingCode{
    background-color: #888888 !important;
  }
</style>

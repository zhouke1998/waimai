<template>
  <section>
    <ul>
      <li v-if="hasPassword" :class="{warn:old_warn}">
        <input @blur="blur(0)" placeholder="旧密码" v-model="old" type="password"/>
        <p v-show="old_warn">密码长度为6-20位</p>
      </li>
      <li :class="{warn:new_warn}">
        <input @blur="blur(1)" placeholder="新密码" v-model="$data._new" type="password"/>
        <p v-show="new_warn">密码长度为6-20位</p>
      </li>
      <li :class="{warn:newConfirm_warn}">
        <input @blur="blur(2)" placeholder="确认密码" v-model="newConfirm" type="password"/>
        <p v-show="newConfirm_warn">两次输入不一致</p>
      </li>
    </ul>
    <div class="btn"><p @click="changePassword()" :class="{ok:checkOk}">确认并保存</p></div>
  </section>
</template>

<script>
  import {changePassword} from "../../../api";
  export default {
      name: "Password",
      data(){
        return{
          old:'',
          _new:'',
          newConfirm:'',
          old_hover:false,//记录有没有被点击过
          _new_hover:false,
          newConfirm_hover:false,
          regex:/^\w{6,20}$/,
        }
      },
      computed:{
        hasPassword(){
          return this.$store.state.user.password!='false'
        },
        old_warn(){
          return this.old.length!==0 && !this.regex.test(this.old) && this.old_hover
        },
        new_warn(){
          return this.$data._new.length!==0 && !this.regex.test(this.$data._new) && this.$data._new_hover
        },
        newConfirm_warn(){
          return this.$data._new.length!==0 && (this.$data._new!==this.newConfirm) && this.newConfirm_hover
        },
        checkOk(){
          return (!this.hasPassword || this.regex.test(this.old)) && this.regex.test(this.$data._new) && this.$data._new===this.newConfirm
        }
      },
      mounted(){
        setTimeout(()=>{
          if(!this.$store.state.user.phone){
            this.$router.replace('/mine')
          }
        },500)
      },
      methods:{
        blur(index){
          if(index===0){
            this.old_hover = true
          }else if(index===1){
            this.$data._new_hover = true
          }else{
            this.newConfirm_hover = true
          }
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
        async changePassword(){
          if(!this.checkOk){
            return
          }
          const result = await changePassword(this.$data._new,this.hasPassword?this.old:'')
          if(result.status===0){
            this.alertInfo('修改成功！')
            this.$store.dispatch('changePassword')
            this.$router.replace('/personInfo')
          }else{
            this.alertInfo('修改失败！')
          }

        }
      }
    }
</script>

<style scoped>
  section{
    background-color: #f5f5f5;
  }
  ul{
    background-color: #fff;
    padding: .7rem;
  }
  li{
    margin-bottom: .7rem;
  }
  li:last-child{
    margin-bottom: 0;
  }
  li input{
    width: 100%;
    border: 1px solid #ddd;
    background-color: #eee;
    outline: none;
    font-size: .9rem;
    height: 2rem;
    line-height: 1rem;
    padding: 0 5px;
    box-sizing: border-box;
  }
  li p{
    color: red;
    font-size: .8rem;
    letter-spacing: 1px;
    padding: 3px 0;
  }
  .warn input{
    border: 1px solid #ea3106;
  }
  .warn{
    margin-bottom: 0;
  }
  li input:hover{
    border: 1px solid #3199e8;
  }
  .btn{
    padding: .7rem;
  }
  .btn p{
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: .95rem;
    border-radius: 3px;
    background-color: #cccccc;
    font-weight: bold;
    line-height: 2.5rem;
  }
  .btn .ok{
    background-color: #3199e8;
  }
</style>

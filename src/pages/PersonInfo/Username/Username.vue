<template>
    <section>
      <div class="main">
        <input v-model="username" maxlength="24" type="text" placeholder="用户名"/>
        <span>用户名只能修改一次(5-24个字)</span>
        <div class="btn"><p @click="doRename()" :class="{checkOk:isFit}">确认修改</p></div>
      </div>
    </section>
</template>

<script>
  import {changeUserName} from "../../../api";

  export default {
      name: "Username",
      data(){
        return{
          username:'',
        }
      },
      props:{
        has_change:Boolean,
      },
      mounted(){
        if(!this.$store.state.user.phone || this.$store.state.user.has_change_name){
          this.$router.replace("/mine")
        }
      },
      computed:{
        isFit(){
          return this.username.length>=5
        }
      },
      methods: {
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
        doRename() {
          if(!this.isFit){
            return
          }
          if (!/^\w{5,24}$/.test(this.username)) {
            this.alertInfo('用户名不符合规则')
          }else{
            changeUserName(this.username)
              .then((res)=>{
                if(res.status===0)
                {
                  this.$store.dispatch('changeUsername',res.username)
                  this.$router.replace('.')
                }else{
                  this.alertInfo('修改失败')
                }
              })
          }
        },
      }
    }
</script>

<style scoped>
  section{
    background-color: #f5f5f5;
  }
  .main{
    padding-top: 1rem;
  }
  .main input{
    width: 100%;
    padding: .5rem 1rem;
    background-color: #fff;
    font-size: .9rem;
    border: none;
    outline: none;
    height: 1.5rem;
  }
  .main span{
    display: inline-block;
    font-size: .65rem;
    color: #999;
    padding:.5rem 1rem;
  }
  .btn{
    padding: 0 1rem;
    font-size: 1rem;
    color: #fff;
  }
  .btn p{
    background-color: #ccc;
    border-radius: 4px;
    width: 100%;
    text-align: center;
    line-height: 3rem;
    font-weight: bold;
  }
  .btn .checkOk{
    background-color:  #00d762;
  }
</style>

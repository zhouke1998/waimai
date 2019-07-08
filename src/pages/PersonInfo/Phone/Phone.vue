<template>
    <section>
      <Old v-if="!checkOk" ></Old>
      <New v-if="checkOk" ></New>
    </section>
</template>

<script>
  import Old from '../../../components/ChangePhone/Old'
  import New from '../../../components/ChangePhone/New'
    export default {
      name: "phone",
      data(){
        return{
          checkOk:false,//是否通过了旧验证
        }
      },
      mounted(){
        if(!this.$store.state.user.phone){
          this.$router.replace("/mine")
        }
      },
      computed:{
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
      },
      components:{
        Old,
        New,
      }
    }
</script>

<style scoped>
 section{
   background-color: #f5f5f5;
   padding-top: .7rem;
 }
</style>

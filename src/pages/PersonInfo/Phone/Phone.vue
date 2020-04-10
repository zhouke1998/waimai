<template>
    <section>
      <Old v-if="!checkOk" ></Old>
      <New v-if="checkOk" ></New>
    </section>
</template>

<script>
  import Old from '../../../components/ChangePhone/Old'
  import New from '../../../components/ChangePhone/New'
  import {MessageBox} from 'mint-ui';
    export default {
      name: "phone",
      data(){
        return{
          checkOk:false,//是否通过了旧验证
        }
      },
      mounted(){
      },
      computed:{
      },
      methods:{
        alertInfo(text){ //弹出框
          MessageBox.alert(text)
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

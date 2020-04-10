<template>
  <section>
    <LoginHeader title="选择配送地址">
      <span @click="manageAddress"  slot="right_link">管理地址</span>
    </LoginHeader>
    <MyMap :location="location" :addressProp="address" :addressListShowProp="addressListShowProp" :LL="LL" @certainSelect="certainSelect">

    </MyMap>
  </section>
</template>

<script>
  import LoginHeader from "../../components/LoginHeader/LoginHeader";
  import { mapState } from 'vuex'
  import {Toast} from 'mint-ui';
  import MyMap from "../../components/MyMap/MyMap"
    export default {
      name: "MapAddress",
      data(){
        return{
          location:"",
          address:"",
          addressListShowProp:true
        }
      },
      created(){
        this.location = this.LLAddress.addressComponent.province;
        this.address = this.LLAddress.address;
      },
      computed:{
        ...mapState({
          LL:(state)=>state.address.location,
          //location:(state)=>state.address.addressComponent.province
          LLAddress:(state)=>state.address,
          getUser(){
            return this.$store.state.user
          },
        }),
      },
      methods:{
        certainSelect(selectAddress){
          this.$store.dispatch("setAddress",selectAddress);
          this.$router.back();
        },
        manageAddress(){
            this.$router.push("/personInfo/deliveryAddress")
        }
      },
      components:{
        LoginHeader,
        MyMap
      }
    }
</script>

<style scoped>

</style>

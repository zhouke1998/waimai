<template>
  <section>
    <Backtop title="新增地址"></Backtop>
    <AddressEdit @selectAddress="selectAddress" @saveAddress="saveAddress">

    </AddressEdit>
  </section>
</template>

<script>
  import Backtop from "@/components/Headertop/Backtop";
  import AddressEdit from "@/components/Address/AddressEdit"
  import {addDeliveryAddress} from "@/api/index.js"
  import {Toast} from 'mint-ui';

  export default {
    name: "AddAddress",
    components:{
      Backtop,
      AddressEdit
    },
    created(){

    },
    computed:{
      deliveryAddress_select(){
        return this.$store.state.deliveryAddress_select
      }
    },
    methods:{
      selectAddress(){
        this.$router.push("/deliveryMapAddress")
      },
      saveAddress(info){
        let deliveryAddress_select = this.deliveryAddress_select;
        this.$store.dispatch("changeSelectMapAddress",{deliveryAddress:info,onlyAddress:false,onlyInfo:true});
        addDeliveryAddress(JSON.stringify(deliveryAddress_select[deliveryAddress_select.active])).then((data)=>{
          if(data.status===0){
            Toast({
              message: "添加成功",
              position: 'bottom',
              duration: 1500
            });
            this.$store.dispatch("receiveDeliveryAddress"); //重新请求
            this.$store.dispatch("changeSelectMapAddress",{deliveryAddress:null,onlyAddress:false,onlyInfo:false}); //清空数据
            this.$router.back();
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>

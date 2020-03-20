<template>
  <section>
    <LoginHeader title="修改地址">
      <i class="del-icon" @click="deleteAddress" slot="right_link"> <span class="iconfont icon-tuanduicankaoxian-3"></span></i>
    </LoginHeader>
    <AddressEdit @selectAddress="selectAddress" @saveAddress="saveAddress">

    </AddressEdit>
  </section>
</template>

<script>
  import LoginHeader from "@/components/LoginHeader/LoginHeader";
  import AddressEdit from "@/components/Address/AddressEdit"
  import {changeDeliveryAddress,deleteDeliveryAddress} from "@/api/index.js"
  import {Toast,MessageBox} from 'mint-ui';

  export default {
    name: "EditAddress",
    data(){
      return{
      }
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
        changeDeliveryAddress(JSON.stringify(deliveryAddress_select[deliveryAddress_select.active])).then((data)=>{
          if(data.status===0){
            Toast({
              message: "修改成功",
              position: 'bottom',
              duration: 1500
            });
            this.$store.dispatch("receiveDeliveryAddress"); //重新请求
            this.$store.dispatch("changeSelectMapAddress",{deliveryAddress:null,onlyAddress:false,onlyInfo:false}); //清空数据
            this.$router.back();
          }
        });
      },
      deleteAddress(){
        let deliveryAddress_select = this.deliveryAddress_select;
        MessageBox.confirm('确定删除该地址吗?').then(() => {
            deleteDeliveryAddress(deliveryAddress_select[deliveryAddress_select.active].id).then((data)=>{
              if(data.status===0){
                Toast({
                  message: "删除成功",
                  position: 'bottom',
                  duration: 1500
                });
                this.$store.dispatch("receiveDeliveryAddress"); //重新请求
                this.$store.dispatch("changeSelectMapAddress",{deliveryAddress:null,onlyAddress:false,onlyInfo:false}); //清空数据
                this.$router.back();
              }
            });
          })
          .catch(action => {
          });
      }
    },
    components: {
      LoginHeader,
      AddressEdit
    }
  }
</script>

<style scoped>
  .del-icon{
    line-height: 50px;
    font-size: 1.25rem;
    display: inline-block;
    width: 50%;
    height: 100%;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 20px;
  }
  .icon-tuanduicankaoxian-3{
    font-size: 1.25rem;
    position: relative;
    top: 2px;
  }
</style>

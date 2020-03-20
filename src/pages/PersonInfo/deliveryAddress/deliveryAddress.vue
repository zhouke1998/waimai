<template>
  <section>
    <LoginHeader title="收货地址">
      <span @click="link_addAddress"  slot="right_link">新增地址</span>
    </LoginHeader>
    <div class="addressList">
      <AddressCover v-for="(item,index) in deliveryAddress_content" :addressInfo="item" :key="index" class="a-list" :editShow="editShow" @click.native="link_editAddress(index)">

      </AddressCover>
    </div>
  </section>
</template>

<script>
  import LoginHeader from "../../../components/LoginHeader/LoginHeader";
  import AddressCover from "../../../components/Address/AddressCover"
  import { mapState } from 'vuex'
    export default {
      name: "MapAddress",
      data(){
        return {
          addressList:[]
        }
      },
      created(){
        this.getAllAddress();
      },
      computed:{
        ...mapState(["deliveryAddress_select","deliveryAddress"]),
        deliveryAddress_content(){
          return this.deliveryAddress.address;
        },
        editShow(){
          if(this.$route.query.editNotShow!==undefined){
            return false
          }else{
            return true
          }
        }
      },
      methods:{
        link_editAddress(index){
          const address_info = this.deliveryAddress_content[index]; //点击的地址
          if(!this.editShow){ //选择地址不能编辑
            this.$store.dispatch("changeSettleAddress",address_info.id);
            this.$router.back();
            return
          }
          this.$store.dispatch("changeSelectMapAddressStatus",{activeStatus:"edit",address_info})
          this.$router.push("/personInfo/editAddress")
        },
        link_addAddress(){
          this.$store.dispatch("changeSelectMapAddressStatus",{activeStatus:"add",address_info:""})
          this.$router.push("/personInfo/addAddress")
        },
        getAllAddress(){
          if(this.deliveryAddress.status===1){  //未获取地址，获取地址
            this.$store.dispatch("receiveDeliveryAddress")
          }
        }
      },
      components:{
        LoginHeader,
        AddressCover
      }
    }
</script>

<style scoped>
  section{
    background-color: #f8f8f8;
  }
  .addressList{
    padding: 10px 20px;
  }
</style>

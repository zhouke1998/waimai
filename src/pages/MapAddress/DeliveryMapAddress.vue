<template>
  <section>
    <Backtop title="选择收货地址"></Backtop>
    <MyMap :location="location" :addressProp="address" :LL="LL"
           @certainSelect="certainSelect">

    </MyMap>
  </section>
</template>

<script>
  import Backtop from "../../components/Headertop/Backtop";
  import MyMap from "../../components/MyMap/MyMap"
  import { mapState } from 'vuex'

  export default {
    name: "DeliveryMapAddress",
    data(){
      return{
        location:"",
        address:"",
        LL:{
          lng: 0,
          lat: 0
        }
      }
    },
    created(){
      const activeStatus = this.deliveryAddress_select.active;
      if(activeStatus===-1){
        this.$router.back();
      }else{
        this.LL = this.deliveryAddress_select[activeStatus].address.location;
        this.address = this.deliveryAddress_select[activeStatus].address.address;
      }
    },
    computed:{
      ...mapState(["deliveryAddress_select"])
    },
    methods:{
      certainSelect(selectAddress){
        this.$store.dispatch("changeSelectMapAddress",{deliveryAddress:selectAddress,onlyAddress:true,onlyInfo:false});
        this.$router.back();
      },
    },
    components: {
      Backtop,
      MyMap
    }
  }
</script>

<style scoped>

</style>

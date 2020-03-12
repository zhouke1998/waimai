<template>
  <section>
    <LoginHeader title="选择配送地址">
      <router-link to="/loginPwd" slot="right_link">新增地址</router-link>
    </LoginHeader>
    <div class="search">
      <span class="iconfont icon-search"></span>
      <input type="text" v-model="keyword" placeholder="请输入配送地址"/>
    </div>
    <baidu-map class="map-address" :zoom="zoom" :center="center" @ready="handler">
      <bm-scale> </bm-scale>
      <bm-navigation> </bm-navigation>
      <bm-city-list> </bm-city-list>
      <bm-local-search @markersset="markersset" :keyword="keyword" :location="location" :panel="true"> </bm-local-search>
    </baidu-map>
  </section>
</template>

<script>
  import LoginHeader from "../../components/LoginHeader/LoginHeader";
  import { mapState } from 'vuex'
    export default {
      name: "MapAddress",
      data(){
        return{
          center:{
            lng:0,
            lat:0
          },
          zoom:3,
          keyword:"",
          location:"江西省"
        }
      },
      computed:{
        ...mapState({
          LL:(state)=>state.address.location,
          //location:(state)=>state.address.addressComponent.province
        }),
      },
      methods:{
        handler({BMap,map}){
          //console.log(BMap,map);
          this.center.lng = this.LL.lng;
          this.center.lat = this.LL.lat;
          this.zoom = 15;
        },
        markersset(arr){
          console.log(arr);
        }
      },
      components:{
        LoginHeader
      }
    }
</script>

<style scoped>
  .map-address {
    width: 100%;
    height: 300px;
  }
  .search{
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    position: relative;
  }
  .search .icon-search{
    position: absolute;
    top: 12px;
    left: 12px;
    color: #777;
  }
  .search input{
    height: 30px;
    width: 100%;
    border: none;
    outline: #fff;
    font-size: .8rem;
    background-color: #f3f3f3;
    border-radius: 4px;
    padding-left: 30px;
    box-sizing: border-box;
  }
</style>

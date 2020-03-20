<template>
  <div>
    <div class="search">
      <span class="iconfont icon-search"></span>
      <input type="text" v-model="keyword" placeholder="请输入配送地址"/>
    </div>
    <baidu-map class="map-address" :zoom="zoom" :center="center" @ready="handler">
      <bm-scale></bm-scale>
      <bm-navigation></bm-navigation>
      <bm-city-list></bm-city-list>
      <bm-local-search @markersset="markersset" @infohtmlset="infohtmlset" @resultshtmlset="resultshtmlset"
                       :keyword="keyword" :location="location" :panel="true" :autoViewport="true"
                       :pageCapacity="pageCapacity"></bm-local-search>
      <bm-marker :position="LL" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label content="当前位置" :labelStyle="labelStyle" :offset="{width: -15, height: 30}"/>
      </bm-marker>
      <bm-marker :position="myaddressShow?center:{lng: 0,lat: 0 }" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label :content="myaddressShowText" :labelStyle="labelStyle" :offset="{width: -25, height: 30}"/>
      </bm-marker>
    </baidu-map>
    <div class="addressList" v-show="myAddressListShow">
      <div class="bg-fill">
        <div class="head">
          <p>收货地址</p>
        </div>
        <AddressCover v-for="(item,index) in deliveryAddress_content" @click.native="click_deliveryAddress(index)" :addressInfo="item" :key="index" class="a-list" :editShow="false">

        </AddressCover>
      </div>
    </div>
    <div class="address">
      <span>已选择地址:</span>
      <span class="iconfont icon-tuanduicankaoxian-2"></span>
      <b class="ellipsis">{{address}}</b>
      <button @click="certainSelect">确定</button>
    </div>
  </div>
</template>

<script>
  import AddressCover from "../Address/AddressCover"
  import { mapState } from 'vuex'
  export default {
    name: "MyMap",
    props:{
      location: String,
      addressProp: String,
      addressListShowProp: {
        type:Boolean,
        default:false
      },
      LL:Object
    },
    data() {
      return {
        center: {
          lng: 0,
          lat: 0
        },
        keyword:"",
        address:"",
        zoom: 3,
        pageCapacity: 5,
        addressListShow:false,
        selectAddress: {
          status: 1,
          address: '',
          location: {
            lat: 0, //纬度
            lng: 0  //经度
          },
          addressComponent: {
            country: "",
            province: "",
            city: "",
          }
        },
        labelStyle:{color: 'red', fontSize : '12px'},
        myaddressShow:false,
        myaddressShowText:""
      }
    },
    created(){
      if(this.addressListShowProp){
        this.addressListShow = true
      }
      this.address = this.addressProp;

      const deliveryAddress =  this.deliveryAddress;
      if(deliveryAddress.status===1){  //未获取地址，获取地址
        this.$store.dispatch("receiveDeliveryAddress")
      }
    },
    computed:{
      ...mapState(["deliveryAddress"]),
      deliveryAddress_content(){
        return this.deliveryAddress.address;
      },
      myAddressListShow(){
        const deliveryAddress =  this.deliveryAddress;
        if(deliveryAddress.status===0 && deliveryAddress.address.length && this.addressListShow){
          return true
        }else{
          return false;
        }
      }
    },
    methods:{
      handler({BMap, map}) {
        this.center.lng = this.LL.lng;
        this.center.lat = this.LL.lat;
        this.zoom = 15;
      },
      markersset(arr) {
        //console.log("markersset");
        this.addressListShow = false;
        this.myaddressShow = false;
      },
      infohtmlset(loc) {
        this.selectAddress.status = 0;
        this.selectAddress.location = loc.point;
        this.address = this.selectAddress.address = loc.address + "-"+loc.title;
        this.selectAddress.addressComponent.city = loc.city;
        this.selectAddress.addressComponent.province = loc.province;
      },
      resultshtmlset() {
        //console.log("resultshtmlset");
      },
      certainSelect() {
        this.$emit("certainSelect",this.selectAddress)
      },
      click_deliveryAddress(index){
        let address_click = this.deliveryAddress_content[index];
        this.selectAddress = address_click.address;
        this.address = address_click.address.address;
        this.center = address_click.address.location;
        this.center.lng = parseFloat(this.center.lng) +0.00000001; //重新定位中心
        this.myaddressShow = true;
        this.myaddressShowText = address_click.address.address
      }
    },
    components:{
      AddressCover
    }
  }
</script>

<style scoped>
  .map-address {
    width: 100%;
    height: 300px;
  }

  .map-address div:nth-child(2) {
    padding-bottom: 50px;
  }

  .search {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    position: relative;
  }

  .search .icon-search {
    position: absolute;
    top: 12px;
    left: 12px;
    color: #777;
  }

  .search input {
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

  .address {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 50px;
    width: 100%;
    background-color: #fff;
    font-size: .8rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 5px;
  }

  .address span:nth-child(1) {
    margin-right: 5px;
  }

  .address span:nth-child(2) {
    color: #02a774;
    position: relative;
    top: 2px;
  }

  .address b {
    font-size: 1rem;
    display: inline-block;
    width: 60%;
  }

  .address button {
    margin-left: 5px;
    border: none;
    border-radius: 2px;
    background-color: #02a774;
    color: #fff;
    align-items: center;
    height: 20px;
    padding-bottom: 2px;
  }

  .addressList{
    margin-top: 10px;
    max-height: 350px;
    overflow: auto;
    padding-bottom: 50px;
  }
  .addressList .bg-fill{
    padding-left: 20px;
    background-color: #f8f8f8;
  }
  .addressList .head{
    font-size: .8rem;
    color: #999;
    height: 40px;
    line-height: 40px;
  }
</style>

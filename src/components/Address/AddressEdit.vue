<template>
  <div class="content">
    <div class="connect-list list-item">
      <div class="left-title">
        <span>联系人</span>
      </div>
      <div class="right_item">
        <div class="name-input">
          <input v-model="name" type="text" maxlength="6" placeholder="姓名"/>
        </div>
        <div class="gender-tips">
          <span :class="{active:gender===0}" @click="changeGender(0)">先生</span>
          <span :class="{active:gender===1}" @click="changeGender(1)">女士</span>
        </div>
      </div>
    </div>

    <div class="phone-list list-item">
      <div class="left-title">
        <span>电话</span>
      </div>
      <div class="right_item">
        <div class="item">
          <input type="text" maxlength="11" v-model="phone" placeholder="手机号码"/>
        </div>
      </div>
    </div>

    <div class="address-list list-item" @click="selectAddress">
      <div class="left-title">
        <span>地址</span>
      </div>
      <div class="right_item">
        <div class="item">
          <span>{{address}}</span>
          <span class="iconfont icon-jiantou"></span>
        </div>
      </div>
    </div>

    <div class="door-list list-item">
      <div class="left-title">
        <span>门牌号</span>
      </div>
      <div class="right_item">
        <div class="item">
          <input type="text" v-model="door" maxlength="20" placeholder="例:4号楼1单元4A"/>
        </div>
      </div>
    </div>

    <div class="tip-list list-item">
      <div class="left-title">
        <span>标签</span>
      </div>
      <div class="right_item">
        <span v-for="(item,index) in addressTipText" :class="{active:addressTip===item.val}" :key="index" @click="changeAddressTip(item.val)">{{item.label}}</span>
      </div>
    </div>

    <div class="button">
      <button @click="save">保存</button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import {Toast} from 'mint-ui';
  export default {
    name: "AddressEdit",
    data() {
      return {
        phone: "",
        door: "",
        name: "",
        gender: -1,//0男士 1女士
        addressTip: -1,
        addressTipText:[
          {
            label:"家",
            val:0
          },
          {
            label:"公司",
            val:1
          },
          {
            label:"学校",
            val:2
          }
        ]
      }
    },
    created(){
      const activeStatus = this.deliveryAddress_select.active;
      if(activeStatus!=="-1"){
        let addressEdit = this.deliveryAddress_select[activeStatus].baseInfo;
        this.phone = addressEdit.phone;
        this.door = addressEdit.door;
        this.name = addressEdit.name;
        this.gender = addressEdit.gender;
        this.addressTip = addressEdit.addressTip
      }else{
        this.$router.back();
      }
    },
    computed:{
      ...mapState(["deliveryAddress_select"]),
      address(){
        return this.deliveryAddress_select[this.deliveryAddress_select.active].address.address
      },
      legal(){
        const legalArr = [
          [this.name.length<1,"请填写联系人"],
          [!/^1[3-8]\d{9}/.test(this.phone),"请填写11位联系电话号码"]
        ];
        for(let one of legalArr){
          if(one[0]){
            return [false,one[1]];
          }
        }
        return [true];
      },
      baseInfo(){
        return{
          phone:this.phone,
          door: this.door,
          name: this.name,
          gender: this.gender,//0男士 1女士
          addressTip: this.addressTip
        }
      }
    },
    methods: {
      changeGender(gender) {
        this.gender = gender;
      },
      changeAddressTip(addressTip) {
        this.addressTip = addressTip===this.addressTip?-1:addressTip;
      },
      save(){
        if(this.legal[0]){
          this.$emit("saveAddress",{
            phone:this.phone,
            door:this.door,
            name:this.name,
            addressTip:this.addressTip,
            gender:this.gender
          });
        }else{
          Toast({
            message: this.legal[1],
            position: 'bottom',
            duration: 1000
          });
        }
      },
      selectAddress(){
        this.$store.dispatch("changeSelectMapAddress",{deliveryAddress:this.baseInfo,onlyAddress:false,onlyInfo:true});
        this.$emit("selectAddress")
      }
    }
  }
</script>

<style scoped>
  .content {
    padding: 0 20px 0 7px;
  }

  .list-item {
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 0;
  }

  .connect-list {
    align-items: normal;
  }

  .list-item .left-title {
    font-size: .8rem;
    font-weight: bold;
    color: #333;
    width: 20%;
  }

  .list-item .right_item {
    width: 80%;
  }

  .list-item .right_item input {
    border: none;
    font-size: .8rem;
    outline: none;
    padding-left: 1px;
    width: 100%;
  }

  .name-input {
    padding-bottom: 6px;
    border-bottom: 1px solid #eee;
  }

  .gender-tips {
    padding-top: 6px;
  }

  .gender-tips span, .tip-list .right_item span {
    display: inline-block;
    width: 30px;
    font-size: .7rem;
    border: 1px solid #ddd;
    border-radius: 2px;
    text-align: center;
    padding: 2px 10px;
    margin-right: 2px;
  }

  .gender-tips .active, .tip-list .right_item .active {
    border-color: green;
    color: green;
  }

  .address-list .right_item .item {
    position: relative;
  }

  .address-list .icon-jiantou {
    position: absolute;
    right: 10px;
    top: 0;
    color: #ededed;
  }

  .button {
    margin-top: 10px;
    height: 45px;
    opacity: 0.8;
  }

  .button button {
    width: 100%;
    height: 100%;
    border: none;
    background-color: #41a71e;
    border-radius: 4px;
    color: #fff;
    font-size: 1rem;
    outline: none;
  }
</style>

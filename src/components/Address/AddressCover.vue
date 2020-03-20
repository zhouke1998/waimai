<template>
  <div class="list">
    <div class="address">
      <div class="address-title">
        <span class="title ellipsis">{{addressInfo.address.address}}</span>
        <span :class="tipClass[0]">{{tipClass[1]}}</span>
      </div>
      <div class="address-info">
        {{addressInfo.baseInfo.door}}
      </div>
      <div class="person-info">
        <span class="name">{{addressInfo.baseInfo.name}}</span>
        <span class="gender">(先生)</span>
        <span class="phone">{{phone}}</span>
      </div>
    </div>
    <div class="edit" v-if="editShow">
      <a>
        <span>编辑</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddressCover",
    data() {
      return {
        addressTipText:[
          {
            label:"家",
            val:0,
            clas:"tip0" //类名
          },
          {
            label:"公司",
            val:1,
            clas:"tip1"
          },
          {
            label:"学校",
            val:2,
            clas:"tip2"
          }
        ]
      }
    },
    props:{
      editShow:Boolean,
      addressInfo:{
        type:Object,
        default:[]
      }
    },
    computed: {
      phone(){
        const phone = this.addressInfo.phone
        if(phone && phone.length){
          return phone.substring(0,3)+"****"+phone.substring(7)
        }else{
          return "";
        }
      },
      tipClass(){
        let oriName = "tip ";
        let name2 = "";
        let labelText = ""
        let tipVal = this.addressInfo.baseInfo.addressTip;
        if(tipVal!==-1){
          name2 = this.addressTipText[tipVal].clas;
          labelText = this.addressTipText[tipVal].label
        }else{
          name2 = "none"; //不显示
        }
        let newName = oriName+ name2;
        return [newName,labelText];
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .list {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px dashed #ccc;
  }
  .list .address{
    width: 80%;
  }
  .list .edit{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 20%;
    font-size: .9rem;
    color: #41a71e;
  }
  .list .address-title {
    color: #333;
    font-weight: bold;
    font-size: .8rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .list .address-title .title{
    max-width: 85%;
    margin-right: 3px;
  }
  .list .address-title .tip {
    font-weight: normal;
    font-size: .6rem;
    background-color: #71f531;
    color: green;
    border-radius: 2px;
    border: 1px solid #46a774;
    position: relative;
    opacity: 0.8;
    padding: 0 3px;
  }

  .list .address-title .tip0 {
    background-color: #f5a1b5;
    color: #80150f;
    border: 1px solid #a71857;
  }

  .list .address-title .tip1 {
    background-color: #aecaf5;
    color: #5487ff;
    border: 1px solid #6f8ef5;
  }

  .list .address-title .none {
    display: none;
  }

  .list .address-info {
    font-size: .75rem;
    margin-bottom: 5px;
  }

  .list .person-info {
    color: #999;
    font-size: .75rem;
  }

  .list .person-info .phone {
    margin-left: 5px;
  }
</style>

<template>
    <section>
      <Backtop :router_back="false"  style="position: sticky; top: 0; left: 0; z-index: 2" :title="this.noteShow?'订单备注':'确认订单'" class="miniLine"></Backtop>
      <div class="gra" v-if="true && !noteShow">
        <div @click="selectDeliveryAddress" class="orderTop">
          <div class="hasSelectAddress" v-if="selectedSettleAddress">
            <span>订单配送至</span>
            <div class="address">
              <p class="ellipsis">
                {{selectedSettleAddress.address.address}}
              </p>
              <span class="iconfont icon-jiantou"></span>
            </div>
            <div class="peo_info">
              <p><span>{{selectedSettleAddress.baseInfo.name}}</span><span v-if="gender[0]">({{gender[1]}})</span>&nbsp;&nbsp;<span>{{selectedSettleAddress.baseInfo.phone}}</span></p>
            </div>
          </div>
          <div class="notSelectAddress" v-else>
            <div class="address">
              <p class="ellipsis">
                选择配送地址
              </p>
              <span class="iconfont icon-jiantou"></span>
            </div>
          </div>
        </div>
        <div class="con">
          <div class="peisong">
            <div class="del_time miniLine">
              <span>送达时间</span>
              <p>尽快送达
                <span>({{getLeadTime}}送达)</span>
                <span style="display: none;" class="iconfont icon-jiantou"></span>
              </p>
            </div>
            <div class="pay_way">
              <span>支付方式</span>
              <p>在线支付</p>
            </div>
          </div>
          <div class="orderContent">
            <h2 class="miniLine">{{getShopName.name}}<span v-if="getShopName.nameAddress">{{getShopName.nameAddress}}</span></h2>
            <div v-show="getRst" class="foodList">
              <ul>
                <li v-for="(food,index) in cartFoods" :foodIndex="index" class="miniLine">
                  <div class="left">
                    <span>
                      <img :src="getImagePath({image_hash:food.image_path,suffix:'imageMogr/format/webp/thumbnail/!72x72r/gravity/Center/crop/72x72/'})" />
                    </span>
                    <span class="name ellipsis">{{food.name}}</span>
                  </div>
                  <div class="right">
                    <span class="num">×{{food.cartNumber}}</span>
                    <div>
                      <span class="oriPrice" v-if="food.specfoods[0].original_price">￥<del>{{getOneTypePrice(true,food)}}</del></span>
                      <span class="price">{{getOneTypePrice(false,food)}}</span>
                    </div>
                  </div>
                </li>
                <li class="delivery miniLine">
                  <p>
                    <span class="ico">
                      商家
                    </span>
                    <span>配送费</span>
                  </p>
                  <span>{{getRst.float_delivery_fee || '1'}}</span>
                </li>
                <li v-if="$route.params.manjian" class="manjian miniLine">
                  <p>
                    <span class="ico">
                      满减
                    </span>
                    <span>店铺满减优惠</span>
                  </p>
                  <span>{{$route.params.manjian || '0'}}</span>
                </li>
                <li class="redpack">
                  <span>红包</span>
                  <p>
                    <span>
                      <!--<svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-hongbao"></use>
                    </svg>-->
                    <span class="iconfont icon-hongbao"></span>
                      0个可用
                    </span>
                    <span class="iconfont icon-jiantou"></span>
                  </p>
                </li>
              </ul>
              <div class="discount">
                <p><span>优惠说明</span></p>
                <p>
                  <small>小计</small>
                  <span>{{$store.state.payMoney}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="orderRemark">
            <ul>
              <li class="miniLine">
                <p class="cover">
                  <span>餐具份数</span>
                  <span v-show="cover_num===-1">
                    <img src="data:image/png;base64,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"/>
                    <span>马上助力环保</span>
                  </span>
                </p>
                <p class="cover_text" @click="coverSelectShow=true">
                  <img v-if="cover_num===0" src="data:image/png;base64,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"/>
                  <span :class="{selected:cover_num!==-1}" >{{cover_num===-1?'未选择':(cover_num===0?'无需餐具':((cover_num!==11?cover_num:'10份以上')+'份餐具'))}}</span>
                  <span class="iconfont icon-jiantou"></span>
                </p>
              </li>
              <li class="miniLine">
                <p><span>订单备注</span></p>
                <p class="note" @click="noteShow = true">
                  <span :class="{selected:get_note_text(),ellipsis:true}">
                    {{get_note_text()?get_note_text():'口味、偏好'}}
                  </span>
                  <span class="iconfont icon-jiantou"></span>
                </p>
              </li>
              <li class="miniLine">
                <p><span>发票信息</span></p>
                <p>
                  该店不支持线上开票，请电话联系商户
                </p>
              </li>
            </ul>
            <div class="phonePro">
              <p><span>号码保护</span></p>
              <p><span>号码保护中，将对商家、骑手隐藏您的真实手机号</span></p>
            </div>
          </div>
          <div class="footer">
            <div class="left">
              <span>
                {{$store.state.payMoney}}
              </span>
              <span v-show="$route.params.manjian>0">
                已优惠￥{{$route.params.manjian}}
              </span>
            </div>
            <div @click="goPay()" class="right">
              <p>去支付</p>
            </div>
          </div>
        </div>
        <transition name="bounce">
          <div v-show="coverSelectShow" class="coverSelect">
            <div class="header">
              <h2><span>餐具份数</span></h2>
            </div>
            <div class="cover_list">
              <ul>
                <li @click="cover_num_click(0)" class="no_cover">
                  <p>
                    <img src="data:image/png;base64,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"/>
                    <span>无需餐具</span>
                  </p>
                </li>
                <li v-for="(num,index) in range_10" :num="index" @click="cover_num_click(index+1)">{{num}}</li>
                <li @click="cover_num_click(11)">10份以上</li>
              </ul>
            </div>
            <span class="close" @click="coverSelectShow=false">×</span>
          </div>
        </transition>
        <div class="mask" v-show="coverSelectShow" @click="coverSelectShow=false"></div>
      </div>
      <OrderNote ref="note" v-show="noteShow"></OrderNote>
    </section>
</template>

<script>
  import {MessageBox,Toast} from 'mint-ui';
  import {getImagePath,formateMoney} from "../../utils/getImagePath";
  import Backtop from '../../components/Headertop/Backtop'
  import OrderNote from '../../components/OrderNote/OrderNote'
  import {mapState,mapGetters} from 'vuex'
    export default {
      name: "payMoney",
      data(){
        return {
          maskShow:true,
          coverSelectShow:false,
          range_10:[1,2,3,4,5,6,7,8,9,10],
          cover_num:-1,
          noteShow:false,
          listTip:{},//存储点击效果
        }
      },
      components:{
        Backtop,
        OrderNote,
      },
      computed:{
        ...mapState({cartFoods:'cartFoods',payMoney:'payMoney',user:'user',deliveryAddress:"deliveryAddress"}),
        ...mapGetters({selectedSettleAddress:"getSelectedSettleAddress"}),
        getRst(){
          return this.$store.state.foodsShop.rst || ''
        },
        getShopName(){
          //获取店铺名称
          let conName = (this.getRst && this.getRst.name) || "abc(123）"
          let name=''
          let nameAddress = ''
          if(/.+\(.+）$/.test(conName)){
            let index = conName.indexOf('(')
            name =  conName.substring(0,index)
            nameAddress = conName.substring(index)
          }else{
            name = conName
          }
          return {name,nameAddress}
        },
        getLeadTime(){
          //计算送达时间
          let date = new Date()
          let hour = date.getHours()
          let minute = date.getMinutes()
          let order = (this.getRst && this.getRst.order_lead_time) || 0
          if(minute+order>=60){
            hour = (hour+1)===24?0:(hour+1)
            minute = (minute+order)-60
          }else{
            minute += order
          }
          minute = minute>=10?minute:('0'+minute)
          return hour+":"+minute
        },
        gender(){
          if(this.selectedSettleAddress){
            const genderVal = this.selectedSettleAddress.baseInfo.gender;
            return [genderVal!==-1,genderVal===0?"先生":"女士"]
          }
        }
      },
      created(){
        //this.getAllAddress();
      },
      mounted(){
        setTimeout(()=>{
          if(this.payMoney<0.1 || !this.user.phone){
            this.alertInfo('订单异常!!!')
          }
        },500)
      },
      methods:{
        alertInfo(text='店铺不存在！！！'){ //弹出框
          MessageBox.alert(text)
            .then(action => {
                this.$router.replace('/')
            })
          },
        cover_num_click(index){
          this.cover_num = index
          this.coverSelectShow = false
        },
        get_note_text(){
            return  this.$refs.note?this.$refs.note.getWholeNote:''
        },
        backClick(){
          if(this.noteShow){
            this.noteShow = false
          }else{
            this.$router.back()
          }
        },
        getImagePath(info) {
          return getImagePath(info)
        },
        getOneTypePrice(ori,food){ //获取一种食品的价格
          let price = 0
          if(food.specfoods.length>1){
            if(ori) {//原价
              price = food.specfoods[food.spec].original_price
            }else{
              price = food.specfoods[food.spec].price
            }
          }else{
            if(ori) {//原价
              price = food.specfoods[0].original_price
            }else{
              price = food.lowest_price
            }
          }
          return formateMoney(food.cartNumber*price)
        },
        clearCartFoods(){ //清空购物车
          this.$store.dispatch('clearCartFoods')
        },
        goPay(){
          if(!this.selectedSettleAddress){
            Toast({
              message: '请选择配送地址',
              position: 'middle',
              duration: 1500
            });
          }else{
            this.$router.push({name:'payOnline',params:{totalPrice:this.payMoney}})
          }
        },
        selectDeliveryAddress(){
          //this.$router.push('/personInfo/deliveryAddress');
          this.$router.push({path:'/personInfo/deliveryAddress',query:{editNotShow:'1'}});
        },
        getAllAddress(){
          if(this.deliveryAddress.status===1){  //未获取地址，获取地址
            this.$store.dispatch("receiveDeliveryAddress")
          }
        }
      },
      beforeDestroy(){
        //this.$store.dispatch('payMoney',0)
      }
    }
</script>
<style scoped>
  .orderTop{
    padding: 1rem .5rem 1rem 1rem;
  }
  .gra{
    background-image: linear-gradient(0deg, #f5f5f5, #f5f5f5 65%,hsla(0,0%,96%,.3) 75%,hsla(0,0%,96%,0)),linear-gradient(270deg,#02a774,#46a774)
  }
  .orderTop span{
    color: hsla(0,0%,100%,.8);
    font-size: .8rem;
  }
  .notSelectAddress{
    padding: 10px 0 10px 30px;
  }
  .address{
    display: flex;
    justify-content: space-between;
    height: 2rem;
    align-items: center;
    color: #fff;
  }
  .address p{
    font-size: 1.25rem;
    font-weight: bold;
  }
  .address span{
    font-size: .75rem;
    position: relative;
    top: 3px;
  }
  .peo_info{
    color: #fff;
    font-size: .8rem;
  }
  .con{
    padding: 0 .5rem 55px;
  }
  .peisong{
    background-color: #fff;
    color: #333;
    font-size: .9rem;
    padding: 0 .8rem;
    margin-bottom: .5rem;
  }
  .peisong>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .85rem 0;
  }
  .peisong .icon-jiantou{
    color: #999;
    font-size: .75rem;
  }
  .peisong p{
    color: #02a774;
    font-size: .85rem;
  }
  .orderContent{
    background-color: #fff;
    padding: 0 .85rem;
    margin-bottom: 1rem;
  }
  .orderContent h2{
    padding: 1rem 0;
    font-size: 1rem;
    line-height: 1rem;
  }
  .orderContent h2 span{
    color: #333;
    font-weight: lighter;
    font-size: .8rem;
    vertical-align: middle;
    margin-left: 5px;
  }
  .foodList li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .7rem;
  }
  li .left{
    display: flex;
    width: 60%;
    font-size: .85rem;
    align-items: center;
  }
  li .left span:first-child{
    width: 25%;
    margin-right: 5px;
    min-width: 35px;
    max-width: 60px;
  }
  li .name{
    width: 65%;
  }
  .left img{
    width: 100%;
    max-width: 100px;
  }
  li .right{
    display: flex;
    justify-content: space-between;
    width: 40%;
    color: #333;
    align-items: center;
  }
  li .oriPrice{
    font-size: .7rem;
    color: #bbb;
    margin-right: .5rem;
    letter-spacing: -1px;
  }
  .oriPrice del{
    font-size: .9rem;
  }
  li .price:before {
    content: '￥';
    font-size: .7rem;
    margin-right: -2px;
  }
  li .price{
    font-size: 1rem;
    letter-spacing: -1px;
  }
  .foodList .delivery,.foodList .redpack,.manjian{
    padding: 1rem .7rem;
  }
  .delivery p,.manjian p{
    display: flex;
    align-items: center;
  }
  .delivery .ico,.manjian .ico{
    background-color: #60acf4;
    padding: 1px 2px 0;
    color: white;
    font-size: .65rem;
    margin-right: .7rem;
  }
  .manjian .ico{
    background-color:rgb(240, 115, 115)
  }
  .delivery p span:last-child,.manjian p span:last-child{
    font-size: .92rem;
    color: #333;
  }
  .delivery>span:last-child,.manjian>span:last-child{
    font-size: 1rem;
  }
  .manjian>span:last-child{
    color: #ff4a07;
  }
  .delivery>span:last-child:before,.manjian>span:last-child:before{
    content: '￥';
    font-size: .7rem;
  }
  .manjian>span:last-child:before{
    content: '-￥';
  }
  .redpack{
    background: url(//fuss10.elemecdn.com/6/7b/d359e03c69adf1674c4e09fda1233svg.svg) repeat-x 0 100%;
    background-size: 4px;
  }
  .redpack>span{
    font-size: .92rem;
  }

  .redpack p > span:first-child {
    background-image: linear-gradient(106deg,#ff7417,#ff3c15);
    padding:2px 4px;
    color: white;
    margin-right: 5px;
  }
  .redpack .icon-jiantou{
    color: #bbb;
    font-size: .7rem;
    font-weight: bold;
  }

  .redpack .icon-hongbao {
    color: #fff;
    font-size: .75rem;
  }
  .discount{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0.7rem;
    color: #333;
    font-size: 1.4rem;
  }
  .discount p:first-child{
    color: #aaa;
    font-size: .85rem;
  }
  .discount p small{
    font-size: .9rem;
    margin-right: -5px;
    letter-spacing: -1px;
  }
  .discount p:last-child span:before{
    content: '￥';
    font-size: .8rem;
  }
  .orderRemark{
    background-color: #fff;

  }
  .orderRemark li{
    display: flex;
    justify-content: space-between;
    font-size: .8rem;
    align-items: center;
    padding: .7rem 1.25rem;
    line-height: 1.5rem;
  }
  .orderRemark li p:first-child,.phonePro{
    display: flex;
    flex-direction: column;
  }
  .cover>span:last-child{
    color: #0bb473;
    font-size: .7rem;
    display: flex;
    align-items: center;
    height: 1rem;
    margin-top: 5px;
  }
  .cover img{
    height: 100%;
    margin-right: 5px;
  }
  .cover_text img{
    width: 1rem;
    margin-right: 3px;
    vertical-align: middle;
  }
  .orderRemark .selected{
    color: #333;
  }
  .orderRemark li p:last-child{
    color: #999;
    font-size: .75rem;
  }
  .orderRemark .iconfont{
    font-size: .75rem;
    margin-left: 5px;
    font-weight: bold;
  }
  .note{
    width: 70%;
    display: flex;
    justify-content: flex-end;
  }
  .note span:first-child{
    display: inline-block;
    max-width: 80%;
  }
  .phonePro{
    padding: 1rem 1.25rem;
    font-size: 1rem;
    color: #333;
  }
  .phonePro p:last-child{
    font-size: .65rem;
    color: #888;
    margin-top: .5rem;
  }
  .footer{
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    height: 45px;
    background-color: #3c3c3c;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer .left{
    width: 70%;
    font-size: 1.15rem;
    padding-left: .7rem;
    display: flex;
    align-items: center;
  }
  .footer .left span:first-child{
    letter-spacing: -1px;
    margin-right: 10px;
  }
  .footer .left span:first-child:before{
    content: '￥';
    margin-right: -7px;
  }
  .footer .left span:last-child{
    font-size: .7rem;
    color: #999;
  }
  .footer .left span:last-child:before{
    content: '|';
    position: relative;
    top: -1px;
  }
  .footer .right{
    height: 100%;
    width: 30%;
    background-color: #00e067;
    display: flex;
    align-items: center;
    font-size: 1.05rem;
    justify-content: center;
  }
  .coverSelect{
    height: 55%;
    width: 100%;
    background-color: #f5f5f5;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 3;
  }
  .coverSelect .close{
    position: absolute;
    right: .1rem;
    top: .1rem;
    font-size: 2.5rem;
    color: #666;
    width: 3rem;
    height: 3rem;
    text-align: center;
  }
  .coverSelect .header{
    padding:1.25rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .coverSelect h2{
    color: #333;
    font-size: 1rem;
    background: linear-gradient(90deg,#666,#666) no-repeat 0 50%;
    background-size:100% 2px;
    width: 35%;
    text-align: center;
  }
  .coverSelect h2 span{
    display: inline-block;
    background: #f5f5f5;
    width: 70%;
  }
  .cover_list{
    height: 80%;
    overflow-y: auto;
  }
  .coverSelect li{
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
    font-size: 1rem;
  }
  .cover_list .no_cover{

  }
  .no_cover p{
    height: 1.5rem;
    display: flex;
    align-items: center;
  }
  .no_cover img{
    height: 70%;
    margin-right: 5px;
  }

  .mask{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom:0;
    background-color: rgba(0,0,0,.4);
  }
  /*动画*/
  .bounce-enter{
    height: 0;
  }
  .bounce-enter-active{
    transition: height .2s;
  }
</style>

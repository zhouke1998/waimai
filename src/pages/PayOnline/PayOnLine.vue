<template>
    <section v-if="$route.params.totalPrice">
      <HeaderTop title="在线支付" ></HeaderTop>
      <div class="top">
        <div class="time miniLine">
          <span>支付剩余时间</span>
          <p>
            <time class="hour">00</time>:
            <time class="hour">{{minute}}</time>:
            <time class="hour">{{second}}</time>
          </p>
        </div>
        <div class="foodInfo">
          <p class="ellipsis">{{foodsName.name}}<span class="tip" v-if="foodsName.tip">{{foodsName.tip}}</span></p>
          <div>
          <span>详情</span>
          <span>￥{{$route.params.totalPrice}}</span>
          </div>
        </div>
      </div>
      <div class="pay_way">
        <p>其它支付</p>
        <ul>
          <li @click="payWay='pay'" class="miniLine">
            <p>
              <img src="/static/imgs/payOnline/pay.jpg" />
              <span>支付宝</span>
            </p>
            <span :class="{ico:true,yes_ico:payWay==='pay'}"></span>
          </li>
          <li  @click="payWay='wechat'">
            <p>
              <img src="/static/imgs/payOnline/wechat.jpg" />
              <span>微信支付</span>
            </p>
            <span :class="{ico:true,yes_ico:payWay==='wechat'}"></span>
          </li>
        </ul>
        <div @click="payment" class="btn">
          <p :class="{nopay:payWay!=='pay'}">
            确认支付
          </p>
        </div>
      </div>
    </section>
</template>

<script>
  import HeaderTop from '../../components/Headertop/HeaderTop'
  import {MessageBox} from 'mint-ui';
  import {getALiPayUrl} from '../../api'
    export default {
      name: "PayOnLine",
      data(){
        return{
          payWay:'pay',
          minute:0,//计时效果的分钟
          second:0,//计时效果的秒
        }
      },
      computed:{
        foodsName(){
          let cartFoods = this.$store.state.cartFoods;
          if(!cartFoods){
            return "";
          }
          let name = cartFoods[0].name;
          const length = cartFoods.length;
          let tip = "";
          if(length>1){
            tip = `等${length}件商品`
          }
          let subject = name+tip;
          return {name,tip,subject};
        }
      },
      components:{
        HeaderTop
      },
      mounted(){
        if(this.init()){
          this.countdown()
        }
      },
      methods:{
        payment(){
          if(!this.init()){
            return
          }
          if(this.payWay!=='pay') {
            MessageBox.confirm('暂时不支持此支付方式')
              .then(() => {
                //this.$router.replace('/')
              })
              .catch(action => {
              });
          }else{
            getALiPayUrl({
              subject:this.foodsName.subject,
              outTradeNo:"123132132",
              totalAmount:this.$store.getters.getTotalPrice
            }).then((data)=>{
              if(data.status!==0){
                MessageBox.confirm(data.msg)
              }else{
                window.location.href=data.url; 
              }
            })
          }
        },
        countdown() {
          let future = 60 * 15+1
          let countdown = setInterval(() => {
            future--
            this.minute = Math.floor(future / 60)
            this.second = Math.floor(future % 60)
            if(this.minute===0 && this.second<1){
              clearInterval(countdown)
              this.$router.push('/')
            }
          }, 1000)
        },
        alertInfo(text='店铺不存在！！！'){ //弹出框
          MessageBox.alert(text)
            .then(action => {
              this.$router.replace('/')
            })
        },
        init(){
          if(!this.$route.params.totalPrice || !this.$store.getters.getTotalPrice){
            this.alertInfo('支付异常！')
            return false
          }
          return true
        }
      }
    }
</script>

<style scoped>
  section{
    background-color: #f5f5f5;
  }
  .top{
    padding: 0 .7rem;
    background-color: #fff;
  }
  .time{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    color: #333;
    font-size: 1.5rem;
  }
  .time span{
    font-size: .75rem;
    color: #999;
    margin-bottom: .5rem;
  }
  .time p time{
    margin-right: 5px;
  }
  .foodInfo{
    display: flex;
    justify-content: space-between;
    padding: .7rem 0;
    align-items: center;
    font-size: 1.1rem;
    color: #888;
  }
  .foodInfo .tip{
    font-size: .65rem;
    color: #999;
  }
  .foodInfo>p{
    max-width: 60%;
    color: #444;
  }
  .foodInfo div{
    display: flex;
    justify-content: space-between;
    width: 35%;
    align-items: center;
  }
  .foodInfo div span:first-child{
    font-size: 1rem;
  }
  .foodInfo div span:last-child{
    font-size: .9rem;
    color: orangered;
    font-weight: bold;
  }
  .pay_way{
    color: #333;
    font-size: 1rem;
  }
  .pay_way>p{
    color: #777;
    font-size: .8rem;
    padding: .7rem;
  }
  .pay_way ul{
    background-color: #fff;
    padding-left: 1rem;
  }
  .pay_way li{
    display: flex;
    justify-content: space-between;
    padding: .7rem 1rem .7rem 0;
    align-items: center;
  }
  .pay_way li img{
    width: 2rem;
    margin-right: 1rem;
  }
  .pay_way li>p{
    display: flex;
    align-items: center;
  }
  .pay_way .ico{
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    background-size: cover;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMzRweCIgaGVpZ2h0PSIzNXB4IiB2aWV3Qm94PSIwIDAgMzQgMzUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+T3ZhbCAyIENvcHkgNDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJ2MC40IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSIxLTEtSDVf5re35ZCI5pSv5LuYX+S9memineS4ujAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02ODcuMDAwMDAwLCAtOTA1LjAwMDAwMCkiIGZpbGw9IiNFQ0VDRUMiPiAgICAgICAgICAgIDxnIGlkPSLnrKzkuInmlrnmlK/ku5giIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xLjAwMDAwMCwgNzA2LjA4MjAzMSkiPiAgICAgICAgICAgICAgICA8ZyBpZD0icXHpkrHljIUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCAxNjYuMDAwMDAwKSI+ICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNzE5LjE1ODI2Nyw0Mi4yOTYwNzk1IEM3MjAuMzM1OTgyLDQ0LjYwODc0ODkgNzIxLDQ3LjIyNjgyOTYgNzIxLDUwIEM3MjEsNTkuMzg4ODQwNyA3MTMuMzg4ODQxLDY3IDcwNCw2NyBDNjk0LjYxMTE1OSw2NyA2ODcsNTkuMzg4ODQwNyA2ODcsNTAgQzY4Nyw0MC42MTExNTkzIDY5NC42MTExNTksMzMgNzA0LDMzIEM3MDkuMTY1NzA4LDMzIDcxMy43OTMyODMsMzUuMzA0MDIxNiA3MTYuOTExMTM5LDM4Ljk0MDQ3OSBMNzAyLjIwMzk5Nyw1My4wMTAxMTg1IEw2OTYuOTk5NzIzLDQ3LjgwNTg0NDcgTDY5NC4xOTAxMiw1MC42MTU0NDc2IEw3MDIuMjAzOTk3LDU4LjYyOTMyNDUgTDcxOS4xNTgyNjcsNDIuMjk2MDc5NSBaIiBpZD0iT3ZhbC0yLUNvcHktNCI+PC9wYXRoPiAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgPC9nPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+");
  }
  .pay_way .no_ico{
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMzRweCIgaGVpZ2h0PSIzNXB4IiB2aWV3Qm94PSIwIDAgMzQgMzUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+T3ZhbCAyIENvcHkgNDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJ2MC40IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSIxLTEtSDVf5re35ZCI5pSv5LuYX+S9memineS4ujAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02ODcuMDAwMDAwLCAtOTA1LjAwMDAwMCkiIGZpbGw9IiNFQ0VDRUMiPiAgICAgICAgICAgIDxnIGlkPSLnrKzkuInmlrnmlK/ku5giIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xLjAwMDAwMCwgNzA2LjA4MjAzMSkiPiAgICAgICAgICAgICAgICA8ZyBpZD0icXHpkrHljIUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCAxNjYuMDAwMDAwKSI+ICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNzE5LjE1ODI2Nyw0Mi4yOTYwNzk1IEM3MjAuMzM1OTgyLDQ0LjYwODc0ODkgNzIxLDQ3LjIyNjgyOTYgNzIxLDUwIEM3MjEsNTkuMzg4ODQwNyA3MTMuMzg4ODQxLDY3IDcwNCw2NyBDNjk0LjYxMTE1OSw2NyA2ODcsNTkuMzg4ODQwNyA2ODcsNTAgQzY4Nyw0MC42MTExNTkzIDY5NC42MTExNTksMzMgNzA0LDMzIEM3MDkuMTY1NzA4LDMzIDcxMy43OTMyODMsMzUuMzA0MDIxNiA3MTYuOTExMTM5LDM4Ljk0MDQ3OSBMNzAyLjIwMzk5Nyw1My4wMTAxMTg1IEw2OTYuOTk5NzIzLDQ3LjgwNTg0NDcgTDY5NC4xOTAxMiw1MC42MTU0NDc2IEw3MDIuMjAzOTk3LDU4LjYyOTMyNDUgTDcxOS4xNTgyNjcsNDIuMjk2MDc5NSBaIiBpZD0iT3ZhbC0yLUNvcHktNCI+PC9wYXRoPiAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgPC9nPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+");
  }
  .pay_way .yes_ico{
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMzRweCIgaGVpZ2h0PSIzNXB4IiB2aWV3Qm94PSIwIDAgMzQgMzUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+T3ZhbCAyIENvcHkgMjwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJ2MC40IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSIxLTEtSDVf5re35ZCI5pSv5LuYX+S9memineS4ujAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02ODcuMDAwMDAwLCAtODA1LjAwMDAwMCkiIGZpbGw9IiM0REQ5NjYiPiAgICAgICAgICAgIDxnIGlkPSLnrKzkuInmlrnmlK/ku5giIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xLjAwMDAwMCwgNzA2LjA4MjAzMSkiPiAgICAgICAgICAgICAgICA8ZyBpZD0i5b6u5L+hIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjAwMDAwMCwgNjYuMDAwMDAwKSI+ICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNzE5LjE1ODI2Nyw0Mi4yOTYwNzk1IEM3MjAuMzM1OTgyLDQ0LjYwODc0ODkgNzIxLDQ3LjIyNjgyOTYgNzIxLDUwIEM3MjEsNTkuMzg4ODQwNyA3MTMuMzg4ODQxLDY3IDcwNCw2NyBDNjk0LjYxMTE1OSw2NyA2ODcsNTkuMzg4ODQwNyA2ODcsNTAgQzY4Nyw0MC42MTExNTkzIDY5NC42MTExNTksMzMgNzA0LDMzIEM3MDkuMTY1NzA4LDMzIDcxMy43OTMyODMsMzUuMzA0MDIxNiA3MTYuOTExMTM5LDM4Ljk0MDQ3OSBMNzAyLjIwMzk5Nyw1My4wMTAxMTg1IEw2OTYuOTk5NzIzLDQ3LjgwNTg0NDcgTDY5NC4xOTAxMiw1MC42MTU0NDc2IEw3MDIuMjAzOTk3LDU4LjYyOTMyNDUgTDcxOS4xNTgyNjcsNDIuMjk2MDc5NSBaIiBpZD0iT3ZhbC0yLUNvcHktMiI+PC9wYXRoPiAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgPC9nPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+");
  }
  .btn{
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    padding:0 1rem;
  }
  .btn p{
    height: 45px;
    background-color: #00e067;
    width: 100%;
    font-size: .95rem;
    color: #fff;
    text-align: center;
    line-height: 45px;
    border-radius: 3px;
  }
  .btn .nopay{
    background-color: #cccccc;
  }
</style>

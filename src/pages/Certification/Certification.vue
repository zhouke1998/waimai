<template>
    <section>
      <Backtop router_back="true" title="营业资质"></Backtop>
      <div v-if="certification.city_id" class="wrap">
        <div class="content">
          <div class="miniLine">
            <h2>食品安全监督公示</h2>
          </div>
          <div class="check miniLine">
            <span>
              <img :src="getImagePath({image_hash:certification.last_check_image_hash,suffix:'imageMogr/format/webp/'})" />
            </span>
            <span>
              检查结果:&nbsp;{{certification.last_check_result}}
            </span>
          </div>
          <div class="info">
            <ul>
              <li class="miniLine">
                <span>单位名称</span>
                <p>{{certification.corp_name}}</p>
              </li>
              <li class="miniLine">
                <span>经营地址</span>
                <p>{{certification.license_location}}</p>
              </li>
              <li class="miniLine">
                <span>法定代表人:</span>
                <p>{{certification.license_legal_person}}</p>
              </li>
              <li class="miniLine">
                <span>许可证号</span>
                <p>{{certification.restaurant_service_licence_no}}</p>
              </li>
              <li class="miniLine">
                <span>经营范围</span>
                <p>{{certification.service_license_business_scope}}</p>
              </li>
              <li>
                <span>有效期</span>
                <p>{{certification.service_license_expire_date}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="zizhi">
          <h2 class="miniLine">商家从业资质</h2>
          <div>
            <p v-for="image in certification.images" class="border_mini">
              <img :src="getImagePath({image_hash: image,suffix: '/imageMogr/format/webp/thumbnail/300x/'}).replace('?','')" />
            </p>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
  import Backtop from '../../components/Headertop/Backtop'
  import {getCertification} from "../../api";
  import {getImagePath,getUrlParams} from "../../utils/getImagePath";
    export default {
      name: "Certification",
      data(){
        return{
          url_id:'',
          certification:{},
        }
      },
      components:{
        Backtop,
      },
      mounted(){
        setTimeout(()=>{
          this.url_id = getUrlParams('id');
          if(!this.url_id){
            this.alertInfo()
          }else{
            this._getCertification(this.url_id)
          }
        },500)
      },
      methods: {
        alertInfo(text = '店铺不存在！！！') { //弹出框
          this.$alert("提示", {
            title: '提示',
            confirmButtonText: '确定',
            type: 'warning',
            center: true,
            message: text,
            showClose: false,
            callback: action => {
              this.$router.replace('/home')
            }
          })
        },
        getImagePath(info){
          return getImagePath(info)
        },
        async _getCertification(restaurant_id){
          let id = restaurant_id
          let certification = await getCertification(id)
          if(certification.certification){
            this.certification = certification.certification
          }else{
            this.alertInfo('不存在！')
          }
        },
      }
    }
</script>

<style scoped>
  .wrap{
    padding: .5rem;
    background-color: #f5f5f5;
  }
  .content,.zizhi{
    padding:0 0 .7rem 0.7rem;
    background-color: #ffffff;
    color: #888;
    margin-bottom: .5rem;
  }
  .content h2,.zizhi h2{
    height: 3rem;
    line-height: 3rem;
    font-size: .9rem;
    color: #000;
  }
  .check{
    padding: 1rem;
    display: flex;
    align-items: center;
  }
  .check span:first-child{
    width: 15%;
    margin-right: 2rem;
  }
  .check span:last-child{
    font-size: .9rem;
  }
  .check img{
    width: 100%;
  }
  .info li{
    display: flex;
    padding: .5rem 0;
    font-size: .85rem;
  }
  .info li span{
    white-space: nowrap;
    min-width: 25%;
  }
  .info li p{
    max-width: 75%;
  }
  .zizhi{
    margin-bottom: 0;
  }
  .zizhi>div{
    display: flex;
    margin-top: 1rem;
  }
  .zizhi p{
    width: 45%;
    padding: 5%;
    margin-right: 2%;
    box-sizing: border-box;
  }
  .zizhi p img{
    width: 100%;
  }
  .border_mini{
    position: relative;
  }
  .border_mini:before{
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 400%;
    height: 400%;
    transform-origin: 0 0;
    border: 1px solid #ddd;
    transform: scale(.25,.25);
  }
</style>

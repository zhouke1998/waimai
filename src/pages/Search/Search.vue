<template>
    <section>
      <HeaderTop title="搜索"></HeaderTop>
      <div class="content">
        <div class="search">
          <input class="key" type="text"/>
          <a class="sub">提交</a>
        </div>
        <div class="result">
          <ul>
            <li>
              <a>
                <div>
                  <i class="img"><img src="./img/波克派.png" /></i>
                  <div class="info">
                    <h3 class="title ellipsis">波客派炸鸡汉堡(龙岗南联店)</h3>
                    <p class="xiaoshou ellipsis">
                      <span>月售666单</span>
                    </p>
                    <p class="peisong ellipsis">
                      <span class="qisong">￥35起送</span>/
                      <span class="distance">距离1.6公里</span>
                    </p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a>
                <div>
                  <i class="img"><img src="./img/木屋烧烤.jpeg" /></i>
                  <div class="info">
                    <h3 class="title ellipsis">木屋烧烤(南联店)</h3>
                    <p class="xiaoshou ellipsis">
                      <span>月售207单</span>
                    </p>
                    <p class="peisong ellipsis">
                      <span class="qisong">￥73起送</span>/
                      <span class="distance">距离2.2公里</span>
                    </p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a>
                <div>
                  <i class="img"><img src="./img/杨杨云家粥铺.jpeg" /></i>
                  <div class="info">
                    <h3 class="title ellipsis">杨杨云家粥铺</h3>
                    <p class="xiaoshou ellipsis">
                      <span>月售39单</span>
                    </p>
                    <p class="peisong ellipsis">
                      <span class="qisong">￥20起送</span>/
                      <span class="distance">距离1.8公里</span>
                    </p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a>
                <div>
                  <i class="img"><img src="./img/堕落小龙虾.jpeg" /></i>
                  <div class="info">
                    <h3 class="title ellipsis">堕落小龙虾(海鲜·吉祥店)</h3>
                    <p class="xiaoshou ellipsis">
                      <span>月售106单</span>
                    </p>
                    <p class="peisong ellipsis">
                      <span class="qisong">￥20起送</span>/
                      <span class="distance">距离666公里</span>
                    </p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a>
                <div>
                  <i class="img"><img src="./img/黄焖鸡.jpeg" /></i>
                  <div class="info">
                    <h3 class="title ellipsis">杨铭宇黄焖鸡米饭</h3>
                    <p class="xiaoshou ellipsis">
                      <span>月售106单</span>
                    </p>
                    <p class="peisong ellipsis">
                      <span class="qisong">￥20起送</span>/
                      <span class="distance">距离666公里</span>
                    </p>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
</template>

<script>
  import HeaderTop from "../../components/Headertop/HeaderTop";
  export default {
    components: {HeaderTop}
  }
</script>

<style scoped>
  section{
    background-color:#FBFBFb;
    overflow: hidden;
  }

  .search{
    padding: 15px;
    zoom: 1;
    /*** border-bottom: 1px solid #ddd; **/
  }
  .search:after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0
  }
  .search .key{
    float: left;
    width: 70%;
    outline: none;
    background-color: #eee;
    padding: 0px 10px;
    border: none;
    border-radius: 5px;
    line-height: 30px;
    height: 35px;
    box-sizing: border-box;
    font-size: 1rem;
  }
  .search .sub{
    float: right;
    width: 25%;
    display: inline-block;
    height: 35px;
    background: #02a774;
    max-width: 200px;
    min-width: 80px;
    font-size: 1rem;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
    line-height: 35px;
  }
  .content{
    height: 100%;
  }
  .result{
    width: 100%;
    height: 100%;
    padding-bottom: 170px;
    overflow: scroll;
    box-sizing: border-box;
  }
  .result ul{
    overflow: hidden;
    zoom: 1;
  }
  .result li{
    height: 80px;
    padding: 15px;
  }
  .result li>a{
    display: inline-block;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #bbb;
    box-sizing: border-box;
    padding-top: 10px;
  }
  .result .img img{
    width: 60px;
    height: 60px;

  }
  .result .img{
    float: left;
  }
  .result .info{
    margin-left: 15px;
    float: left;
    width: 60%;
    max-width: 200px;
  }
  .shops a>div{
    float: left;
    height: 100%;
    display: inline-block;
    width: 70%;
    box-sizing: border-box;
  }
  .result h3{
    line-height: 25px;
  }
  .result .xiaoshou{
    height: 20px;
  }
  .result .xiaoshou span{
    font-size: 0.9rem;
    color: #333;
    letter-spacing: 1px;
  }
  .result .peisong{
    height: 20px;
  }
  .result .peisong span{
    font-size: 0.9rem;
    color: #333;
    margin: 3px;
  }
</style>

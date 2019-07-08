<template>
    <section class="ratingTop">
      <div class="c1">
        <span>{{calScore(ratingTop.overall_score)}}</span>
      </div>
      <div class="c2">
        <p>商家评分</p>
        <Star :size="Number(24)" :rating="Number(calScore(ratingTop.shop_score))"></Star>
      </div>
      <div class="c3">
        <p>味道</p>
        <span>{{calScore(ratingTop.taste_score)}}</span>
      </div>
      <div class="c4">
        <p>包装</p>
        <span>{{calScore(ratingTop.package_score)}}</span>
      </div>
      <div class="c5">
        <p>配送</p>
        <span>{{calScore(ratingTop.rider_score)}}</span>
      </div>
    </section>
</template>

<script>
  import Star from '../../Star/Start'
    export default {
      name: "RatingTop",
      props:{
        ratingTop:Object,
      },
      components:{
        Star,
      },
      methods:{
        calScore(score){
          return Number(score).toFixed(1)
        }
      }
    }
</script>

<style scoped>
  .ratingTop{
    display: flex;
    padding: 1rem 0 1rem 1rem;
    box-sizing: border-box;
    height: 80px;
    background-color: #fff;
    margin-bottom: 1rem;
  }
  .c1,.c2,.c3,.c4,.c5{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
  }
  .ratingTop p,.ratingTop span{
    color: #666;
    font-size: .65rem;
    display: inline-block;
    letter-spacing: 1px;
  }
  .ratingTop span{
    font-size: 1.25rem;
  }
  .c1 span{
    font-size: 2.5rem;
    align-items: center;
    letter-spacing: -1px;
    color: #ff6000;
  }
  .c2,.c5{
    width: 25%;
  }
  .c2 span{
    font-size: .65rem;
  }
  .c3 p,.c4 p,.c5 p{
    margin-bottom: 5px;
  }
  .c4{
    border-right: .5px solid #eee;
  }
</style>

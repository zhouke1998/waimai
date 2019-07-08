<template>
  <span>
    <i v-for="(aClass,index) in classArray" :key="index" :class="aClass"></i>
  </span>
</template>

<script>
    export default {
      name: "Start",
      props:{
        size:Number,
        rating:Number,
      },
      computed:{
        classArray(){
          let {size,rating} = this
          const s0 = `star_${size}`
          const s0_1 = `star_${size} star0_1_${size}`
          const s1 = `star_${size} star1_${size}`
          let arr = []
          let ratingInt = parseInt(rating)
          for(let k=0;k<ratingInt;k++){
            arr.push(s1)
          }
          if(rating-ratingInt>=0.5){
            arr.push(s0_1)
          }
          for(let k=arr.length;k<5;k++){
            arr.push(s0)
          }
          //console.log(arr);
          return arr
        }
    }
    }
</script>

<style scoped>
  /*星星评价*/
  /*size = 24*/
  .star_24{
    display: inline-block;
    height: 9px;
    width: 10px;
    background-size: 10px 9px;
    background-image: url("./img/starts/star24_off@2x.png");
  }
  .star1_24{
    background-image: url("./img/starts/star24_on@2x.png");
  }
  .star0_1_24{
    background-image: url("./img/starts/star24_half@2x.png");
  }
  /*size=36*/
  .start_36{
    display: inline-block;
    height: 29px;
    width: 30px;
    background-size: 30px 29px;
    background-image: url("./img/starts/star36_off@2x.png");
  }
  .star1_36{
    background-image: url("./img/starts/star36_on@2x.png");
  }
  .star0_1_36{
    background-image: url("./img/starts/star36_half@2x.png");
  }
  /*size == 48*/
  .start_48{
    display: inline-block;
    height: 38px;
    width: 40px;
    background-size: 40px 38px;
    background-image: url("./img/starts/star48_off@2x.png");
  }
  .star1_48{
    background-image: url("./img/starts/star48_on@2x.png");
  }
  .star0_1_48{
    background-image: url("./img/starts/star48_half@2x.png");
  }
</style>

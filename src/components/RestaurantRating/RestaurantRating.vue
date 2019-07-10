<template>
    <section class="rating">
      <RatingTop :ratingTop="rating" v-if="isRatingShow && rating.shop_score"></RatingTop>
      <Comment  v-if="isRatingShow"></Comment>
    </section>
</template>

<script>
  import RatingTop from './RatingTop/RatingTop'
  import Comment from './Comment/Comment'
    export default {
    data(){
      return{
        rating:{}//
      }
    },
    props:{
      isRatingShow:Boolean,
    },
    mounted(){

    },
    computed:{
    },
    components:{
      RatingTop,
      Comment,
    }
  }
</script>

<style scoped>
.rating{
  background-color: #f5f5f5;
}
</style>

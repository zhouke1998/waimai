<template>
  <section class="rating_comment"><!--@touchmove="moveScreen"-->
      <div class="comment_type">
        <p v-for="(tag,index) in tags" @click="changeCommentType(index)" :class="{active_click:active_click===index,chaping:tag.unsatisfied,chaping_active:(active_click===index && tag.unsatisfied)}">
          <span>{{tag.name}}&nbsp;{{tag.count===-1?'':tag.count}}</span>
        </p>
      </div>
      <div class="comment_content">
        <div class="only_text">
          <p @click="only_text=!only_text,changeCommentType(0)" :class="{active:only_text}">
            <!--<svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-goucopy"></use>
            </svg>-->
            <span class="iconfont icon-goucopy icon"></span>
            <span>只看有内容的评价</span>
          </p>
        </div>
        <div class="comment_list">
          <ul v-infinite-scroll="loadMore"
              infinite-scroll-disabled="daodile"
              infinite-scroll-distance="30">
            <li v-for="(comment,index1) in comments" :comIndex="index1">
              <div class="content">
                <div class="head_photo">
                  <span v-if="!comment.avatar" :style="{backgroundPosition:getRandomHead()}"></span>
                  <img v-else :src="getImage(comment.avatar)" />
                </div>
                <div class="row1">
                  <span class="name">{{comment.username}}</span>
                  <span class="time">{{comment.rated_at}}</span>
                </div>
                <div class="row2">
                  <Start :size="Number(24)" :rating="Number(comment.rating)" ></Start>
                  <span class="rating_text" :style="{color:calRating_text(comment.rating)[1]}">{{calRating_text(comment.rating)[0]}}</span>
                </div>
                <div class="row3">
                  <p class="desc">{{comment.rating_text}}</p>
                  <div class="reply">
                    <p>
                      {{comment.reply.content}}
                    </p>
                  </div>
                </div>
                <div class="row_photo">
                  <img v-for="(image,index2) in comment.order_images" :large="getImage(image.image_hash,'imageMogr/format/webp/thumbnail/1080/')" :preview="index1":preview-text="image.food_names.join(',')" :src="getImage(image.image_hash,'imageMogr/format/webp/thumbnail/300x/')" />
                </div>
                <div class="row_last">
                  <i v-if="showDianzao(comment.food_ratings)">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-dianzan"></use>
                    </svg>
                  </i>
                  <span v-for="rate_name in comment.food_ratings" v-if="rate_name.rating>4" >{{rate_name.rate_name}} </span>
                </div>
              </div>
            </li>
          </ul>
          <p  style="text-align: center" v-show="daodile">已经到底了...</p>
        </div>
        <div v-if="isGettingComment" style="display: flex; justify-content: center">
          <mt-spinner color="#02a774" type="fading-circle"></mt-spinner>
        </div>
      </div>
    </section>
</template>

<script>
    import Start from "../../Star/Start";
    import {getComment} from "../../../api";
    import {getImagePath} from "../../../utils/getImagePath";
    export default {
      name: "Comment",
      data(){
        return{
          comments:[], //评论
          tags:[],//分类
          offset:0,
          limit:10,
          active_click:0,
          isGettingComment:false, //正在获取评论
          daodile:false,
          only_text: true,//只显示文字
        }
      },
      mounted(){
        this.getComments()
      },
      methods:{
        async getComments(firstQuery=true,offset=0,limit=10){
          this.isGettingComment = true
          const results = await getComment({firstQuery,offset,limit})
          if(results.comments && results.comments.length){
            if(firstQuery){
              this.tags = results.tags
              this.$parent.rating = results.rating
            }
            this.offset+=limit
            for(let comment of results.comments){
              this.comments.push(comment)
            }
          }else{
            this.daodile = true
          }
          this.isGettingComment = false
        },
        changeCommentType(index){
          this.active_click = index
          this.offset = 0
          this.comments = []
          this.daodile = false
          this.getComments()
        },
        getRandomHead(ori=40){
          const index = parseInt(Math.random()*6)
          return `0 ${-ori*index}px`
        },
        getImage(image_hash,suffix="imageMogr/format/webp/thumbnail/!86.4x86.4r/gravity/Center/crop/40x40/"){ //获取用户头像
          return getImagePath({image_hash,suffix})
        },
        calRating_text(rating){
          //通过rating计算text
          const temp = {
            1:['吐槽','rgb(137, 159, 188)'],
            2:['较差','rgb(137, 159, 188)'],
            3:['一般','rgb(251, 154, 11)'],
            4:['满意','rgb(251, 154, 11)'],
            5:['超赞','rgb(255, 96, 0)'],
          }
          return temp[rating]
        },
        showDianzao(foodArr){ //计算是否显示点赞按钮
          for(let foodRating of foodArr){
            if(foodRating.rating>4){
              return true
            }
          }
          return false
        },
        loadMore() {
          if (!this.isGettingComment && !this.daodile) {
            this.getComments(false, this.offset)
          }
        },
        /*moveScreen(){
          if(this.getScrollTop() && !this.isGettingComment && !this.daodile){
            this.getComments(false,this.offset)
          }
        },
        getScrollTop(){
          let scrollTop=0;
          let scrollHeight = 0
          if(document.documentElement&&document.documentElement.scrollTop){
            scrollTop=document.documentElement.scrollTop;
            scrollHeight = document.documentElement.scrollHeight
          }else if(document.body){
            scrollTop=document.body.scrollTop;
            scrollHeight = document.body.scrollHeight
          }
          return scrollHeight===0?false:scrollTop+screen.height+200>scrollHeight;
        }*/
      },
      components: {Start}
    }
</script>

<style scoped>
  .rating_comment{
    background-color: #fff;
  }
  .comment_type{
    padding: 1rem 0 0 1rem;
  }
  .comment_type p{
    display: inline-block;
    padding:5px 10px;
    color: #6d7885;
    background-color: #ebf5ff;
    margin-right: .7rem;
    margin-bottom: .7rem;
    border-radius: 2px;
  }
  .comment_type .active_click{
    color: #fff;
    background-color: #0097ff;
  }
  .comment_type .chaping{
    color: #aaa;
    background-color: #f5f5f5;
  }
  .comment_type .chaping_active{
    background-color: #ccc;
  }
  .comment_content{
    padding:0 .7rem;
  }
  .only_text{
    border-top: .005rem solid #eee;
    border-bottom: .005rem solid #ddd;
  }
  .only_text p{
    padding: .7rem 0;
    color: #666;
    padding-left: 1rem;
    font-size: .85rem;
  }

  .only_text .icon {
    font-size: .6rem;
    margin-right: 5px;
    vertical-align: middle;
  }

  .only_text .active .icon {
    color: #1cc089;
  }
  .comment_list li{
    overflow: hidden;
    padding-top: 1rem;
    border-bottom: 1px solid #eee;
  }
  .head_photo{
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .head_photo span{
    width: 40px;
    height: 40px;
    display: inline-block;
    background-image: url("https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png");
    background-position: 0px 259.2px;
    background-size: 40px;
    border-radius: 50%;
    background-repeat: no-repeat;
  }
  .head_photo img{
    width: 100%;
    border-radius: 50%;
  }
  .comment_list .content{
    position: relative;
    padding-left: 50px;
  }
  .row1{
    display: flex;
    justify-content: space-between;
    font-size: .85rem;
    margin-bottom: 3px;
  }
  .row1 .time{
    font-size: .65rem;
    color: #999;
  }
  .row2{
    color: rgb(255, 96, 0);
    font-size: .7rem;
    margin-bottom: 3px;
  }
  .row3 .desc{
    color: #333;
    padding: 3px 0;
    font-size: .9rem;
  }
  .row3 .reply{
    padding:.6rem 3px;
    background-color: #f3f3f3;
    color: #333;
    font-size: .8rem;
    border-radius: 5px;
    margin: 0.6rem 0;
    position: relative;
  }
  .row3 .reply:after{
    position: absolute;
    top: -10px;
    left: 1.25rem;
    content: '';
    width: 0;
    height: 0;
    border-width:0 10px 10px;
    border-style: solid;
    border-color:transparent transparent #f3f3f3;
  }
  .row_photo{
    overflow: hidden;
  }
  .row_photo img{
    width: 47%;
    vertical-align: unset;
  }
  .row_last{
    padding: .7rem 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .row_last i {
    margin-right: 5px;
    font-size: 1rem;
  }
  .row_last span{
    font-size: .65rem;
    display: inline-block;
    padding: 4px 6px;
    line-height: 1rem;
    background-color: #ebf5ff;
    color: #6d7885;
    margin-right: 4px;
  }
</style>

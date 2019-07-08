<template>
    <div>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-header">
            <i class="return" @click="$router.go(-1)"><span class="iconfont icon-jiantou-copy-copy"></span></i>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content al-left">
            <!--<slot name="left_title"></slot>-->
            <span>{{left_title}}</span>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content al-right">
            <!--<router-link to="/loginPwd" >
            </router-link>-->
            <slot name="right_link"></slot>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
      name: "LoginHeader",
      methods:{
        ret(){
          this.$router.go(-1)
        },
      },
      props:{
        left_title:String,
      }
    }
</script>

<style scoped>
  .el-row {
    height: 50px;
    background: #02a774;
    padding: 0 10px;
    font-size: 0.9rem;
    line-height: 50px;
    margin-bottom: 10px;
  }
  .el-col {
    color: #fff;
  }
  .bg-header {

  }
  .grid-content {
    min-height: 36px;
    height: 50px;
  }
  .return{
    line-height: 50px;
    font-size: 1.25rem;
    display: inline-block;
    width: 80%;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    border-radius: 20px;
  }
  .return:active{
    background-color: #fff;
    opacity: 0.2;
  }
  .al-left{
    text-align: left;
  }
  .al-right{
    color: #fff;
    text-align: right;
  }
</style>

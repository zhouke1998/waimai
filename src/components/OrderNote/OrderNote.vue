<template>
    <section class="node">
      <textarea maxlength="100" v-model="note_text" rows="4" placeholder="填写额外对餐厅和骑手小哥备注的信息">

      </textarea>
      <div class="switch">
        <div v-for="(oneList,index1) in getList">
          <span v-for="(one,index2) in oneList" @click="listClick(index1,index2)" :class="{select:listTip[index1] === index2,select_line:listTip[index1] === (index2+1)}">{{one}}</span>
        </div>
      </div>
      <div class="btn"><p @click="$parent.noteShow = false">确定</p></div>
    </section>
</template>

<script>
    export default {
      name: "OrderNote",
      data(){
        return{
          note_text:'',
        }
      },
      computed:{
        getList(){
          let arr = [
            ['不要辣','少点辣','多点辣'],
            ['不要香菜'],
            ['不要洋葱'],
            ['多点醋'],
            ['多点葱']
          ]
          return arr
        },
        listTip(){
          return this.$parent.listTip
        },
        getWholeNote(){
          let str = ''
          for(let item in this.listTip){
            str+=this.getList[item][this.listTip[item]]+','
          }
          if(!this.note_text){
            str = str.substring(0,str.length-1)
          }
          return str+this.note_text
        }
      },
      methods:{
        listClick(index1,index2){
          if(this.listTip[index1]!==undefined && this.listTip[index1]===index2){
            delete this.listTip[index1]
          }else{
            this.listTip[index1] = index2
          }
          let {...newList} = this.listTip
          this.$parent.listTip = newList
        },
      }
    }
</script>

<style scoped>
  .node{
    padding: 1rem;
  }
  textarea{
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box;
    resize: none;
    padding: 1rem;
    font-size: .9rem;
    color: #888;
    outline: none;
  }
  textarea:focus{
    border: 1px solid #ccc;;
  }
  .switch{
    zoom: 1;
  }
  .switch:after{
    clear: both;
    content: '';
    visibility: hidden;
    display: block;
  }

  .switch p:last-child{

  }
  .switch span{
    display: inline-block;
    font-size: .8rem;
    color: #666;
    padding: 0 5px;
    height: 2rem;
    position: relative;
    top: -1px;
    text-align: center;
    /*border-right: 1px solid #333;*/
  }
  .switch span:after{
    display: inline-block;
    content: '';
    width: 1px;
    height: 1rem;
    background-color: #ddd;
    line-height: 2rem;
    vertical-align: middle;
    position: relative;
    left: 5px;
  }
  .switch div span:last-child:after{
    background:none;
  }
  .switch>div{
    display: inline-block;
    border-radius: 4px;
    margin-right: .7rem;
    margin-bottom: .7rem;
    line-height: 2rem;
    height: 2rem;
    border: 1px solid #ccc;
    box-sizing: border-box;
    overflow: hidden;
  }

  .switch .select{
    background-color: #0186ff;
    color: #fff;
  }
  .switch .select_line:after,.switch .select:after{
    background:none;
  }

  .btn{
    display: flex;
    justify-content: center;
    margin-top: 1rem;
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
</style>

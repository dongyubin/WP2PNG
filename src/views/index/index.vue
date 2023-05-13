<template>
  <div class="index">
    <header>
      <div class="harea">
        <el-input v-model="eTitle" @change="getPosts('2', eid)" placeholder="请输入标题"></el-input>
        <el-select v-if="eImage" v-model="value" @change="changeUrl" placeholder="请选择">
          <el-option
            v-for="item in urlOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="eImage" @change="getPosts('2', eid)" placeholder="请输入图片地址"></el-input>
        <el-input type="textarea" v-model="eRendered" @change="getPosts('2', eid)" placeholder="请输入文章描述"></el-input>
      </div>
      <div class="hbtns">
        <el-button @click="getPosts('1')">1. 初始化预览</el-button>
        <el-button @click="toCanvas('1')">2. 生成图片预览</el-button>
        <el-button @click="toCanvas('2', eTitle)">3. 生成并保存图片</el-button>
        <el-switch v-model="idSwitch" active-text="id查找文章" inactive-text="关"></el-switch>
      </div>
      
      <div v-if="idSwitch" class="idarea">
        <el-input name="" v-model="eid" placeholder="请输入文章id"></el-input>
        <el-button @click="getPostContext">抓取</el-button>
      </div>
      
    </header>
    <div class="body">
      <content-com :eTitle="eTitle" :eRendered="eRendered" :eImage="eImage" :link="link" :key="key"></content-com>
      <div class="preview" v-if="previewSwitch">
        <p>图片预览区</p>
        <img ref="previewImg" alt="" srcset="">
      </div>
    </div>
    
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import {posts,context} from '@/api/index/index'
import Canvas2Image from '@/utils/canvas2image.js'
import contentCom from './components/contentCom.vue'
export default {
  name: 'index',
  data () {
    return { 
      eid: '',
      eTitle: '',
      eImage: '',
      eRendered: '',
      contentRendered: '',
      excerptRendered: '',
      link: '',
      idSwitch: false,
      previewSwitch: false,
      messageList: [],
      key: 0,
      urlOptions: [{
        value: 'https://gcore.jsdelivr.net/gh/dongyubin',
        label: 'gcore'
      }],
      value: ''
    }
  },
  components:{
    contentCom
  },
  methods: {
    getPosts(type, id){
      this.previewSwitch = false
      if(id){
        context({id: this.eid}).then(res=>{
          this.contentRendered = this.getImages(res.content.rendered);
          if(type=='1'){
            this.eTitle = res.title.rendered;
            this.eRendered = res.excerpt.rendered;
          }
          this.link = res.link;
        })
      }else{
        posts().then(res=>{
          res.forEach(element => {
            // this.contentRendered = this.getImages(element.content.rendered);
            // this.titleRendered = element.title.rendered;
            if(type=='1'){
              this.eTitle = element.title.rendered;
              this.eRendered = element.excerpt.rendered;
              this.eImage = this.getImages(element.content.rendered);
            }
            this.link = element.link;
          });
        })     
      }
       
    },
    getPostContext(){
      this.previewSwitch = false
      this.value = ''
      context({id: this.eid}).then(res=>{
          this.eImage = this.getImages(res.content.rendered);
          this.eTitle = res.title.rendered;
          this.eRendered = res.excerpt.rendered;
          this.link = res.link;
      })
    },
    toCanvas(type,name){
      this.previewSwitch = true
      let rootElem = document.getElementById('rootElem')
      html2canvas(rootElem,{
        useCORS: true,
      }).then((canvas)=>{
        var imgUrl = canvas.toDataURL("image/png", 1);
        // var imgSrc = this.$refs.imgSrc;
        var preview = this.$refs.previewImg;
        // imgSrc.innerHTML = imgUrl;
        preview.src = imgUrl;
        if(type!='1'){
          Canvas2Image.saveAsImage(canvas, canvas.width, canvas.height, 'png',name)
        }
      })
    },
    changeUrl(){
      this.eImage = this.value + this.eImage
    },
    getImages (str){
      //匹配图片（g表示匹配所有结果i表示区分大小写）
      var imgReg = /<img.*?(?:>|\/>)/gi;
      //匹配src属性
      var srcReg = /data-src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      var arr = str.match(imgReg);
      var src = arr[0].match(srcReg);
      return src[1]
    },
  }
}
</script>

<style lang="less" scoped>
.index{
  display: flex;
  width: 100%;
  flex-direction: column;
  header{
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    .harea{
      width: 60%;
    }
    .hbtns{
      margin: 10px;
    }
    .idarea{
      display: flex;
      margin: 10px;
    }
  }

  .body{
    display: flex;
    justify-content: space-around;
    .preview{
      display: flex;
      flex-direction: column;
    }
  }
  
}
</style>

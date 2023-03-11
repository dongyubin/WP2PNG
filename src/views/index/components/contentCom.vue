<template>
  <div class="message" id="rootElem">
        <div class="box">
          <div class="content">
            <h1>{{ eTitle }}</h1>
            <div class="headerImg">
              <img :src="contentRendered" alt="">
            </div>
            <p>{{ eRendered }}</p>
            <div class="qrcode">
              <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+link"/>
            </div>
            <p>长按识别，查看详情</p>
          </div>
        </div>
  </div>
</template>
<script>
export default {
  name: 'contentCom',
  props: {
    eTitle: {
      type: String,
      default: ''
    },
    contentRendered: {
      type: String,
      default: ''
    },
    eRendered: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
  },
}
</script>
<style lang="less" scoped>
.message{
      display: flex;
      width: 28%;
      height: auto;
      box-sizing: border-box;
      text-align: center;
      .box{
        width: 100%;
        display: flex;
        justify-content: center;
        background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
        .content{
          width: 100%;
          // border:solid 5px #000;
          border-radius: 5px;
          h1{
            font-size: 1.75em;
            padding: 10px;
            text-shadow: 2px 0px #fff, -2px 0px #fff, 0px -2px #fff, 0px 1px #fff;
          }
          p{
            padding: 10px 30px;
            font-weight: 700;
          }
        }
        img{
          width: 90%;
          border-radius: 8px;
        }

      }
      p{
        
      }
      input{
        width: 100%;
        height: 30px;
        border: none;
      }
      .qrcode::before{
        content: "";
        left: 6px;
        border: solid 5px #000;
        border-radius: 5px;
        display: block;
        position: absolute;
        top: 5px;
        width: 100%;
        height: 100%;
      }
      .qrcode{
        position: relative;
        width: 150px;
        height: 150px;
        margin: 0 auto;
        padding: 20px;
        border: solid 5px #000;
        border-radius: 5px;
      }
    }

</style>
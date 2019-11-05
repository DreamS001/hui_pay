<template>
  <div class="wscn-http404-container">
    <div>
      <div class="system-left">
        <div class='left-title'>
          <h3>支付设置</h3>
        </div>
        <div class="left-main">
          <ul>
            <li  v-for="(item, index) in listoption" :key="index" :class="{'is-active': ind === index}" @click="changeBgc(index)">
              <span>{{item}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="system-right">
        <div class="right-main-box">


          <!-- 开放平台配置 -->
          <div v-if="imain1==ind">
            <div class="right-main right-main2" >
              <div class="left-Line">
                <span>微信服务商配置</span>
                <el-switch style="display: inline-block;float:right;" v-model="value" active-color="#13ce66" inactive-color="#ff4949" active-text="开启" inactive-text="关闭"></el-switch>
              </div>
              <div class="left-line-content">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="服务商公众号APPID">
                    <el-input placeholder="请输入APPID" v-model="form.name" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="服务商后台的api秘钥">
                    <el-input placeholder="请输入服务商后台的api秘钥" v-model="form.name" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="微信服务商商户号">
                    <el-input placeholder="请输入微信服务商商户号" v-model="form.name" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="证书上传 ( 服务商api证书 )">
                    <el-input placeholder="请证书上传 ( 服务商api证书 )" v-model="form.name" :disabled="true"  clearable></el-input>
                    <span  class=" uploadspan" style="">点击上传</span>
                  </el-form-item>
                  <el-form-item label="证书上传 ( 服务商api证书 )">
                    <el-input placeholder="请证书上传 ( 服务商api证书 )" v-model="form.name" :disabled="true" clearable></el-input>
                    <el-upload
                      class="upload-demo"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                     >
                      <el-button class=" uploadspan" size="small" type="primary">点击上传</el-button>
                    </el-upload>
                     <!-- :show-file-list="false" -->
                  </el-form-item>
                  <el-form-item style="">
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                  </el-form-item>
                </el-form>

              </div>
              <div class="left-Line">支付宝服务商配置</div>
              <div class="kaifang-weixin" style="width:100%;margin-bottom:30px;">
                <el-form ref="form" :model="form2">
                  <el-form-item label="消息校验Token">
                    <el-input placeholder="" v-model="form2.tokenurl" readonly="readonly"></el-input>
                    <span  class="clickspan" title="点击复制" v-clipboard:copy='form2.tokenurl' v-clipboard:success='onCopy' v-clipboard:error='onError' style="">点击复制</span>
                  </el-form-item>
                  <el-form-item label="消息加密key">
                    <el-input placeholder="" v-model="form2.keyurl" readonly="readonly"></el-input>
                    <span class="clickspan" title="点击复制" v-clipboard:copy='form2.keyurl' v-clipboard:success='onCopy' v-clipboard:error='onError' style="">点击复制</span>
                  </el-form-item>
                  <el-form-item label="登录授权的发起页域名">
                    <el-input placeholder="" v-model="form2.name3" readonly="readonly"></el-input>
                    <span class="clickspan" title="点击复制" v-clipboard:copy='form2.name3' v-clipboard:success='onCopy' v-clipboard:error='onError' style="">点击复制</span>
                  </el-form-item>
                  <el-form-item label="授权事件接受URL">
                    <el-input placeholder="" v-model="form.name" readonly="readonly"></el-input>
                    <span class="clickspan" title="点击复制" v-clipboard:copy='form2.name3' v-clipboard:success='onCopy' v-clipboard:error='onError' style="">点击复制</span>
                  </el-form-item>
                  <el-form-item label="公众号消息与事件接受URL">
                    <el-input placeholder="" v-model="form.name" readonly="readonly"></el-input>
                    <span class="clickspan" title="点击复制" v-clipboard:copy='form2.name3' v-clipboard:success='onCopy' v-clipboard:error='onError' style="">点击复制</span>
                  </el-form-item>
                  <el-form-item label="网页开发域名">
                    <el-input placeholder="" v-model="form.name" readonly="readonly"></el-input>
                    <span class="clickspan" title="点击复制" v-clipboard:copy='form2.name3' v-clipboard:success='onCopy' v-clipboard:error='onError' style="">点击复制</span>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>

          <!-- 新大陆配置 -->
          <div v-if="imain2==ind">
            <div class="right-main right-main3" >
              <div class="left-Line">
                <span>新大陆支付配置</span>
                <el-switch style="display: inline-block;float:right;" v-model="value" active-color="#13ce66" inactive-color="#ff4949" active-text="开启" inactive-text="关闭"></el-switch>
              </div>
              <div class="left-line-content">
                <el-form ref="form" :model="smsConfig"   label-width="80px">
                  <el-form-item label="阿里大鱼KeyId">
                    <el-input placeholder="请输入阿里大鱼KeyId" v-model="smsConfig.keyid" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="阿里大鱼密钥">
                    <el-input placeholder="请输入阿里大鱼密钥" v-model="smsConfig.name" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="阿里大鱼签名">
                    <el-input placeholder="请输入阿里大鱼签名" v-model="smsConfig.name" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="证书上传 ( 服务商api证书 )">
                    <el-input placeholder="请证书上传 ( 服务商api证书 )" v-model="smsConfig.name" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="证书上传 ( 服务商api证书 )">
                    <el-input placeholder="请证书上传 ( 服务商api证书 )" v-model="smsConfig.name" clearable></el-input>
                  </el-form-item>
                  <!-- <p style="  box-sizing: border-box;padding-left:200px;font-size:14px; color:#f00;"><b style="font-size:14px;display:inline-block;"> 注意事项: </b> 网站避免强制使用https,避免授权后页面不跳转</p> -->
                  <el-form-item style="">
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  finan,
  finana,
  pages,
  cashlist,
  withdraw,
  topup,
  toup
} from "@/api/finance"
export default {

  data() {
    return {
      listoption:['服务商配置','新大陆配置'],
      ind:0,
      form: {
          name: '',
          region: '',
          delivery: true,
          type: [],
          resource: '',
          desc: '',
        },
      form2:{
        tokenurl:'agdsjadfgajksfgsdfkj',
        keyurl:'asdfasdfasdfasdfa1234',
        name3:'啊啊asdfasdfasdfasdfa1234',
        name:'',
      },

      smsConfig:{
        keyid:'',
        name:'',
      },
      address:'',
      imageUrl:'',
      imain1:0,
      imain2:1,
      messages:'',
      messagee:'',
      errorMsg:'',
      activeName: 'first',
      activeNames: ['1'],
      value:true,

    }
  },

  methods:{
    changeBgc: function (index) {
      this.ind = index
    },
    onSubmit() {
        // console.log('submit!');
    },
    // copyUrl(){
    //   console.log(this)
    //   let _this = this;
    //   _this.messages='复制成功!'
    //   _this.messagee='复制失败!'
    //   let clipboard = new this.clipboard(".copy");
    //   clipboard.on('success', function () {
    //     _this.$message({
    //       message:_this.messages,
    //       type:'success'
    //     })
    //   });
    //   clipboard.on('error', function () {
    //       _this.$message.error(_this.messagee)
    //   });
    // },
    onCopy() {
      this.$message.success("复制成功！")
    },
    onError() {
      this.$message.success("复制失败！")
    },
     handleClick(tab, event) {
        console.log(tab, event);
    },
    // 折叠面板
    handleChange(val) {
      console.log(val);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404-container {
  background: #f0f2f5;
  min-height: calc(100vh - 84px);
  width: 100%;
  background-color: #f0f2f5;
  background-size: cover;
}
.wscn-http404-container>div{
  width:100%;
  min-width:650px;
}
// 系统设置的主体左边侧边
.system-left{
  display: inline-block;
  width:120px;
  height:100%;
  min-height: calc(100vh - 84px);
  background: #fff;
  border-right: solid 1px #e6e6e6;
}
.left-title>h3{
  margin: 20px 0px;
  padding: 0;
  line-height: 24px;
  font: 14px Helvetica Neue,Helvetica,PingFang SC,Tahoma,Arial,sans-serif;
  color: #666;
  text-align: center;
  font-weight: 700;
}
.left-main ul{
  margin: 0;
  padding-left: 0px;
}
.left-main ul li{
  list-style-type: none;
  font-size: 14px;
  color: #303133;
  padding: 0 20px;
  cursor: pointer;
  transition: border-color .3s,background-color .3s,color .3s;
  box-sizing: border-box;
  height: 56px;
  line-height: 56px;
  white-space: nowrap;

}
.left-main ul li>span{
  width:100%;
  font-size: 14px;
  color: #303133;
  display: inline-block;
  text-align: center;
}
.left-main ul .is-active >span{
  color: #409EFF;
}
// 系统设置的主体右边主体内容
.system-right{
  width: calc(100% - 120px);
  min-width: 500px;
  float: right;
  min-height: 100%;
  box-sizing: border-box;
  padding:0px;
  margin:0px;
}
.right-main-box{
  padding:15px;
  width:100%;
  box-sizing: border-box;
}
.right-main{
  width:100%;
  box-sizing: border-box;
  padding:20px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.left-Line{
  height: 24px;
  line-height: 24px;
  padding-left: 5px;
  border-left: 2px solid #409eff;
  margin-bottom: 20px;
  font: 14px Helvetica Neue,Helvetica,PingFang SC,Tahoma,Arial,sans-serif;
  color: #303133;
}
.left-Line>span{
  display: inline-block;
  height: 24px;
  line-height: 24px;
}
.kaifang-weixin{
  width:200px;
  line-height: 24px;
  color: #303133;
  font: 14px Helvetica Neue,Helvetica,PingFang SC,Tahoma,Arial,sans-serif;
}
.clickspan{
  display:inline-block;
  margin-left:20px;
  cursor:pointer;
  color: #999
}
.uploadspan{
  display:inline-block;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #FFF;
  border: 1px solid #DCDFE6;
  color: #606266;
}
</style>
<style>
  /* 站点 */
  .right-main1 .el-form-item__label{
    width:160px !important;
    font-size: 14px;
    color: #606266;
    font-weight: 400;
  }
  .right-main1 .el-form-item__label::before{
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }
  .right-main1 .el-input{
    width:200px;
  }
  .right-main1 .el-form-item__content{
    margin-left: 160px;
  }
    .right-main1 .el-form-item__content .el-button{
    margin-left: 80px;
  }
  .right-main1 .el-form-item__content>div{

  }
    /* 上传照片 */
  .right-main1 .avatar-uploader {
    display: inline-block;
    width: 262px;
    /* border: 1px dashed #d9d9d9; */
    cursor: pointer;
    position: relative;
    /* overflow: hidden; */
    min-width: 64px;
    max-width: 260px;
    overflow: hidden;
    height: 41px;
    min-height: 64px;
    cursor: pointer;
    margin: 0px 10px 10px 0px;
    /* border: 1px dashed rgb(204, 204, 204); */
    border-radius: 10px;
    /* display: flex;
    justify-content: center;
    align-items: center; */
  }
  .upload-box1,.upload-box2,.upload-box3{
    height:64px;
  }
  .right-main1 .upload-box1 .avatar-uploader .el-upload,.right-main1 .upload-box2 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 64px;
    max-width: 260px;
    overflow: hidden;
    height:64px;
    /* height: 64px; */
    cursor: pointer;
    margin: 0px 10px 10px 0px;
    border: 1px dashed rgb(204, 204, 204);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right-main1 .upload-box3 .avatar-uploader .el-upload{
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 64px;
    height:64px;
    cursor: pointer;
    margin: 0px 10px 10px 0px;
    border: 1px dashed rgb(204, 204, 204);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right-main1 .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .right-main1 .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 64px;
    line-height: 64px;
    text-align: center;
    border: 1px solid gainsboro;

  }
  .right-main1 em {
      font-size: 16px;
    }
  .right-main1 .avatar {
    width: 160px;
    height: 100px;
    display: block;
  }



    /* 开放平台 和短信配置,图片存储配置，验证码配置 */
  .right-main2 .el-form-item__label,.right-main3 .el-form-item__label,.right-main4 .el-form-item__label,.right-main5 .el-form-item__label{
    width:200px !important;
    font-size: 14px;
    color: #606266;
    font-weight: 400;
  }
  .right-main2 .el-form-item__label::before,.right-main3 .el-form-item__label::before,.right-main4 .el-form-item__label::before,.right-main5 .el-form-item__label::before{
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }
  .right-main2 .el-input, .right-main3 .el-input,.right-main4 .el-input,.right-main5 .el-input{
    width:410px;
  }
  .right-main2 .el-form-item__content,.right-main3 .el-form-item__content,.right-main4 .el-form-item__content,.right-main5 .el-form-item__content{
    margin-left: 200px !important;
  }
  .upload-demo{
    display: inline-block;
  }

</style>

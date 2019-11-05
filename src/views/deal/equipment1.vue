<template>
<!--  网站管理/网站设置 -->
  <div class="wscn-http404-container">
    <div>
      <div class="right-main right-main7" >
        <div class="top-tabs">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>网站设置</span>
            </div>
            <div class="text item">
              <div class="" style="padding-top: 20px;">
                
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="Logo">
                    <template>
                      <div class="upload-box1">
                        <el-upload
                          class="avatar-uploader"
                          action="http://shipz.jie360.com.cn/api/product/upload/"
                          :show-file-list="false">
                          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                          <el-button type="primary">选择图片<i class="el-icon-upload el-icon--right"></i></el-button>
                        </el-upload>
                        <div class="" style="width:120px;height:60px;margin:15px 0 0 40px;background:red;"></div>
                      </div>
                    </template>
                    <p style="margin:0;margin-left:40px;padding:0;color: rgb(204, 204, 204);display:block">建议尺寸136*50px</p>
                  </el-form-item>
                  <el-form-item label="二维码">
                    <template>
                      <div class="upload-box2">
                        <el-upload
                          class="avatar-uploader"
                          action="http://shipz.jie360.com.cn/api/product/upload/"
                          :show-file-list="false">
                          <el-button type="primary">选择图片<i class="el-icon-upload el-icon--right"></i></el-button>
                        </el-upload>
                        <div class="" style="width:60px;height:60px;margin:15px 0 0 40px;background:red;"></div>
                      </div>
                    </template>
                    <p style="max-width:200px;margin:0;margin-left:40px;padding:0;color: rgb(204, 204, 204);display:block">建议尺寸120*120px</p>
                  </el-form-item>
                  <el-form-item label="备案号">
                    <el-input style="width:50%"></el-input>
                  </el-form-item>
                  <el-form-item label="版权所有">
                    <el-input style="width:50%"></el-input>
                  </el-form-item>
                  <el-form-item label="网站名称">
                    <el-input style="width:50%"></el-input>
                  </el-form-item>
                  <el-form-item label="keywords">
                    <el-input style="width:50%"></el-input>
                  </el-form-item>
                  <el-form-item label="description">
                    <el-input type="textarea" style="width:50%"></el-input>
                  </el-form-item>
                  <el-form-item label="百度商桥">
                    <el-input style="width:50%"></el-input>
                    <div class="tips-desc">
                      <span>code</span>
                      <div style="color:rgb(192, 196, 204);font-size:14px;margin-left:10px;">
                        <p>提示：打开商桥->基础设置->站点管理->获取代码（复制hm.src路径即可,例：https://hm.baidu.com/hm.js?f335ca18875ee2d03560029bb5859786）</p>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item label="百度商桥">
                    <el-input style="width:50%"></el-input>
                    <div class="tips-desc">
                      <span>独立链接</span>
                      <div style="color:rgb(192, 196, 204);font-size:14px;margin-left:10px;">
                        <p>提示：打开商桥->基础设置->站点管理->获取独立沟通链接（复制即可,例：http://p.qiao.baidu.com/cps/chat?siteId=13515803&userId=28057709）</p>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                  </el-form-item>
                </el-form>
              </div>

            </div>
          </el-card>
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
      listoption:['Banner管理','网站消息'],
      ind:0,
      form: {
          name: '',
          region: '',
          delivery: true,
          type: [],
          resource: '',
          desc: '',
        },
      smsConfig:{
        keyid:'',
        name:'',
      },
      address:'',
      imageUrl:'',
      imain1:0,
      imain2:1,
      imain3:2,
      imain4:3,
      imain5:4,
      imain6:5,
      imain7:6,
      messages:'',
      messagee:'',
      errorMsg:'',
    }
  },

  methods:{
    changeBgc: function (index) {
      this.ind = index
    },
    onSubmit() {
        // console.log('submit!');
    },
    
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
.clickspan:hover{
  color: #409EFF;
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
    margin-left: 54px;
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
    /* height:64px; */
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
  .right-main7 .el-form-item__label{
    width:120px !important;
    font-size: 14px;
    color: #606266;
    font-weight: 400;
  }
  .right-main7 .star .el-form-item__label::before{
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }
  .right-main7 .el-checkbox {
    padding: 9px 20px 9px 10px;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: normal;
    height: 36px;
    margin: 5px;
  }
  .right-main7 .el-checkbox.is-bordered.is-checked {
    border-color: #409EFF;
}
.right-main7 .el-tag {
  margin:5px;
}
/* .right-main7 .el-form-item__content  .el-tag:nth-of-type(1) {
  margin-left:0px;
} */
.el-table tr{
  background: rgb(248, 248, 248) !important;
}
.el-table th{
  background: rgb(248, 248, 248) !important;
}
.el-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 220px;
  margin: 0;
}
.el-drawer{
  width: 50% !important;
  height: auto !important;
}
.tips-desc{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>

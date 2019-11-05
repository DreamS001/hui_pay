<template>
  <div class="wscn-http404-container">
    <div>
      <div class="system-right">
        <div class="right-main-box">
          <div>
            <div class="right-main right-main1" >
              <div class="left-Line">站点信息配置</div>
              <div class="left-line-content">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="系统名称">
                    <el-input placeholder="请输入名称" v-model="form.name" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="登录Logo">
                    <template>
                      <div class="upload-box1">
                        <el-upload
                          class="avatar-uploader"
                          action="http://shipz.jie360.com.cn/api/product/upload/"
                          :show-file-list="false">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </div>
                    </template>
                    <p style="margin:0;margin-left:80px;padding:0;color: rgb(204, 204, 204);display:block">建议尺寸 262 x 41px。</p>
                  </el-form-item>
                  <el-form-item label="网站ico">
                    <template>
                      <div class="upload-box2">
                        <el-upload
                          class="avatar-uploader"
                          action="http://shipz.jie360.com.cn/api/product/upload/"
                          :show-file-list="false">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </div>
                    </template>
                    <p style="max-width:200px;margin:0;margin-left:80px;padding:0;color: rgb(204, 204, 204);display:block">建议尺寸 64 x 64px。该图片后缀必须为ico <a style="color:#409eff" href="http://www.faviconico.org/favicon">立即生成</a></p>
                  </el-form-item>
                  <el-form-item label="PC安卓Logo">
                    <template>
                      <div class="upload-box3">
                        <el-upload
                          class="avatar-uploader"
                          action="http://shipz.jie360.com.cn/api/product/upload/"
                          :show-file-list="false">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </div>
                    </template>
                    <p style="margin:0;margin-left:80px;padding:0;color: rgb(204, 204, 204);display:block">建议尺寸 64 x 64px。</p>
                  </el-form-item>
                  <el-form-item label="门户网站">
                    <el-switch v-model="form.delivery"></el-switch>
                  </el-form-item>
                  <p style="padding-left:200px;box-sizing:border-box;"></p>
                  <el-form-item>
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
      listoption:['站点配置','开放平台配置','短信配置','图片存储配置','验证码配置','泛域名设置','广告设置'],
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
      smsConfigrules:{
        keyid:[
          {required: true, message: '请输入阿里大鱼KeyId', trigger: 'blur'},
        ]
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
      activeName: 'first',
      activeNames: ['1'],
      checkList:['测试一级代理','代理111','代理1'],
      checkList2:['daili2']
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
</style>

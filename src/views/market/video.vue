<template>
<!--  网站管理/设置我的资料 -->
  <div class="wscn-http404-container">
    <div>
      <div class="right-main right-main7" >
        <div class="top-tabs">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>设置我的资料</span>
            </div>
            <div class="text item">
              <div class="" style="padding-top: 20px;">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="用户名">
                    <el-input style="width:20%" disabled></el-input><span style="color:#999">不可修改。一般用于后台登录名</span>
                  </el-form-item>
                  <el-form-item label="昵称">
                    <el-input style="width:20%"></el-input>
                  </el-form-item>
                  <el-form-item label="头像">
                    <el-input style="width:20%"></el-input>
                    <el-upload
                      class="avatar-uploader"
                      action="http://shipz.jie360.com.cn/api/product/upload/"
                      :show-file-list="false">
                      <el-button type="" style="margin-left:10px;">选择图片<i class="el-icon-upload el-icon--right"></i></el-button>
                      <el-button>查看图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="手机">
                    <el-input style="width:20%"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="margin-left:40px;">确认修改</el-button>
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
.right-main7 .el-form-item__content {
  /* margin-left:0px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
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

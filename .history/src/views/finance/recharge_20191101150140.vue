<template>
  <div class="wscn-http404-container">
    <div>
      <div class="system-right">
        <div class="right-main-box">
          <div>
            <div class="right-main right-main1" >
              <div class="left-Line">清除缓存</div>
              <div class="left-line-content">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="文本信息">
                    <el-checkbox-group v-model="checkList"  >
                      <el-checkbox label="历史版本备份（0KB）"></el-checkbox>
                      <el-checkbox label="版本压缩包（0KB）"></el-checkbox>
                      <el-checkbox label="缓存文件（0KB）"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">清除</el-button>
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
// 系统设置的主体右边主体内容
.system-right{
  width: 100%;
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
  .system-right .el-checkbox {
    padding: 9px 20px 9px 10px;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: normal;
    height: 36px;
    margin: 5px;
  }
  .system-right .el-checkbox.is-bordered.is-checked {
    border-color: #409EFF;
}
</style>

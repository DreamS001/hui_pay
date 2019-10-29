<template>
  <div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper texter">
          <h2>
            <span>标题：</span>
            <input type="text" placeholder="请输入标题" />
          </h2>
          <div>
            <span style="float: left;">正文：</span>

            <textarea placeholder="请输入正文"></textarea>
          </div>
          <p>
            <span>提交</span>
            <span>重置</span>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
.texter {
  margin: 50px 30px;
  h2 {
    input {
      font-size: 15px;
      padding: 5px 10px;
    }
  }
  textarea {
    width: 510px;
    height: 300px;
    padding: 10px;
    margin-left: 31px;
    margin-bottom: 50px;
  }
  p{
    padding: 0 50px;
    span{
      font-size: 12px;
      padding: 8px 20px;
      border:1px solid gainsboro;
      margin:0 50px;
    }
    span:nth-of-type(1){
      background: #4986FF;
color:whitesmoke;
    }
  }
}
</style>

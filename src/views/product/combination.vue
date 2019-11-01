<template>
 <!--  代理商管理/等级设置-->
  <div class="wscn-http404-container">
    <div class="level-box">
      <div class="title-box">代理商名称设置</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="width:50%;" class="demo-ruleForm">
        <el-form-item label="一级代理商" prop="name">
          <el-input v-model="ruleForm.name" style="width:50%;" placeholder="请输入一级代理商等级名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="二级代理商" prop="name1">
          <el-input v-model="ruleForm.name1" style="width:50%;" placeholder="请输入二级代理商等级名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        name1: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入一级代理商等级名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        name1: [
          { required: true, message: '请输入二级代理商等级名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  components:{

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {

  },
  created() {
   
  }
};
</script>
<style  rel="stylesheet/scss" lang="scss" >
  .wscn-http404-container {
    background: #f0f2f5;
    // min-height: calc(100vh - 84px);
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  .level-box{
    width:100%;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    padding: 20px;
    box-sizing:border-box;
  }
  .title-box{
    height: 24px;
    line-height: 24px;
    padding-left: 5px;
    border-left: 2px solid #409eff;
    margin-bottom: 20px;
  }
  .el-form-item{
    padding-left:40px;
    box-sizing:border-box;
  }
</style>


<style>
  
</style>

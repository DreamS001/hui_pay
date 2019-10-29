<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.el-range-editor--mini.el-input__inner{
  width: 200px!important;
}
.el-range-editor--mini.el-input__inner .el-range-input{
  width: 70px!important;
}
.el-range-editor--mini.el-input__inner .el-range-separator{
  width: 20px!important;
}
</style>

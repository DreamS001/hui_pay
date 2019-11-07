<template>
  <!-- 清除缓存页面 -->
  <div class="wscn-http404-container">
    <div>
      <div class="system-right">
        <div class="right-main-box">
          <div class="right-main right-main1" >
            <div class="nav">
              <div class="block" style="margin-bottom:20px;min-width:600px">
                <span class="demonstration">自定义查询：</span>
                <el-date-picker
                  v-model="value6"
                  type="daterange"
                  size="mini"
                  range-separator="至"
                  :start-placeholder="time"
                  :end-placeholder="times"
                  @change="changetime"
                ></el-date-picker>
                <div style="height:20px"></div>
                <span class="demonstration">提现流水号：</span>
                <input style="width:200px;height:28px;border:1px solid #DCDFE6" v-model="input1" />

                <span class="time" style="margin-left:100px" @click="queryDate">查询</span>
                <span class="time" style="background:#09BD22" @click="download">导出</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { finan} from "@/api/finance"
export default {

  data() {
    return {

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
.nav {
  width: 100%;
  height: 120px;
  background: #fff;
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.block {
  font-size: 13px;
  margin-left: 30px;
}
</style>
<style>

</style>

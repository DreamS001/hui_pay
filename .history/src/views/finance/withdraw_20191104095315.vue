<template>
  <!-- 清除缓存页面 -->
  <div class="wscn-http404-container">
    <div>
      <div class="system-right">
        <div class="right-main-box">
          <div class="right-main right-main1" >
            <div class="nav">
              <div class="block" style="margin-bottom:20px;min-width:600px">
                <div class="block-d">
                  <span class="demonstration">加入的时间：</span>
                  <el-date-picker v-model="value" :start-placeholder="beginDatePlaceHolder" :end-placeholder="endDatePlaceHolder" type="daterange" size="mini" range-separator="至" />
                </div>
                <div style="height:15px"></div>
                <div class="roles">
                  <span>角色选择：</span>
                  <el-select v-model="value" placeholder="请选择合伙人">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="value" placeholder="请选择代理商">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="value" placeholder="请选择拓展员">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="value" placeholder="请选择商家">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-button type="primary">查询</el-button>
                  <el-button type="primary" plain style="margin-left:10px">清空</el-button>
                  <!-- <span class="time" style="margin-left:10px" >查询</span>
                  <span class="time" style="background:#09BD22" >清空</span> -->
                </div>
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
import moment from "moment";
import {formatDate} from '../../utils/date.js'

export default {
  data() {
    return {
      value: "",
      input1: "",
      pageNo: 1,
      pageSize: 10,
      time: "",
      times: "",
      total: 1,
      currentPage4: 4,
      list: [],
      allList: [],
      clickQueryDate: false,
      pageSize1: 2147483647,
      beginDatePlaceHolder: '',
      endDatePlaceHolder: '',
      beginDate: '',
      endDate: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    };
  },


    created() {
          var date = new Date()
          this.beginDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
          this.endDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
          this.beginDate = ''
          this.endDate = ''

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
  font: 14px Helvetica Neue,Helvetica,PingFang SC,Tahoma,Arial,sans-serif;
}
</style>
<style>
  .block-d .el-range-editor--mini.el-input__inner{
    height:30px;
  }
 .roles .el-input--suffix .el-input__inner{
   height:30px;
  }
 .roles .el-input__icon{
   line-height: 30px;
  }
  .roles .el-button--primary{
    height: 30px;
    padding:7px 15px;
  }
  .el-button--primary.is-plain{
    color:black;
    
  }
</style>

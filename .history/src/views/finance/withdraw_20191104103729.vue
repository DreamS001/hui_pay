<template>
  <!-- 清除缓存页面 -->
  <div class="wscn-http404-container">
    <div>
      <div class="system-right">
        <div class="right-main-box">
          <div class="right-main right-main1" >
            <div class="nav">
              <div class="block" style="margin-bottom:20px;min-width:600px">
                <div>
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
                    <el-button type="primary" plain class="button2" style="margin-left:10px">清空</el-button>
                    <!-- <span class="time" style="margin-left:10px" >查询</span>
                    <span class="time" style="background:#09BD22" >清空</span> -->
                  </div>
                </div>
                <div>
                  <el-table :data="list" style="width: 100%!important;padding:5px 0;box-sizing: border-box;" stripe :header-cell-class-name="handlemyclass">
                    <el-table-column :cell-class-name="colorblueclass" prop="create_time" label="所属合伙人oem" align="center"></el-table-column>
                    <el-table-column prop="product_name" label="所属代理商" align="center"></el-table-column>
                    <el-table-column prop="product_name" label="商户名称" align="center"></el-table-column>
                    <el-table-column prop="product_name" label="联系人" align="center"></el-table-column>
                    <el-table-column prop="product_name" label="联系电话" align="center"></el-table-column>
                    <el-table-column prop="product_name" label="支付宝费率" align="center"></el-table-column>
                    <el-table-column prop="product_name" label="微信费率" align="center"></el-table-column>
                    <el-table-column prop="product_name" label="加入时间" align="center"></el-table-column>
                    <el-table-column prop="order_status" label="支付类型" align="center">
                      <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.order_status==300">购买成功</el-tag>
                        <el-tag type="danger" v-if="scope.row.order_status==500">购买失败</el-tag>
                        <el-tag type v-if="scope.row.order_status==100">购买中</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <span class="s-btn" @click="edited(scope.$index,scope.row)">详情</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 分页器 -->
                  <div class="block" style="padding-left:5px;box-sizing: border-box;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" ></el-pagination>
                  </div>
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
  .roles .el-button--primary.is-plain{
    color:black;
    background-color: #fff;
    border-color: #DCDFE6;
  }
  .roles .button2:hover{
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
</style>

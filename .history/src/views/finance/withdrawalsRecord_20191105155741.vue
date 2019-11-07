<template>
  <!-- 直连商户页面 -->
  <div class="wscn-http404-container">
    <div>
      <div class="system-right">
        <div class="right-main-box">
          <div class="right-main right-main1" >
            <div class="nav">
              <div class="block" style="margin-bottom:20px;min-width:600px">
                <div>
                  <div class="block-d1">
                    <el-badge :value="3" class="item">
                      <el-button size="small">审核支付宝通过</el-button>
                    </el-badge>
                    <el-badge :value="3" class="item">
                      <el-button size="small">审核微信通过</el-button>
                    </el-badge>
                    <el-badge :value="1" class="item" type="primary">
                      <el-button size="small">支付宝审核中</el-button>
                    </el-badge>
                    <el-badge :value="1" class="item" type="primary">
                      <el-button size="small">微信审核中</el-button>
                    </el-badge>
                  </div>
                  <div style="height:15px"></div>
                  <div class="roles">
                    <div class="block-d">
                      <!-- <span class="demonstration">加入的时间：</span> -->
                      <el-date-picker v-model="value" :start-placeholder="beginDatePlaceHolder" :end-placeholder="endDatePlaceHolder" type="daterange" size="mini" range-separator="至" />
                      <el-input v-model="input" placeholder="请输入商户名称"></el-input>
                    <el-button type="primary">查询</el-button>
                    </div>

                    <!-- <span class="time" style="margin-left:10px" >查询</span>
                    <span class="time" style="background:#09BD22" >清空</span> -->
                  </div>
                </div>
                <div class="zlist">
                  <el-table :data="list" style="width: 100%!important;padding:5px 0;box-sizing: border-box;" stripe :header-cell-class-name="handlemyclass">
                    <el-table-column :cell-class-name="colorblueclass" prop="id" label="ID" align="center" min-width="120"></el-table-column>
                    <el-table-column prop="name" label="商户名称" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="business_category" label="店铺类目" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="contact_name" label="联系人" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="contact_phone" label="联系电话" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="contact_email" label="联系邮箱" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="al_rate" label="支付宝费率" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="wx_rate" label="微信费率" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="mestate" label="商户状态" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="addtime" label="加入时间" align="center" min-width="100">
                      <!-- <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.order_status==300">购买成功</el-tag>
                        <el-tag type="danger" v-if="scope.row.order_status==500">购买失败</el-tag>
                        <el-tag type v-if="scope.row.order_status==100">购买中</el-tag>
                      </template> -->
                    </el-table-column>
                    <el-table-column label="操作" align="center" min-width="200">
                      <template slot-scope="scope">
                        <!-- details -->
                        <span class="s-btn" @click="edited(scope.$index,scope.row)">详情</span>
                        <!-- <span class="s-btn" @click="edit(scope.$index,scope.row)">费率修改</span> -->
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
      input:'',
      value: "",
      input1: "",
      pageNo: 1,
      pageSize: 10,
      time: "",
      times: "",
      total: 1,
      currentPage4: 4,
      list: [{
        id:'3',
        name:'小易水果2',
        business_category:'生活服务',
        contact_name:'异类',
        contact_phone:'18191071916',
        contact_email:'yil@www.jie360.com.cn',
        al_rate:'0.38%',
        wx_rate:'0.38%',
        mestate:'2',
        addtime:'2019-10-10 10:16:06'
      }],
      allList: [],
      clickQueryDate: false,
      pageSize1: 2147483647,
      beginDatePlaceHolder: '',
      endDatePlaceHolder: '',
      beginDate: '',
      endDate: '',
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
  methods:{
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      return "test";
    },
  }
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
.block{
  width: 100%;
}

</style>
<style>
.block-d1 .item {
  margin-top: 10px;
  margin-right: 40px;
}
  .block-d .el-range-editor--mini.el-input__inner{
    height:30px;
  }
  .block-d .el-range-editor.el-input__inner{
    padding:0 10px;
  }
  .block-d .el-range-separator{
    padding:5px;
  }
 .roles  .el-input__inner{
   height:30px;
   /* width:150px !important; */
  }
  .roles .el-input{
    width:200px !important;
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
  .zlist .el-table thead{
    color: #909399;
    font-weight: 500;
  }
  .zlist .test {
  color: #909399 !important;
  background: rgb(248, 248, 248) !important;
  font-weight: 100;
  width: 100% !important;
  font-weight: 500;
}
</style>

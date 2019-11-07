<template>
  <div class="wscn-http404-container">
    <div class="papel-box">
      <div class="card-box">
        <div class="card-item">
          <div class="item-box">
            <div class="item-title">
              <span class="span-title">流水笔数</span>
              <el-tooltip class="item" effect="dark" content="所有订单状态下的流水笔数之和" placement="top-end"><span style="color:#fff">?</span></el-tooltip>
            </div>
            <div class="content-num" style="font-weight: bold; color: rgb(11, 178, 12); display: flex;">38笔</div>
          </div>
        </div>
        <div class="card-item">
          <div class="item-box">
            <div class="item-title">
              <span class="span-title">待支付订单金额</span>
              <el-tooltip class="item" effect="dark" content="待支付订单状态下的金额之和" placement="top-end"><span style="color:#fff">?</span></el-tooltip>
            </div>
            <div class="content-num" style="font-weight: bold; color: rgb(12, 186, 223); display: flex;">￥156.11元</div>
          </div>
        </div>
        <div class="card-item">
          <div class="item-box">
            <div class="item-title">
              <span class="span-title">商家实收</span>
              <el-tooltip class="item" effect="dark" content="订单状态为交易成功的订单金额之和" placement="top-end"><span style="color:#fff">?</span></el-tooltip>
            </div>
            <div class="content-num" style="font-weight: bold; color: rgb(217, 29, 31); display: flex;">￥132.12元</div>
          </div>
        </div>
        <div class="card-item">
          <div class="item-box">
            <div class="item-title">
              <span class="span-title">手续费</span>
              <el-tooltip class="item" effect="dark" content="官方手续费(每笔)+服务商分润(每笔)=手续费(和)" placement="top-end"><span style="color:#fff">?</span></el-tooltip>
            </div>
            <div class="content-num" style="font-weight: bold; color: rgb(10, 106, 161); display: flex;">￥0.5元</div>
          </div>
        </div>
        <div class="card-item">
          <div class="item-box">
            <div class="item-title">
              <span class="span-title">商家净收入</span>
              <el-tooltip class="item" effect="dark" content="商家实收-手续费=商家净收入" placement="top-end"><span style="color:#fff">?</span></el-tooltip>
            </div>
            <div class="content-num" style="font-weight: bold; color: rgb(10, 106, 161); display: flex;">￥126.6元</div>
          </div>
        </div>
      </div>
      <div class="nav-a">
        <div class="block" style="width:100%;">
          <div class="query-item">
            <span class="demonstration">交易时间：</span>
            <el-date-picker v-model="value6" style="width:20%;" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="mini" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            <el-button class="demonstration" type="primary" style="margin-left:20px">今天</el-button>
            <el-button class="demonstration" type="primary" style="margin-left:20px">近三天</el-button>
            <el-button class="demonstration" type="primary" style="margin-left:20px">近一周</el-button>
          </div>
          <div class="query-item">
            <span class="demonstration" style="">角色选择：</span>
            <el-select v-model="role1" placeholder="请选择" style="width:220px;">
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
            <el-select v-model="role2" placeholder="请选择" style="width:220px;">
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
            <el-select v-model="role3" placeholder="请选择" style="width:220px;">
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
            <el-select v-model="role4" placeholder="请选择" style="width:220px;">
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
            <span class="time" style="margin-left:20px" @click="queryBtn">查询</span>
            <span class="time" style="background:#fff;border: 1px solid #DCDFE6;color: #606266;">清空</span>
          </div>
          <div class="query-item">
            <span class="demonstration" style="">支付方式：</span>
            <el-select v-model="role1" placeholder="请选择" style="width:220px;">
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
            <el-select v-model="role2" placeholder="请选择" style="width:220px;">
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
            <el-select v-model="role3" placeholder="请选择" style="width:220px;">
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
            <el-select v-model="role4" placeholder="请选择" style="width:220px;">
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
            <span class="time" style="margin-left:20px">导出</span>
          </div>
        </div>
      </div>
      <div style="width:100%!important;" class="table-box">
        <el-table :data="list" style="width: 100%!important" stripe :header-cell-class-name="handlemyclass">
          <el-table-column :cell-class-name="colorblueclass" prop="merchant_order_id" label="订单内部流水号"></el-table-column>
          <el-table-column prop="qcf_device_num" label="流水来源" v-model="uname"></el-table-column>
          <el-table-column prop="complete_time" label="订单金额"></el-table-column>
          <el-table-column prop="order_amount" label="官方手续费"></el-table-column>
          <el-table-column prop="order_status" label="服务商分润"></el-table-column>
          <el-table-column prop="loc_info" label="净收入"></el-table-column>
          <el-table-column prop="loc_info" label="所属门店"></el-table-column>
          <el-table-column prop="loc_info" label="所属商户"></el-table-column>
          <el-table-column prop="loc_info" label="所属代理商"></el-table-column>
          <el-table-column prop="loc_info" label="下单时间"></el-table-column>
          <el-table-column prop="loc_info" label="订单类型"></el-table-column>
          <el-table-column prop="order_status" label="状态">
            <template slot-scope="scope">{{scope.row.order_status|formatrStatus}}</template>
          </el-table-column>
          <el-table-column prop="loc_info" label="操作"></el-table-column>
        </el-table>
      </div>
      <div class="block" style="margin-top:10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[10,20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { trade, trades ,tradeQuery} from "@/api/facility";
import moment from "moment";
export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 1,
      merchant: "",
      value6: "",
      currentPage4: 4,
      device: "",
      list: [],
      time: "",
      times: "",
      allList:[],
      pageSize1:2147483647,
      uname:"",
      role1:'',
      role2:'',
      role3:'',
      role4:'',
    };
  },
	  filters: {
	   formatrStatus(status){
				return status==0?'未提交':status==3?'付款完成':status==5?'退款完成':status==7?'订单已撤销':'未知状态'
		 }
	},
  methods: {
    queryBtn(){
      console.log(this.value6)
    },
    // btt() {
    //   console.log(value6);
    // },

    // 请求全部数据
    refresh() {
      // console.log(1111);
      trade(this.pageNo, this.pageSize).then(res => {
        // console.log(res);
        this.list = eval(res.list);
        this.total = res.total;
      });
      trades(this.ids).then(res => {
        // console.log(res);
        this.list = eval(res.list);
        this.total = res.total;
          // console.log(this.list);
      });
    
      
    },
    getDate(){
      tradeQuery(this.pageNo, this.pageSize1, this.time, this.times,this.uname).then(res => {
     
        this.allList = eval(res.list);
          let date = JSON.parse(JSON.stringify(this.allList));
      // 转换时间戳
      date.forEach((v, i) => {

        date[i].complete_time = moment(date[i].complete_time).format("YYYY-MM-DD");
      });

      require.ensure([], () => {
        const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
        const tHeader = [
          "流水号",
          "交易时间",
          "交易金额(美金)",
          "交易状态",
          "备注"
        ]; //将对应的属性名转换成中文
        // const tHeader = [];
        const filterVal = [
          "qcf_device_num",
          "complete_time",
          "order_amount",
          "modify_time",
          "loc_info"
        ]; //table表格中对应的属性名
        const list = date; //想要导出的数据
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "设备交易记录excel");
      });
      });
     
    },
     queryDate() {
       this.pageNo=1
      this.clickQueryDate = true;
      this.time = moment(this.value6[0]).format("YYYY-MM-DD");
      this.times = moment(this.value6[1]).format("YYYY-MM-DD");
      tradeQuery(this.pageNo, this.pageSize, this.time, this.times,this.merchant).then(res => {
        this.list = eval(res.list);

        this.total = res.total;
      });
      tradeQuery(this.pageNo, this.pageSize1, this.time, this.times,this.merchant).then(
        res => {
          this.allList = eval(res.list);
          this.total = res.total;
        }
      );
    },
    // 导出
    download() {
         this.getDate();
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      // console.log(row, column, rowIndex, columnIndex);
      return "test";
    },
    colorblueclass: function(row, column, rowIndex, columnIndex) {
      // console.log(columnIndex);
      if (columnIndex == 2) {
        return "blue";
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.refresh();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.refresh();
    }
  },
  created() {
    this.refresh();
    var date = function() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      // console.log(123123);

      return currentdate;
    };
    var dates = function() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;

      return currentdate;
    };
    this.time = date();
    this.times = dates();
 
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss" >
.test {
  color: #909399 !important;
  background: #fff !important;
  font-weight: 100;
  width: 100% !important;
}
.papel-box{
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  padding: 10px 15px;
  box-sizing: border-box;
}
.table-box{
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
}
.query-item{
  margin: 10px 0;
}
.card-box{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.card-item{
  width: 20%;
  height: 140px;
  padding: 0 6px;
  box-sizing: border-box;
}
.card-item .item-box{
  width: 100%;
  height: 134px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding: 20px 20px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.card-item .item-box .item-title{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.card-item .item-box .item-title .span-title{
  // margin-bottom: 30px;
  font-size: 20px;
  white-space: nowrap;
  flex-wrap: wrap;
  color: rgb(143, 140, 141);
}
.card-item .item-box .item-title .item{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgb(217, 29, 31);
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 10px;
  cursor: pointer;
}
.card-item .item-box .content-num{
  font-size: 20px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404-container {
  background: #f0f2f5;
  min-height: calc(100vh - 84px);
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.nav-a {
  width: 100%;
  // height: 70px;
  background: #fff;
  display: flex;
  align-items: center;
  // margin-left: 20px;
  padding: 10px 0;
  box-sizing: border-box;
  hr{
    border-color: transparent;
  }
  .demonstration{

  }
  input {
    width: 350px;
    height: 28px;
    border: 1px solid #dcdfe6;
  }
}
.block {
  font-size: 13px;
}
.time {
  width: 60px;
  height: 30px;
  background: #4986ff;
  font-size: 12px;
  padding: 8px 20px;
  color: #f0f2f5;
  // margin: 0 20px;
  border-radius: 3px;
  cursor: pointer
}

.blue {
  color: #2cc23c !important;
}
</style>

<style>
.el-button{
  padding:8px 20px !important;
  box-sizing: border-box;
}
.el-range-editor--mini.el-input__inner{
  width: 250px !important;
  height: 40px !important;
}
.el-range-separator{
  line-height: 32px !important;
}
.el-range-editor--mini.el-input__inner .el-range-input{
  width: 90px !important;
}
</style>
<style rel="stylesheet/scss" lang="scss" >
  .box {
    width: 400px;

    .top {
      text-align: center;
    }

    .left {
      float: left;
      width: 60px;
    }

    .right {
      float: right;
      width: 60px;
    }

    .bottom {
      clear: both;
      text-align: center;
    }

    .item {
      margin: 4px;
    }

    .left .el-tooltip__popper,
    .right .el-tooltip__popper {
      padding: 8px 10px;
    }
  }
</style>

<template>

  <div class="wscn-http404-container">
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
    <div style="width:100%!important;margin:20px">
      <el-table
        :data="list"
        style="width: 100%!important"
        stripe
        :header-cell-class-name="handlemyclass"
      >
        <el-table-column prop="create_time" label="日期"></el-table-column>
        <el-table-column prop="merchant_order_id" label="提现流水号" min-width="150"></el-table-column>
        <el-table-column prop="withdraw_amount" label="提现金额（美金）" min-width="150"></el-table-column>
        <el-table-column prop="withdraw_token_id" label="提现账户"></el-table-column>
        <!-- <el-table-column prop="name" label="提现账号"  ></el-table-column> -->
        <!-- <el-table-column prop="mon" label="手续费（美金）"  ></el-table-column> -->
        <!-- <el-table-column prop="purchase" label="到账金额（美金）"  ></el-table-column> -->
        <el-table-column prop="order_status" label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.order_status==300">审核成功</el-tag>
            <el-tag type="danger" v-if="scope.row.order_status==200">审核失败</el-tag>
            <el-tag type v-if="scope.row.order_status==100">审核中</el-tag>
          </template>
        </el-table-column>
         <el-table-column prop="remark" label="备注" min-width="50"></el-table-column>
        <!-- <el-table-column prop="operation" label="操作"  ></el-table-column> -->
      </el-table>
    </div>
    <div class="block" style="margin-bottom:50px;padding-bottom:20px">
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
</template>

<script>
import { withdrawList, withdrawQueryList } from "@/api/finance";
import moment from "moment";
export default {
  data() {
    return {
      value6: "",
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

      selectTime:false
    };
  },
  methods: {
    changetime(){
      this.selectTime=true
    },
    refresh() {
      withdrawList(this.pageNo, this.pageSize).then(res => {
        console.log(res.list);
        this.total = res.total;
        this.list = res.list;
      });
    },
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      // console.log(row, column, rowIndex, columnIndex);
      return "test";
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.refresh();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNo = val;
      if (this.clickQueryDate == false) {
        this.refresh();
      } else {
        withdrawQueryList(
          this.pageNo,
          this.pageSize1,
          this.time,
          this.times,
          uname
        ).then(res => {
          console.log(res);
          this.allList = eval(res.list);
        });
      }
    },
    queryDate() {
      console.log("1");
      this.pageNo = 1;
      this.clickQueryDate = true;
      if( this.selectTime==true){
 this.time = moment(this.value6[0]).format("YYYY-MM-DD");
      this.times = moment(this.value6[1]).format("YYYY-MM-DD");
      withdrawQueryList(
        this.pageNo,
        this.pageSize,
        this.time,
        this.times,
        this.input1
      ).then(res => {
        this.list = res.list;


      });
      withdrawQueryList(
        this.pageNo,
        this.pageSize1,
        this.time,
        this.times,
        this.input1
      ).then(res => {
        this.allList = eval(res.list);
        this.total = res.total;
      });
      }else{
         this.time = moment(this.value6[0]).format("YYYY-MM-DD");
      this.times = moment(this.value6[1]).format("YYYY-MM-DD");
      withdrawQueryList(
        this.pageNo,
        this.pageSize,
        "",
        "",
        this.input1
      ).then(res => {
        this.list = res.list;
      });
      withdrawQueryList(
        this.pageNo,
        this.pageSize1,
        "",
        "",
        this.input1
      ).then(res => {
        this.allList = eval(res.list);
        this.total = res.total;
      });
      }

    },
    download() {

      this.getDate()

    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    getDate() {
      withdrawList(this.pageNo, this.pageSize1this.time,this.times,this.input1).then(res => {
        console.log(res.list);
        this.total = res.total;
        this.allList = res.list;
        // alert(this.total)
        let date = JSON.parse(JSON.stringify(this.allList));
        // 转换时间戳
        date.forEach((v, i) => {
          if (date[i].order_status == 300) {
            console.log(date);

            date[i].order_status = "审核成功";
          } else if (date[i].order_status == 200) {
            date[i].order_status = "审核失败";
          } else {
            date[i].order_status = "审核中";
          }
        });

        require.ensure([], () => {
          const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
          const tHeader = [
            "日期",
            "提现流水号",
            "提现金额(美金)",
            "提现账户",
            "状态",
            "备注"
          ]; //将对应的属性名转换成中文
          // const tHeader = [];
          const filterVal = [
            "create_time",
            "merchant_order_id",
            "withdraw_amount",
            "withdraw_token_id",
            "order_status",
            "remark"
          ]; //table表格中对应的属性名
          const list = date; //想要导出的数据
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, "提现明细列表excel");
        });
      })
    }
  },

  created() {
    this.refresh();
    // console.log(132);
    // var sdd = this.$route.query.withdrawMoney;
    // var srr = this.$route.query.withdrawPach;
    // console.log(srr,sdd)
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
      console.log(123123);

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
      console.log(123123);

      return currentdate;
    };
    this.time = date();
    this.times = dates();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
.wscn-http404-container {
  background: #f0f2f5;
  min-height: calc(100vh - 84px);
  width: 100%;
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
.time {
  width: 60px;
  height: 30px;
  background: #4986ff;
  font-size: 12px;
  padding: 8px 20px;
  color: #f0f2f5;
  margin: 0 20px;
  border-radius: 3px;
  cursor: pointer;
}
.test {
  color: #fff !important;
  background: #4986ff !important;
  font-weight: 100;
  width: 100% !important;
}
.blue {
  color: #2cc23c !important;
}
</style>

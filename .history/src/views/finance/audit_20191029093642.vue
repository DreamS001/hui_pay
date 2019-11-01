<template>
  <div class="wscn-http404-container">
    <div class="nav">
      <div class="block" style="margin-bottom:20px;min-width:850px">
        <span class="demonstration">自定义查询：</span>
        <el-date-picker
          v-model="value6"
          type="daterange"
          size="mini"
          range-separator="至"
          :start-placeholder="time"
          :end-placeholder="times"
          @change="changeTime"
        ></el-date-picker>
        <div style="height:20px"></div>
        <span class="demonstration" v-if="this.button == '切换提现'">充值流水号：</span>
        <span class="demonstration" v-else>提现流水号:</span>
        <input style="width:200px;height:28px;border:1px solid #DCDFE6" v-model="input1" />

        <span class="time" style="margin-left:100px;border-radius: 3px" @click="queryDate">查询</span>
        <span class="time" style="background:#09BD22;border-radius: 3px" @click="download">导出</span>
        <span class="time" @click="butt" style="background:#FF7B61;border-radius: 3px">{{button}}</span>
      </div>
    </div>
    <div v-if="topup" style="width:100%!important;margin:20px">
      <el-table
        :data="Withdrawlist"
        style="width: 100%!important"
        stripe
        :header-cell-class-name="handlemyclass"
      >
        <el-table-column prop="merchant_order_id" label="流水号" min-width="100"></el-table-column>
        <!-- <el-table-column prop="dynamic" label="订单类型"></el-table-column> -->
        <el-table-column prop="create_time" label="提现日期" min-width="120"></el-table-column>
        <el-table-column prop="withdraw_amount" label="提现金额（美金）" min-width="140"></el-table-column>
        <!-- <el-table-column prop="name" label="资方名称"></el-table-column> -->
        <el-table-column prop="withdraw_token_id" label="地址" min-width="100"></el-table-column>
        <el-table-column prop="order_status" label="审核状态" min-width="150">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.order_status==300">审核成功</el-tag>
            <el-tag type="danger" v-if="scope.row.order_status==200">审核失败</el-tag>
            <el-tag type v-if="scope.row.order_status==100">审核中</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">通过</el-button>
            <el-button @click="refuse(scope.row)" type="text" size="small">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="topup" class="block" style="margin-bottom:50px;padding-bottom:20px">
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
    <div v-if="withdraw" style="width:100%!important;margin:20px">
      <el-table
        :data="topuplist"
        style="width: 100%!important"
        stripe
        :header-cell-class-name="handlemyclass"
      >
        <el-table-column prop="merchant_order_id" label="流水号"></el-table-column>
        <!-- <el-table-column prop="dynamic" label="订单类型"></el-table-column> -->
        <el-table-column prop="create_time" label="充值日期"></el-table-column>
        <el-table-column prop="charge_amount" label="充值金额（美金）"></el-table-column>
        <!-- <el-table-column prop="name" label="资方名称"></el-table-column> -->
        <el-table-column prop="third_trade_id" label="地址"></el-table-column>
        <el-table-column prop="order_status" label="审核状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.order_status==300">审核成功</el-tag>
            <el-tag type="danger" v-if="scope.row.order_status==200">审核失败</el-tag>
            <el-tag type v-if="scope.row.order_status==100">审核中</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>-->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">通过</el-button>
            <el-button @click="refuse(scope.row)" type="text" size="small">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="withdraw" class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination
        @size-change="handleSizeChanges"
        @current-change="handleCurrentChanges"
        :current-page="pageNos"
        :page-sizes="[10,20, 30, 40]"
        :page-size="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals"
      ></el-pagination>
    </div>
    <!-- 浮层 -->
  </div>
</template>

<script>
import {
  WithdrawCashlist,
  withdrawQueryList,
  topupQueryList,
  topupCashlist,
  audit,
  toquery
} from "@/api/finance";
import moment from "moment";
import request from '@/utils/request'
export default {
  data() {
    return {
      value6: "",
      input1: "",
      pageNo: 1,
      pageSize: 10,
      total: 1,
      pageNos: 1,
      pageSizes: 10,
      totals: 1,
      currentPage4: 4,
      Withdrawlist: [],
      topuplist: [],
      button: "切换提现",
      withdraw: true,
      topup: false,
      pass: {
        type: 1,
        status: "",
        id: "",
        remark: ""
      },
      time: "",
      times: "",
      downloadLoading: false,
      pageSize1: 2147483647,
      allList: [],
      clickQueryDate: false,
      selectTime: false
    };
  },
  methods: {
    // 切换状态
    butt() {
      if (this.button == "切换提现") {
        this.button = "切换充值";
        this.withdraw = false;
        this.topup = true;
        this.pass.type = 2;
      } else if (this.button == "切换充值") {
        this.button = "切换提现";
        this.withdraw = true;
        this.topup = false;
        this.pass.type = 1;
      }
      // console.log(123);
    },
    // 检测用户是否有选中时间
    changeTime() {
      this.selectTime = true;
    },
    queryDate() {
      this.pageNo = 1;
      if ( this.selectTime ==false&&this.input1=="") {
          this.$message.warning('您可以选择时间段进行查询')
      }
      this.clickQueryDate = true;
      this.time = moment(this.value6[0]).format("YYYY-MM-DD");
      this.times = moment(this.value6[1]).format("YYYY-MM-DD");

      if (this.button == "切换提现") {
        if (this.selectTime == true) {
          // 充值列表
         this.topupQueryList(
            this.pageNo,
            this.pageSize,
            this.time,
            this.times,
            this.input1
          ).then(res => {
            this.topuplist = eval(res.list);
            this.total = res.total;
            // alert(this.total)
            // console.log("1");
            console.log(this.topuplist);
          });
        } else {
          this.topupQueryList(this.pageNo, this.pageSize, "", "", this.input1).then(
            res => {
              this.topuplist = eval(res.list);
              this.total = res.total;
              // alert(this.total)
              // console.log("1");
              console.log(this.topuplist,"123");
            }
          );
        }
      } else {
        if (this.selectTime == true) {
        this.withdrawQueryList(
          this.pageNo,
          this.pageSize,
          this.time,
          this.times,
          this.input1
        ).then(res => {
          this.Withdrawlist = eval(res.list);
        });
      }else{
         this.withdrawQueryList(
          this.pageNo,
          this.pageSize,
          "",
          "",
          this.input1
        ).then(res => {
          this.Withdrawlist = eval(res.list);
        });
      }}
    },
    getDate() {
      if (this.button == "切换提现") {
        topupCashlist(this.pageNo, this.pageSize1,this.time,this.times,this.input1).then(res => {
          console.log(res);
          this.topuplist = eval(res.list);
          // alert(this.total)
        });
      } else {
        WithdrawCashlist(this.pageNo, this.pageSize1,this.time,this.times,this.input1).then(res => {
          console.log(res);
          this.Withdrawlist = eval(res.list);
        });
      }
      if (this.button == "切换提现") {
        let date = JSON.parse(JSON.stringify(this.topuplist));
        date.forEach((v, i) => {
          if (date[i].order_status == 300) {
            date[i].order_status = "审核成功";
          } else if (date[i].order_status == 200) {
            date[i].order_status = "审核失败";
          } else {
            date[i].order_status = "审核中";
          }
        });
        // 充值数据

        require.ensure([], () => {
          const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
          const tHeader = [
            "订单号",
            "充值日期",
            "充值金额(美金)",
            "地址",
            "审核状态",
            "备注"
          ]; //将对应的属性名转换成中文
          // const tHeader = [];
          const filterVal = [
            "merchant_order_id",
            "create_time",
            "charge_amount",
            "third_trade_id",
            "order_status",
            "remark"
          ]; //table表格中对应的属性名
          const list = date; //想要导出的数据
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, "审核充值列表excel");
        });
      } else if (this.button == "切换充值") {
        let date = JSON.parse(JSON.stringify(this.Withdrawlist));
        date.forEach((v, i) => {
          if (date[i].order_status == 300) {
            date[i].order_status = "审核成功";
          } else if (date[i].order_status == 200) {
            date[i].order_status = "审核失败";
          } else {
            date[i].order_status = 审核中;
          }
        });
        // 充值数据

        require.ensure([], () => {
          const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
          const tHeader = [
            "订单号",
            "提现日期",
            "提现金额(美金)",
            "地址",
            "审核状态"
          ]; //将对应的属性名转换成中文
          // const tHeader = [];
          const filterVal = [
            "merchant_order_id",
            "create_time",
            "charge_amount",
            "third_trade_id",
            "order_status"
          ]; //table表格中对应的属性名
          const list = date; //想要导出的数据
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, "审核提现列表excel");
        });
      }
    },
    download() {
      this.getDate();
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 数据请求
    refresh() {
      // 提现
      WithdrawCashlist(this.pageNo, this.pageSize).then(res => {
        console.log(res.list);
        this.total = res.total;
        this.Withdrawlist = res.list;
        console.log(this.Withdrawlist, "1");
              
      });
      // 充值
      topupCashlist(this.pageNos, this.pageSizes).then(res => {
        console.log(res.list);
        this.totals = res.total;
        this.topuplist = res.list;
        console.log(this.topuplist, "2");        
      });
    },
    // 充值
    topupQueryList(pageNo, pageSize, startDate, endDate, name) {
      return request({
        url:
          "api/finance/audit/1?pageNo=" +
          pageNo +
          "&pageSize=" +
          pageSize +
          "&startDate=" +
          startDate +
          "&endDate=" +
          endDate +
          "&name=" +
          name,
        method: "get"
      });
    },
    // 提现
    withdrawQueryList(pageNo, pageSize, startDate, endDate, name) {
      return request({
        url:
          "api/finance/audit/2?pageNo=" +
          pageNo +
          "&pageSize=" +
          pageSize +
          "&startDate=" +
          startDate +
          "&endDate=" +
          endDate +
          "&name=" +
          name,
        method: "get"
      });
    },
    // table头部样式
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
      this.refresh();
    },
    handleSizeChanges(val) {
      this.pageSizes = val;
      console.log(`每页 ${val} 条`);
      this.refresh();
    },
    handleCurrentChanges(val) {
      console.log(`当前页: ${val}`);
      this.pageNos = val;
      this.refresh();
    },
    handleClick(row) {
      // console.log(row.id);
      // this.pass.id = row.id;
      // this.pass.status = 300;
      // this.pass.remark = console.log(this.pass.type);
      // console.log(213);
      this.$prompt("请说明理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[^\s]/,
        inputErrorMessage: "请输入内容"
      })
        .then(({ value }) => {
          this.pass.id = row.id;
          this.pass.status = 300;
          this.pass.remark = value;
          console.log(this.pass);
          audit(this.pass).then(res => {
            console.log(res);
            // this.total = res.total;
            // this.Withdrawlist = res.list;
            this.refresh();
          });

          this.$message({
            type: "success",
            message: "操作成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    refuse(row) {
      console.log(row.id);
      // console.log(213);
      this.$prompt("请说明理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[^\s]/,
        inputErrorMessage: "请输入内容"
      })
        .then(({ value }) => {
          this.pass.id = row.id;
          this.pass.status = 200;
          this.pass.remark = value;
          console.log(this.pass);
          audit(this.pass).then(res => {
            console.log(res);
            // this.total = res.total;
            // this.Withdrawlist = res.list;
            this.refresh();
          });

          this.$message({
            type: "success",
            message: "操作成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },
  created() {
    this.refresh();
    // console.log(132);
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
      console.log(123123);

      return currentdate;
    };
    this.time = date();
    this.times = dates();
  }
  // 导出接口
  // download(){
  //   this.downloadLoading= true;
  //   const tHeader = ['订单号', '充值日期', '充值金额（美金）', '地址', '审核状态', '备注']
  //       const filterVal = ['id', 'username', 'email', 'avatar', 'enabled', 'createTime', 'lastPasswordResetTime']

  // }
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

<template>
  <div class="wscn-http404-container">
    <div class="nav">
      <div class="block" style="min-width:600px">
        <span class="demonstration">自定义查询：</span>
        <el-date-picker
          v-model="value6"
          type="daterange"
          size="mini"
          range-separator="至"
          picker-options
          :start-placeholder="time"
          :end-placeholder="times"
        ></el-date-picker>
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
        :cell-style="finalCellStyle"
        :row-class-name="setClassName"
      >
        <el-table-column prop="date" label="日期" min-width="100"></el-table-column>
        <el-table-column style="color:red" prop="act_profit" label="动态钱包收益（美金）" min-width="160" ></el-table-column>
        <el-table-column style="color:red" prop="device_expend" label="购买机器人支出（美金）" min-width="180" ></el-table-column>
        <el-table-column style="color:red" prop="cash_withdraw" label="提现支出（美金）" min-width="150" ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="expand" size="mini" @click="reveal(scope.$index, scope.row)">查看明细</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column type="expand" width="200" label="操作" >
           <template slot-scope="scope">
          <ul v-for="(index,item) in lielist" v-bind:key="item">
            <li>{{index.date}}</li>
            <li>{{index.act_profit}}</li>
            <li>{{index.sta_profit}}</li>
            <li>{{index.charge_price}}</li>
            <li>{{index.device_expend}}</li>
            <li>{{index.cash_withdraw}}</li>
          </ul>
           </template>
        </el-table-column>-->
      </el-table>
    </div>
    <div class="block" style="padding-bottom:20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 浮层 -->
    <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <span>详情</span>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div>
          <el-table
            :data="lielist"
            style="width: 100%!important"
            stripe
            height="400"
            :header-cell-class-name="handlemyclass"
            :cell-style="finalCellStyle"
          >
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="act_profit" label="动态钱包收益（美金）"></el-table-column>
            <el-table-column prop="device_expend" label="购买机器人支出（美金）"></el-table-column>
            <el-table-column prop="cash_withdraw" label="提现支出（美金）"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cash, cashlist, cashquery } from "@/api/finance";
import moment from "moment";
export default {
  data() {
    return {
      value6: "",
      pageNo: 1,
      pageSize: 10,
      total: 1,
      list: [],
      time: "",
      times: "",
      ttex: "查看详情",
      lielist: [],
      FC: false,
      allList: [],
      pageSize1: 2147483647,
      clickQueryDate: false
    };
  },
  methods: {
    setClassName({ row, index }) {
      // 通过自己的逻辑返回一个class或者空
      // console.log(row.id)
      return row.expand ? "expand" : "";
    },
    // openDetails(row) {
    //             alert(row.id);
    //         },

    refresh() {
      console.log(1111);
      cash(this.pageNo, this.pageSize).then(res => {
        console.log(res);
        this.list = eval(res.list);
        this.total = res.total;
        // alert(this.total)
      });
    },
    contribute() {
      this.FC = false;
    },
    queryDate() {
      this.pageNo = 1;
      this.clickQueryDate = true;
      this.time = moment(this.value6[0]).format("YYYY-MM-DD");
      this.times = moment(this.value6[1]).format("YYYY-MM-DD");
      cashquery(
        this.pageNo,
        this.pageSize,
        this.time,
        this.times,
        this.uname
      ).then(res => {
        this.list = res.list;
      });
      cashquery(this.pageNo, this.pageSize1, this.time, this.times).then(
        res => {
          this.allList = eval(res.list);
          this.total = res.total;
        }
      );
    },
    // 获取全部数据
    getDate() {
      cash(this.pageNo, this.pageSize1).then(res => {
        console.log(res);
        this.allList = eval(res.list);
          let date = JSON.parse(JSON.stringify(this.allList));
      // 转换时间戳
      // date.forEach((v, i) => {

      //   date[i].create_time = moment(date[i].create_time).format("YYYY-MM-DD");
      // });

      require.ensure([], () => {
        const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
        const tHeader = [
          "日期",
          "动态钱包收益(美金)",
          "购买机器人支出(美金)",
          "提现支出(美金)"
        ]; //将对应的属性名转换成中文
        // const tHeader = [];
        const filterVal = [
          "date",
          "act_profit",
          "device_expend",
          "cash_withdraw"
        ]; //table表格中对应的属性名
        const list = date; //想要导出的数据
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "动态收益excel");
      });
        // alert(this.total)
      });
    },
    finalCellStyle: function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 1) {
        return {
          color: "#64CB6D"
        };
      }

      if (columnIndex == 2) {
        return {
          color: "#FF7B61"
        };
      }
      if (columnIndex == 3) {
        return {
          color: "#FF7B61"
        };
      }
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      // alert(this.pageSize)
      this.refresh();
     
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNo = val;
      // alert(this.pageNo)
       if (this.clickQueryDate == false) {
           this.refresh();
      } else {
        cashquery(this.pageNo, this.pageSize, this.time, this.times).then(
          res => {
            this.list = eval(res.list);
            this.total = res.total;
          }
        );
      }
    },
    reveal($index, row) {
      // alert(row.id);
      this.FC = true;
      console.log(row.date);
      cashlist(row.date).then(res => {
        console.log(res);
        this.lielist = eval(res.list);
      });
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

<style  rel="stylesheet/scss" lang="scss" >
.test {
  color: #fff !important;
  background: #4986ff !important;
  font-weight: 100;
  width: 100% !important;
}
.expand .el-table__expand-column .cell {
  display: none;
}
// .el-icon-arrow-right:before{
//   content:"点击查看"
// }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404-container {
  background: #f0f2f5;
  min-height: calc(100vh - 84px);
  width: 100%;
}
.nav {
  width: 100%;
  height: 70px;
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
.fuCeng {
  position: fixed;
  z-index: 1002;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 70%;
    height: 480px;
    background: white;
    // overflow-x: hidden;
    // overflow-y: scroll;
    h4 {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      margin: 0;
      background: #4986ff;
      color: white;
      font-weight: 100;
      img {
        width: 15px;
        height: 15px;
      }
    }
    div {
      margin-top: 10px;
      p {
        font-size: 15px;
        text-align: center;
        span {
          margin: 20px;
          padding: 7px 20px;
          font-size: 12px;
          border: 1px solid gainsboro;
          margin: 0 40px;
        }
        span:nth-of-type(1) {
          background: #4986ff;
          color: white;
        }
        span:nth-of-type(2) {
          background: #fff;
          color: #c2c2c2;
        }
      }
      p:nth-of-type(3) {
        margin-top: 60px;
      }
    }
  }
}
</style>

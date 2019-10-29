<template>
  <div class="wscn-http404-container">
    <div class="nav">
      <div class="block" style="width:100%!important">
        <span class="demonstration">自定义查询：</span>
        <el-date-picker
          v-model="value6"
          type="daterange"
          size="mini"
          range-separator="至"
          :start-placeholder="time"
          :end-placeholder="times"
          @change="selectTime=true"
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
      >
        <el-table-column :cell-class-name="colorblueclass" prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="product_name" label="产品名称"></el-table-column>
        <el-table-column prop="order_status" label="订单状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.order_status==300">购买成功</el-tag>
            <el-tag type="danger" v-if="scope.row.order_status==500">购买失败</el-tag>
            <el-tag type v-if="scope.row.order_status==100">购买中</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="product_amount" label="产品数量"></el-table-column>
        <el-table-column prop="merchant_order_id" label="流水号"></el-table-column>
        <el-table-column prop="investor_name" label="投资者名称"></el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <span>购买</span>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div>
          <p>确定购买吗？</p>
          <p>
            <span @click="ensure">确定</span>
            <span @click="contribute">取消</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { record, recordQuery } from "@/api/produc";
import moment from "moment";
export default {
  data() {
    return {
      value6: "",
      pageNo: 1,
      pageSize: 10,
      input1: "",
      popup: "",
      total: 1,
      pageSize: 10,
      currentPage: 1,
      search: "",
      list: [],
      FC: "",
      time: "",
      times: "",
      clickQueryDate: false,
      allList: [],
      pageSize1: 2147483640,
      selectTime:false

    };
  },
  methods: {
    refresh() {
      // console.log(1111);
      record(this.pageNo, this.pageSize).then(res => {
        // console.log(res);
        this.list = eval(res.list);
        this.total = res.total;
        // alert(this.total)
      });
    },
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      // console.log(row, column, rowIndex, columnIndex);
      return "test";
    },
    colorblueclass: function(row, column, rowIndex, columnIndex) {
      // console.log(columnIndex);

      return "blue";
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(val);
      // console.log(this.list);
      // console.log(`每页 ${val} 条`);
      this.refresh();
    },
    handleCurrentChange(val) {
      this.pageNo = val;

      // console.log(this.list);
      // console.log(val);
      if (this.clickQueryDate == false) {
        this.refresh();
      } else {
        recordQuery(this.pageNo, this.pageSize, this.time, this.times).then(
          res => {
            this.list = eval(res.list);
            this.total = res.total;
          }
        );
      }
    },
    //   // 查询
    queryDate() {
      this.clickQueryDate = true;
      if(this.selectTime){
this.time = moment(this.value6[0]).format("YYYY-MM-DD");
      this.times = moment(this.value6[1]).format("YYYY-MM-DD");
      recordQuery(this.pageNo, this.pageSize, this.time, this.times).then(
        res => {
          this.list = eval(res.list);
          this.total = res.total;
        }
      );
      recordQuery(this.pageNo, this.pageSize1, this.time, this.times).then(
        res => {
          this.allList = eval(res.list);
          this.total = res.total;
        }
      );
      }else{
      
      recordQuery(this.pageNo, this.pageSize, this.time, this.times).then(
        res => {
          this.list = eval(res.list);
          this.total = res.total;
        }
      );
      recordQuery(this.pageNo, this.pageSize1,this.time, this.times).then(
        res => {
          this.allList = eval(res.list);
          this.total = res.total;
        }
      );
      }
      

      
    },
    getDate() {
      recordQuery(this.pageNo, this.pageSize1,this.time, this.times).then(res => {
        console.log(res);
        this.allList = eval(res.list);
          let date = JSON.parse(JSON.stringify(this.allList));
  console.log(date );
  
      // 转换购买状态
        
         date.forEach((v, i) => {
       if(date[i].order_status===300){
         date[i].order_status="购买成功"
       }else if(date[i].order_status===500){
         date[i].order_status="购买失败"
       }else if(date[i].order_status===100){
         date[i].order_status="购买中"
       }
       })
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
        const tHeader = [
          "创建时间",
          "产品名称",
          "订单状态",
          "产品数量",
          "流水号",
          "投资者名称"
        ]; //将对应的属性名转换成中文
        // const tHeader = [];
        const filterVal = [
          "create_time",
          "product_name",
          "order_status",
          "product_amount",
          "merchant_order_id",
          "investor_name"
        ]; //table表格中对应的属性名
        const list = date; //想要导出的数据
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "购买记录excel");
      });
        // alert(this.total)
      });
    },
    // 导出
    download() {
       this.getDate();
    
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  mounted() {
    // this.refresh();
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
      // console.log(123123);

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
  // width: 60px;
  height: 30px;
  background: #4986ff;
  font-size: 12px;
  padding: 8px 20px;
  color: #f0f2f5;
  margin: 0 20px;
  cursor: pointer;
  border-radius: 3px;
}

.blue {
  color: #2cc23c !important;
}
.fuCeng {
  position: fixed;
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
    width: 600px;
    height: 610px;
    background: white;
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
      p {
        font-size: 15px;
        // text-align: center;
        span:nth-of-type(1) {
          margin-left: 50px;
        }
        span:nth-of-type(2) {
          width: 100px;
          display: inline-block;
        }
      }
      .status {
        margin-top: 60px;
        display: flex;
        justify-content: center;
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
          width: 66px;
        }
      }
    }
  }
}
.inputa {
  display: inline-block;
  width: 300px;
  margin-right: 10px;
  > input {
    width: 300px;
    height: 26px !important;
  }
}
.inputb {
  display: inline-block;
  width: 150px;
  margin-right: 10px;
  > input {
    width: 150px;
    height: 26px !important;
  }
}
.el-table::before {
  width: 0;
}
</style>


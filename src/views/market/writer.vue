<template>
 <!--  操作日志/日志信息 -->
  <div class="wscn-http404-container">
    <div class="el-ui-content">
      <div class="el-ui-title">
        日志信息
      </div>
      <div class="table-box" style="">
        <div class="nav">
          <div class="block" style="width:100%!important;margin-bottom:17px;">
            <el-input
              style="width:190px;height:32px;"
              placeholder="请输入部分操作内容"
              v-model="value6"
              clearable>
            </el-input>
            <span class="time" style="margin-left:10px" @click="queryDate">查询</span>
            <el-button type="primary" class="add-btn" style="">清空日志</el-button>
          </div>
        </div>
        <div class="table-content">
          <el-table :data="list" style="width: 100%!important;padding:5px 15px;box-sizing: border-box;" stripe :header-cell-class-name="handlemyclass">
            <el-table-column :cell-class-name="colorblueclass" prop="create_time" label="操作人" align="center"></el-table-column>
            <el-table-column prop="product_name" label="操作内容" align="center"></el-table-column>
            <el-table-column prop="order_status" label="操作时间" align="center">
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.order_status==300">购买成功</el-tag>
                <el-tag type="danger" v-if="scope.row.order_status==500">购买失败</el-tag>
                <el-tag type v-if="scope.row.order_status==100">购买中</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="product_amount" label="访问IP" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <span class="s-btn" @click="deled(scope.$index,scope.row);getType(1)">删除</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <div class="block" style="padding-left:5px;box-sizing: border-box;">
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
      drawer: false,
      direction:'ttb',
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
      selectTime:false,
    };
  },
  components:{

  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          console.log('关闭抽屉')
        })
        .catch(_ => {});
    },
    submitForm(done) {
      done();
    },
    resetForm(done) {
      done();
    },
    edited(){

    },
    deled(){

    },
    refresh() {
      record(this.pageNo, this.pageSize).then(res => {
        this.list = eval(res.list);
        this.total = res.total;
      });
    },
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      return "test";
    },
    colorblueclass: function(row, column, rowIndex, columnIndex) {
      return "blue";
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.refresh();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
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
  color: #909399 !important;
  background: rgb(248, 248, 248) !important;
  font-weight: 100;
  width: 100% !important;
  font-weight: 500;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404-container {
  background: #f0f2f5;
  // min-height: calc(100vh - 84px);
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.el-ui-content{
  width: 100%;
  background: #fff;
}
.el-ui-title{
  height: 42px;
  line-height: 42px;
  padding: 0 15px;
  border-bottom: 1px solid #f6f6f6;
  color: #333;
  border-radius: 2px 2px 0 0;
  font-size: 14px;
}
.table-box{
  width:100%!important;
  padding:15px;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
}
.table-content{
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  color: #303133;
  -webkit-transition: .3s;
  transition: .3s;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding: 15px;
  box-sizing: border-box;
}
.nav {
  width: 100%;
  // height: 70px;
  background: #fff;
  display: flex;
  align-items: center;
  position: relative;
}
.add-btn{
  height: 32px;
  position: absolute;
  right: 15px;
  top: 0;
  padding: 9px 15px;
}
.block {
  font-size: 13px;
  // margin-left: 30px;
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


<style>
  .block .el-input__inner{
    height: 32px;
  }
  .el-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 240px;
    margin: 0;
  }
  .el-drawer{
    height: auto !important;
  }
</style>

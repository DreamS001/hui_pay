<template>
  <div class="wscn-http404-container">
    <div class="nav-a">
      <div class="block" style="width:1000px;min-width:800px">
        <span class="demonstration">设备号：</span>
        <input type="text" v-model="device" />

        <span class="demonstration">商家：</span>
        <input type="text" v-model="merchant" />
        <span class="time" style="margin-left:100px" @click="queryDate">查询</span>
        <span class="time" style="background:#09BD22" @click="download">导出</span>
      </div>
      <div style="margin-left: 50px">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://shipz.jie360.com.cn/api/device/import"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload"
          :headers="headers"
          :show-file-list="false"
          :accept="accept"
        >
          <el-button size="mini" type="primary">批量导入</el-button>
        </el-upload>
      </div>
    </div>
    <div style="width:100%!important;margin:20px">
      <el-table
        :data="list"
        style="width: 100%!important"
        stripe
        :header-cell-class-name="handlemyclass"
      >
        <el-table-column
          :cell-class-name="colorblueclass"
          prop="create_time"
          label="添加时间"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column prop="appid_token" label="设备号"></el-table-column>
        <el-table-column prop="loc_info" label="位置信息"></el-table-column>
        <el-table-column prop="shop_code" label="商家"></el-table-column>
        <el-table-column prop="enabled" label="是否激活">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled==1">激活</el-tag>
            <el-tag type="danger" v-else="scope.row.enabled==0">停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">交易记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 浮层 -->
    </div>
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
          >
            <!-- <el-table-column prop="user_id" label="ID"></el-table-column> -->
            <el-table-column prop="complete_time" label="日期"></el-table-column>
            <el-table-column prop="qcf_device_num" label="设备号"></el-table-column>
            <el-table-column prop="loc_info" label="所属商家"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { all, allpar, output ,allQuery} from "@/api/facility";
import { getToken } from "@/utils/auth";
import { formatDate } from "../../utils/date.js";
import $ from "jquery";
import moment from "moment";
export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 1,
      merchant: "",
      device: "",
      list: [],
      FC: false,
      lielist: [],
      headers: {
        Authorization: "Bearer " + getToken(),
        "Access-Control-Allow-Origin": "localhost:8000"
      },
      accept:".xls,.xlsx",
      allList: [],
      pageSize1: 2147483647,
      clickQueryDate:false,
      id:""
    };
  },
  methods: {
    refresh() {
      all(this.pageNo, this.pageSize).then(res => {
        console.log(res);
        this.list = eval(res.list);
  console.log(this.list);
  
        this.total = res.total;
        // alert(this.total)
      });
    },
    
    queryDate() {

      this.pageNo=1
      this.clickQueryDate = true;
       console.log(this.device);
      if(this.merchant){
  allQuery(this.pageNo, this.pageSize,this.device,this.merchant).then(res => {
        this.list = eval(res.list);
   
    
        this.total = res.total;
        
      });
      allQuery(this.pageNo, this.pageSize1,this.device,this.merchant).then(
        res => {
          this.allList = eval(res.list);
          this.total = res.total;
          // this.merchant=""
        }
      );
      }else{
         allQuery(this.pageNo, this.pageSize,this.device,this.merchant).then(res => {
        this.list = eval(res.list);
   
    
        this.total = res.total;
      });
      allQuery(this.pageNo, this.pageSize1,this.device,this.merchant).then(
        res => {
          this.allList = eval(res.list);
          this.total = res.total;
        }
      );
      }
    


    },
    getDate() {
      allQuery(this.pageNo, this.pageSize1,this.device,this.merchant).then(res => {
        console.log(res);
        this.allList = eval(res.list);

        this.total = res.total;
          let date = JSON.parse(JSON.stringify(this.allList));
      date.forEach((v, i) => {
        date[i].enabled = date[i].enabled === 1 ? "激活" : "未激活";
        date[i].create_time = moment(date[i].create_time).format("YYYY-MM-DD");
      });

      require.ensure([], () => {
        const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
        const tHeader = ["添加时间", "设备号", "位置信息","商家", "是否激活"]; //将对应的属性名转换成中文
        // const tHeader = [];
        const filterVal = ["create_time", "appid_token", "loc_info","shop_code", "enabled"]; //table表格中对应的属性名
        const list = date; //想要导出的数据
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "统计excel");
      });
      });
    },
    
    dateFormat(row, column) {
      var date = new Date(row.create_time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      // console.log(row, column, rowIndex, columnIndex);
      return "test";
    },
    colorblueclass: function(row, column, rowIndex, columnIndex) {
      console.log(columnIndex);
      if (columnIndex == 2) {
        return "blue";
      }
    },
    // 导出
    download() {
       this.getDate();
     
    
    },

    // download () {
    //           let that = this;
    //           $.ajax({
    //               url:'http://localhost:8000/api/device/output', //后台下载信息的请求链接
    //               type: "GET",
    //               responseType: 'arraybuffer',
    // 						headers:that.headers,
    //               success: function(response){ //response为后台返回的流数据信息
    //                   var blob = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
    // 								var downloadElement = document.createElement('a');
    // 								var href = window.URL.createObjectURL(blob); // 创建下载的链接
    // 								downloadElement.href = href;
    // 								downloadElement.download = '111.xlsx'; // 下载后文件名
    // 								document.body.appendChild(downloadElement);
    // 								downloadElement.click(); // 点击下载
    // 								window.URL.revokeObjectURL(href); // 释放掉blob对象
    //               },
    //               error: function(data) {
    //                   alert("下载失敗"+data);
    //               }
    //           });
    // },
    // 数据转换函数
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    //批量导入成功回调
    handleSuccess(res) {
      this.$message({
        message: "导入成功!" + res.result + "," + res.add + "," + res.update,
        type: "success"
      });
      this.refresh();
    },
    //批量导入失败回调
    handleError() {
      this.$message("导入失败!");
    },
    //上传前校验文件类型，防止后台抛异常
    beforeUpload(file) {
      var filename = file.name;
      var fix = filename.substring(filename.indexOf("."));
      if (".xls" == fix || ".xlsx" == fix) {
        return true;
      } else {
        this.$message({
          message: "文件类型错误,请重新选择文件再次上传!",
          type: "error"
        });
      }
      return false;
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
    if(this.clickQueryDate == false){
        this.refresh();
    }else{
      allQuery(this.pageNo, this.pageSize,this.device,this.merchant).then(res => {
        this.list = eval(res.list);
   
    
        this.total = res.total;
    })
      // alert(this.pageNo)
    }
    },
    // 关闭浮层
    contribute() {
      this.FC = false;
    },
    // 查看
    handleEdit($index, row) {
      // alert(row);
      this.FC = true;
      console.log(row.appid_token);
      allpar(row.appid_token).then(res => {
        console.log(res);
        console.log(21);
        this.lielist = eval(res.list);
      });
    }
  },

  created() {
    this.refresh();
   
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
.nav-a {
  width: 100%;
  height: 70px;
  background: #fff;
  display: flex;
  align-items: center;
  margin-left: 20px;
  input {
    width: 350px;
    height: 28px;
    border: 1px solid #dcdfe6;
  }
}
.block {
  font-size: 13px;
  margin-left: 30px;
  input {
    width: 200px;
    height: 28px;
    border: 1px solid #dcdfe6;
  }
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

.blue {
  color: #2cc23c !important;
}
.fuCeng {
  position: fixed;

  z-index: 1002;
  margin-left: 5%;
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

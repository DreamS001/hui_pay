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
        <span class="time" style="margin-left:4%" @click="queryDate">查询</span>
        <span class="time" style="background:#09BD22" @click="download">导出</span>
        <span
          class="time"
          style="background:#00C3DA; float:right;margin-right:3%;width:88px!important"
          @click="appear"
        >新增产品</span>
        <!-- <span v-for="i in list" :key="i">
          {{i.create_time|formatDate}}
        </span>-->
      </div>
    </div>
    <div style="width:100%!important;margin:20px">
      <el-table
        :data="list"
        style="width: 100%!important"
        stripe
        :header-cell-class-name="handlemyclass"
      >
        <el-table-column :cell-class-name="colorblueclass" prop="create_time" label="创建时间">
          <template slot-scope="scope">{{scope.row.create_time|formatDate}}</template>
        </el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="price" label="价格（美金）"></el-table-column>
        <el-table-column prop="period" label="周期（天）"></el-table-column>
        <el-table-column prop="profit_rate" label="回报率(%)">
					<template slot-scope="scope">{{scope.row.profit_rate|formatrRate}}</template>
				</el-table-column>%
        <el-table-column prop="profit_distribute" label="收益分配"></el-table-column>
        <el-table-column prop="is_delete" label="当前状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_delete===0" type="success">已启用</el-tag>
            <el-tag type="danger" size="small" v-else>未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <!-- <template slot-scope="scope">

        </template>-->
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[ 10, 20, 30,40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 浮层 -->
    <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <span>{{h1text}}</span>
          <img @click="increase" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div>
          <p>
            <span style="color:red">*</span>
            <span>产品名称：</span>
            <el-input class="inputa" v-model="form.name" placeholder="请不要重复使用名称"></el-input>
          </p>
          <p>
            <span style="color:red">*</span>
            <span>产品价格：</span>
            <el-input
              class="inputa"
              oninput="value=value.replace(/[^\d]/g,'')"
              v-model="form.price"
              placeholder="请输入数字"
            ></el-input>美金
          </p>
          <p>
            <span style="color:red">*</span>
            <span>产品周期：</span>
            <el-input
              class="inputb"
              v-model="form.period"
              placeholder="请输入数字"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>天
          </p>
          <p>
            <span style="color:red">*</span>
            <span>回报率：</span>
            <el-input
              oninput="value=value.replace(/[^0\.][0-9]{3}$/g,'')"
              class="inputb"
              v-model="form.profitRate"
              placeholder="保留小数后三位"
            ></el-input>(1=100%)
          </p>
          <p>
            <span style="color:red">*</span>
            <span>设备数量：</span>
            <el-input
              class="inputb"
              oninput="value=value.replace(/[^\d]/g,'')"
              v-model="form.num"
              placeholder="请输入数字"
            ></el-input>台
          </p>
          <p>
            <span style="color:red">*</span>
            <span>收益分配：</span>
            <el-input class="inputa" v-model="form.profitDistribute" placeholder="请输入收益分配"></el-input>
          </p>
          <p>
            <span style="color:red">*</span>
            <span>次序:</span>
            <el-input
              class="inputa"
              v-model="form.sort"
              placeholder="请输入次序"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
          </p>
          <!-- <div style="margin-left:50px">
            <span style="color:red">*</span>
            <span>是否激活:</span>
            <template>
              <el-radio style="margin-left:30px" v-model="form.enabled" label="0">是</el-radio>
              <el-radio v-model="form.enabled" label="1">否</el-radio>
            </template>
          </div>-->
          <!-- <p>
            <span style="color:red">&nbsp;&nbsp;</span>
            <span>额外信息:</span>
            <el-input class="inputa" v-model="form.exInfo" placeholder="请输入信息"></el-input>
          </p>-->

          <p>
            <span style="color:red;float: left">*</span>
            <span style=" float: left">上传封面：</span>

            <el-upload
              class="avatar-uploader"
              action="http://shipz.jie360.com.cn/api/product/upload/"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </p>
          <p class="status">
            <span @click="confirm" style="cursor: pointer">确定</span>
            <span @click="increase" style="cursor: pointer">取消</span>
          </p>
        </div>
      </div>
       <!-- 编辑按钮 -->
       


    </div>
  </div>
</template>

<script>
import { all, add, deleter, update, queryAll } from "@/api/produc";
import { formatDate } from "@/api/filters.js";
import moment from "moment";
import { getToken } from "@/utils/auth.js";
import { signFigures } from '../../utils/floatToInt.js'
export default {
  data() {
    return {
      imageUrl: "",
      value6: "",
      input1: "",
      popup: "",
      total: 1,
      h1text: "",
      pageNo: 1,
      pageSize: 10,
      currentPage: 1,
      search: "",
      headers: {
        Authorization: "Bearer " + getToken()
      },

      form: {
        isDelete: 0,
        name: "",
        price: "",
        period: "",
        profitRate: "",
        // enabled: "1",
        exInfo: "",
        profit_distribute: "",
        num: "",
        sort: "",
        profit_rate: "",
        picUrl: ""
      },

      FC: false,
      list: [],
      time: "",
      times: "",
      allList: [],
      pageSize1: 2147483647,
      clickQueryDate: false,
      selectTime: false,
      imageUrlOk:false,
      resDate:{},
      imageFile:false
    };
  },
  // 时间搓
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
		formatrRate(rate){
		return signFigures(rate*100)
  }
},
  methods: {
    // 时间搓转换

    // 请求列表数据
    refresh() {
      // console.log(1111);
      all(this.pageNo, this.pageSize).then(res => {
        // console.log(res.list.profit_rate);
        // this.list = eval(res.list);
// 
//         this.total = res.total;
        // console.log(this.list.length)

//         for (var i = 0; i < this.list.length; i++) {
//           //  console.log(this.list[i].create_time| formatDate)
//           var percentage = parseFloat(this.list[i].profit_rate);
//           console.log(percentage);
// 
//           var str = percentage * 100;
//           // str += "%";
//           this.list[i].profit_rate = str;
//         }
        // console.log(this.list);
        this.list = res.list;
        this.total = res.total;
      });
    },
    getDate() {
      queryAll(this.pageNo, this.pageSize1,this.time, this.times).then(res => {
        // console.log(res.list.profit_rate);
        this.allList = eval(res.list);
        // console.log(this.list.length)

        for (var i = 0; i < this.allList.length; i++) {
          //  console.log(this.list[i].create_time| formatDate)
          var percentage = this.allList[i].profit_rate;
          // console.log(percentage);
          var str = Number(percentage * 100);
          // str += "%";
          this.allList[i].profit_rate = str;
        }

        let date = JSON.parse(JSON.stringify(this.allList));
        date.forEach((v, i) => {
          date[i].is_delete = date[i].is_delete === 1 ? "未启用" : "已启用";
          date[i].create_time = moment(date[i].create_time).format(
            "YYYY-MM-DD"
          );
        });

        require.ensure([], () => {
          const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
          const tHeader = [
            "创建时间",
            "产品名称",
            "价格（美金)",
            "周期（天）",
            "回报率(%)",
            "收益分配",
            "当前状态"
          ]; //将对应的属性名转换成中文
          // const tHeader = [];
          const filterVal = [
            "create_time",
            "name",
            "price",
            "period",
            "profit_rate",
            "profit_distribute",
            "is_delete"
          ]; //table表格中对应的属性名
          const list = date; //想要导出的数据
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, "组合产品列表excel");
        });
      });
    },
    download() {
      this.getDate();
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // table样式
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
    // 分页器
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(val);
      // console.log(this.list);
      // console.log(`每页 ${val} 条`);
      this.refresh();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      console.log(this.list);
      // console.log(val);
      // console.log(`当前页: ${val}`);
      if (this.clickQueryDate == false) {
        this.refresh();
      } else {
        if (this.selectTime) {
          queryAll(this.pageNo, this.pageSize, this.time, this.times).then(
            res => {
              this.total = res.total;
              this.list = eval(res.list);
            }
          );
        } else {
          queryAll(this.pageNo, this.pageSize, "", "").then(res => {
            this.total = res.total;
            this.allList = eval(res.list);
          });
        }
      }
    },
    // 查询
    queryDate() {
      this.clickQueryDate = true;
      if (this.selectTime) {
        this.time = moment(this.value6[0]).format("YYYY-MM-DD");
        this.times = moment(this.value6[1]).format("YYYY-MM-DD");

        queryAll(this.pageNo, this.pageSize, this.time, this.times).then(
          res => {
            this.total = res.total;
            this.list = eval(res.list);
            for (var i = 0; i < this.list.length; i++) {
              //  console.log(this.list[i].create_time| formatDate)
              var percentage = parseFloat(this.list[i].profit_rate);
              // console.log(percentage);
              var str = Number(percentage * 100);
              // str += "%";
              this.list[i].profit_rate = str;
            }
          }
        );
        queryAll(this.pageNo, this.pageSize1, this.time, this.times).then(
          res => {
            this.total = res.total;
            for (var i = 0; i < this.allList.length; i++) {
              //  console.log(this.list[i].create_time| formatDate)
              var percentage = this.allList[i].profit_rate;
              // console.log(percentage);

              var str = Number(percentage * 100);
              // str += "%";
              this.allList[i].profit_rate = str;
            }
            this.allList = eval(res.list);
          }
        );
      } else {
        queryAll(this.pageNo, this.pageSize, "", "").then(res => {
          this.total = res.total;
          this.list = eval(res.list);
          for (var i = 0; i < this.list.length; i++) {
            //  console.log(this.list[i].create_time| formatDate)
            var percentage = this.list[i].profit_rate;
            // console.log(percentage);

            var str = Number(percentage * 100);
            // str += "%";
            this.list[i].profit_rate = str;
          }
        });
        queryAll(this.pageNo, this.pageSize1, "", "").then(res => {
          this.total = res.total;
          for (var i = 0; i < this.allList.length; i++) {
            //  console.log(this.list[i].create_time| formatDate)
            var percentage = this.allList[i].profit_rate;
            // console.log(percentage);

            var str = Number(percentage * 100);
            // str += "%";
            this.allList[i].profit_rate = str;
          }
          this.allList = eval(res.list);
        });
      }
    },
    //删除

    handleDelete($index, row) {
      this.$confirm("此操作将永久删除该条模板, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleter(row.id);
        // this.list.splice($index, 1);
        // localStorage.setItem('tempList', JSON.stringify(this.tempList))
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        // var _this = this;
        // this.$nextTick(function() {
        //   _this.refresh();
        // });
        setTimeout(function() {
          location.reload();
        }, 100);

        // .catch(err => {
        //     this.$message({
        //       type: "error",
        //       message: err
        //     });
        //   });
      });
    },
    // 编辑

    handleEdit(index, row) {

      this.h1text = "编辑";
      this.popup = 1;
      this.FC = true;
      console.log(Number(this.list[index].profit_rate / 100));
      var profit_rate = Number(this.list[index].profit_rate / 100);
    
      this.form = this.list[index];
      this.form.profitRate = profit_rate;
      this.form.profitDistribute = this.list[index].profit_distribute;
      this.imageUrl=this.list[index].pic_url;
        this.form.picUrl = this.list[index].pic_url;
      if(this.list[index].pic_url){ 
        this.imageFile=true
        
      }
  
       
   this.resDate = JSON.parse(JSON.stringify(this.list));
      
      // update(this.form);
      // this.FC = false;
      // var _this = this;
      // this.$nextTick(function() {
      //   _this.refresh();
      // });
    },
    appear() {
      this.popup = 2;
      this.h1text = "新增";
      this.FC = true;

      this.form.name = "";
      this.form.price = "";
      this.form.period = "";
      this.form.profitRate = "";
      // this.form.enabled = "";
      this.form.exInfo = "";
      this.form.profitDistribute = "";
      this.form.num = "";
      this.form.sort = "";
      this.form.profit_rate = "";
      this.form.picUrl = "";
    },
    // 弹框展现与隐藏
    increase() {
      if (this.FC == false) {
        // console.log(123);
        this.FC = true;
       
      } else {
        this.FC = false;
        // this.list=this.resDate
        // console.log(1243);
        this.imageUrl = "";
       this. imageUrlOk =false
      }
    },
    // 添加数据
    confirm() {
      // console.log(this.form.enabled);
      // 判断浮层数据是否为空
      switch (this.popup) {
        case 1:
          if (this.form.name == "") {
            this.$message.warning("请输入产品名称");

            return;
          } else if (this.form.price =="") {
            this.$message.warning("请输入产品价格");
            return;
          } else if (this.form.period == "") {
            this.$message.warning("请输入产品周期");
            return;
          } else if (this.form.profitRate == "") {
            this.$message.warning("请输入回报率");
            return;
          } else if (this.form.num == "") {
            this.$message.warning("请输入设备数量");
            return;
          } else if (this.form.profitDistribute == "") {
            this.$message.warning("请输入收益分配");
            return;
          } else if (this.form.sort == "") {
            this.$message.warning("请输入次序");
            return;
          } else if (this.imageFile==false&&this.imageUrlOk == false) {
            this.$message.warning("请上传图片");
            return;
          } else {
            console.log(this.form);
            update(this.form).then(res => {
              console.log(res);
            });
            this.FC = false;
            this.form = "";
            setTimeout(function() {
              location.reload();
            }, 300);
          }
          break;
        case 2:
          if (this.form.name == "") {
            this.$message.warning("请输入产品名称");

            return;
          } else if (this.form.price == "") {
            this.$message.warning("请输入产品价格");
            return;
          } else if (this.form.period == "") {
            this.$message.warning("请输入产品周期");
            return;
          } else if (this.form.profitRate == "") {
            this.$message.warning("请输入回报率");
            return;
          } else if (this.form.num == "") {
            this.$message.warning("请输入设备数量");
            return;
          } else if (this.form.profitDistribute == "") {
            this.$message.warning("请输入收益分配");
            return;
          } else if (this.form.sort == "") {
            this.$message.warning("请输入次序");
            return;
          } else if (this.imageFile==false&&this.imageUrlOk == false) {
            this.$message.warning("请上传图片");
            return;
          } else {
            console.log(this.form);
            add(this.form).then(res => {
              console.log(res);
            }),
              (this.FC = false);
            // this.form = "";

            setTimeout(function() {
              location.reload();
            }, 300);
          }
      }
      // debugger;
    },
    //上传照片
    handleAvatarSuccess(res, file) {
      console.log(res);

      this.imageUrl = URL.createObjectURL(file.raw);

      if (res.msg == "图片上传重复限制") {
        return this.$message.error(res.msg);
      } else if (res.msg == "图片上传成功!") {
        this.$message.success(res.msg);
        this.imageUrlOk=true
        this.form.picUrl = res.url;
        console.log(res.url);
        
      } else {
        return this.$message.error("图片上传失败");
      }
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
.el-input__inner {
  height: 30px !important;
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
// 上传照片
.avatar-uploader {
  display: inline-block;
  margin-left: 9px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid gainsboro;
  em {
    font-size: 16px;
  }
}
.avatar {
  width: 160px;
  height: 100px;
  display: block;
}
</style>

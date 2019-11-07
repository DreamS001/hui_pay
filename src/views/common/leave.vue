<template>
  <div class="wscn-http404-container">
    <div class="nav-a"  style="min-width:1000px">
      <div class="block" style="width:100%!important;white-space: nowrap ">
        <span class="demonstration">自定义查询：</span>
        <el-date-picker
          v-model="value6"
          type="daterange"
          size="mini"
          range-separator="至"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :start-placeholder="time"
          :end-placeholder="time"
        ></el-date-picker>

        <span class="demonstration" style="margin-left:20px">投资人名称：</span>
        <input style="width:200px" type="text" v-model="merchant" />
        <span class="time" style="margin-left:2%" @click="inquire">查询</span>
        <span class="time" style="background:#09BD22 ">导出</span>
        <span
          class="time span-style"
          style="background:#00C3DA; width: 90px;
          float: right;
    
    margin-right: 50px"
          @click="newdata"
        >新建留言</span>
      </div>
    </div>
    <div style="width:100%!important;margin:20px">
      <el-table
        :data="list"
        style="width: 100%!important"
        stripe
        :header-cell-class-name="handlemyclass"
      >
        <el-table-column :cell-class-name="colorblueclass"  label="留言时间">
          <template slot-scope="scope">
            {{scope.row.create_time|dateFormat}}
          </template>
        </el-table-column>
        <!-- <el-table-column :cell-class-name="colorblueclass"  label="留言时间">
          <template slot-scope="scope">
            {{5000|toUSD}}
          </template>
        </el-table-column> -->
        <el-table-column prop="investor_name" label="投资人名称" width="150"></el-table-column>
        <el-table-column prop="content" label="留言内容"></el-table-column>
        <el-table-column prop="reply" label="回复内容"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">回复</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-bottom:50px;padding-bottom:20px" >
      <el-pagination
        @size-change="handlePageChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 弹框 -->
    <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <span>留言</span>
          <img @click="increase" src="../../assets/logo/cuo.png" alt />
        </h4>
        <textarea
          v-if="popup==2"
          name
          id
          cols="30"
          rows="10"
          placeholder="请输入留言"
          v-model="date.content"
        ></textarea>
        <textarea
          v-if="popup==1"
          name
          id
          cols="30"
          rows="10"
          placeholder="请回复留言"
          v-model="form.reply"
        ></textarea>
        <p class="button">
          <span @click="confirms">确定</span>
          <span @click="increase">取消</span>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { messageAll, deleter, add, update } from "@/api/message";
import { constants } from "crypto";
export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 1,
      popup: "",
      merchant: "",
      value6: "",
      currentPage4: 1,
      device: "",
      list: [],
      time: "",
      times: "",
      starDate:'',
      endDate:'',
      FC: false,
      form: {
        reply: ""
      },
      date: {
        content: ""
      },
      id: ""
    };
  },
  methods: {
    // 查询
    inquire() {
      console.log(this.value6);
      var that = this;
      // for (let i = 0; i < this.list.length; i++) {
      //   if (that.list[i].investor_name == that.merchant) {
      //     console.log(that.merchant);
      //   }
      // }
      if(this.value6==null){
        this.starDate=''
        this.endDate=''
      }else{
        this.starDate=this.value6[0]
        this.endDate=this.value6[1]
      }
      this.refresh();
    },
    // 请求数据
    refresh() {
      console.log(1111);
      messageAll(this.pageNo, this.pageSize,this.starDate,this.endDate).then(res => {
        console.log(res);
        this.list = eval(res.data.list);
        this.total = res.data.total;
        // alert(this.total)
      });
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
    handlePageChange(val) {
      this.pageSize = val;
      // alert(this.pageSize)
      this.refresh();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      // alert(this.pageNo)
      this.refresh();
    },

    increase() {
      this.FC = false;
    },
    // 回复留言

    handleEdit($index, row) {
      console.log(row.id);
      this.form.reply = "";
      this.id = row.id;
      this.FC = true;
      this.popup = 1;
    },
    // 添加留言
    newdata() {
      this.popup = 2;
      this.FC = true;
      this.date.content = "";
    },
    // 确定
    confirms() {
      // console.log(this.popup);
      if (this.popup == 2) {
        if (this.date.content == "") {
          alert("内容不能为空");
        } else {
          console.log(this.date.content);
          add(this.date);
          this.$message({
            message: "恭喜你！添加成功",
            type: "success"
          });
          this.FC = false;
           setTimeout(function() {
            location.reload();
          }, 300);
        }
      }

      if (this.popup == 1) {
        if (this.form.reply == "") {
          alert("内容不能为空");
        } else {
          console.log(this.form.reply);
          update(this.id, this.form);
          this.FC = false;
          // this.form.reply = "";
          setTimeout(function() {
            location.reload();
          }, 300);
        }
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
          setTimeout(function() {
            location.reload();
          }, 300)
        //   .catch(err => {
        //   this.$message({
        //     type: "error",
        //     message: err
        //   });
        // });
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
      var strDate = date.getDate() + 1;
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
  },
  // 时间过滤器
   filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
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
}
.time {
  // width: 60px;
  // height: 30px;
  background: #4986ff;
  font-size: 12px;
  padding: 8px 20px;
  color: #f0f2f5;
  margin: 0 0.4%;
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
    height: 310px;
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
    textarea {
      width: 94%;
      height: 150px;
      margin: 3%;
    }
  }
}

.button {
  display: flex;
  justify-content: center;
  margin: 0;
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
.el-table::before {
  width: 0;
}
</style>

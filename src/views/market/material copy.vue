<template>
 <!--   素材中心/我的素材-->
  <div class="wscn-http404-container">
    <div class="el-ui-content">
      <div class="el-ui-title">
        我的素材
      </div>
      <div class="table-box" style="">
        <div class="table-content">
          <ul>
            <li v-for="(i,index) in selectLi" v-bind:key="index" :class="isActive==i.id?'active':''" @click="selectBtn(i.id)">
              {{i.name}}
            </li>
          </ul>
          <div class="btn-group">
            <div>
              <el-alert title="视频素材修改名称，请直接点击视频名称" :closable="closable" type="info" v-if="isActive==2" show-icon></el-alert>
            </div>
            <el-button class="btn" type="primary">分组管理</el-button>
            <el-button class="btn" type="primary">未分组</el-button>
          </div>
          <div v-if="isActive==1" class="card-el">
            <div class="data-box">
              <div class="content-box">
                <div class="content-top">
                  <el-button type="primary">上传素材</el-button>
                  <el-button type="primary">批量操作</el-button>
                  <el-checkbox v-model="pictureChecked" style="margin-left:20px;" @change="selectAll">全选</el-checkbox>
                </div>
                <div class="item-box">
                   <!-- @mouseleave="hiddenCover(index)" -->
                  <div class="imageItem" v-for="(i,index) in dataShowList" v-bind:key="index" @mouseenter="showCover(index)" @mouseleave="hiddenCover(index)">
                    <div class="image-box">
                      <el-image style="width: 130px; height: 130px" src="http://fp.jie360.com.cn/uploads/1/1/image/201910251723296c7dc9015.png" fit="contain"></el-image>
                      <span class="image-meta">1920*601</span>
                      <div class="image-cover" v-show="index==showcover || showList.includes(index)">
                        <div class="image-cover-checkbox">
                          <el-checkbox :v-model="showList.includes(index)" @change="selectDanXuan(index)"></el-checkbox>
                        </div> 
                        <div class="image-cover-footer">
                          <span><span class="el-popover__reference" aria-describedby="el-popover-3391" tabindex="0">移动</span>
                          </span> 
                          <span>改名</span> <!----> 
                          <span><span class="el-popover__reference" aria-describedby="el-popover-8016" tabindex="0">复制</span></span> 
                          <span><span class="el-popover__reference" aria-describedby="el-popover-6661" @mouseenter="showDelete" tabindex="0">删除</span></span>
                        </div>
                      </div>
                    </div>
                    <div class="image-footer">
                      <div class="imageName">首页.png</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 分页器 -->
              <div class="block" style="padding-left:5px;box-sizing: border-box;margin: 0 0 20px 0;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" ></el-pagination>
              </div>
            </div>
          </div>
          <div v-else class="card-el">
            <div class="data-box">
              <div class="content-box">
                <div class="content-top">
                  <el-button type="primary">上传素材</el-button>
                  <el-button type="primary">批量操作</el-button>
                  <el-checkbox v-model="checked" style="margin-left:20px;">全选</el-checkbox>
                </div>
                <div class="item-box"  style="display: none;">
                  <div class="imageItem">
                    <div class="image-box">
                      <el-image style="width: 130px; height: 130px" src="http://fp.jie360.com.cn/uploads/1/1/image/201910251723296c7dc9015.png" fit="contain"></el-image>
                      <span class="image-meta">1920*601</span>
                      <div class="image-cover" style="display: none;">
                        <div class="image-cover-checkbox">
                          <el-checkbox v-model="checked" @change="selectDanXuan(index)"></el-checkbox>
                        </div> 
                        <div class="image-cover-footer">
                          <span><span class="el-popover__reference" aria-describedby="el-popover-3391" tabindex="0">移动</span>
                          </span> 
                          <span>改名</span> <!----> 
                          <span><span class="el-popover__reference" aria-describedby="el-popover-8016" tabindex="0">复制</span></span> 
                          <span><span class="el-popover__reference" aria-describedby="el-popover-6661" @mouseenter="showDelete" tabindex="0">删除</span></span>
                        </div>
                      </div>
                    </div>
                    <div class="image-footer">
                      <div class="imageName">首页.png</div>
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="noFile" style="">
                    <img src="http://fp.jie360.com.cn/assets/common/images/nopic.png" alt=""> 
                    <div>空空如也，去上传素材吧～</div>
                  </div>
                </div>
              </div>
              <!-- 分页器 -->
              <div class="block" style="padding-left:5px;box-sizing: border-box;margin: 0 0 20px 0;display: none;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" ></el-pagination>
              </div>
            </div>
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
      closable:false,
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

      selectLi:[{id:1,name:'图片素材'},{id:2,name:'视频素材'}],
      isActive:1,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      checked:false,
      pictureChecked:false,
      showcover:9999999,
      showList:[],
      dataShowList:[0,1,2,3,4,5,6,7,8,9]
    };
  },
  components:{

  },
  methods: {
    showCover(e){
      // console.log(e)
      this.showcover=e
    },
    hiddenCover(e){
      console.log(e)
      if(this.pictureChecked){
        this.showcover=9999999
      }else{
        if(this.showList.includes(e)){
          this.showcover=e
        }else{
          this.showcover=9999999
        }
      }
    },
    selectDanXuan(e){
      console.log(e)
      // includes() 方法判断是否包含某一元素,返回 true 或 false 表示是否包含元素,对 NaN一样有效
      if (this.showList.includes(e)) {
        // filter() 方法用于把 Array 的某些元素过滤掉, filter() 把传入的函数依次作用于每个元素,然后根据返回值是 true 还是 false 决定保留还是丢弃该元素: 生成新的数组
        this.showList = this.showList.filter(item => {
          return item !== e
          // 当filter() 为假时删除元素
        })
      } else {
        this.showList.push(e)
        console.log(this.showList.length)
      }
      // console.log(this.showList)
      console.log(this.showList.length)
      this.pictureChecked=this.showList.length==this.dataShowList.length?true:false
    },
    selectAll(){
      // this.showList=[]
      if(this.pictureChecked){
        this.showList=this.dataShowList
      }else{
        this.showList=[]
      }
      console.log(this.showList)
    },
    selectBtn(e){
      this.isActive=e
    },
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
    showDelete(){

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
.table-content ul{
  // display: flex;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #E4E7ED;
  margin-bottom: 10px;
  height: 40px;
}
.table-content li{
  float: left;
  padding: 0 20px;
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  position: relative;
  border: 1px solid #E4E7ED;
  // border-bottom: 1px solid transparent;
  background: #FFF;
  cursor: pointer;
}
.table-content li:nth-of-type(1){
  border-right: 1px solid transparent;
}
.table-content li.active{
    border-bottom: 1px solid transparent;
    color: #409EFF;
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
.btn-group{
  // display: flex;
  // flex-direction: column;
}
.btn-group .btn{
  display: block;
  margin: 5px 10px;

}
.card-el{
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  color: #303133;
  transition: .3s;
}
.content-box{
  padding: 20px;
  box-sizing: border-box;
}
.content-top{

}
.item-box{
  display: flex;
  flex-flow: row wrap;
  margin-top: 20px;
}
.imageItem {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin:15px;
}
.image-box {
  display: inline-block;
  width: 150px;
  height: 168px;
  background: #f5f7fa;
  padding: 10px;
  padding-bottom: 28px;
  box-sizing: border-box;
  margin: 10px auto;
  position: relative;
}
.image-meta {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0px;
  text-align: center;
  font-size: 12px;
  line-height: 28px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}
.image-footer {
  width: 130px;
  height: 50px;
}
.imageName {
  white-space: nowrap;
  overflow: hidden;
  width: 130px;
  box-sizing: border-box;
  margin: 0 auto;
  text-align: center;
}
.image-cover {
  width: 150px;
  height: 168px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.image-cover-checkbox {
  padding: 10px;
  box-sizing: border-box;
}
.image-cover-footer {
  width: 100%;
  height: 28px;
  /* display: none; */
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
}
.noFile {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

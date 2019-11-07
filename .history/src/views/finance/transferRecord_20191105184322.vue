<template>
  <div class="wscn-http404-container">
    <div class="papel-box">
      <div class="nav-a">
        <div class="block" style="width:100%;">
		<el-input v-model="nickname" placeholder="昵称" clearable></el-input>
          <div class="operation">
            <span class="time" style="margin-left:20px" @click="queryData">查询</span>
            <span class="time" style="background:#fff;border: 1px solid #DCDFE6;color: #606266;">清空</span>
          </div>
        </div>
      </div>
      <div style="width:100%!important;" class="table-box">
        <el-table :data="list" style="width: 100%!important" stripe :header-cell-class-name="handlemyclass">
          <el-table-column prop="id" label="标识" v-model="id"></el-table-column>
          <el-table-column prop="nickname" label="昵称" v-model="nickname"></el-table-column>
          <el-table-column prop="username" label="用户名" v-model="username"></el-table-column>
          <el-table-column prop="phone" label="电话" v-model="phone"></el-table-column>
          <el-table-column prop="password" label="密码" v-model="password"></el-table-column>
          <el-table-column prop="loc_info" label="操作"></el-table-column>
        </el-table>
      </div>
      <div class="block" style="margin-top:10px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10,20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { users1Query} from "@/api/users1.js";
import {formatDate} from '../../utils/date.js'
import moment from "moment";
export default {
	data() {
		return {
			pageNumber: 1,
			pageSize: 10,
			total: 1,
			device: "",
			list: [],
			allList:[],
			nickname:"",//昵称
			nicknameValue:"",//昵称保存值，防止因叉号变成undefined
			id:"",//标识
			nickname:"",//昵称
			username:"",//用户名
			phone:"",//电话
			password:"",//密码
			maxPageSize:2147483647
		};
	},
	filters: {
	},
	methods: {
		// 请求全部数据
		request() {
			users1Query(this.pageNumber, this.pageSize, this.nickname).then(res => {
				this.allList = eval(res.data.list);
				let data = this.allList;
				this.list = data
				this.total = res.data.pager.recordCount
			});
		},
		getData(){
			users1Query(this.pageNumber, this.maxPageSize, this.nickname).then(res => {
				this.allList = eval(res.data.list);
				let data = JSON.parse(JSON.stringify(this.allList));
				this.list = data
				require.ensure([], () => {
					const { export_json_to_excel } = require("@/utils/Export2Excel.js") //引入文件
					const tHeader = ["标识","昵称","用户名","电话","密码"] //将对应的属性名转换成中文
					const filterVal = ["id","nickname","username","phone","password"] //table表格中对应的属性名
					const list = data //想要导出的数据
					const data = this.formatJson(filterVal, list)
					export_json_to_excel(tHeader, data, "设备交易记录excel")
				});
			});
		},
		queryData() {
			this.pageNumber=1
			this.request()
		},
		// 导出
		download() {
			this.getData()
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => v[j]));
		},
		handlemyclass: function(row, column, rowIndex, columnIndex) {
			return "test"
		},
		colorblueclass: function(row, column, rowIndex, columnIndex) {
			if (columnIndex == 2) {
				return "blue"
			}
		},
		handleSizeChange(val) {
			this.pageSize = val
			this.request()
		},
		handleCurrentChange(val) {
			this.pageNumber = val
			this.request()
		}
	},
	created() {
		var date = new Date()
		this.startPlaceHoler = formatDate(date, 'yyyy-MM-dd')
		this.endPlaceHoler = formatDate(date, 'yyyy-MM-dd')
		this.beginDate = ''
		this.endDate = ''
		this.request()
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
  margin: 0 20px;
  border-radius: 3px;
  cursor: pointer
}
.blue {
  color: #2cc23c !important;
}
.create_time{
  margin-top: 20px;
  display: inline-block;
  height:40px;
}
.operation{
  margin-top: 20px;
  display: inline-block;
}
</style>
<style>
.el-button{
  padding:8px 20px !important;
  box-sizing: border-box;
}
.nav-a .el-input{
  margin-top: 20px;
  width:220px !important;

}
.nav-a .el-input__inner{
  width:220px;
}
.nav-a .el-input--suffix .el-input__inner{
  width:220px;
}
.nav-a .el-select__tags{
  margin-top: 10px;
}
.nav-a  .el-range-editor--mini.el-input__inner{
  height:40px;
}
.nav-a .el-date-editor .el-range-separator{
  padding:5px;
}
.nav-a .el-range-editor--mini .el-range__icon,.nav-a .el-range-editor--mini .el-range__close-icon{
  line-height:32px;
}
</style>

<template>
  <div class="wscn-http404-container">
    <div class="papel-box">
      <div class="nav-a">
        <div class="block" style="width:100%;">
		<el-input v-model="count" placeholder="操作内容"></el-input>
		<el-input v-model="operator_id" placeholder="操作人ID"></el-input>
          <el-select v-model="type" multiple placeholder="请选择" style="width:220px;">
            <el-option label="合伙人" value="1"></el-option>
            <el-option label="代理商" value="2"></el-option>
            <el-option label="商户" value="3"></el-option>
          </el-select>
		<div class='create_time'>
          <span class="demonstration">创建时间：</span>
          <el-date-picker v-model="addtime" type="daterange" size="mini" range-separator="至" :start-placeholder="startPlaceHoler" :end-placeholder="endPlaceHoler"></el-date-picker>
        </div>
          <div class="operation">
            <span class="time" style="margin-left:20px" @click="queryData">查询</span>
            <span class="time" style="background:#fff;border: 1px solid #DCDFE6;color: #606266;">清空</span>
          </div>
        </div>
      </div>
      <div style="width:100%!important;" class="table-box">
        <el-table :data="list" style="width: 100%!important" stripe :header-cell-class-name="handlemyclass">
          <el-table-column prop="count" label="操作内容" v-model="count"></el-table-column>
          <el-table-column prop="type" label="状态">
            <template slot-scope="scope">{{scope.row.type|formatType}}</template>
          </el-table-column>
          <el-table-column prop="addtime" label="操作时间" v-model="addtime"></el-table-column>
          <el-table-column prop="operatorId" label="操作人id" v-model="operatorId"></el-table-column>
          <el-table-column prop="webIp" label="访问ip" v-model="webIp"></el-table-column>
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
import { logQuery} from "@/api/log.js";
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
			startPlaceHoler: "",
			endPlaceHoler: "",
			allList:[],
			count:"",//操作内容
			operator_id:"",//操作人ID
			type:"",//用户类型
			addtime:"",//创建时间
			count:"",//操作内容
			addtime:"",//操作时间
			operatorId:"",//操作人id
			webIp:"",//访问ip
			maxPageSize:2147483647
		};
	},
	filters: {
	    formatType(type){
			return  type==1?'合伙人':type==2?'代理商':type==3?'商户':'未知状态'
		}
	},
	methods: {
		// 请求全部数据
		request() {
			logQuery(this.pageNumber, this.pageSize, this.count, this.operator_id, this.type, this.addtime).then(res => {
        this.allList = eval(res.data.list);
				let date = JSON.parse(JSON.stringify(this.allList));
				// 转换时间戳
				date.forEach((v, i) => {
					date[i].addtime = moment((date[i].addtime)*1000).format("YYYY-MM-DD hh:mm:ss");
				});
				this.list = date
        this.total = res.data.pager.recordCount

			});
		},
		getData(){
			logQuery(this.pageNumber, this.maxPageSize, this.count, this.operator_id, this.type, this.addtime).then(res => {
				this.allList = eval(res.data.list);
				let date = JSON.parse(JSON.stringify(this.allList));
				// 转换时间戳
				date.forEach((v, i) => {
					date[i].complete_time = moment(date[i].complete_time).format("YYYY-MM-DD");
				});
				require.ensure([], () => {
					const { export_json_to_excel } = require("@/utils/Export2Excel.js") //引入文件
					const tHeader = ["操作内容","类型","操作时间","操作人id","访问ip"] //将对应的属性名转换成中文
					const filterVal = ["count","type","addtime","operatorId","webIp"] //table表格中对应的属性名
					const list = date //想要导出的数据
					const data = this.formatJson(filterVal, list)
					export_json_to_excel(tHeader, data, "设备交易记录excel")
				});
			});
		},
		queryData() {
			this.pageNumber=1
			this.clickQueryDate = true
			this.time = moment(this.value6[0]).format("YYYY-MM-DD")
			this.times = moment(this.value6[1]).format("YYYY-MM-DD")
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
  height:40px;

}
.nav-a .el-input__inner{
  width:220px;
}
.nav-a .el-input--suffix .el-input__inner{
  width:220px;
}
.nav-a .el-select__tags{
  margin-bottom:0;
  height: 40px;
  margin-top: 10px;
}
</style>

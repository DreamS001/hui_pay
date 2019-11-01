<template>
  <div class="app-container">
    <div class="add-btn">
      <el-button type="primary" @click="addSqlBtn" class="add-btn" style="">新增</el-button>
    </div>

    <div class="table-box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="crudName" label="名称" width="180"></el-table-column>
        <el-table-column prop="crudCode" label="代码" width="180"></el-table-column>
        <el-table-column prop="domainClass" label="类名"></el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="modifyTime" label="修改时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.modifyTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="s-btn" type="primary" @click="edited(scope.row.crudId)">编辑</el-button>
            <el-button class="s-btn" type="danger" @click="deled(scope.row.crudId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>

    <el-drawer :title="title" :visible.sync="drawer" :direction="direction" :before-close="handleClose" :show-close="false" ref="drawer" >
      <el-form label-width="100px" style="width:95%;padding-left: 60px;box-sizing: border-box;" class="demo-ruleForm">
        <el-form-item label="名称">
          <el-input v-model="crudName" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="代码">
          <el-input v-model="crudCode" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="类名">
          <el-select style="width:100%;" v-model="domainClass" filterable  placeholder="请选择类名" value-key="className" @change="selectName">
            <el-option :label="i.className" :value="i" v-for="(i,index) in classNames" v-bind:key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检查非空">
          <el-select style="width:100%;"  v-model="emptyColumns" multiple placeholder="请选择">
            <el-option v-for="(item,index) in checkEmptys" :key="index" :label="item.propName" :value="item.propName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检查唯一">
          <el-select style="width:100%;"  v-model="uniqueColumns" multiple placeholder="请选择">
            <el-option v-for="(item,index) in uniqueColumnsList" :key="index" :label="item.propName" :value="item.propName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据SQL">
          <el-input type="textarea" style="min-height:130px;width:45%;" v-model="dataSql"></el-input>
          <el-select style="width:15.5%;"  v-model="firstLevel" placeholder="请选择" value-key="tableName" @change="selectTableName">
            <el-option v-for="(item,index) in tableList1" :key="index" :label="item.tableName" :value="item"></el-option>
          </el-select>
          <el-select style="width:38.8%;"  v-model="secondLevel" multiple placeholder="请选择" value-key="columnName" @change="selectSecondLevel">
            <el-option v-for="(item,index) in tableList2" :key="index" :label="item.columnName" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计数SQL">
          <el-input type="textarea" v-model="countSql"></el-input>
        </el-form-item>
        <el-form-item label="条件查询">
          <div class="add-cloun" @click="addQueryBtn"><i class="el-icon-plus"></i></div>
          <div class="queryList" v-for="(i,index) in conditions" v-bind:key="index">
            <el-input style="width:20%" v-model="i.columnCode" placeholder="代码"></el-input>
            <el-input style="width:20%" v-model="i.columnName" placeholder="名称"></el-input>
            <el-select style="width:20%;"  v-model="i.compare" placeholder="请选择">
              <el-option label="大于" value=">"></el-option>
              <el-option label="大于等于" value=">="></el-option>
              <el-option label="等于" value="="></el-option>
              <el-option label="小于" value="<"></el-option>
              <el-option label="小于等于" value="<="></el-option>
              <el-option label="like" value="like"></el-option>
            </el-select>
            <el-select style="width:20%;"  v-model="i.joinType" placeholder="请选择">
              <el-option label="或" value="or"></el-option>
              <el-option label="且" value="and"></el-option>
            </el-select>
            <el-select style="width:20%;" allow-create filterable  v-model="i.cndType" placeholder="请选择">
              <el-option label="当前系统时间(Date)" value="system_date"></el-option>
              <el-option label="当前系统时间(YYYY_MM_DD 00:00:00)" value="system_today_date"></el-option>
              <el-option label="当前系统时间(YYYY_MM_DD_HH_MM_SS)" value="system_time"></el-option>
              <el-option label="当前系统时间(分钟数)" value="system_minute"></el-option>
              <el-option label="当前系统时间(秒数)" value="system_second"></el-option>
              <el-option label="当前登录用户ID" value="system_security_user_id"></el-option>
            </el-select>
            <el-button class="delete-btn" type="danger" data-id="index" @click="deleteQueryData(index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="默认值">
          <div class="add-cloun" @click="addDefaultBtn"><i class="el-icon-plus"></i></div>
          <div class="queryList" v-for="(i,index) in sqlArgs" v-bind:key="index" style="width:60%;">
            <el-input style="width:35%" v-model="i.columnCode" placeholder="代码"></el-input>
            <el-input style="width:35%" v-model="i.columnName" placeholder="名称"></el-input>
            <el-select style="width:35%;" allow-create filterable  v-model="i.argsType" placeholder="请选择">
              <el-option label="当前系统时间(Date)" value="system_date"></el-option>
              <el-option label="当前系统时间(YYYY_MM_DD 00:00:00)" value="system_today_date"></el-option>
              <el-option label="当前系统时间(YYYY_MM_DD_HH_MM_SS)" value="system_time"></el-option>
              <el-option label="当前系统时间(分钟数)" value="system_minute"></el-option>
              <el-option label="当前系统时间(秒数)" value="system_second"></el-option>
              <el-option label="当前登录用户ID" value="system_security_user_id"></el-option>
            </el-select>
            <el-button class="delete-btn" type="danger" data-id="index" @click="deleteDefaultData(index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="显示列名">
          <el-input v-model="displayNames" style="width:100%;"></el-input>
        </el-form-item>
         <el-form-item label="结果列名">
          <el-input v-model="queryColumns" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="字典">
          <el-select v-model="dicts" multiple placeholder="请选择" style="width:100%;" @click="queryDict">
            <el-option v-for="(item,index) in dictList" :key="index" :label="item.key" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" class="set-form">
          <el-input v-model="orderColumns" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="固定条件">
          <el-input type="textarea" v-model="queryAppend"></el-input>
        </el-form-item>
        <el-form-item label="insertLinks">
          <el-select v-model="insertLinks" multiple placeholder="请选择" style="width:100%;">
            <el-option v-for="(item,index) in crList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="insertWith">
          <el-select v-model="insertWith" multiple placeholder="请选择" style="width:100%;">
            <el-option v-for="(item,index) in crList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="insertRelation">
          <el-select v-model="insertRelation" multiple placeholder="请选择" style="width:100%;">
            <el-option v-for="(item,index) in crList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="updateLinks">
          <el-select v-model="updateLinks" multiple placeholder="请选择" style="width:100%;">
            <el-option v-for="(item,index) in crList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="updateWith">
          <el-select v-model="updateWith" multiple placeholder="请选择" style="width:100%;">
            <el-option v-for="(item,index) in crList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="updateRelation">
          <el-select v-model="updateRelation" multiple placeholder="请选择" style="width:100%;">
            <el-option v-for="(item,index) in crList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="deleteLinks">
          <el-select v-model="deleteLinks" multiple placeholder="请选择" style="width:100%;">
            <el-option v-for="(item,index) in crList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="deleteWith">
          <el-select v-model="deleteWith" multiple placeholder="请选择" style="width:100%;">
            <el-option v-for="(item,index) in crList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="deleteRelation">
          <el-select v-model="deleteRelation" multiple placeholder="请选择" style="width:100%;">
            <el-option v-for="(item,index) in crList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="fetchLinks">
          <el-select v-model="fetchLinks" multiple placeholder="请选择" style="width:100%;">
            <el-option v-for="(item,index) in crList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否分页">
          <el-switch v-model="pager" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="执行方法">
          <el-input v-model="dataExecMethod" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()">确定</el-button>
          <el-button  @click="drawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>

import { getClassName,queryDict,queryRelation,sqlList,editData,addData,deleteData,getListData } from "@/api/system";
import { parseTime } from '@/utils/index'
export default {
  data() {
    return {
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1,
      total: 1,
      crudName:'',//名称
      crudCode:'',//代码
      emptyColumns:'',//检查非空
      uniqueColumns:'',//检查唯一
      domainClass:'',//类名
      dataSql:'',//数据sql
      countSql:'',//计数sql
      dicts:'',//字典
      pager:1,//是否分页 true=1 分页 false=2 不分页
      dataExecMethod:'',//执行方法
      displayNames:'',//显示列名
      queryColumns:'',//结果列名
      orderColumns:'',//排序
      queryAppend:'',//固定条件
      insertLinks:'',//插入关系0
      insertWith:'',//插入关系1
      insertRelation:'',//插入关系2
      updateLinks:'',//插入关系3
      updateWith:'',//插入关系4
      updateRelation:'',//插入关系5
      deleteLinks:'',//插入关系6
      deleteWith:'',//插入关系7
      deleteRelation:'',//插入关系8
      fetchLinks:'',//插入关系9
      drawer: false,//抽屉是否显示
      direction:'ttb',//抽屉从上向下
      title:'',//抽屉标题
      classNames:[],
      checkEmptys:[],//检查非空数组
      uniqueColumnsList:[],//检查唯一
      queryLength:0,//条件查询中数组数量
      defaultLength:0,//默认值中数组数量
      conditions:[{columnCode: '',columnName: "",compare: "",joinType: "",cndType: ""}],//条件查询
      sqlArgs:[{columnCode: '',columnName: "",argsType: ""}],//默认值
      dictList:[],//字典列表
      crList:[],//插入关系
      isAdd:1,//1为增加，2为编辑
      crudId:'',//点击编辑获取id
      tableList1:[],//所有表数据
      tableList2:[],//所有表数据二级
      firstLevel:'',//表一级
      secondLevel:'',//表二级
    }
  },
  created() {
    this.sqlList();
    this.request();
    this.queryDict();
    this.getListData();
  },
  methods: {
    parseTime,
    sqlList(){
      sqlList(this.pageNumber,this.pageSize).then(res=>{
        console.log(res)
        if(res.code==200){
          this.tableData=res.data.list
          this.total=res.data.pager.recordCount
        }
      })
    },
    request(){
      getClassName().then(res=>{
        console.log(res)
        if(res.code==200){
          this.classNames=res.data
        }
      })
    },
    selectName(e){
      this.checkEmptys=e.props
      this.uniqueColumnsList=e.props
      var className
      console.log(this.domainClass.className)
      this.queryDict(this.domainClass.className);
      this.queryRelation(this.domainClass.className)
    },
    //添加条件查询组
    addQueryBtn(){
      // this.queryLength=this.queryLength + 1
      this.conditions.push({columnCode: '',columnName: "",compare: "",joinType: "",cndType: ""})
      // console.log(this.queryLength)
    },
    //添加默认值组
    addDefaultBtn(){
      // this.defaultLength=this.defaultLength + 1
      this.sqlArgs.push({columnCode: '',columnName: "",argsType: ""})
    },
    //删除条件查询指定条数据
    deleteQueryData(index){
      console.log(index)
      this.conditions.splice(index,1)
    },
    //删除默认值指定数据
    deleteDefaultData(index){
      this.sqlArgs.splice(index,1)
      console.log(this.sqlArgs)
    },
    //点击排序设置
    settingBtn(){

    },

    //获取字典值
    queryDict(className){
      // var className
      // console.log(this.domainClass.className)
      if(className==undefined){
        className=''
      }else{
        className= '?clazz='+className
      }
      queryDict(className).then(res=>{
        console.log(res)
        if(res.code){
          this.dictList=res.data
        }
      })
    },
    //插入关系
    queryRelation(className){
      queryRelation(className).then(res=>{
        console.log(res)
        if(res.code==200){
          this.crList=res.data
        }
      })
    },
    //获取所有表数据(数据sql)
    getListData(){
      getListData().then(res=>{
        // console.log(res)
        if(res.code==200){
          this.tableList1=res.data
        }
      })
    },
    //点击一个获取表的二级(数据sql)
    selectTableName(e){
      console.log(e)
      this.tableList2=e.props
      //SELECT COUNT(e.pk) FROM this.firstLevel.tableName $condition
      this.countSql='SELECT COUNT('+e.pk+') FROM '+this.firstLevel.tableName+' $condition'
    },
    //点击二级(数据sql)
    selectSecondLevel(e){
      // console.log(e)
      const newArr=[]
      e.forEach((v,i)=>{
        // console.log(e[i].columnName+' '+e[i].propName)
        newArr.push(e[i].columnName+' '+e[i].propName)
      })
      // console.log(newArr.join(','))
      //${columns} e.
      //SELECT ${columns} FROM this.firstLevel $condition
      // console.log('SELECT '+ newArr.join(',')+' FROM '+this.firstLevel.tableName+' $condition')
      // console.log(this.firstLevel.tableName)
      this.dataSql='SELECT '+ newArr.join(',')+' FROM '+this.firstLevel.tableName+' $condition'
    },
    //新增
    addSqlBtn(){
      this.drawer = true
      this.isAdd=1
      this.title='新增'
      this.crudName=null,
      this.crudCode=null,
      this.domainClass=null,
      this.emptyColumns= null,
      this.uniqueColumns= null,
      this.dataSql=null,
      this.countSql=null,
      this.dicts= null,
      this.pager=1,
      this.orderColumns=null,
      this.dataExecMethod=null,
      this.displayNames=null,
      this.queryColumns=null,
      this.queryAppend=null,
      this.sqlArgs=[{columnCode: '',columnName: "",argsType: ""}],//默认值
      this.conditions=[{columnCode: '',columnName: "",compare: "",joinType: "",cndType: ""}],//条件查询
      this.insertLinks= null,
      this.insertWith= null,
      this.insertRelation= null,
      this.updateLinks= null,
      this.updateWith= null,
      this.updateRelation= null,
      this.deleteLinks= null,
      this.deleteWith= null,
      this.deleteRelation= null,
      this.fetchLinks= null
    },
    //编辑
    edited(id){
      console.log(id)
      this.crudId=id
      this.drawer = true
      this.isAdd=2
      this.title='编辑'
      editData(id).then(res=>{
        console.log(res)
        console.log(res.data.emptyColumns)
        if(res.code==200){
          this.crudName=res.data.crudName,
          this.crudCode=res.data.crudCode,
          this.domainClass=res.data.domainClass,
          this.emptyColumns= res.data.emptyColumns==''?null :res.data.emptyColumns==null?null: res.data.emptyColumns.split(","),//展示为数组.split(",")
          this.uniqueColumns= res.data.uniqueColumns==''?null :res.data.uniqueColumns==null?null : res.data.uniqueColumns.split(","),//展示为数组
          this.dataSql=res.data.dataSql,
          this.countSql=res.data.countSql,
          this.dicts= res.data.dicts==''?null : res.data.dicts==null?null : res.data.dicts.split(","),//展示为数组
          this.pager=res.data.pager,
          this.orderColumns=res.data.orderColumns,
          this.dataExecMethod=res.data.dataExecMethod,
          this.displayNames=res.data.displayNames,
          this.queryColumns=res.data.queryColumns,
          this.queryAppend=res.data.queryAppend,
          this.sqlArgs=res.data.sqlArgs,//默认值
          this.conditions=res.data.conditions,//选择条件
          this.insertLinks= res.data.insertLinks==''?null :res.data.insertLinks==null?null : res.data.insertLinks.split(","),//展示为数组
          this.insertWith= res.data.insertWith==''?null :res.data.insertWith==null?null : res.data.insertWith.split(","),//展示为数组
          this.insertRelation= res.data.insertRelation==''?null :res.data.insertRelation==null?null : res.data.insertRelation.split(","),//展示为数组
          this.updateLinks= res.data.updateLinks==''?null : res.data.updateLinks==null?null : res.data.updateLinks.split(","),//展示为数组
          this.updateWith= res.data.updateWith==''?null : res.data.updateWith==null?null : res.data.updateWith.split(","),//展示为数组
          this.updateRelation= res.data.updateRelation==''?null :res.data.updateRelation==null?null : res.data.updateRelation.split(","),//展示为数组
          this.deleteLinks= res.data.deleteLinks==''?null :res.data.deleteLinks==null?null : res.data.deleteLinks.split(","),//展示为数组
          this.deleteWith= res.data.deleteWith==''?null :res.data.deleteWith==null?null : res.data.deleteWith.split(","),//展示为数组
          this.deleteRelation= res.data.deleteRelation==''?null :res.data.deleteRelation==null?null : res.data.deleteRelation.split(","),//展示为数组
          this.fetchLinks= res.data.fetchLinks==''?null : res.data.fetchLinks==null?null : res.data.fetchLinks.split(",")//展示为数组
          this.queryDict(res.data.domainClass);//获取字典值
          this.queryRelation(res.data.domainClass)//插入关系
          let result = this.classNames.find(obj => {
            return obj.className === res.data.domainClass
          })
          console.log(result)
          console.log(this.sqlArgs)
          this.checkEmptys=result.props
          this.uniqueColumnsList=result.props
        }
      })
    },
    //删除
    deled(id){
      console.log(id)
      deleteData(id).then(res=>{
        console.log(res)
        if(res.code==200){
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.sqlList();
        }
      })
    },
    //添加
    handleClose(done) {
      done();
      console.log(this.crudName)
      console.log(this.crudCode)
      console.log(this.domainClass.className)
      console.log(this.emptyColumns)
      console.log(this.uniqueColumns)
      console.log(this.dataSql)
      console.log(this.countSql)
      console.log(this.dicts)
      console.log(this.pager)
      console.log(this.dataExecMethod)
      console.log(this.displayNames)
      console.log(this.queryColumns)
      console.log(this.orderColumns)
      console.log(this.queryAppend)
      console.log(this.insertLinks)
      console.log(this.insertWith)
      console.log(this.insertRelation)
      console.log(this.updateLinks)
      console.log(this.updateWith)
      console.log(this.updateRelation)
      console.log(this.deleteLinks)
      console.log(this.deleteWith)
      console.log(this.deleteRelation)
      console.log(this.fetchLinks)
      console.log(this.conditions)//选择条件
      console.log(this.sqlArgs)//默认值
      let data={
        crudCode: this.crudCode,
        crudName: this.crudName,
        domainClass: this.domainClass.className,
        emptyColumns: this.emptyColumns==null? null : this.emptyColumns.join(','),
        uniqueColumns: this.uniqueColumns==null? null : this.uniqueColumns.join(','),
        dataSql: this.dataSql,
        countSql: this.countSql,
        dicts:  this.dicts==null? null : this.dicts.join(','),
        pager: this.pager,
        dataExecMethod: this.dataExecMethod,
        displayNames: this.displayNames,
        queryColumns: this.queryColumns,
        orderColumns: this.orderColumns,
        queryAppend: this.queryAppend,
        insertLinks: this.insertLinks==null? null : this.insertLinks.join(','),
        insertWith:  this.insertWith==null? null : this.insertWith.join(','),
        insertRelation:  this.insertRelation==null?'' : this.insertRelation.join(','),
        updateLinks:  this.updateLinks==null? null : this.updateLinks.join(','),
        updateWith:  this.updateWith==null? null : this.updateWith.join(','),
        updateRelation:  this.updateRelation==null? null : this.updateRelation.join(','),
        deleteLinks:  this.deleteLinks==null? null : this.deleteLinks.join(','),
        deleteWith:  this.deleteWith==null? null : this.deleteWith.join(','),
        deleteRelation:  this.deleteRelation==null? null : this.deleteRelation.join(','),
        fetchLinks:  this.fetchLinks==null? null : this.fetchLinks.join(','),
        conditions: this.conditions,
        sqlArgs: this.sqlArgs
      }
      let type;
      if(this.isAdd==1){
        //增加
        // newData=data
        type='POST'
      }else{
        data.crudId=this.crudId
        data.domainClass=this.domainClass
        type='PUT'
      }
      addData(type,data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.sqlList();
          if(this.isAdd==1){
            this.$message({
              message: "新增成功",
              type: "success"
            });
          }else{
            this.$message({
              message: "编辑成功",
              type: "success"
            });
          }
        }
      })
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     
      //     console.log('关闭抽屉')
      //   })
      //   .catch(_ => {});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize=val;
      this.sqlList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNumber=val;
      this.sqlList();
    },
    submitForm(done) {
      done();
    },
    resetForm(done) {
      done();
    },
  }
}
</script>

<style scoped>
  .add-btn{
    height: 32px;
    padding: 9px 15px;
    box-sizing:border-box;
  }
  .table-box{
    margin-top:50px;
  }
  .el-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 220px;
    margin: 0;
  }
  .add-cloun{
    width:40px;
    height:40px;
    padding:0 10px;
    text-align:center;
    box-sizing:border-box;
    border-radius:4px;
    color: #FFFFFF;
    background-color: #1890ff;
    border-color: #1890ff;
    cursor:pointer;
  }
  .queryList{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
    position: relative;
  }
  .delete-btn{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -50px;
    padding: 10px;
    box-sizing: border-box;
  }
  .set-form{
    position: relative;
  }
  .setting-box{
    padding: 10px 20px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    right: 0;
    background: #FFFFFF;
    border: 1px solid #cccccc;
  }
</style>

<style>
  .el-drawer{
    width: 100% !important;
    height: auto !important;
  }
  .el-textarea__inner{
    min-height: 130px !important;
  }
</style>

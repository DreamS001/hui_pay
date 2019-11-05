<template>
  <!-- 商户列表页面 -->
  <div class="wscn-http404-container">
    <div>
      <div class="system-right">
        <div class="right-main-box">
          <div class="right-main right-main-commercial" >
            <div class="nav">
              <div class="block" style="margin-bottom:20px;min-width:600px" v-if="isshow">
                <div>
                  <div class="block-d">
                    <span class="demonstration">加入的时间：</span>
                    <el-date-picker v-model="value" :start-placeholder="beginDatePlaceHolder" :end-placeholder="endDatePlaceHolder" type="daterange" size="mini" range-separator="至" />
                  </div>
                  <div style="height:15px"></div>
                  <div class="roles">
                    <span>角色选择：</span>
                    <el-select v-model="value" placeholder="请选择合伙人">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-select v-model="value" placeholder="请选择代理商">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-select v-model="value" placeholder="请选择拓展员">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-select v-model="value" placeholder="请选择商家">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary" plain class="button2" style="margin-left:10px">清空</el-button>
                    <!-- <span class="time" style="margin-left:10px" >查询</span>
                    <span class="time" style="background:#09BD22" >清空</span> -->
                  </div>
                </div>
                <div class="zlist">
                  <el-table :data="list" style="width: 100%!important;padding:5px 0;box-sizing: border-box;" stripe :header-cell-class-name="handlemyclass">
                    <el-table-column :cell-class-name="colorblueclass" prop="par_name" label="所属合伙人/oem" align="center" min-width="120"></el-table-column>
                    <el-table-column prop="agent_name" label="所属代理商" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="alias_name" label="商户名称" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="contact_name" label="联系人" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="contact_phone" label="联系电话" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="al_rate" label="支付宝费率" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="wx_rate" label="微信费率" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="addtime" label="加入时间" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="alipayaudit" label="支付类型" align="center" min-width="100">
                      <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.alipayaudit==300">间连</el-tag>
                        <el-tag type="success" v-if="scope.row.alipayaudit==500">直连</el-tag>
                        <el-tag type v-if="scope.row.alipayaudit==100">未开通</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" min-width="200">
                      <template slot-scope="scope">
                        <span class="s-btn" @click="details(scope.$index,scope.row)">详情</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 分页器 -->
                  <div class="block" style="padding-left:5px;box-sizing: border-box;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" ></el-pagination>
                  </div>
                </div>
              </div>

              <div class="block fold" style="margin-bottom:20px;min-width:600px" v-else >
                <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="基本信息" name="1">
                  <div class="content"><h1 style="color: rgb(17, 17, 17); margin: 10px 0px 14px;">最基本资料</h1>
                    <div class="content_text">
                      <div class="layui-form-mid">商户名称：</div>
                      <div class="layui-form-mid layui-word-aux">小易水果3</div>
                    </div>
                    <div class="content_text">
                      <div class="layui-form-mid">商户简称：</div>
                      <div class="layui-form-mid layui-word-aux">水果3</div>
                    </div>
                    <div class="content_text">
                      <div class="layui-form-mid">经营类目：</div>
                      <div class="layui-form-mid layui-word-aux">美食</div>
                    </div>
                    <div class="content_text">
                      <div class="layui-form-mid">商户详细地址：</div>
                      <div class="layui-form-mid layui-word-aux">无52</div>
                    </div>
                    <div class="content_text">
                      <div class="layui-form-mid">商户地址：</div>
                      <div class="layui-form-mid layui-word-aux">甘肃省嘉峪关市峪泉镇</div>
                    </div>
                    <div class="content_text">
                      <div class="layui-form-mid">服务电话：</div>
                      <div class="layui-form-mid layui-word-aux">入65r</div>
                    </div>
                    <div class="content_text">
                      <div class="layui-form-mid">联系人：</div>
                      <div class="layui-form-mid layui-word-aux">18191071916</div>
                    </div>

                    <div class="content_text">
                      <div class="layui-form-mid">联系方式：</div>
                      <div class="layui-form-mid layui-word-aux">18191071916</div>
                    </div>

                    <div class="content_text">
                      <div class="layui-form-mid">电子邮箱：</div>
                      <div class="layui-form-mid layui-word-aux">yil@www.jie360.com.cn</div>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="结算信息" name="2">
                  <div class="content"><h1 style="color: rgb(17, 17, 17); margin: 10px 0px 14px;">银行卡信息</h1>
                    <div class="content_text">
                      <div class="layui-form-mid">持卡人：</div>
                      <div class="layui-form-mid layui-word-aux">伊蕾</div>
                    </div>
                    <div class="content_text">
                      <div class="layui-form-mid">提现银行：</div>
                      <div class="layui-form-mid layui-word-aux">中国工商银行</div>
                    </div>
                    <div class="content_text">
                      <div class="layui-form-mid">银行卡号：</div>
                      <div class="layui-form-mid layui-word-aux">6333333123456456456</div>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="证件信息" name="3">
                  <div class="content"><h1 style="color: rgb(17, 17, 17); margin: 10px 0px 14px;">证件照片</h1>
                    <div class="content_text">
                      <div class="layui-form-mid">持卡人：</div>
                      <div class="layui-form-mid layui-word-aux">伊蕾</div>
                    </div>
                    <div class="content_text">
                      <div class="layui-form-mid">提现银行：</div>
                      <div class="layui-form-mid layui-word-aux">中国工商银行</div>
                    </div>
                    <div class="content_text">
                      <div class="layui-form-mid">银行卡号：</div>
                      <div class="layui-form-mid layui-word-aux">6333333123456456456</div>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { finan} from "@/api/finance"
import moment from "moment";
import {formatDate} from '../../utils/date.js'

export default {
  data() {
    return {
      activeNames: ['3'],
      isshow:true,
      list:[{
        par_name:'1',
        agent_name:'2',
        alias_name:'3',
        contact_name:'4',
        contact_phone:'5',
        al_rate:'6',
        wx_rate:'7',
        addtime:'8',
        alipayaudit:'300',
      }],
      value: "",
      input1: "",
      pageNo: 1,
      pageSize: 10,
      time: "",
      times: "",
      total: 1,
      currentPage4: 4,
      allList: [],
      clickQueryDate: false,
      pageSize1: 2147483647,
      beginDatePlaceHolder: '',
      endDatePlaceHolder: '',
      beginDate: '',
      endDate: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    };
  },
  created() {
        var date = new Date()
        this.beginDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
        this.endDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
        this.beginDate = ''
        this.endDate = ''

  },
  methods:{
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      return "test";
    },
    details(index,row){
      this.isshow=false
    },
    handleChange(val){
      console.log(val);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404-container {
  background: #f0f2f5;
  min-height: calc(100vh - 84px);
  width: 100%;
  background-color: #f0f2f5;
  background-size: cover;
}
.wscn-http404-container>div{
  width:100%;
  min-width:650px;
}
// 系统设置的主体右边主体内容
.system-right{
  width: 100%;
  min-width: 500px;
  float: right;
  min-height: 100%;
  box-sizing: border-box;
  padding:0px;
  margin:0px;
}
.right-main-box{
  padding:15px;
  width:100%;
  box-sizing: border-box;
}
.right-main{
  width:100%;
  box-sizing: border-box;
  padding:20px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.nav {
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  font: 14px Helvetica Neue,Helvetica,PingFang SC,Tahoma,Arial,sans-serif;
}
.block{
  width: 100%;
}
.test {
  color: #909399 !important;
  background: rgb(248, 248, 248) !important;
  font-weight: 100;
  width: 100% !important;
  font-weight: 500;
}
</style>
<style>
  .block-d .el-range-editor--mini.el-input__inner{
    height:30px;
  }
 .roles .el-input--suffix .el-input__inner{
   height:30px;
  }
 .roles .el-input__icon{
   line-height: 30px;
  }
  .roles .el-button--primary{
    height: 30px;
    padding:7px 15px;
  }
  .roles .el-button--primary.is-plain{
    color:black;
    background-color: #fff;
    border-color: #DCDFE6;
  }
  .roles .button2:hover{
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .zlist .el-table thead{
    color: #909399;
    font-weight: 500;
  }
  .zlist .test {
    color: #909399 !important;
    background: rgb(248, 248, 248) !important;
    font-weight: 100;
    width: 100% !important;
    font-weight: 500;
  }
  .s-btn{
    color:#66b1ff
  }
  .fold .el-collapse-item__content {
    padding-bottom: 25px;
    font-size: 13px;
    color: #303133;
    line-height: 1.769230769230769;
}
  .fold .content {
    padding: 20px 40px;
}
  .fold .content>h1{
    color: rgb(17, 17, 17);
    margin: 10px 0px 14px;
  }
  .fold .content .content_text{
    padding:10px 0;

  }
  .fold .content .content_text .layui-form-mid{
    display: inline-block;
    margin-right: 10px;
    color:rgb(48, 49, 51);
  }
  .fold .content .content_text .layui-word-aux{
    color:rgb(153, 153, 153);
  }
</style>

<template>
  <!-- 直连商户页面 -->
  <div class="wscn-http404-container">
    <div>
      <div class="system-right">
        <div class="right-main-box">
          <div class="right-main right-main1" >
            <div class="nav">
              <div class="block" style="margin-bottom:20px;min-width:600px" v-if="isshow">
                <div>
                  <div class="block-d1">
                    <el-badge :value="3" class="item">
                      <el-button size="small">审核支付宝通过</el-button>
                    </el-badge>
                    <el-badge :value="3" class="item">
                      <el-button size="small">审核微信通过</el-button>
                    </el-badge>
                    <el-badge :value="1" class="item" type="primary">
                      <el-button size="small">支付宝审核中</el-button>
                    </el-badge>
                    <el-badge :value="1" class="item" type="primary">
                      <el-button size="small">微信审核中</el-button>
                    </el-badge>
                  </div>
                  <div style="height:15px"></div>
                  <div class="roles">
                    <div class="block-d">
                      <!-- <span class="demonstration">加入的时间：</span> -->
                      <el-date-picker v-model="value" :start-placeholder="beginDatePlaceHolder" :end-placeholder="endDatePlaceHolder" type="daterange" size="mini" range-separator="至" />
                      <el-input v-model="input" placeholder="请输入商户名称"></el-input>
                    <el-button type="primary">查询</el-button>
                    </div>

                    <!-- <span class="time" style="margin-left:10px" >查询</span>
                    <span class="time" style="background:#09BD22" >清空</span> -->
                  </div>
                </div>
                <div class="zlist">
                  <el-table :data="list" style="width: 100%!important;padding:5px 0;box-sizing: border-box;" stripe :header-cell-class-name="handlemyclass">
                    <el-table-column :cell-class-name="colorblueclass" prop="id" label="ID" align="center" min-width="120"></el-table-column>
                    <el-table-column prop="name" label="商户名称" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="business_category" label="店铺类目" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="contact_name" label="联系人" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="contact_phone" label="联系电话" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="contact_email" label="联系邮箱" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="al_rate" label="支付宝费率" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="wx_rate" label="微信费率" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="mestate" label="商户状态" align="center" min-width="100"></el-table-column>
                    <el-table-column prop="addtime" label="加入时间" align="center" min-width="100">
                      <!-- <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.order_status==300">购买成功</el-tag>
                        <el-tag type="danger" v-if="scope.row.order_status==500">购买失败</el-tag>
                        <el-tag type v-if="scope.row.order_status==100">购买中</el-tag>
                      </template> -->
                    </el-table-column>
                    <el-table-column label="操作" align="center" min-width="200">
                      <template slot-scope="scope">
                        <!-- details -->
                        <span class="s-btn" @click="details(scope.$index,scope.row)">详情</span>
                        <!-- <span class="s-btn" @click="edit(scope.$index,scope.row)">费率修改</span> -->
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 分页器 -->
                  <div class="block" style="padding-left:5px;box-sizing: border-box;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" ></el-pagination>
                  </div>
                </div>
              </div>

              <!-- 详情 -->
              <div class="block tabs" style="margin-bottom:20px;min-width:600px" v-else >
                <template>
                  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="账户信息" name="first">
                      <div class="tabs-content">
                        <div class="content-d">
                          <h1 style="" class="title">联系信息</h1>
                          <div class="content">
                            <div class="content_text">
                              <div class="layui-form-mid">商户名称：</div>
                              <div class="layui-form-mid layui-word-aux">小易水果3</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">商户简称：</div>
                              <div class="layui-form-mid layui-word-aux">水果3</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">商户类型：</div>
                              <div class="layui-form-mid layui-word-aux">生活服务</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">店铺类型：</div>
                              <div class="layui-form-mid layui-word-aux">主店</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">商户地址：</div>
                              <div class="layui-form-mid layui-word-aux">浙江省滨江区</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">服务电话：</div>
                              <div class="layui-form-mid layui-word-aux">135000000000</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">微信appid：</div>
                              <div class="layui-form-mid layui-word-aux">qqqqq</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">负责人：</div>
                              <div class="layui-form-mid layui-word-aux">伊蕾</div>
                            </div>

                            <div class="content_text">
                              <div class="layui-form-mid">联系方式：</div>
                              <div class="layui-form-mid layui-word-aux">18191071916</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">电子邮箱：</div>
                              <div class="layui-form-mid layui-word-aux">yil@www.jie360.com.cn</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">支付宝申请费率：</div>
                              <div class="layui-form-mid layui-word-aux">0.38%</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">微信申请费率：</div>
                              <div class="layui-form-mid layui-word-aux">0.38%</div>
                            </div>
                          </div>
                        </div>
                        <div class="content-d">
                          <h1 style="color: rgb(17, 17, 17); margin: 10px 0px 14px;" class="title">商家对公银行卡信息</h1>
                          <div class="content">
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
                        </div>
                        <div class="content-d">
                          <h1 style="" class="title">证件资料</h1>
                          <div class="content">
                            <div class="certificate_content">
                              <div class="content_text">
                                <div class="layui-form-mid">身份证正面</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">身份证反面</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">组织机构代码证</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照图片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照图片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照图片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照图片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照图片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照图片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="支付宝信息" name="second">
                      <div class="tabs-content">
                        <div class="content-d">
                          <div class="titles">
                            <h1 style="" class="title">账户信息</h1>
                            <el-button type="primary" style="margin-left:50px;">审核信息修改</el-button>
                          </div>
                          <div class="content">
                            <div class="content_text">
                              <div class="layui-form-mid">商户名称：</div>
                              <div class="layui-form-mid layui-word-aux">小易水果3</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">商户简称：</div>
                              <div class="layui-form-mid layui-word-aux">水果3</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">商户类型：</div>
                              <div class="layui-form-mid layui-word-aux">生活服务</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">店铺类型：</div>
                              <div class="layui-form-mid layui-word-aux">主店</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">商户地址：</div>
                              <div class="layui-form-mid layui-word-aux">浙江省滨江区</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">服务电话：</div>
                              <div class="layui-form-mid layui-word-aux">135000000000</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">微信appid：</div>
                              <div class="layui-form-mid layui-word-aux">qqqqq</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">负责人：</div>
                              <div class="layui-form-mid layui-word-aux">伊蕾</div>
                            </div>

                            <div class="content_text">
                              <div class="layui-form-mid">联系方式：</div>
                              <div class="layui-form-mid layui-word-aux">18191071916</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">电子邮箱：</div>
                              <div class="layui-form-mid layui-word-aux">yil@www.jie360.com.cn</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">支付宝申请费率：</div>
                              <div class="layui-form-mid layui-word-aux">0.38%</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">微信申请费率：</div>
                              <div class="layui-form-mid layui-word-aux">0.38%</div>
                            </div>
                          </div>
                        </div>
                        <div class="content-d">
                          <h1 style="color: rgb(17, 17, 17); margin: 10px 0px 14px;" class="title">商家对公银行卡信息</h1>
                          <div class="content">
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
                        </div>
                        <div class="content-d">
                          <h1 style="" class="title">证件资料</h1>
                          <div class="content">
                            <div class="certificate_content">
                              <div class="content_text">
                                <div class="layui-form-mid">身份证正面</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">身份证反面</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">组织机构代码证</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照图片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照图片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照图片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照图片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照图片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照图片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="微信信息" name="third">角色管理</el-tab-pane>
                  </el-tabs>
                </template>
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
      isshow:true,
      input:'',
      value: "",
      input1: "",
      pageNo: 1,
      pageSize: 10,
      time: "",
      times: "",
      total: 1,
      currentPage4: 4,
      list: [{
        id:'3',
        name:'小易水果2',
        business_category:'生活服务',
        contact_name:'异类',
        contact_phone:'18191071916',
        contact_email:'yil@www.jie360.com.cn',
        al_rate:'0.38%',
        wx_rate:'0.38%',
        mestate:'2',
        addtime:'2019-10-10 10:16:06'
      }],
      allList: [],
      clickQueryDate: false,
      pageSize1: 2147483647,
      beginDatePlaceHolder: '',
      endDatePlaceHolder: '',
      beginDate: '',
      endDate: '',
      value: '',
      activeName:'first',
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

</style>
<style>
.block-d1 .item {
  margin-top: 10px;
  margin-right: 40px;
}
  .block-d .el-range-editor--mini.el-input__inner{
    height:30px;
  }
  .block-d .el-range-editor.el-input__inner{
    padding:0 10px;
  }
  .block-d .el-range-separator{
    padding:5px;
  }
 .roles  .el-input__inner{
   height:30px;
   /* width:150px !important; */
  }
  .roles .el-input{
    width:200px !important;
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

  .zlist .s-btn{
    color:#66b1ff
  }

/* 详情样式 */
  .tabs-content .el-collapse-item__content {
    padding-bottom: 25px;
    font-size: 13px;
    color: #303133;
    line-height: 1.769230769230769;
}
  .tabs-content .content {
    padding: 20px 40px;
}
  .tabs-content .content>h1{
    color: rgb(17, 17, 17);
    margin: 10px 0px 14px;
  }
  .tabs-content .content .content_text{
    padding:10px 0;

  }
  .tabs-content .content .content_text .layui-form-mid{
    display: inline-block;
    margin-bottom: 10px;
    color:rgb(48, 49, 51);
  }
  .tabs-content .content .content_text .layui-word-aux{
    color:rgb(153, 153, 153);
  }
  .tabs-content .title{
    padding: 18px 14px;
    background-color: #f2f2f2;
    color: rgb(17, 17, 17);
    margin: 0 ;
    font-weight: 400;
  }
  .tabs-content .titles{
    background-color: #f2f2f2;
    color: rgb(17, 17, 17);
    margin: 0px;
    font-weight: 400;
  }
  .tabs-content .certificate_content{
    display: flex;
    font-size: 14px;
    width: 80%;
    flex-wrap: wrap;
  }
  .tabs-content .certificate_content .content_text{
    margin-left:50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

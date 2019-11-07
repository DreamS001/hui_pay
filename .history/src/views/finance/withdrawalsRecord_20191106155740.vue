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
                          <h1 style="" class="title">账户信息</h1>
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
                            <h1 style="" class="title">联系信息</h1>
                            <el-button type="primary" style="margin:0px 0px 10px 30px;">审核信息修改</el-button>
                          </div>
                          <div class="content">
                            <div class="content_text">
                              <div class="layui-form-mid">支付宝账户信息：</div>
                              <div class="layui-form-mid layui-word-aux">51465456@qq.com</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">联系人姓名：</div>
                              <div class="layui-form-mid layui-word-aux">伊蕾</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">手机号：</div>
                              <div class="layui-form-mid layui-word-aux">16464646541</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">常用邮箱：</div>
                              <div class="layui-form-mid layui-word-aux">yil@www.jie360.com.cn</div>
                            </div>
                          </div>
                        </div>
                        <div class="content-d">
                          <h1 style="color: rgb(17, 17, 17); margin: 10px 0px 14px;" class="title">支付宝信息</h1>
                          <div class="content">
                            <div class="content_text">
                              <div class="layui-form-mid"><div class="zfb">支</div>支付宝费率：</div>
                              <div class="layui-form-mid layui-word-aux">0.38%</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">经营类目：</div>
                              <div class="layui-form-mid layui-word-aux">生活服务</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">支付宝授权状态：</div>
                              <div class="layui-form-mid layui-word-aux">授权成功 <span style="color: red;">点击重新扫码授权</span></div>
                            </div>
                          </div>
                        </div>
                        <div class="content-d">
                          <h1 style="" class="title">营业执照/授权函</h1>
                          <div class="content">
                            <div class="certificate_content">
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">支付宝授权函</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="content-d">
                          <h1 style="" class="title">门店照片信息</h1>
                          <div class="content">
                            <div class="certificate_content">
                              <div class="content_text">
                                <div class="layui-form-mid">店铺门头照片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">内景照片</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">内景照片2</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                              <div class="content_text">
                                <div class="layui-form-mid">内景照片3</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="微信信息" name="third">
                      <div class="tabs-content">
                        <div class="content-d">
                          <div class="titles">
                            <h1 style="" class="title">微信信息</h1>
                            <el-button type="primary" style="margin:0px 0px 10px 30px;" @click="popUp1">审核信息修改</el-button>
                            <div class="popUp" :class="{ispopUp1:ispopUp1}" style="width:100%;height:100%;background-color:#000;opacity:0.3">

                            </div>
                            <div class="pop-content" :class="{ispopUp2:ispopUp2}" style="width:40%;height:50%; background-color: #f2f2f2">
                              <div class="" style="    background-color: #F8F8F8;height:40px;border-bottom: 1px solid #eee;border-radius: 2px 2px 0 0;">
                                <span style="display:inline-block;font-size:14px;float:left;">填写微信号</span>
                                <span style="display:inline-block;font-size:30px;float:right;" @click="unpopUP">×</span>
                              </div>
                              <div>
                                <div class="layui-fluid" style="padding: 15px;">
                                  <form class="layui-form" action="" style="background-color:#fff;padding: 20px;">
                                    <div class="layui-form-item">
                                      <label class="layui-form-label">微信商户号:</label>
                                      <div class="layui-input-inline">
                                        <input type="text" name="merchantnumber" required="" lay-verify="required" placeholder="微信商户号" autocomplete="off" class="layui-input" value="1558990011" style="width:220px">
                                        <input type="hidden" name="merrtid" v-show="false" value="4" style="width:220px">
                                      </div>
                                    </div>
                                    <hr>
                                    <div class="layui-form-item">
                                      <label class="layui-form-label"></label>
                                      <div class="layui-input-inline" style="width: auto">
                                        <button type="button" class="layui-btn" lay-submit="" lay-filter="formDemo2">确认提交</button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>

                          </div>
                          <div class="content">
                            <div class="content_text">
                              <div class="layui-form-mid">联系人姓名：</div>
                              <div class="layui-form-mid layui-word-aux">伊蕾</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">手机号：</div>
                              <div class="layui-form-mid layui-word-aux">16464646541</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">常用邮箱：</div>
                              <div class="layui-form-mid layui-word-aux">yil@www.jie360.com.cn</div>
                            </div>
                          </div>
                        </div>
                        <div class="content-d">
                          <h1 style="color: rgb(17, 17, 17); margin: 10px 0px 14px;" class="title">经营信息</h1>
                          <div class="content">
                            <div class="content_text">
                              <div class="layui-form-mid">商户简称：</div>
                              <div class="layui-form-mid layui-word-aux">小易2</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">经营类目：</div>
                              <div class="layui-form-mid layui-word-aux">生活服务</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid">客服电话：</div>
                              <div class="layui-form-mid layui-word-aux">13500000000</div>
                            </div>
                            <div class="content_text">
                              <div class="layui-form-mid"><div class="zfb">微</div>微信申请费率：</div>
                              <div class="layui-form-mid layui-word-aux">0.38%</div>
                            </div>
                          </div>
                        </div>
                        <div class="content-d">
                          <h1 style="color: rgb(17, 17, 17); margin: 10px 0px 14px;" class="title">商家结算卡信息</h1>
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
                              <div class="layui-form-mid layui-word-aux">6212261202047932133</div>
                            </div>
                          </div>
                        </div>
                        <div class="content-d">
                          <h1 style="" class="title">商户信息/企业法人信息</h1>
                          <div class="content">
                            <div class="certificate_content">
                              <div class="content_text">
                                <div class="layui-form-mid">营业执照</div>
                                <div class="layui-form-mid layui-word-aux">
                                  <img style="width: 80px; height: 60px;" src="http://fp.jie360.com.cn/uploads/2/1/image/20190929181416fb0c82957.jpg" alt="">
                                </div>
                              </div>
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
                            </div>
                          </div>
                        </div>
                      </div>

                    </el-tab-pane>
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
      ispopUp1:true,
      ispopUp2:true,
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
    popUp1(){
      this.ispopUp1=false;
      this.ispopUp2=false;
    },
    unpopUP(){
      this.ispopUp1=true;
      this.ispopUp2=true;
    },
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
.layui-form-item {
    margin-bottom: 15px;
    clear: both;
    height:38px;
}
.layui-form-label {
    float: left;
    display: block;
    padding: 9px 15px;
    width: 80px;
    font-weight: 400;
    line-height: 20px;
    text-align: right;
}
.layui-form-item .layui-input-inline {
    float: left;
    width: 190px;
    margin-right: 10px;
}
.layui-input-inline {
    display: inline-block;
    vertical-align: middle;
}
.layui-btn {
    margin-right: 10px;
    margin-bottom: 10px;
}
.layui-btn {
    display: inline-block;
    height: 38px;
    line-height: 38px;
    padding: 0 18px;
    background-color: #009688;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}
.layui-input, .layui-textarea {
    display: block;
    width: 100%;
    padding-left: 10px;
}
.layui-input, .layui-select, .layui-textarea {
    height: 38px;
    line-height: 1.3;
    line-height: 38px\9;
    border-width: 1px;
    border-style: solid;
    background-color: #fff;
    border-radius: 2px;
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
    font-size: 12px;

  }
  .tabs-content .content .content_text .layui-form-mid{
    display: inline-block;
    margin-bottom: 10px;
    color:rgb(48, 49, 51);
    font-size: 12px;
  }
  .tabs-content .content .content_text .layui-word-aux{
    color:rgb(153, 153, 153);
    font-size: 12px;
  }
  .tabs-content .title{
    padding: 18px 14px;
    background-color: #f2f2f2;
    color: rgb(17, 17, 17);
    margin: 0 ;
    text-align: left;
    font-weight: 400;
  }
  .tabs-content .titles{
    background-color: #f2f2f2;
    color: rgb(17, 17, 17);
    margin: 0px;
    font-size: 12px;
    font-weight: 400;
  }
  .tabs-content .certificate_content{
    display: flex;
    font-size: 12px;
    width: 80%;
    flex-wrap: wrap;
  }
  .tabs-content .certificate_content .content_text{
    margin-left:50px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .zfb{
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    line-height: 20px;
    font-size: 15px;
    border-radius: 5px;
    background-color: #1296db;
    color: white;
  }
  .ispopUp1{
    display: none;

  }
  .ispopUp2{
    display: none;


  }
  .popUp{
    z-index: 200;
    position: fixed;
    top:0px;
    left:0px;
    /* z-index: 1000; */
  }
  .pop-content{
    position: fixed;
    top:200px;
    left:35%;
    z-index: 666;
  }
</style>

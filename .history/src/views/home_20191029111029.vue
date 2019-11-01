<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <div class="layui-fluid">
    <div class="layui-row layui-col-space15">
        <div id="app"><!----> <div><!----></div></div>
        <div class="layui-col-md8">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md6">
                    <div class="layui-card">
                        <div class="layui-card-header">快捷入口</div>
                        <div class="layui-card-body">
                            <div class="layui-carousel layadmin-carousel layadmin-shortcut" lay-anim="" style="width: 100%; height: 280px;">
                                <div carousel-item="">
                                    <ul class="layui-row layui-col-space10 layui-this">
                                        <li class="layui-col-xs3">
                                            <a lay-href="Agent/index">
                                                <i class="layui-icon layui-icon-user"></i>
                                                <cite>代理商</cite>
                                            </a>
                                        </li>
                                        <li class="layui-col-xs3">
                                            <a lay-href="Deploy/deploymenu">
                                                <i class="layui-icon layui-icon-set-sm"></i>
                                                <cite>系统设置</cite>
                                            </a>
                                        </li>
                                        <li class="layui-col-xs3">
                                            <a lay-href="Payment/menu">
                                                <i class="layui-icon layui-icon-rmb"></i>
                                                <cite>支付设置</cite>
                                            </a>
                                        </li>
                                        <li class="layui-col-xs3">
                                            <a lay-href="set/user/info">
                                                <i class="layui-icon layui-icon-username"></i>
                                                <cite>我的资料</cite>
                                            </a>
                                        </li>
                                    </ul>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="layui-col-md6">
                    <div class="layui-card">
                        <div class="layui-card-header">数据概况</div>
                        <div class="layui-card-body">
                            <div class="layui-carousel layadmin-carousel layadmin-backlog" lay-anim="" style="width: 100%; height: 280px;">
                                <div carousel-item="">
                                    <ul class="layui-row layui-col-space10 layui-this">
                                        <li class="layui-col-xs6">
                                            <a href="javascript:" class="layadmin-backlog-body">
                                                <h3>新增代理</h3>
                                                <p><cite>0</cite></p>
                                            </a>
                                        </li>
                                        <li class="layui-col-xs6">
                                            <a href="javascript:" class="layadmin-backlog-body">
                                                <h3>代理总数</h3>
                                                <p><cite>4</cite></p>
                                            </a>
                                        </li>
                                        <li class="layui-col-xs6">
                                            <a href="javascript:" class="layadmin-backlog-body">
                                                <h3>过期代理</h3>
                                                <p><cite>0</cite></p>
                                            </a>
                                        </li>
                                        <li class="layui-col-xs6">
                                            <a href="javascript:" class="layadmin-backlog-body">
                                                <h3>商户总数</h3>
                                                <p><cite>4</cite></p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-row layui-col-space15">
                <div class="layui-col-sm12">
                    <div class="layui-card">
                        <div class="layui-card-header">
                            流水信息
                            <div class="layui-btn-group layuiadmin-btn-group">
                                <div class="layui-input-inline">
                                    <a href="javascript:" class="layui-btn layui-btn-primary layui-btn-xs qxtsetday" data-day="7">7天</a>
                                    <a href="javascript:" class="layui-btn layui-btn-primary layui-btn-xs qxtsetday" data-day="15">15天</a>
                                    <a href="javascript:" class="layui-btn layui-btn-primary layui-btn-xs qxtsetday" data-day="30">30天</a>
                                </div>
                            </div>
                        </div>
                        <div class="layui-card-body">
                            <div style="padding: 5px 0" class="layui-form">
                                <input type="hidden" value="" id="storeid">
                                <div class="layui-input-inline">
                                    <select name="storeid" lay-filter="store">
                                        <option value="0">请选择</option>
                                                                                <option value="1">杭州水果</option>
                                                                                <option value="2">杭州水果店</option>
                                                                                <option value="3">小易水果1</option>
                                                                                <option value="4">小易水果2</option>
                                                                                <option value="5">测试餐饮</option>
                                                                            </select><div class="layui-unselect layui-form-select"><div class="layui-select-title"><input type="text" placeholder="请选择" value="请选择" readonly="" class="layui-input layui-unselect"><i class="layui-edge"></i></div><dl class="layui-anim layui-anim-upbit"><dd lay-value="0" class="layui-this">请选择</dd><dd lay-value="1" class="">杭州水果</dd><dd lay-value="2" class="">杭州水果店</dd><dd lay-value="3" class="">小易水果1</dd><dd lay-value="4" class="">小易水果2</dd><dd lay-value="5" class="">测试餐饮</dd></dl></div>
                                    <span>门店收银状况</span>
                                </div>
                            </div>
                            <div class="layui-row">
                                <div class="layui-col-sm12">
                                    <div class="layui-carousel layadmin-carousel layadmin-dataview" data-anim="fade" lay-anim="fade" style="width: 100%; height: 280px;">
                                        <div carousel-item="" id="selladd">
                                            <div class="layui-this" _echarts_instance_="1572313525687" style="-webkit-tap-highlight-color: transparent; user-select: none; background-color: rgba(0, 0, 0, 0); cursor: default;"><div style="position: relative; overflow: hidden; width: 1017px; height: 332px;"><div data-zr-dom-id="bg" class="zr-element" style="position: absolute; left: 0px; top: 0px; width: 1078px; height: 332px; user-select: none;"></div><canvas width="1017" height="332" data-zr-dom-id="0" class="zr-element" style="position: absolute; left: 0px; top: 0px; width: 1017px; height: 332px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></canvas><canvas width="1017" height="332" data-zr-dom-id="1" class="zr-element" style="position: absolute; left: 0px; top: 0px; width: 1017px; height: 332px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></canvas><canvas width="1017" height="332" data-zr-dom-id="_zrender_hover_" class="zr-element" style="position: absolute; left: 0px; top: 0px; width: 1017px; height: 332px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></canvas><div class="echarts-tooltip zr-element" style="position: absolute; display: none; border-style: solid; white-space: nowrap; transition: left 0.4s ease 0s, top 0.4s ease 0s; background-color: rgba(50, 50, 50, 0.5); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font-family: 微软雅黑, Arial, Verdana, sans-serif; padding: 5px; left: 824px; top: 98px;">10/29<br>订单金额 : 0.00<br>支付宝收银 : 0.00<br>微信收银 : 0.00<br>现金收银 : 0.00<br>会员余额收银 : 0.00</div></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import LineChart1 from "./dashboard/LineChart1";
// import LineChart2 from "./dashboard/LineChart2";
// import LineChart3 from "./dashboard/LineChart3";
// import MapChart from "./dashboard/MapChart";
import banner from "./dashboard/banner";
import banner1 from "./dashboard/banner1";
import banner2 from "./dashboard/banner2";
import banner3 from "./dashboard/banner3";
import { count } from "@/api/visits";
import {mapp}  from "@/api/map";
/**
 * 记录访问，只有页面刷新或者第一次加载才会记录
 */
count().then(res => {});

export default {
  data() {
    return {
     navdata:"",
    }
  },
  name: "Dashboard",
  components: {
    // LineChart1,
    // LineChart2,
    // LineChart3,
    // MapChart,
    banner,
    banner1,
    banner2,
    banner3
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
    mapp().then(res => {
      var data=JSON.parse(res.data)
      // console.log(typeof(data.data.map_data))
      this.navdata=eval(data.data)
      // console.log(typeof(this.data))
      // console.log( this.dataa)
    })
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 15px 15px 30px 15px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    // background: #fff;
    // padding: 10px 10px 0;
    margin-bottom: 20px;
  }
}
.ul{
  display: flex;
  list-style: none;
  justify-content: space-around;
  padding: 20px 0;
  margin: 0;
  li{
    text-align: left;
    font-weight: 600;
    line-height: 25px;
    p{
      font-size: 12px;

    }
    span{
      font-size:16px;
    }
  }

}
.mapp{
   padding: 10px 10px 0;
}
</style>

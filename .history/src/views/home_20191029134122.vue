<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <!--      <panel-group/>

      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart/>
      </el-row>-->

      <el-row :gutter="32">
        <!-- <el-col :xs="24" :sm="24" :lg="24">
          <div style="padding:0;important" class="chart-wrapper">
            <banner />
          </div>
        </el-col> -->
        <el-col :xs="24" :sm="16" :lg="16">
          <div>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="12">
                  <div class="main-home" style="width:100%;height:263px;background: #fff">
                    <div class="main-home-d">
                      <div class="main-home1">
                        <div class="main-home1-d">
                          <div>
                            快捷入口
                          </div>
                          <div>
                            <ul>
                              <li>
                                <div></div>
                                <p>代理商</p>
                              </li>
                              <li>
                                <div></div>
                                <p>系统设置</p>
                              </li>
                              <li>
                                <div></div>
                                <p>支付设置</p>
                              </li>
                              <li>
                                <div></div>
                                <p>我的资料</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

              </el-col>
              <el-col :xs="24" :sm="12" :lg="12">
                <div>
                    <div class="main-home" style="width:100%;height:263px;background: #fff">
                      <div class="main-home-d">
                        <div class="main-home1">
                          <div class="main-home1-d">
                            <div>数据概况</div>
                            <div>
                              <ul>
                                <li>
                                  <p>新增代理</p>
                                  <p>0</p>
                                </li>
                                <li>
                                  <p>代理总数</p>
                                  <p>4</p>
                                </li>
                                <li>
                                  <p>过期代理</p>
                                  <p>0</p>
                                </li>
                                <li>
                                  <p>商户总数</p>
                                  <p>4</p>
                                </li>

                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </el-col>
            </el-row>
          </div>


        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <article style="width:100%;height:263px;background: #fff">
            <div class="main-home">
              <div class="main-home-d">
                <!-- <div class="main-home1">
                  <div class="main-home1-d">
                    <div>
                      快捷入口
                    </div>
                    <div>
                      <ul>
                        <li>
                          <div></div>
                          <p>代理商</p>
                        </li>
                        <li>
                          <div></div>
                          <p>系统设置</p>
                        </li>
                        <li>
                          <div></div>
                          <p>支付设置</p>
                        </li>
                        <li>
                          <div></div>
                          <p>我的资料</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> -->
                <div class="main-home1">
                  <div class="main-home1-d">
                    <div>数据概况</div>
                    <div>
                      <ul>
                        <li>
                          <p>新增代理</p>
                          <p>0</p>
                        </li>
                        <li>
                          <p>代理总数</p>
                          <p>4</p>
                        </li>
                        <li>
                          <p>过期代理</p>
                          <p>0</p>
                        </li>
                        <li>
                          <p>商户总数</p>
                          <p>4</p>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <ul class="ul">
              <li>
                <p>交易总额（美金）</p>
                <span style="color:#00C3DA">{{navdata.trade_num}}</span>
              </li>
              <li>
                <p>交易笔数（笔）</p>
                <span style="color:#09BD22">{{navdata.trade_amount}}</span>
              </li>
              <li>
                <p>总设备数（台）</p>
                <span style="color:#4B87FF">{{navdata.device_num}}</span>
              </li>
              <li>
                <p>总投资（美金）</p>
                <span style="color:#FF7B61">{{navdata.total_investment}}</span>
              </li>
            </ul>
            <div class="chart-wrapper mapp">
              <banner1 />
            </div> -->
          </article>
        </el-col>
          <el-col :xs="24" :sm="24" :lg="24">
          <div style="padding:0;important" class="chart-wrapper">
            <banner3 />
          </div>
        </el-col>
      </el-row>
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

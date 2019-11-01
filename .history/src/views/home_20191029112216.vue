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
        <el-col :xs="24" :sm="24" :lg="12">
          <article style="width:100%;height:500px;background: #fff">
            <div>

            </div>
            <div>

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
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper">
            <banner2 />
          </div>
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

<template>
  <div :class="className" :style="{height:height,width:width}">
    <article class="art-nav">
      <p class="art-nav-p">
        <span>我的交易</span>
        <span style="color:#7CA7FF;cursor:pointer; " @click="deal" >查看全部</span>
      </p>
      <div>
        <div>
          <p>设备数（台）</p>
          <span style="color:#7CA7FF">{{earn.deviceNum}}</span>
        </div>
        <div>
          <p>我的交易额（美金）</p>
          <span style="color:#00C3DA">{{earn.totalTradeAmount}}</span>
        </div>
      </div>
    </article>
    <section>
      <div style="margin-right:2%">
        <h6>
          <span>我的收益</span>
          <span style="color:#7CA7FF; cursor:pointer; " @click="earns" >查看全部</span>
        </h6>
        <p>
          累计收益：
          <span style="color:#00C3DA">{{earn.totalProfit}}</span>美金
        </p>
        <p>
          今日收益：
          <span style="color:#00C3DA">{{earn.dayProfit}}</span>美金
        </p>
        <p>
          今日投资：
          <span style="color:#FF7F66">{{earn.dayInvest}}</span>美金
        </p>
      </div>
      <div>
        <h6>
          <span>我的团队</span>
          <span @click="team" style="color:#7CA7FF; cursor:pointer; ">查看全部</span>
        </h6>
        <p style="margin-top:60px">
          团队总数：
          <span style="color:#7CA7FF;font-weight:600" >{{earn.teamNum}}</span>人
        </p>
      </div>
    </section>
    <header>
      <h6>动态公告</h6>
      <p v-for="(i,item) in dta" v-bind:key="item">
        <span>{{i.content}}</span>
        <span>{{i.creatTime}}</span>
      </p>
    </header>
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import { getChartData } from "@/api/visits";
import { notice, earn } from "@/api/map";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "500px"
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      sheBei: 2000,
      jiaoYi: 12000,
      dta: "",
      earn: "",
      arr: 2
      // [
      //   {name:"刷脸支付,合作新模式刷脸支付,合作新模式",data:"2019.9.9"},
      //   {name:"刷脸支付刷脸支付,合作新模式刷脸支付,合作新模式",data:"2019.9.9"}
      //   ]
    };
  },
  mounted() {
    notice().then(res => {
      // var data=JSON.parse(res)
      console.log(res.data);
      this.dta = res.data;
      // console.log(typeof(this.data))
      // console.log( this.dataa)
    });
    earn().then(res => {
      // var data=JSON.parse(res)
      console.log(res);
      this.earn = res.data;
      // console.log(typeof(this.data))
      // console.log( this.dataa)
    });
  },
  methods: {
    deal() {
      this.$router.push({ path: "/deal/deallist" });
    },
    earns() {
      this.$router.push({ path: "/finance/earnings" });
    },
    team() { this.$router.push({ path: "/team/teaming" });}
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.art-nav {
  width: 100%;
  height: 137px;
  background: #fff;
  font-size: 13px;
  border-radius: 2px;
  .art-nav-p {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    margin: 0px !important;
  }
  > div {
    display: flex;
    justify-content: center;
    div {
      margin: 5px 40px;
    }
  }
}
section {
  width: 100%;
  display: flex;
  margin: 20px 0;
  > div {
    width: 49%;
    padding: 0 3%;
    height: 181px;
    background: #fff;
    border-radius: 2px;
    h6 {
      display: flex;
      justify-content: space-between;
    }
    > p {
      font-size: 14px;
      line-height: 28px;
    }
  }
}
header {
  width: 100%;
  height: 134px;
  background: #fff;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
  h6 {
    margin: 0 0 20px 0;
    padding: 0;
  }
  p {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    line-height: 20px;
  }
}
</style>

<template>
  <div :class="className" :style="{height:height,width:width}">
    <div class="footer">
      <h5>联系我们</h5>
      <p>
        <span>电话客服:{{phone}}</span>
        <span>客服QQ:{{qq}}</span>
        <span>公司邮箱:{{email}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import { getChartData } from "@/api/visits";
import {foot}  from "@/api/map";
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
      default: "100px"
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      qq:'',
      phone:"",
      email:"",
    };
  },
  mounted() {
     foot().then(res => {
      var data=JSON.parse(res.data)
      // console.log(typeof(data.data.map_data))
      // console.log(data)
      this.qq=data.qq
      this.phone=data.phone
      this.email=data.email
      // console.log(typeof(this.data))
      // console.log( this.email)
    })
  },
  methods: {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.footer{
  height: 100%;
  background: #fff;
  padding: 15px;
  border-radius: 2px;
  h5{
    padding: 0;
    margin: 0;
  }
  span{
    margin-right: 80px;
    font-size: 13px;
  }
}
</style>

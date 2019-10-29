<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
        <!-- <div>{{textt}}</div> -->
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper">
            <Line-chart3 @vale="getValue" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper">
            <line-chart2 />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="chart-wrapper">
            <Line-chart4 :valtext="textt"/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LineChart2 from "../team/line";
import LineChart3 from "../team/relation";
import LineChart4 from "../team/list/index";
// import { count } from "@/api/visits";
/**
 * 记录访问，只有页面刷新或者第一次加载才会记录
 */
// count().then(res => {
//   console.log(res)
// });

export default {
  data() {
    return {
      navdata: "",
      textt:"",
    };
  },
  name: "Dashboard",
  components: {
    LineChart2,
    LineChart3,
    LineChart4
  },
  computed: {
    ...mapGetters(["roles"])
  },
  // computed(){
  // console.log(this.$refs.splist.valid)

  // },

  methods: {
    getValue(data) {
      // console.log(data)
      this.textt=data
      // console.log(data);
      //     console.log(val);
    }
  },
  created() {
    // this.getValue()
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  background: #f0f2f5;
  padding-bottom: 70px;
 
}
.dashboard-editor-container {
  padding: 15px 15px 30px 15px;
  background-color: rgb(240, 242, 245);
//  min-width: 1200px;
  .chart-wrapper {
    // background: #fff;
    // padding: 10px 10px 0;
    margin-bottom: 20px;
   
  }
}
.ul {
  display: flex;
  list-style: none;
  justify-content: space-around;
  padding: 20px 0;
  margin: 0;
  li {
    text-align: left;
    font-weight: 600;
    line-height: 25px;
    p {
      font-size: 12px;
    }
    span {
      font-size: 16px;
    }
  }
}
.mapp {
  padding: 10px 10px 0;
}
</style>

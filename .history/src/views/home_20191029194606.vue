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
        <el-col :xs="24" :sm="24" :lg="16">
          <div class="main-home">
            <el-row>
              <el-col :xs="24" :sm="24" :lg="12">
                <div class="main-home-d" style="width:100%;height:263px;">
                  <div class="main-home1">
                    <div class="main-home1-d">
                      <div>
                        快捷入口
                      </div>
                      <div>
                        <ul class="ul1">
                          <li>
                            <a href="">
                              <div><i class="el-icon-setting"></i></div>
                              <p>代理商</p>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <div><i class="el-icon-setting"></i></div>
                              <p>系统设置</p>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <div><i class="el-icon-setting"></i></div>
                              <p>支付设置</p>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <div><i class="el-icon-setting"></i></div>
                              <p>我的资料</p>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
              </div>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="12">
                  <div class="main-home-d" style="width:100%;height:263px;">
                    <div class="main-home1">
                      <div class="main-home1-d">
                        <div>数据概况</div>
                        <div>
                          <ul class="ul2">
                            <li>
                              <a href="">
                                <p>新增代理</p>
                                <p>0</p>
                              </a>
                            </li>
                            <li>
                              <a href="">
                                <p>代理总数</p>
                                <p>4</p>
                              </a>
                            </li>
                            <li>
                              <a href="">
                                <p>过期代理</p>
                                <p>0</p>
                              </a>
                            </li>
                            <li>
                              <a href="">
                                <p>商户总数</p>
                                <p>4</p>
                              </a>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="16">
          <div class="main-home2" style="height:486.5px;">
            <el-row>
              <el-col :xs="24" :sm="24" :lg="24">
                <div class="" style="margin:-7.5px;">
                  <div style="margin:7.5px; margin-right:22.5px;">
                    <div class="main-home2" style="padding: 10px 15px;line-height: 24px;background:#fff;box-sizing:border-box;">
                      <div class="main-home2-d1">
                        <span>流水信息</span>
                        <div>
                          <a href="">7天</a>
                          <a href="">15天</a>
                          <a href="">30天</a>
                        </div>
                      </div>
                      <div class="main-home2-d2">
                        <div >
                          <template>
                            <el-select v-model="value" placeholder="请选择">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </template>
                          <span style='display:block;font-size:14px;color:#666;height:24px;'>门店收银状况</span>
                        </div>
                        <div style="height:332px;">
                          <div>

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
          <!-- <el-col :xs="24" :sm="24" :lg="24">
          <div style="padding:0;important" class="chart-wrapper">
            <banner3 />
          </div>
        </el-col> -->
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
     options: [{
          value: '选项1',
          label: '杭州水果'
        }, {
          value: '选项2',
          label: '杭州水果店'
        }, {
          value: '选项3',
          label: '小易水果1'
        }, {
          value: '选项4',
          label: '小易水果2'
        }, {
          value: '选项5',
          label: '测试餐饮'
        }, {
          value: '选项6',
          label: '测试'
        }, {
          value: '选项7',
          label: '测试'
        }, {
          value: '选项8',
          label: '测试卷'
        }],
        value: '',
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
  .main-home-d{
    margin:-7.5px;
  }
  .main-home1{
    margin:7.5px;
  }
  .main-home1-d{
    background: #fff;
    height:248px;
  }
  .main-home1-d>div:nth-of-type(1){
    height: 42px;
    line-height: 42px;
    padding: 0 15px;
    border-bottom: 1px solid #f6f6f6;
    color: #333;
    border-radius: 2px 2px 0 0;
    font-size: 14px;
  }
  .ul1{
    padding: 0;
    margin:0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    >li{
      padding:0;
      list-style-type: none;
      height:94px;
      width:25%;
      padding:5px;
      box-sizing: border-box;
      a{
        display: inline-block;
        width: 100%;
        color:#666;
        text-decoration: none;
        div{
          display: inline-block;
          width: 100%;
          height: 60px;
          line-height: 60px;
          text-align: center;
          border-radius: 2px;
          font-size: 30px;
          background-color: #F8F8F8;
          color: #333;
          transition: all .3s;
          -webkit-transition: all .3s;
          >i{
            display: inline-block;
            width: 100%;
            height: 60px;
            line-height: 60px;
            text-align: center;
            border-radius: 2px;
            font-size: 30px;
            background-color: #F8F8F8;
            color: #333;
          }
        }
        p{
          text-align: center;
          margin:0;
          padding:0;
          display: block;
          color: #666;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 14px;
        }

      }

    }

  }
  .main-home1-d>div:nth-of-type(2){
    padding: 10px 15px;
    line-height: 24px;

  }
  .ul2{
    padding: 0;
    margin:0;

    >li{
      float:left;
      padding:0;
      list-style-type: none;
      height:94px;
      width:50%;
      padding:5px;
      box-sizing: border-box;
      a{
        display: inline-block;
        width: 100%;
        color:#666;
        text-decoration: none;
        display: block;
        padding: 10px 15px;
        background-color: #f8f8f8;
        color: #999;
        border-radius: 2px;
        p{
          margin:0px;
        }
        >p:nth-of-type(1){
          font-size: 12px;
          margin-bottom: 10px;
        }
        >p:nth-of-type(2){
          font-style: normal;
          font-size: 30px;
          font-weight: 300;
          color: #009688;
        }
      }
    }
  }
  .main-home2-d1{
    height: 42px;
    line-height: 42px;
    // padding: 0 15px;
    border-bottom: 1px solid #f6f6f6;
    color: #333;
    border-radius: 2px 2px 0 0;
    font-size: 14px;
    >span{
      display: inline-block;
    }
    >div{
      display: inline-block;
      vertical-align: middle;

      float:right;
      >a{
        margin-top:11px;
        float: left;
        display: inline-block;
        height:20px;
        border: 1px solid #C9C9C9;
        background-color: #fff;
        color: #555;
        height: 22px;
        line-height: 22px;
        padding: 0 5px;
        font-size: 12px;
        // float: left;
        // font-size: 0px;
        // border-right: none;

      }
      >a:nth-of-type(1){
        border-left: 1px solid #c9c9c9;
        border-radius: 2px 0 0 2px;
      }
      >a:nth-of-type(2){
        border-left: 0px solid #c9c9c9;
      }
      >a:nth-of-type(3){
        border-left: 0px solid #c9c9c9;
        border-radius: 2px 0 0 2px;
      }
    }
  }
  .main-home2-d2{
    line-height: 24px;
    >div:nth-of-type(1){
      padding: 5px 0;
      height:69px;
    }
  }

.dashboard-editor-container {
  padding: 15px 15px 30px 15px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    // background: #fff;
    // padding: 10px 10px 0;
    margin-bottom: 20px;
  }
}

// .ul{
//   display: flex;
//   list-style: none;
//   justify-content: space-around;
//   padding: 20px 0;
//   margin: 0;
//   li{
//     text-align: left;
//     font-weight: 600;
//     line-height: 25px;
//     p{
//       font-size: 12px;

//     }
//     span{
//       font-size:16px;
//     }
//   }

// }
.mapp{
   padding: 10px 10px 0;
}
</style>

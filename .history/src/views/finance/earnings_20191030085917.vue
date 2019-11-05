<template>
  <div class="wscn-http404-container">
    <div>
      <div class="system-left">
        <div class='left-title'>
          <h3>系统设置</h3>
        </div>
        <div class="left-main">
          <ul>
            <li  v-for="(item, index) in listoption" :key="item.index" :class="{'is-active':ind === index}" @click="changeBgc(index)">
              <span>{{item}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="system-right">
        <div class="right-main">asdfasdfas</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  finan,
  finana,
  pages,
  cashlist,
  withdraw,
  topup,
  toup
} from "@/api/finance";
export default {
  data() {
    return {
      listoption:['站点配置','开放平台配置','短信配置','图片存储配置','验证码配置','泛域名设置','广告设置'],
      ind:0,
    };
  },
  methods:{
    changeBgc: function (index) {
      this.ind = index
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404-container {
  background: #f0f2f5;
  min-height: calc(100vh - 84px);
  width: 100%;
}
.wscn-http404-container>div{
  width:100%;
}
// 系统设置的主体左边侧边
.system-left{
  width:120px;
  height:100%;
  min-height: calc(100vh - 84px);
  background: #fff;
  border-right: solid 1px #e6e6e6;
}
.left-title>h3{
  margin: 20px 0px;
  padding: 0;
  line-height: 24px;
  font: 14px Helvetica Neue,Helvetica,PingFang SC,Tahoma,Arial,sans-serif;
  color: #666;
  text-align: center;
}
.left-main ul{
  margin: 0;
  padding-left: 0px;
}
.left-main ul li{
  list-style-type: none;
  font-size: 14px;
  color: #303133;
  padding: 0 20px;
  cursor: pointer;
  transition: border-color .3s,background-color .3s,color .3s;
  box-sizing: border-box;
  height: 56px;
  line-height: 56px;
  white-space: nowrap;

}
.left-main ul li>span{
  width:100%;
  font-size: 14px;
  color: #303133;
  display: inline-block;
  text-align: center;
}
.left-main ul .is-active >span{
  color: #409EFF;
}
// 系统设置的主体右边主体内容
.system-right{
  padding:15px;
  box-sizing: border-box;
}
.system-right{
  width:100%;
  padding:20px;
  box-sizing: border-box;
}
</style>

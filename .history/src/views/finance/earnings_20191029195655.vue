<template>
  <div class="wscn-http404-container">
    <div>
      <div class="system-left">
        <div class='left-title'>
          <h3>系统设置</h3>
        </div>
        <div class="left-main">
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
      <div class="system-right">
        <div class="right-main"></div>
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

    };
  },
  methods:{

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
.system-left{
  width:120px;
  height:100%;
}

</style>

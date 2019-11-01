<template>
  <div class="wscn-http404-container">
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
.ul {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 20px 0 20px 20px;
  span {
    cursor: pointer;
  }
  li {
    list-style: none;
    background: #fff;
    width: 31%;
    height: 15vw;
    padding: 20px;
    margin-right: 20px;
    h6 {
      display: flex;
      justify-content: space-between;
      margin: 0 0 12% 0;
      span:nth-of-type(2) {
        color: #548dff;
      }
    }
    p:nth-of-type(1) {
      font-size: 14px;
      display: flex;
      line-height: 20px;
      justify-content: space-around;
      padding: 0 100px;
      height: 20px;
      white-space: nowrap;
      span {
        white-space: nowrap;
        // margin-right: 30px
      }
    }
    p:nth-of-type(2) {
      font-size: 14px;
      display: flex;
      line-height: 20px;
      justify-content: space-around;
      padding: 0 100px;
      span {
        width: 120px;
        // margin-right: 30px
      }
    }
    p:nth-of-type(3) {
      display: flex;
      justify-content: center;
      margin-top: 10%;
      span {
        font-size: 10px;
        padding: 8px 20px;
        background: #4986ff;
        color: #fff;
        margin: 0 60px;
        border-radius: 2px;
        white-space: nowrap;
      }
      span:nth-of-type(2) {
        background: #09bd22 !important;
      }
    }
  }
}
.hint {
  width: 30%;
  position: absolute;
  text-align: center;
  margin: 4% 0 0 0;
  font-size: 10px;
  min-width: 300px;
}
.fuCeng {
  position: fixed;
  z-index: 1002;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 600px;
    height: 280px;
    background: white;
    overflow-x: none !important;
    overflow-y: none !important;
    h4 {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      margin: 0;
      background: #4986ff;
      color: white;
      font-weight: 100;
      img {
        width: 15px;
        height: 15px;
      }
    }
    div {
      margin-top: 50px;
      p {
        font-size: 15px;
        text-align: center;
        span {
          margin: 20px;
          padding: 7px 20px;
          font-size: 12px;
          border: 1px solid gainsboro;
          margin: 0 40px;
        }
        span:nth-of-type(1) {
          background: #4986ff;
          color: white;
        }
        span:nth-of-type(2) {
          background: #fff;
          color: #c2c2c2;
          width: 66px;
        }
      }
      p:nth-of-type(3) {
        margin-top: 60px;
      }
    }
  }
}
.inpa {
  text-align: left !important;
  padding: 20px 30px;
  margin-top: 0 !important;
}
.classred {
  background: #4986ff;
  color: #fff;
}
input {
  outline: none;
}

</style>

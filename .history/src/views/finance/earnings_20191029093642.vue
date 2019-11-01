<template>
  <div class="wscn-http404-container">
    <ul class="ul">
      <li style="min-width:300px;min-height:200px">
        <h6>
          <span>现金钱包</span>
          <span @click="hrefone">查看明细</span>
        </h6>
        <p>当前余额（美金）</p>
        <p style="color:#18C6DC">
          <span style="text-align:center">{{date.totalCash}}</span>
        </p>
        <p>
          <span @click="withdraws">提现</span>
          <span @click="topups">充值</span>
        </p>
      </li>
      <li style="min-width:300px;min-height:200px">
        <h6>
          <span>静态钱包收益</span>
          <span @click="hreftwo">查看明细</span>
        </h6>
        <p>
          <span>累计收益（美金）</span>
          <span>当天收益（美金）</span>
        </p>
        <p style="color:#18C6DC">
          <span>{{date.staCash}}</span>
          <span>{{date.staCashDay}}</span>
        </p>
        <p>
          <!-- <span @click="contributeb">一键复投</span> -->
        </p>
        <div class="hint">次月5号按自然月自动提现到现金红包</div>
      </li>
      <li style="min-width:300px;min-height:200px">
        <h6>
          <span>动态钱包收益</span>
          <span @click="hrefthree">查看明细</span>
        </h6>
        <p>
          <span>累计收益（美金）</span>
          <span>当天收益（美金）</span>
        </p>
        <p style="color:#18C6DC">
          <span>{{date.actCash}}</span>
          <span>{{date.actCashDay}}</span>
        </p>
        <p>
          <!-- <span @click="contributea">一键复投</span> -->
        </p>
        <div class="hint">次月5号按自然月自动提现到现金红包</div>
      </li>
    </ul>
    <!-- 阴影层 -->
    <div v-if="FC" class="fuCeng">
      <div v-if="centers">
        <h4>
          <span>一键复投</span>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div>
          <p></p>
          <p>是否跳转购买产品页面？</p>
          <p>
            <span @click="voting">确定</span>
            <span @click="contribute">取消</span>
          </p>
        </div>
      </div>
      <!-- 充值 -->
      <div v-if="cashmoney">
        <h4>
          <span>{{val}}账户</span>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div style="margin-top:20px!important;">
          <div style="margin-top:20px!important;">
            <div
              style="margin-top:0px!important;"
              @click="button(i.id)"
              v-for="(i,index) in cashlists"
              v-bind:key="index"
            >
              <div
                v-bind:class="{ classred:index==current}"
                style="margin:5px 20px;padding: 7px 10px; border:1px solid gainsboro;display: flex;
    justify-content: space-between;"
              >
                <span>{{i.name}}</span>
                <span style="color:gray">{{i.token}}</span>
              </div>
            </div>
          </div>
        </div>
        <p style="display:flex;justify-content: center;">
          <span
            @click="notarizeTopup"
            style="color:#fff;background: #4986ff;padding:5px 20px;border-radius: 2px"
          >确定</span>
        </p>
      </div>
      <!-- 提现 -->
      <div v-if="topupmoney">
        <h4>
          <span>{{val}}</span>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <p style="padding:20px 30px 0px 30px">
          {{val}}金额：
          <input
            style="margin-right:30px;width:200px; border-radius: 2px;border:1px solid #fff"
            type="text"
            placeholder="请输入金额"
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="orderWithdraw.amount"
          />美元（不能大于总额度）
        </p>
        <p style="padding:0px 30px">
          {{val}}地址：
          <input
            style="margin-right:30px;width:200px; border-radius: 2px;border:1px solid #fff;"
            type="text"
            placeholder="请输入地址"
            v-model="orderWithdraw.tokenId"
          />
        </p>
        <p style="padding:0px 30px 10px 30px">
          备注：
          <input
            style="margin-right:30px;width:200px;margin-left:33px; border-radius: 2px;border:1px solid #fff"
            type="text"
            placeholder="请留言"
            v-model="orderWithdraw.remark"
          />
        </p>
        <p style="display:flex;justify-content: center;margin-top:20px">
          <span
            style="color:#fff;background: #4986ff;padding:5px 20px;border-radius: 2px"
            @click="notarize"
          >确定</span>
        </p>
        <!-- <span @click="contribute">取消</span> -->
      </div>
    </div>
    <!-- 充值与支付支付弹窗-->
    <div v-show="FCA" class="fuCeng">
      <div>
        <h4>
          <span>{{val}}</span>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <p style="padding:20px 30px 10px 30px">
          {{val}}金额：
          <input
            style="margin-right:30px;width:200px; border-radius: 2px;border:1px solid #fff"
            type="text"
            placeholder="请输入金额"
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="orderToup.amount"
          />美元
        </p>
        <p style="padding:0px 30px 10px 30px">
          交易单号：
          <input
            style="margin-right:30px;width:200px; border-radius: 2px;border:1px solid #fff"
            type="text"
            placeholder="请输入交易单号"
            v-model="orderToup.tokenId"
          />
        </p>
        <p style="padding:0px 30px">
          {{val}}地址：
          <span style="color:gray">{{topup_a.token}}</span>
        </p>
        <p style="display:flex;justify-content: center;margin-top:20px">
          <span
            style="color:#fff;background: #4986ff;padding:5px 20px;border-radius: 2px"
            @click="notarize"
          >确定</span>
        </p>
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
      fuTou: 12,
      finan: "",
      radio7: "1",
      val: "",
      pay: 3,
      date: "",
      type: "",
      moneyy: "",
      state: "",
      topup_a: 1,

      current: 1000,
      orderToup: {
        amount: "", //充值金额
        tokenId: "", //订单号
        thirdId: ""
      },
      orderWithdraw: {
        amount: "",
        tokenId: "",
        remark: ""
      },
      FC: false, //一层浮层展现 提现与充值选择支付方式，一件复投展显
      centers: false, //一键复投展现
      cashmoney: false, //充值
      topupmoney: false, //提现
      FCA: false, //二层浮层 提现与充值提交支付
      cashlists: ""
    };
  },
  methods: {
    // 充值单选
    button(e) {
      // console.log(1);
      console.log(e);
      var e = e - 1;
      this.current = e;
      this.topup_a = this.cashlists[e];
      // for(let i=0;i<this.cashlists.length;i++){

      // }
    },
    // 充值确认
    notarizeTopup() {
      if (this.current == 1000) {
        alert("请选择支付方式");
      } else {
        this.FC = false;
        this.FCA = true;
      }
    },
    // 确认
    notarize() {
      //充值后跳转
      // console.log(this.amount);

      var that = this;
      if (this.type == 1) {
        this.orderToup.thirdId = this.topup_a.token;
        if (that.orderToup.amount == "") {
          alert("请输入金额");
        } else if (that.orderToup.tokenId == "") {
          alert("请输入订单号");
        } else {
          toup(this.orderToup).then(res => {
            // var data=JSON.parse(res.data)
            console.log(res);
            that.FC = false;
            that.FCA = false;
            console.log(that.amount);
            that.$message({
              message: "恭喜你，订单已生成",
              type: "success"
            });

            that.$router.push({
              path: "/finance/recharge",
              query: { topupMoney: that.amount }
            });
          });
        }
      }
      //提现后跳转

      if (this.type == 2) {
        console.log(this.orderWithdraw);
        if (this.orderWithdraw.amount == "") {
          this.$message.error("请输入金额");
        } else if (this.orderWithdraw.tokenId == "") {
          this.$message.error("请输入地址");
        } else if (this.orderWithdraw.amount > this.date.totalCash) {
          this.$message.error("请再次输入金额");
        } else {
          console.log(this.orderWithdraw);
          withdraw(this.orderWithdraw).then(res => {
            // var data=JSON.parse(res.data)
            console.log(res);
            // this.dataa=eval(data.data.map_data)
            this.FC = false;
            this.FCA = false;
            this.$message({
              message: "恭喜你，提交成功",
              type: "success"
            });
            this.$router.push({
              path: "/finance/withdraw"
            });
          });
        }
      }
    },
    toWithdraw() {},
    // 提现
    withdraws() {
      this.type = 2;
      this.centers = false;
      this.cashmoney = false;
      this.topupmoney = true;
      this.val = "提现";
      this.FC = true;
      // withdraw().then(res => {
      //   // var data=JSON.parse(res.data)
      //   console.log(res);
      //   // this.dataa=eval(data.data.map_data)
      // });
    },
    // 充值
    topups() {
      this.type = 1;
      this.centers = false;
      this.cashmoney = true;
      (this.topupmoney = false), (this.val = "充值");
      this.FC = true;
      topup().then(res => {
        // var data=JSON.parse(res.data)
        console.log(res);
        this.cashlists = res;
        console.log(this.cashlists);
        // this.dataa=eval(data.data.map_data)
      });
    },
    // 查看明细
    hrefone() {
      this.$router.push({ path: "/finance/cash" });
    },
    hreftwo() {
      this.$router.push({ path: "/finance/static" });
    },
    hrefthree() {
      this.$router.push({ path: "/finance/dynamic" });
    },
    contribute() {
      this.FCA = false;
      this.FC = false;
      console.log(this.FC);
    },
    // 动态
    contributea() {
      (this.topupmoney = false), (this.cashmoney = false);
      this.centers = true;
      this.state = 1;
      console.log(this.state);

      this.FC = true;
    },
    // 静态
    contributeb() {
      this.state = 2;
      (this.topupmoney = false), (this.cashmoney = false);
      this.centers = true;
      this.FC = true;
    },
    // 复投确定
    voting() {
      this.FC = false;
      if (this.state == 1) {
        this.$router.push({ path: "/product/combination", query: { pay: 2 } });
      }
      if (this.state == 2) {
        this.$router.push({ path: "/product/combination", query: { pay: 3 } });
      }
    }
  },
  created() {
    pages().then(res => {
      // var data=JSON.parse(res.data)
      // console.log(res);
      this.date = res;
      // console.log(this.date.userId);
    });
    // toup().then(res => {
    //     // var data=JSON.parse(res.data)
    //     console.log(res);
    //     this.date = res;
    //     console.log(this.date.userId);
    //   });
  }
};
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

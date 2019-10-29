<template>
  <div class="wscn-http404-container">
    <el-col :xs="24" :sm="24" :lg="24" style=" background: #f0f2f5;">
      <ul class="ul">
				<li>
				  <h5>自定义产品</h5>
				  <div>
				    <div class="bg">
				      <img style="width:100%;height:100%" src="../../assets/logo/ic_yxgl_hysc.png" alt />
				    </div>
				    <div class="val">
				      <p>
				        <span>价格：</span>
				        <span>{{customPrice}}美金</span>
				      </p>
				      <p>
				        <span>周期：</span>
				        <span>{{config.period}}天</span>
				      </p>
				      <p>
				        <span>回报率：</span>
				        <span>{{config.profit}}</span>
				      </p>
				
				      <p>
				        <span>数量：</span>
				        <span>
				            <el-input-number size="mini" v-model="num" :min="1" :max="100" @change="countPrice"></el-input-number>台
				        </span>
				      </p>
				      <p style="display: flex;justify-content:flex-end;">
				        <span
				          style="background:#4986FF;color:#fff;padding:3px 15px;font-size:12px;border-radius: 3px;cursor: pointer"
				          @click="contribut(1,i)"
				        >购买</span>
				      </p>
				    </div>
				  </div>
				</li>
        <li v-for="(i,item) in list" v-bind:key="item">
          <h5>{{i.name}}</h5>
          <div>
            <div class="bg">
              <img style="width:100%;height:100%" :src=i.pic_url alt />
            </div>
            <div class="val">
              <p>
                <span>价格：</span>
                <span>{{i.price}}美金</span>
              </p>
              <p>
                <span>周期：</span>
                <span>{{i.period}}天</span>
              </p>
              <p>
                <span>回报率：</span>
                <span>{{i.profit_rate}}</span>
              </p>

              <p>
                <span>数量：</span>
                <span>
                  <span :key="i.id">{{i.num}}</span>台
                </span>
              </p>
              <p style="display: flex;justify-content:flex-end;">
                <span
                  style="background:#4986FF;color:#fff;padding:3px 15px;font-size:12px;border-radius: 3px;cursor: pointer"
                  @click="contribut(2,i)"
                >购买</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </el-col>
    <!-- 阴影层 -->
    <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <span>购买</span>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div>
          <p>确定购买吗？</p>
          <p>
            <span @click="ensure">确定</span>
            <span @click="contribute">取消</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { alll, purchase, reivest,getConfig } from "@/api/produc";
export default {
  data() {
    return {
			customPrice:100,
      num: 1,
      list: [],
      FC: false,
			config:{
				profit:0,
				period:0,
				amount:0
				
			},
      value: {
        pay: 1,
        id: 0,
        num:0
      }
    };
  },
  methods: {
		countPrice(){
			this.customPrice = this.num*this.config.amount
		},
    contribute(row) {
      console.log(row);
      if (this.FC == false) {
        console.log(123);
        this.FC = true;
      } else {
        this.FC = false;
        console.log(1243);
      }

      console.log(this.FC);
    },
    ensure() {
      this.FC = false;

      // console.log(this.value.id)
      // if (this.value.id == 139) {
      //   var pay = 1;
      //   var data = {
      //     pay,
      //     id: 0,
      //     num: this.num
      //   };
      // } else {
      //   var pay = 1;
      //   var data = {
      //     pay,
      //     id: this.value.id,
      //     num: 0
      //   };
      // }

      purchase(this.value).then(res => {
         
        // this.$message.success("购买产品成功");
        // this.$router.push({ path: "/product/record" });
       if(res=='产品购买失败'){
        this.$message.error("产品购买失败");
       }else{
          this.$message.success("购买产品成功");
           this.$router.push({ path: "/product/record" });
       }
      });
    },
    // this.list = eval(res.list);

    contribut(type,item) {
      this.FC = true;
			if(type==1){
				this.value.id = 0
				this.value.num = this.num
			}
			if(type==2){
				this.value.id = item.id
				this.value.num = 0
			}
				this.value.pay = 1
        console.log(this.value)
      // for (let i = 0; i < this.list.length; i++) {
      //   if (i == item) {
      //     this.bay = this.list[item].id;
      // 
      //   }
      // }
    }
  },
  mounted() {
    this.value.pay = this.$route.query.pay;
    alll().then(res => {
      console.log(res);
      this.list = res.list;
    });
		getConfig().then(res=>{
				this.config.period = res.period
				this.config.profit = res.profit
				this.config.amount = res.amount
		})
  }
};
//   created(e) {
//     console.log(this.$route.query.pay);
//     this.value.pay = this.$route.query.pay;
//     alll().then(res => {
//       console.log(res);
//
//       this.list = eval(res.list);
//       console.log(this.list);
//     });
//   }
// };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404-container {
  min-height: calc(100vh - 84px);
  width: 100%;
}
.ul {
  display: flex;
  min-width: 700px;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0;
  padding: 20px 0 20px 20px;
  li {
    list-style: none;
    background: #fff;
    width: 48%;
    padding: 1%;
    margin-right: 1%;
    font-size: 14px;
    margin-bottom: 1%;
    h5 {
      margin: 0 0 40px 0;
    }
    > div {
      display: flex;
      div:nth-of-type(2) {
        width: 50%;
        margin: 0 18%;
        height: 100%;
        p {
          margin: 0;
          line-height: 22px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
.hint {
  position: absolute;
  text-align: center;
  margin: 40px 0 0 120px;
  font-size: 10px;
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
      margin-top: 66px;
      p {
        font-size: 15px;
        text-align: center;
        margin-top: 60px;

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
          width: 0px;
        }
      }
    }
  }
}
.bg {
  width: 40%;
  height: 20%;
}
.val {
  span {
    white-space: nowrap;
    width: 120px;
  }
}
.el-input .el-input-number .el-input__inner {
  height: 20px;
}
.el-input-number {
  margin-bottom: 5px;
}
</style>

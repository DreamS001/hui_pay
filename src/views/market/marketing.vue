<template>
  <div>
    <ul>
      <li @click="poster">
        <img src="../../assets/logo/ic_yxgl_hb.png" alt />
        <p>海报</p>
      </li>
      <li @click="writer">
        <img src="../../assets/logo/ic_yxgl_yxwa.png" alt />
        <p>营销文案</p>
      </li>
      <li @click="video">
        <img src="../../assets/logo/ic_yxgl_sp.png" alt />
        <p>视频</p>
      </li>
      <li @click="ppt">
        <img src="../../assets/logo/ic_yxgl_ppt.png" alt />
        <p>PPT</p>
      </li>
      <li @click="material">
        <img src="../../assets/logo/ic_yxgl_hysc.png" alt />
        <p>会议素材</p>
      </li>
      <li @click="channel">
        <img src="../../assets/logo/ic_yxgl_yyqd.png" alt />
        <p>营销渠道</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 海报
    poster(){
     this.$router.push({ path: "poster" });
    },
    // 营销文案
     writer(){
     this.$router.push({ path: "writer" });
    },
//视频
     video(){
     this.$router.push({ path: "video" });
    },
//PPT
     ppt(){
     this.$router.push({ path: "ppt" });
    },
//会议素材
     material(){
     this.$router.push({ path: "material" });
    },
//营销渠道
     channel(){
     this.$router.push({ path: "channel" });
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss"  scoped>
ul {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  li {
    list-style: none;
    width: 30%;
    margin-bottom: 50px;
    p {
      text-align: center;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

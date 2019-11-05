<template>
  <div>
    <div class="right-main" v-if="imain2==ind">
      <div class="left-Line">站点信息配置</div>
      <div class="left-line-content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="系统名称">
            <el-input placeholder="请输入名称" v-model="form.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="登录Logo">
            <template>
              <div class="upload-box1">
                <el-upload
                  class="avatar-uploader"
                  action="http://shipz.jie360.com.cn/api/product/upload/"
                  :show-file-list="false">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </template>
            <p style="margin:0;margin-left:80px;padding:0;color: rgb(204, 204, 204);display:block">建议尺寸 262 x 41px。</p>
          </el-form-item>
          <el-form-item label="网站ico">
            <template>
              <div class="upload-box2">
                <el-upload
                  class="avatar-uploader"
                  action="http://shipz.jie360.com.cn/api/product/upload/"
                  :show-file-list="false">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </template>
            <p style="max-width:200px;margin:0;margin-left:80px;padding:0;color: rgb(204, 204, 204);display:block">建议尺寸 64 x 64px。该图片后缀必须为ico <a style="color:#409eff" href="http://www.faviconico.org/favicon">立即生成</a></p>
          </el-form-item>
          <el-form-item label="PC安卓Logo">
            <template>
              <div class="upload-box3">
                <el-upload
                  class="avatar-uploader"
                  action="http://shipz.jie360.com.cn/api/product/upload/"
                  :show-file-list="false">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </template>
            <p style="margin:0;margin-left:80px;padding:0;color: rgb(204, 204, 204);display:block">建议尺寸 64 x 64px。</p>
          </el-form-item>
          <el-form-item label="门户网站">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="">

</style>

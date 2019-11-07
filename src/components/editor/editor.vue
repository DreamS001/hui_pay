<template>
  <div class="UE">
    <!--这个地方的大小是可以自己控制的-->
    <div id="editor" style="width:100%;height:120px;">
    </div>
  </div>
</template>
<script>
export default {
    name:'ue',
    props:{
        // value:{
        //     type:String,
        //     default:""
        // }
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    data() {
      return {
        editor: null,
      };
    },
    mounted() {
      // 实例化editor编辑器
      this.editor = window.UE.getEditor("editor", this.config);
      //设置编辑器默认内容
      this.editor.addListener('ready', () => {
        this.editor.setContent(this.defaultMsg)
        console.log(this.defaultMsg)
      })
    },
     methods: {
     //获取编辑器中的内容
      getUEContent () {
        return this.editor.getContent()
      }
    },
    destroyed() {
      // 将editor进行销毁
      this.editor.destroy();
    }
}

</script>
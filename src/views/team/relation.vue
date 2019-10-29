<template>
  <div>
    <div :class="className" :style="{height:height,width:width}" ref="chart">
      <div
        style="width:100%;height:100%;background:#fff; overflow-x: hidden;
        overflow-y: scroll;"
      >
        <h4 style="padding:15px;margin:0;">人员结构图</h4>
        <el-tree
          :data="datas"
          node-key="id"
          ref="tree"
          :default-expand-all="reveal"
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          @current-change="handleCurrentChange"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
        ></el-tree>
      </div>
    </div>
  </div>
</template>
<script>
const echarts = require("echarts");
import { persAll } from "@/api/team";
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "500px"
    },

    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      reveal: false,
      datas: [],
      defaultProps: {
        children: "children",
        label: "label",
        valid: ""
      }
    };
  },
  methods: {
    submitForm: function() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    handleDragStart(node, ev) {
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    },
    handleCurrentChange(val) {
      // console.log(val.id);
      this.valid = val.id;
      this.$emit("vale", val.id);

      // this.$emit('transfer',val.id)//将值绑定到transfer上传递过去
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
    bt() {
      console.log(123);
    }
  },
  mounted() {},
  created() {
    persAll().then(res => {
      console.log(res);
      this.datas = res.content;
    });
  }
};
</script>
<style >
</style>
<style rel="stylesheet/scss" lang="scss"  scoped>
</style>

<template>
  <div class="app-container">
    <!--form 组件-->
    <eForm ref="form" :is-add="isAdd" :dicts="dicts" />
    <el-row :gutter="20">
      <!--部门数据-->
      <!-- <el-col :xs="7" :sm="6" :md="4" :lg="4" :xl="4">
        <div class="head-container">
          <el-input v-model="deptName" clearable placeholder="输入部门名称搜索" prefix-icon="el-icon-search" style="width: 100%;" class="filter-item" @input="getDeptDatas"/>
        </div>
        <el-tree :data="depts" :props="defaultProps" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick"/>
      </el-col>-->
      <!--用户数据-->
      <!-- 111{{valid}} -->
      <el-col>
        <!--工具栏-->
        <div class="head-container boxx">
          <!-- 搜索 -->
          <el-input
            v-model="query.value"
            clearable
            placeholder="输入关键字搜索"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="toQuery"
          />
          <el-select
            v-model="query.type"
            clearable
            placeholder="类型"
            class="filter-item"
            style="width: 130px"
          >
            <el-option
              v-for="item in queryTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
          <!-- <el-select
            v-model="query.enabled"
            clearable
            placeholder="状态"
            class="filter-item"
            style="width: 90px"
            @change="toQuery"
          >
            <el-option
              v-for="item in enabledTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>-->
          <el-button
            class="filter-item"
            size="mini"
            type="success"
            icon="el-icon-search"
            @click="toQuery"
          >搜索</el-button>
          <!-- 新增 -->
          <div
            v-permission="['ADMIN','USER_ALL','USER_CREATE']"
            style="display: inline-block;margin: 0px 2px;float: right;"
          >
            <el-button
              class="filter-item"
              size="mini"
              type="primary"
              icon="el-icon-plus"
              @click="add"
            >新增</el-button>
          </div>
          <!-- 导出 -->
          <div style="display: inline-block;">
            <el-button
              v-permission="['ADMIN']"
              :loading="downloadLoading"
              size="mini"
              class="filter-item"
              type="warning"
              icon="el-icon-download"
              @click="download"
            >导出</el-button>
          </div>
        </div>
        <!--表格渲染-->
        <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
          <el-table-column :show-overflow-tooltip="true" prop="createTime" label="日期">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="投资人编号">
            <template slot-scope="scope">
              <div>{{ scope.row.job.name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="用户名" />
          <el-table-column prop="phone" label="电话" />
          <el-table-column label="投资人编号">
            <template slot-scope="scope">
              <div>{{ scope.row.merchantId }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column :show-overflow-tooltip="true" prop="email" label="邮箱"/> -->
          <el-table-column label="下线">
            <template slot-scope="scope">
              <div>{{ scope.row.offlinePrice }}/台</div>
            </template>
          </el-table-column>
          <el-table-column label="投资金额（美金）">
            <template slot-scope="scope">
              <div>{{ scope.row.job.name }}</div>
            </template>
          </el-table-column>
          <el-table-column label="所剩金额（美金）">
            <template slot-scope="scope">
              <div>{{ scope.row.job.name }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <div v-for="item in dicts" :key="item.id">
                <el-tag v-if="scope.row.enabled.toString() === item.value" :type="scope.row.enabled ? '' : 'info'">{{ item.label }}</el-tag>
              </div>
            </template>
          </el-table-column>-->

          <el-table-column
            v-if="checkPermission(['ADMIN','USER_ALL','USER_EDIT','USER_DELETE'])"
            label="操作"
            width="260"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                v-permission="['ADMIN','USER_ALL','USER_EDIT']"
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="edit(scope.row)"
              />
              <el-popover
                v-permission="['ADMIN','USER_ALL','USER_DELETE']"
                :ref="scope.row.id"
                placement="top"
                width="180"
              >
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                  <el-button
                    :loading="delLoading"
                    type="primary"
                    size="mini"
                    @click="subDelete(scope.row.id)"
                  >确定</el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
              </el-popover>
              <el-button type="expand" size="mini" @click="reveal(scope.$index, scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页组件-->
        <el-pagination
          :total="total"
          :current-page="page + 1"
          style="margin-top: 8px;"
          layout="total, prev, pager, next, sizes"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </el-col>
    </el-row>
    <!-- 查看详情 -->
    <article class="shadow" v-if="FC">
      <div class="box">
        <h5>
          <span>{{nameing}}</span>
          <img @click="shadowing" src="../../../assets/logo/cuo.png" alt />
        </h5>

        <article class="boxa">
          <p>
            <span>投资人编号：</span>
            <span>{{examine.merchantId}}</span>
          </p>
          <p>
            <span>投资人名称：</span>
            <span>{{examine.jobname}}</span>
          </p>
          <p>
            <span>联系方式：</span>
            <span>{{examine.phone}}</span>
          </p>
          <p>
            <span>账号：</span>
            <span>{{examine.username}}</span>
          </p>
          <p>
            <span>下线：</span>
            <span>{{examine.offlinePrice}}</span>
          </p>
          <p>
            <span>投资金额：</span>
            <span>{{examine.offlinePrice}}</span>
          </p>
          <p>
            <span>所剩余额：</span>
            <span>{{examine.merchantRate}}</span>
          </p>
          <div>
            <span>确定</span>
            <span @click="shadowing">取消</span>
          </div>
        </article>
      </div>
    </article>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import initDict from "@/mixins/initDict";
import { del } from "@/api/user";
import { getDepts } from "@/api/dept";
import { getAll } from "@/api/role";
import { parseTime } from "@/utils/index";
import eForm from "./form";
export default {
  components: { eForm },
  mixins: [initData, initDict],
  props: ["valtext"],
  data() {
    return {
      height: document.documentElement.clientHeight - 180 + "px;",
      isAdd: false,
      delLoading: false,
      deptName: "",
      depts: [],
      deptId: null,
      defaultProps: {
        children: "children",
        label: "name"
      },
      downloadLoading: false,
      queryTypeOptions: [
        { key: "username", display_name: "用户名" },
        { key: "email", display_name: "邮箱" }
      ],
      enabledTypeOptions: [
        { key: "true", display_name: "激活" },
        { key: "false", display_name: "锁定" }
      ],
      examine: {
        merchantId: "",
        jobname: "",
        phone: "",
        username: "",
        length: "",
        offlinePrice: "",
        merchantRate: ""
      },
      nameing: "",
      FC: false,
      valid: ""
    };
  },
  created() {
    this.valid = this.valtext;
    this.getDeptDatas();
    this.$nextTick(() => {
      this.init();
      // 加载数据字典
      this.getDict("user_status");
    });
  },
  mounted: function() {
    const that = this;
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 180 + "px;";
    };
  },
  watch: {
    valtext(newValue, oldValue) {
      this.valid = newValue;
      this.beforeInit();
      this.getDeptDatas();
    }
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      console.log(123123);
      var valid=this.valid

      console.log(valid);

      this.url = "api/users?deptId="+valid;
      const sort = "id,desc";
      const query = this.query;
      const type = query.type;
      const value = query.value;
      const enabled = query.enabled;
      this.params = {
        page: this.page,
        size: this.size,
        sort: sort,
        deptId: this.deptId
      };
      if (type && value) {
        this.params[type] = value;
      }
      if (enabled !== "" && enabled !== null) {
        this.params["enabled"] = enabled;
      }
      return true;
    },
    reveal($index, row) {
      var i = $index;
      this.examine.merchantId = row.merchantId;
      this.examine.jobname = row.job.name;
      this.examine.phone = row.phone;
      this.examine.username = row.username;
      this.examine.length = row.roles.length;
      this.examine.offlinePrice = row.offlinePrice;
      this.examine.merchantRate = row.merchantRate;
      console.log(row);

      // console.log(this.examine.merchantId);

      this.FC = true;
      this.nameing = "投资人详情";
      console.log("查看详情");
    },
    // 关闭查看浮层
    shadowing() {
      this.FC = false;
    },
    subDelete(id) {
      this.delLoading = true;
      del(id)
        .then(res => {
          this.delLoading = false;
          this.$refs[id].doClose();
          this.dleChangePage();
          this.init();
          this.$notify({
            title: "删除成功",
            type: "success",
            duration: 2500
          });
        })
        .catch(err => {
          this.delLoading = false;
          this.$refs[id].doClose();
          console.log(err.response.data.message);
        });
    },
    getDeptDatas() {
      const sort = "id,desc";
      const params = { sort: sort };
      console.log(params)
      console.log(213)
      if (this.deptName) {
        params["name"] = this.deptName;
      }
      getDepts(params).then(res => {
        console.log(122);
        console.log(res);
        this.depts = res.content;
      });
    },
    handleNodeClick(data) {
      if (data.pid === 0) {
        this.deptId = null;
      } else {
        this.deptId = data.id;
      }
      this.init();
    },
    add() {
      this.isAdd = true;
      console.log(this.$refs.form);
      this.$refs.form.getDepts();
      this.$refs.form.getRoles();
      this.$refs.form.getRoleLevel();
      this.$refs.form.dialog = true;
    },
    // 导出
    download() {
      this.downloadLoading = true;
      import("@/utils/Export2Excel").then(excel => {
        const tHeader = [
          "ID",
          "用户名",
          "邮箱",
          "头像地址",
          "状态",
          "注册日期",
          "最后修改密码日期"
        ];
        const filterVal = [
          "id",
          "username",
          "email",
          "avatar",
          "enabled",
          "createTime",
          "lastPasswordResetTime"
        ];
        const data = this.formatJson(filterVal, this.data);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        this.downloadLoading = false;
      });
    },
    // 数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "createTime" || j === "lastPasswordResetTime") {
            return parseTime(v[j]);
          } else if (j === "enabled") {
            return parseTime(v[j]) ? "启用" : "禁用";
          } else {
            return v[j];
          }
        })
      );
    },
    edit(data) {
      this.isAdd = false;
      const _this = this.$refs.form;
      _this.getRoles();
      _this.getDepts();
      _this.getRoleLevel();
      _this.roleIds = [];
      _this.form = {
        id: data.id,
        username: data.username,
        phone: data.phone,
        email: data.email,
        enabled: data.enabled.toString(),
        roles: [],
        dept: { id: data.dept.id },
        job: { id: data.job.id },
        authCode: data.authCode,
        merchantRate: data.merchantRate
      };
      data.roles.forEach(function(data, index) {
        _this.roleIds.push(data.id);
      });
      _this.deptId = data.dept.id;
      _this.jobId = data.job.id;
      _this.getJobs(_this.deptId);
      _this.dialog = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
.boxx {
  width: 100%;
  height: 60px;
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
}
.shadow {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 280px;
    height: 248px;
    background: white;
    font-size: 10px;

    h5 {
      width: 100%;
      height: 26px;
      background: #4986ff;
      color: #fff;
      padding: 0 15px;
      line-height: 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      font-weight: 100;
      img {
        width: 10px;
        height: 10px;
      }
    }
    .boxa {
      p {
        padding: 0 20px;
        margin: 10px 0;
        display: flex;

        span {
          flex-grow: 1;
        }
      }
      div {
        display: flex;
        justify-content: center;
        span {
          padding: 5px 15px;
          background: #4986ff;
          color: #fff;
          margin: 20px 20px;
        }
        span:nth-of-type(2) {
          background: #ffffff;
          color: #c3c3c3;
          border: 1px solid #c3c3c3;
        }
      }
    }
  }
}
</style>

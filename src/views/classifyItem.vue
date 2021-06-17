<template>
  <div>
    <div>
      <article class="classifyItem">
        <div class="header">
          <img src="../static/images/icon/home.png" alt="" />
          <p>
            你现在的位置是：
            <a @click="homePage" href="javascript:void(0)">首页</a>>
            <a class="location" href="javascript:void(0)">{{
              currentClassItem.class_name
            }}</a>
          </p>
        </div>
        <div class="main">
          <div class="left">
            <ul class="list classList">
              <li v-for="item in list" :key="item.id">
                <a
                  class="toDetail"
                  @click="toDetails(currentClassItem.class_name, item.id)"
                  href="javascript:void(0)"
                  >{{ item.title }}</a
                >
                <div class="item-info">
                  <div class="left">
                    <p>{{ item.introduce }}</p>
                    <div class="tag">
                      <img src="../static/images/icon/user.png" />
                      <p>陈实</p>
                      <img src="../static/images/icon/date.png" />
                      <p>{{ item.createDate.slice(0, 10) }}</p>
                      <img src="../static/images/icon/tag.png" />
                      <a>陈实的日记</a>
                    </div>
                  </div>
                  <img class="show-img" :src="item.cover_img" alt="" />
                </div>
              </li>
            </ul>
            <div class="bg-white py-8">
              <el-pagination
              class="pages"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              >
              </el-pagination>
            </div>
          </div>
          <div class="right">
            <div
              v-for="item in rightList"
              :key="item.class_id"
              class="right-item"
            >
              <div class="right-top">
                <div class="right-top-img">
                  <img src="../static/images/icon/menu.png" alt="" />
                </div>
                <p>{{ item.class_name }}</p>
              </div>
              <ul class="right-item-list">
                <li v-for="i in item.contents" :key="i.id">
                  <a
                    class="toDetail"
                    @click="toDetails(item.class_name, i.id)"
                    href="javascript:void(0)"
                    ><img src="../static/images/icon/right.png" alt="" />{{
                      i.introduce
                    }}</a
                  >
                  <p>{{ i.createDate.slice(5, 10) }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "classItem"
);
export default {
  name: "classifyItem",
  computed: {
    ...mapState([
      "list",
      "total",
      "currentPage",
      "pageSize",
      "currentClassItem",
      "rightList",
    ]),
  },
  watch: {
    // 刷新页面时，设置当前table页样式
    currentClassItem() {
      this.$store.commit("home/classifyItem", this.currentClassItem.class_name);
    },
  },
  data() {
    return {
      class_id: Number,
    };
  },
  //路由地址相同参数改变监听以此去获取不同的数据
  beforeRouteUpdate(to, from, next) {
    this.class_id = to.params.id;
    this.getClassItemAsync({
      url: "getClassItem",
      params: { class_id: this.class_id, pageSize: 5, currentPage: 1 },
    });
    next();
  },
  mounted() {
    this.class_id = this.$route.params.id;
    // 获取当前分类文章列表
    this.getClassItemAsync({
      url: "getClassItem",
      params: { class_id: this.class_id, pageSize: 5, currentPage: 1 },
    });
  },
  methods: {
    ...mapActions(["getClassItemAsync"]),
    ...mapMutations(["setRightList"]),
    homePage() {
      this.$store.commit("home/classifyItem", "首页");
      this.$router.push("/");
    },
    toDetails(currentClassItem, contentId) {
      this.$store.commit("home/classifyItem", currentClassItem);
      this.$router.push({
        name: "articleDetails",
        params: { id: contentId },
      });
    },
    //改变每页显示条数
    handleSizeChange(val) {
      this.getClassItemAsync({
        url: "getClassItem",
        params: {
          class_id: this.class_id,
          pageSize: val,
          currentPage: this.currentPage,
        },
      });
    },
    //跳转到第几页
    handleCurrentChange(val) {
      this.getClassItemAsync({
        url: "getClassItem",
        params: {
          class_id: this.class_id,
          pageSize: this.pageSize,
          currentPage: val,
        },
      });
    },
  },
};
</script>

<style src="../static/css/classifyItem.css" scoped>
</style>
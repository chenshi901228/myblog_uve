<template>
  <div>
    <article>
      <div class="header">
        <img src="../static/images/icon/home.png" alt="" />
        <p>
          你现在的位置是：
          <a @click="homePage" href="javascript:void(0);">首页</a>>
          <a
            @click="toClassifyItem"
            class="location"
            href="javascript:void(0);"
            >{{ article.class_name }}</a
          >
          > {{ article.title }}
        </p>
      </div>
      <div class="main">
        <div class="articleDetails">
          <h4></h4>
          <div class="tag">
            <img src="../static/images/icon/user.png" />
            <p>陈实</p>
            <img src="../static/images/icon/date.png" />
            <p class="date">{{ article.createDate }}</p>
            <img src="../static/images/icon/tag.png" />
            <p>陈实的日记</p>
          </div>
          <div class="intro">
            <p>
              <b>简介</b><span>{{ article.introduce }}</span>
            </p>
          </div>
          <div v-html="article.str_html" class="detail">
            {{ article.str_html }}
          </div>
          <div
            class="nextAndPrev w-5/5 py-4 ml-96 bg-white mt-10 flex flex-col"
          >
            <a
              @click="toDetails(article.class_name, prev.id)"
              class="cursor-pointer mb-2"
              >上一篇：{{
                JSON.stringify(prev) == "{}" ? "没有啦！别点了！" : prev.title
              }}</a
            >
            <a
              @click="toDetails(article.class_name, next.id)"
              class="cursor-pointer"
              >下一篇：{{
                JSON.stringify(next) == "{}" ? "没有啦！别点了！" : next.title
              }}</a
            >
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
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("article");
export default {
  name: "articleDetails",
  computed: {
    ...mapState(["article", "rightList", "articleList", "next", "prev"]),
  },
  watch: {
    article() {
      this.$store.commit("home/classifyItem", this.article.class_name);
    },
  },
  //路由地址相同参数改变监听以此去获取不同的数据
  beforeRouteUpdate(to, from, next) {
    let id = to.params.id;
    this.getArticleAsync({ url: "getArticle", params: { id } });
    next();
  },
  mounted() {
    let { id } = this.$route.params;
    // 获取文章内容
    this.getArticleAsync({ url: "getArticle", params: { id } });
  },
  methods: {
    ...mapActions(["getArticleAsync"]),
    // 跳转文章内容
    toDetails(currentClassItem, contentId) {
      if (!contentId) return;
      this.$store.commit("home/classifyItem", currentClassItem);
      this.$router.push({
        name: "articleDetails",
        params: { id: contentId },
      });
    },
    // 跳转首页
    homePage() {
      this.$store.commit("home/classifyItem", "首页");
      this.$router.push("/");
    },
    // 跳转分类文章列表
    toClassifyItem() {
      this.$router.push("/classifyItem/" + this.article.class_id);
    },
  },
};
</script>
<style src="../static/css/details.css" scoped>
</style>
<style lang="postcss" scoped>
.nextAndPrev a {
  @apply hover:text-green-400
  hover:underline;
}
</style>
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
            >{{ currentArticle.ifyTitle }}</a
          >
          > {{ currentArticle.title }}
        </p>
      </div>
      <div class="main">
        <div class="articleDetails">
          <h4></h4>
          <div class="tag">
            <img src="../static/images/icon/user.png" />
            <p>陈实</p>
            <img src="../static/images/icon/date.png" />
            <p class="date"></p>
            <img src="../static/images/icon/tag.png" />
            <p>陈实的日记</p>
          </div>
          <div class="intro">
            <p>
              <b>简介</b><span>{{ currentArticle.intro }}</span>
            </p>
          </div>
          <div v-html="currentArticle.str" class="detail">
            {{ currentArticle.str }}
          </div>
        </div>
        <div class="right">
          <div
            v-for="(item, index) in listWithOutHomePage == undefined
              ? []
              : listWithOutHomePage"
            :key="item._id"
            class="right-item"
          >
            <div class="right-top">
              <div class="right-top-img">
                <img src="../static/images/icon/menu.png" alt="" />
              </div>
              <p>{{ item.title }}</p>
            </div>
            <ul class="right-item-list">
              <li v-for="(i, _index) in item.contents.slice(0, 5)" :key="i._id">
                <a
                  class="toDetail"
                  href="javascript:void(0)"
                  @click="toDetails(index + 1, _index)"
                  ><img src="../static/images/icon/right.png" alt="" />{{
                    i.intro
                  }}</a
                >
                <p>{{ i.date.slice(5, 10) }}</p>
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
const { mapState, mapMutations, mapGetters } = createNamespacedHelpers("home");
export default {
  name: "articleDetails",
  computed: {
    ...mapState(["list", "currentArticle"]),
    ...mapGetters(["listWithOutHomePage"]),
  },
  mounted() {
    if (this.list.length != 0) {
      let { id, title } = this.$route.params;
      this.classifyItem(id);
      this.getArticleDetails({ id, title });
    }
  },
  beforeUpdate(){
    console.log("details")
    let { id, title } = this.$route.params;
    this.classifyItem(id);
    this.getArticleDetails({ id, title });

  },
  methods: {
    ...mapMutations(["getArticleDetails", "classifyItem"]),
    toDetails(i_ify, i_content) {
      this.classifyItem(i_ify);
      this.getArticleDetails({ id: i_ify, title: i_content });
      this.$router.push({
        name: "articleDetails",
        params: { id: i_ify, title: i_content },
      });
    },
    homePage() {
      this.classifyItem(0);
      this.$router.push("/");
    },
    toClassifyItem() {
      let { id } = this.$route.params;
      this.classifyItem(id);
      this.$router.push("/classifyItem/" + id);
    },
  },
};
</script>
<style src="../static/css/details.css" scoped>
</style>
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
              list.length == 0 ? "" : list[currentIfyItem].title
            }}</a>
          </p>
        </div>
        <div class="main">
          <ul class="list classList">
            <li
              v-for="(item, index) in currentObj == undefined
                ? []
                : currentObj.contents"
              :key="item._id"
            >
              <a
                class="toDetail"
                @click="toDetails(currentIfyItem, index)"
                href="javascript:void(0)"
                >{{ item.title }}</a
              >
              <div class="item-info">
                <div class="left">
                  <p>{{ item.intro }}</p>
                  <div class="tag">
                    <img src="../static/images/icon/user.png" />
                    <p>陈实</p>
                    <img src="../static/images/icon/date.png" />
                    <p>{{ item.date.slice(0, 10) }}</p>
                    <img src="../static/images/icon/tag.png" />
                    <a href="">陈实的日记</a>
                  </div>
                </div>
                <img class="show-img" :src="item.showImg" alt="" />
              </div>
            </li>
          </ul>
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
                <li
                  v-for="(i, _index) in item.contents.slice(0, 5)"
                  :key="i._id"
                >
                  <a
                    class="toDetail"
                    @click="toDetails(index + 1, _index)"
                    href="javascript:void(0)"
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
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapGetters } = createNamespacedHelpers("home");
export default {
  name: "classifyItem",
  computed: {
    ...mapState(["list", "currentIfyItem"]),
    ...mapGetters(["currentObj", "listWithOutHomePage"]),
  },
  data() {
    return {};
  },
  mounted() {
    console.log("class")
    this.classifyItem(this.$route.params.id);
  },
  methods: {
    ...mapMutations(["classifyItem"]),
    homePage() {
      this.classifyItem(0);
      this.$router.push("/");
    },
    toDetails(i_ify, i_content) {
      this.classifyItem(i_ify);
      this.$router.push({
        name: "articleDetails",
        params: { id: i_ify, title: i_content },
      });
    },
  },
};
</script>

<style src="../static/css/classifyItem.css" scoped>
</style>
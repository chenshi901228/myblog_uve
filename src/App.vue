<template>
  <div id="app">
    <header>
      <h6>陈实的个人博客</h6>
      <ul class="headNav">
        <li v-for="(item, index) in list" :key="item._id">
          <a
            :class="index == currentIfyItem ? 'actived' : ''"
            href="javascript:void(0)"
            @click="toClassifyItem(index)"
            >{{ item.title }}</a
          >
        </li>
      </ul>
      <div class="serch">
        <input type="text" placeholder="搜索" />
        <img src="./static/images/icon/serch.png" />
      </div>
    </header>
    <aside>
      <img src="./static/images/head_img.jpg" />
      <p>
        介绍Lorem ipsum, dolor sit amet consectetur adipisicing elit. excepturi
        perferendis repellendus, deleniti id aliquid!
      </p>
      <img src="./static/images/code.jpg" />
    </aside>
    <router-view />
    <div @click="goTop" class="goTop">
      <img src="./static/images/icon/goTop.png" alt="" />
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("home");
export default {
  name: "Home",
  computed: {
    ...mapState(["list", "currentIfyItem"]),
  },
  data() {
    return {};
  },
  mounted() {
    console.log("home");
    window.onscroll = function () {
      if (
        document.documentElement.scrollTop > 300 ||
        document.body.scrollTop > 300
      ) {
        document.querySelector(".goTop").style.display = "block";
      } else {
        document.querySelector(".goTop").style.display = "none";
      }
    };
    this.getListAsync({ url: "classifyTitle/findTitle" });
  },
  methods: {
    ...mapActions(["getListAsync"]),
    ...mapMutations(["classifyItem"]),
    toClassifyItem(i) {
      this.classifyItem(i);
      if (i == 0) {
        this.$router.push("/");
      } else {
        this.$router.push("/classifyItem/" + i);
      }
    },
    goTop() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },
  },
};
</script>
<style scoped>
@import "./static/css/common/normalize.css";
@import "./static/css/header.css";
@import "./static/css/aside.css";
</style>

<template>
  <div id="app">
    <header>
      <h6>陈实的个人博客</h6>
      <ul class="headNav">
        <li>
          <a
            :class="'首页' == currentIfyItem ? 'actived' : ''"
            href="javascript:void(0)"
            @click="toHomePage"
            >首页</a
          >
        </li>
        <li v-for="item in list" :key="item.class_id">
          <a
            :class="item.class_name == currentIfyItem ? 'actived' : ''"
            href="javascript:void(0)"
            @click="toClassifyItem(item.class_name, item.class_id)"
            >{{ item.class_name }}</a
          >
        </li>
      </ul>
      <div class="serch">
        <input
          v-model="serchInput"
          @keyup.enter="serchHandle"
          type="text"
          placeholder="搜索"
        />
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
  watch:{
    // 设置右边aside列表内容
    list(){
      this.$store.commit("classItem/setRightList",this.list)
      this.$store.commit("article/setRightList",this.list)
    },
    // 监听浏览器返回按钮以设置table选项卡为首页
    $route:{
      handler(){
        if(this.$route.path=="/"){
          this.classifyItem("首页")
        }
      }
    }
  },
  data() {
    return {
      serchInput: "",
    };
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
    // 主页初始化数据
    this.getHomePageAsync({ url: "homePageInit" });
  },
  methods: {
    ...mapActions(["getHomePageAsync"]),
    ...mapMutations(["classifyItem"]),
    //回到首页
    toHomePage() {
      this.classifyItem("首页");
      this.$router.push("/");
    },
    // 跳转文章分类
    toClassifyItem(currentClassItem,i) {
      this.classifyItem(currentClassItem);
      this.$router.push("/classifyItem/" + i);
    },
    serchHandle() {
      console.log(`搜索内容:${this.serchInput}`);
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

<template>
  <div>
    <article>
      <div class="header">
        <img src="../static/images/icon/home.png" alt="" />
        <p>你好！欢迎访问我的博客！！！！！</p>
      </div>
      <div class="main">
        <div class="swiper">
          <h5>头条展示</h5>
          <div class="swiper-container">
            <swiper :options="swiperOptions" ref="mySwiper">
              <swiper-slide
                class="swiper-item"
                v-for="(item, index) in !listWithOutHomePage.length
                  ? []
                  : listWithOutHomePage[0].contents.slice(0, 5)"
                :key="item._id"
              >
                <img
                  :src="
                    item.showImg == undefined || ''
                      ? require('../static/images/head_img.jpg')
                      : item.showImg
                  "
                />
                <p @click="toDetails(0, index)">{{ item.title }}</p>
              </swiper-slide>
            </swiper>
          </div>
          <div @click="prevBtn" class="swiper-div-prev">
            <img src="../static/images/icon/prev.png" alt="" />
          </div>
          <div @click="nextBtn" class="swiper-div-next">
            <img src="../static/images/icon/next.png" alt="" />
          </div>
        </div>
        <div class="container">
          <div
            class="ify"
            v-for="(item, index) in listWithOutHomePage"
            :key="item._id"
          >
            <div class="ify-top">
              <div class="ify-top-img">
                <img src="../static/images/icon/menu.png" alt="" />
              </div>
              <div class="ify-top-title">
                <p>{{ item.title }}</p>
                <a
                  class="toclassifyItem"
                  @click="toClassifyItem(index)"
                  href="javascript:void(0)"
                  >更多</a
                >
              </div>
            </div>
            <ul class="ify-item">
              <li v-for="(i, _index) in item.contents.slice(0, 5)" :key="i._id">
                <a
                  class="toDetail"
                  @click="toDetails(index, _index)"
                  href="javascript:void(0)"
                >
                  <img src="../static/images/icon/right.png" alt="" />{{
                    i.intro
                  }}</a
                >
                <p>{{ i.date.slice(5, 10) }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="partner">
          <div class="partner-top">
            <h3>合作伙伴</h3>
          </div>
          <div class="partner-content"></div>
        </div>
      </div>
      <div class="footer">
        <p>
          Copyright {{ new Date().getFullYear() }} Inc. AllRights Reserved.
          Design by 个人博客 蜀ICP备19001492号-1
        </p>
      </div>
    </article>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers("home");
export default {
  name: "Home",
  computed: {
    ...mapState(["list"]),
    ...mapGetters(["listWithOutHomePage"]),
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        speed: 1000,
        loop: true,
      },
    };
  },
  methods: {
    ...mapMutations(["classifyItem", "get_item_details"]),
    prevBtn() {
      this.swiper.slidePrev(500);
    },
    nextBtn() {
      this.swiper.slideNext(500);
    },
    toClassifyItem(i) {
      this.classifyItem(i + 1);
      this.$router.push("/classifyItem/" + (i + 1));
    },
    toDetails(i_ify, i_content) {
      this.classifyItem(i_ify + 1);
      this.$router.push({
        name: "articleDetails",
        params: { id: i_ify + 1, title: i_content },
      });
    },
  },
};
</script>
<style src="../static/css/index.css" scoped>
</style>
<style lang="scss" scoped>
.swiper-item:hover {
  & > p {
    cursor: pointer;
    color: aquamarine;
  }
}
</style>

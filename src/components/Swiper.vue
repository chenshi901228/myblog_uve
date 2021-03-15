<template>
  <div @mouseenter="handlenter" @mouseleave="handleleave" class="swiper-main">
    <el-button class="pre" @click="pre" type="primary">pre</el-button>
    <div class="box">
      <div class="swiper">
        <div v-for="(item, index) in list" :key="index" class="item">
          <img :src="item" />
        </div>
      </div>
    </div>
    <el-button class="next" @click="next" type="primary">next</el-button>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    list: { type: Array, default: () => [] },
    sec: { type: Number, default: 2000 },
  },
  data() {
    return {
      n: 0,
      timer: null,
    };
  },
  mounted() {
    this.timer = setInterval(this.animate, this.sec);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    getDom() {
      let swiper = document.querySelector(".swiper");
      let rect = document.querySelector(".box").getBoundingClientRect();
      let l = this.list.length;
      return { swiper, rect, l };
    },
    animate() {
      let { swiper, rect, l } = this.getDom();
      this.n++;
      if (this.n == l) {
        this.n = 0;
      }
      swiper.style.left = -rect.width * this.n + "px";
    },
    handlenter() {
      clearInterval(this.timer);
    },
    handleleave() {
      this.timer = setInterval(this.animate, this.sec);
    },
    next() {
      let { swiper, rect, l } = this.getDom();
      this.n++;
      if (this.n == l) {
        this.n = 0;
      }
      swiper.style.left = -rect.width * this.n + "px";
    },
    pre() {
      let { swiper, rect, l } = this.getDom();
      this.n--;
      if (this.n == -1) {
        this.n = l - 1;
      }
      swiper.style.left = -rect.width * this.n + "px";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$red: red;
.box {
  width: 400px;
  height: 300px;
  overflow: hidden;
  // border: 1px solid $red;
  .swiper {
    position: relative;
    display: flex;
    left: 0;
    top: 0;
    transition: all 0.3s;
    img {
      width: 400px;
      height: 300px;
    }
  }
}
.swiper-main {
  width: 400px;
  height: 300px;
  margin: 0 auto;
  position: relative;
  .pre {
    position: absolute;
    left: 0;
    transform: translate(-100%, -50%);
    top: 50%;
  }
  .next {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(100%, -50%);
  }
}
</style>

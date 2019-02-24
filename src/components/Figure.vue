<!-- 人物 -->
<template>
  <!-- dragover.prevent必须有，否则drop事件不触发 -->
  <!-- dragStart, drop为PC端拖曳事件 -->
  <!-- touchstart, touchend为移动端拖曳事件 -->
  <figure
    class="person"
    :style="styleObj"
    :class="classObj"
    @click="handleClick"
    @dragstart="handleDragStart"
    @dragover.prevent
    @drop="handleDrop"
    @touchstart="handleTouchStart"
    @touchend="handleTouchend"
  >
    <i class="banner" v-if="!isEmpty" v-show="active"></i>
    <!-- <img :src='"../assets/img/" + name + ".svg"' style="width: 100%; height: 100%" v-if="!isEmpty"> -->
    <!-- <iframe :src='"../assets/img/" + name + ".svg"' width="100%" height="100%" type="image/svg+xml" v-if="!isEmpty"> 
    </iframe>-->
    <!-- <object :data='"../assets/img/" + name + ".svg"' width="100%" height="100%" type="image/svg+xml" /> -->
    <!-- <object data="svgDemo.svg" type="image/svg+xml" /> 
    <iframe src="svgDemo.svg" />-->

    <!-- <img
      :src='"../assets/img/" + name + ".svg"'
      style="width: 100%; height: 100%"
      v-if="!isEmpty&&isSVGAvail"
    > -->
    <img
      :src='"static/images/" + name + ".svg"'
      style="width: 100%; height: 100%"
      v-if="!isEmpty&&isSVGAvail&&screenWidth>1030"
    >
    <!--safari无法下载svg的img-->
    <!-- <i :class="'person--' + name" v-else-if="!isEmpty&&!isSVGAvail"></i> -->
    <img :src="personImg" :class="personClass" v-else-if="!isEmpty"/>
    
    <strong v-if="x==1&&y==4&&isEmpty">出</strong>
    <strong v-else-if="x==2&&y==4&&isEmpty">口</strong>
  </figure>
</template>


<script>
const unitLenW = 100 / 4.0;
const unitLenH = 100 / 5.0;
const unit = "%";
export default {
  props: {
    width: Number,
    height: Number,
    name: {
      type: String,
      default: "blank"
    },
    active: Boolean,
    uid: String, //唯一
    x0: Number,
    y0: Number,
    isEmpty: Boolean,
    action: Array //可行动方向 ['left', 'right', 'top', 'bottom']
  },
  data() {
    return {
      x: this.x0,
      y: this.y0,
      animateOver: false,
      isSafari:
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent),
      isIphoneWechatEmbed:
        (/iPhone/.test(navigator.userAgent) ||
          /iPad/.test(navigator.userAgent)) &&
        /MicroMessenger/.test(navigator.userAgent),
      clientX: 0,
      clientY: 0
    };
  },
  computed: {
    screenWidth() {
      return window.innerWidth;
    },
    personImg() {
      return 'static/images/' + this.name + '.png';
    },
    personClass() {
      return 'person--' + this.name;
    },
    isSVGAvail() {
      return !this.isSafari && !this.isIphoneWechatEmbed;
    },
    styleObj() {
      return {
        left: this.x * unitLenW + unit,
        top: this.y * unitLenH + unit,
        // transform: translate(this.x * unitLenW + unit, this.y * unitLenH + unit),
        width: this.width * unitLenW + unit,
        height: this.height * unitLenH + unit,
        transitionProperty: "left,top",
        transitionDuration: this.isEmpty ? 0 : "0.8s"
      };
    },
    classObj() {
      return {
        active: this.active,
        isEmpty: this.isEmpty
      };
    }
  },
  methods: {
    reset() {
      this.x = this.x0;
      this.y = this.y0;
    },
    getX() {
      return this.x;
    },
    getY() {
      return this.y;
    },
    setX(value) {
      this.x = value;
    },
    setY(value) {
      this.y = value;
    },
    move(direct) {
      switch (direct) {
        case "left":
          this.x -= this.width;
          break;
        case "right":
          this.x += this.width;
          break;
        case "top":
          this.y -= this.height;
          break;
        case "bottom":
          this.y += this.height;
          break;
      }
    },
    handleClick() {
      if (this.isEmpty) {
        this.movAction();
      } else {
        this.reqAction();
      }
    },
    handleDragStart(event) {
      this.clientX = event.clientX;
      this.clientY = event.clientY;
      console.log(11, event, 22);
      if (!this.isEmpty) {
        this.handleClick();
      }
      return false;
    },
    handleDrop(event) {
      console.log(this.x, this.y);
      if (this.isEmpty) {
        this.handleClick();
      }
    },
    handleTouchStart(event) {
      if (this.isEmpty) {
        return;
      }
      if (event.changedTouches && event.changedTouches.length > 0) {
        this.clientX = event.changedTouches[0].clientX;
        this.clientY = event.changedTouches[0].clientY;
      } else {
        this.clientX = this.clientY = undefined;
      }
      console.log(77, event, 88);
      this.handleClick();
      return false;
    },
    handleTouchend(event) {
      if (this.isEmpty) {
        return;
      }
      console.log(111, event, 222);
      let tmpx;
      let tmpy;
      if (event.changedTouches && event.changedTouches.length > 0) {
        tmpx = event.changedTouches[0].clientX;
        tmpy = event.changedTouches[0].clientY;
      } else {
        tmpx = tmpy = undefined;
      }

      if (this.clientX == tmpx && this.clientY == tmpy) {
        // 未发生移动
        return;
      }
      let [tarX, tarY] = this.calPoint(tmpx, tmpy);
      console.log("a", tarX, tarY, "b");
      this.judAction(tarX, tarY);
    },
    calPoint(clientX, clientY) {
      let width = window.innerWidth;
      let height = window.innerHeight;
      return [
        parseInt((clientX - width * 0.05) / (width * 0.25)),
        parseInt((clientY + 0.0) / (height * 0.16))
      ];
    },
    reqAction() {
      this.$emit(
        "reqAction",
        this.uid,
        this.x,
        this.y,
        this.width,
        this.height
      );
    },
    movAction() {
      this.$emit("movAction", this.uid, this.x, this.y);
    },
    // 像父组件请求坐标所在 是否为空格，若是空格，期望发生移动
    judAction(tarX, tarY) {
      this.$emit("judAction", tarX, tarY);
    }
  }
};
</script>

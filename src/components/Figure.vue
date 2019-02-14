<!-- 人物 -->
<template>
  <!-- dragover.prevent必须有，否则drop事件不触发 -->
  <!-- dragStart, drop为PC端拖曳事件 -->
  <!-- touchstart, touchend为移动端拖曳事件 -->
  <figure class="person" :style="styleObj" :class="classObj" 
  @click="handleClick" 
  @dragstart="handleDragStart" 
  @dragover.prevent 
  @drop="handleDrop"
  @touchstart="handleDragStart"
  @touchend="handleTouchend">
      <i class="banner" v-if="!isEmpty" v-show="active"></i>
      <!-- <img :src='"../assets/img/" + name + ".svg"' style="width: 100%; height: 100%" v-if="!isEmpty"> -->
      <!-- <iframe :src='"../assets/img/" + name + ".svg"' width="100%" height="100%" type="image/svg+xml" v-if="!isEmpty"> 
      </iframe> -->
      <!-- <object :data='"../assets/img/" + name + ".svg"' width="100%" height="100%" type="image/svg+xml" /> -->

        <!-- <object data="svgDemo.svg" type="image/svg+xml" /> 
        <iframe src="svgDemo.svg" /> -->

      <img :src='"../assets/img/" + name + ".svg"' style="width: 100%; height: 100%" v-if="!isEmpty&&isSVGAvail">
      <!--safari无法下载svg的img-->
      <i :class="'person--' + name" v-else-if="!isEmpty&&!isSVGAvail"></i>

      <strong v-if="x==1&&y==4&&isEmpty">出</strong>
      <strong v-else-if="x==2&&y==4&&isEmpty">口</strong>
  </figure>
</template>


<script>
const unitLenW = 100 / 4.0;
const unitLenH = 90 / 5.0;
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
      isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
      isIphoneWechatEmbed: (/iPhone/.test(navigator.userAgent) || (/iPad/.test(navigator.userAgent))) 
                            && /MicroMessenger/.test(navigator.userAgent),
      clientX: 0,
      clientY: 0                      
    };
  },
  computed: {
    isSVGAvail() {
      return !this.isSafari&&!this.isIphoneWechatEmbed;
    },
    styleObj() {
      
      return {
        left: this.x * unitLenW + unit,
        top: this.y * unitLenH + unit,
        // transform: translate(this.x * unitLenW + unit, this.y * unitLenH + unit),
        width: this.width * unitLenW + unit,
        height: this.height * unitLenH + unit,
        transitionProperty: 'left,top',
        transitionDuration: this.isEmpty ? 0 : '0.8s'
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
    beforeEnter: function (el) {
      // ...
      this.animateOver = false;
    },
    afterEnter: function (el) {
      // ...
      this.animateOver = true;
    },
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
    handleTouchend(event, e) {
      console.log(111, event, e, 222)
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
    }
  }
};
</script>

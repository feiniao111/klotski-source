<!--游戏说明-->
<template>
  <section class="about" @touchstart="handleTouchStart" @touchmove="moveFunc">
    <h1 class="about__header">华容道</h1>
    <section class="about__instruction">
      <p class="about__instruction--1">玩法： 通过两个小空格移动棋子，将曹操移出华容道（也就是把最大的方块移到最下方中央位置）。</p>
      <p class="about__instruction--2">下面这首诗中隐藏了华容道游戏的策略和思路</p>
      <p class="about__instruction--3">华容小径</p>
      <p class="about__instruction--4">兵不在多，四个则行。</p>
      <p class="about__instruction--4">将不在广，五虎则灵。</p>
      <p class="about__instruction--4">斯是游戏，唯吾闲情。</p>
      <p class="about__instruction--4">曹操跑的快，小兵追的勤。</p>
    </section>
    <section class="about__resource">
      <p class="about__resource--1">
        设计：界面参考4399小游戏华容道：
        <a
        >http://www.4399.com/flash/14016_3.htm。</a>
      </p>
      <p class="about__resource--1">
        源码：采用H5+vue编写:
        <a
        >https://github.com/feiniao111/klotski-source。</a>
      </p>
      <p class="about__resource--1">图片：我图网（已购买使用权），非商用。</p>
      <p class="about__resource--1">音乐：三国志刘备传mod，非商用，侵删。</p>
      <p class="about__resource--1">反馈：不足之处，还请海涵，欢迎提建议~</p>
    </section>
  </section>
</template>

<script>
import {debounce} from '@/lib/utils/util';
export default {
  data() {
    return {
      clientX: 0,
      clientY: 0,
      moveFunc: function() {}
    };
  },
  methods: {
    handleTouchStart(event) {
      if (event.changedTouches && event.changedTouches.length > 0) {
        this.clientX = event.changedTouches[0].clientX;
        this.clientY = event.changedTouches[0].clientY;
      } else {
        this.clientX = this.clientY = undefined;
      }
      console.log(9, this.clientX, this.clientY, 10);
    },
    handleTouchmove(event) {
      console.log(99, event, 100);
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
      if (tmpy < this.clientY) {
          document.getElementsByClassName('dialog-about')[0].scrollTop += (this.clientY - tmpy);
      } else {
          document.getElementsByClassName('dialog-about')[0].scrollTop -= (tmpy - this.clientY);
      }

      this.clientX = tmpx;
      this.clientY = tmpy;
    }
  },
  mounted() {
    this.moveFunc = debounce((events) => {
      this.handleTouchmove(events);
    });
  }
};
</script>
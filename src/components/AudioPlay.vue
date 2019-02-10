<template>
  <div id="audioBox"></div>
</template>

<style>
    #audioBox {
        float: right;
    }
</style>
<script>
export default {
  data() {
    return {
      playList: [
        "static/mp3/04-AudioTrack 04.mp3",
        "static/mp3/06-AudioTrack 06.mp3",
        "static/mp3/15-AudioTrack 15.mp3",
        "static/mp3/17-AudioTrack 17.mp3",
        "static/mp3/18-AudioTrack 18.mp3",
        "static/mp3/20-AudioTrack 20.mp3",
        "static/mp3/24-AudioTrack 24.mp3",
        "static/mp3/32-AudioTrack 32.mp3",
        "static/mp3/33-AudioTrack 33.mp3",
        "static/mp3/34-AudioTrack 34.mp3",
        "static/mp3/35-AudioTrack 35.mp3"
      ],
      myAudio: "",
      index: 0
    };
  },
  methods: {
    playEndedHandler() {
      this.myAudio.src = this.playList[this.index];
      this.index = (this.index + 1) % this.playList.length;
      this.myAudio.play();
      !this.playList.length &&
        myAudio.removeEventListener("ended", this.playEndedHandler, false); //只有一个元素时解除绑定
    },
    play() {
      this.myAudio = new Audio();
      this.myAudio.controls = true;
      this.myAudio.src = this.playList[this.index]; //每次读数组最后一个元素
      this.index = (this.index + 1) % this.playList.length;
      this.myAudio.addEventListener("ended", this.playEndedHandler, false);
      document.getElementById("audioBox").appendChild(this.myAudio);
      this.myAudio.autoplay = true;
      this.myAudio.loop = false; //禁止循环，否则无法触发ended事件
    }
  },
  mounted() {
    this.play();
  }
};
</script>

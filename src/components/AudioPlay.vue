<template>
  <div class="AudioPlay">
    <el-button round size="small" @click="handleClick">{{opertion}}</el-button>
    <div id="audioBox"></div>
  </div>
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
      myAudio: new Audio(),
      index: 0,
      opertion: '列'
    };
  },
  methods: {
    playEndedHandler() {
      this.index = this.nextIndex();
      this.myAudio.src = this.playList[this.index];
      this.myAudio.play();
    },
    play() {
      this.myAudio.controls = true;
      this.myAudio.src = this.playList[this.index];
      this.myAudio.addEventListener("ended", this.playEndedHandler, false);
      document.getElementById("audioBox").appendChild(this.myAudio);
      this.myAudio.autoplay = true;
      this.myAudio.loop = false; 
    },
    nextIndex() {
      if (this.opertion == '单') {
        return this.index;
      } else {
        return (this.index + 1) % this.playList.length;
      }
    },
    handleClick() {
      this.opertion = this.opertion == '单' ? '列' : '单';
      if (this.opertion == '列') {
        this.myAudio.loop = false;
      } else {
        this.myAudio.loop = true;
      }
    }
  },
  mounted() {
    this.play();
  }
};
</script>

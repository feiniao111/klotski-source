<!--华容道-->
<template>
  <div class="walkway" :style="styleObj">
    <section class="walkway__content">
      <fig
        v-for="item in datas"
        :key="item.uid"
        :ref="item.uid"
        :uid="item.uid"
        :name="item.name"
        :width="item.width"
        :height="item.height"
        :x0="item.x0"
        :y0="item.y0"
        :isEmpty="item.isEmpty"
        :active="activeUid == item.uid"
        @reqAction="handleReq"
        @movAction="handleMov"
        @judAction="handleJud"
      ></fig>
    </section>
    <footer class="walkway__footer">
      <div class="walkway__footer--operation">
        <span class="count">第{{count}}步</span>
        <el-button @click="handleReset" size="small">重新开始</el-button>
        <el-select v-model="datas" placeholder="请选择" class="select" @change="handleChangeLayout">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button @click="handleTips" size="small">游戏说明</el-button>
        <autoplay></autoplay>
      </div>
    </footer>
    <el-dialog
      custom-class="dialog-about"
      title="游戏说明"
      :width="dialogWidth"
      :visible.sync="dialogVisible"
    >
      <about></about>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <audio id="moveSound" class="walkway--sound">
      <source src="static/mp3/Se23.wav" id="houseMoving" type="audio/wav">
    </audio>
  </div>
</template>

<script>
import fig from "./Figure.vue";
import autoplay from "./AudioPlay.vue";
import about from "./GameAbout.vue";
import { LAYOUTS } from "../lib/CONSTANT";
export default {
  data() {
    return {
      activeUid: "",
      personX: "",
      personY: "",
      personWidth: "",
      personHeight: "",
      screenHeight: window.innerHeight,
      count: 0,
      options: LAYOUTS,
      datas: [],
      oldDatas: [],
      dialogVisible: false,
      dialogWidth: "95%"
    };
  },
  components: {
    fig,
    autoplay,
    about
  },
  computed: {
    styleObj() {
      return {
        height: this.screenHeight + "px"
      };
    }
  },
  watch: {
    datas: {
      handler(value, oldvalue) {
        this.oldDatas = oldvalue;
        // this.$nextTick(() => {
        //   for (let i = 0; i < value.length; i++) {
        //     let uid = value[i].uid;
        //     if (this.$refs[uid]) {
        //       this.$refs[uid][0].reset();
        //     }
        //   }
        // });
      },
      deep: true
    }
  },
  methods: {
    handleChangeLayout(val) {
      this.$confirm(
        "更换布局将重新开始游戏！是否确定更换?",
        "提示",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.count = 0;
        this.activeUid = "";
        this.$nextTick(() => {
          for (let i = 0; i < this.datas.length; i++) {
            let uid = this.datas[i].uid;
            if (this.$refs[uid]) {
              this.$refs[uid][0].reset();
            }
          }
        });
      }).catch(() => {
        this.datas = this.oldDatas;
      });
    },
    movePlay() {
      let sound = document.getElementById("moveSound");
      sound.play();
    },
    handleTips() {
      const h = this.$createElement;
      this.dialogVisible = true;
      return;
      this.$msgbox({
        title: "游戏说明",
        message: h("p", null, [
          h("h1", { style: "color: green; text-align: center" }, "华容道 "),
          h(
            "p",
            { style: "color: #E6A23C;" },
            "玩法： 通过两个小空格移动棋子，将曹操移出华容道（也就是把最大的方块移到最下方中央位置）。"
          ),
          h(
            "p",
            { style: "color: #E6A23C;margin-left: 20px;" },
            "下面这首诗中隐藏了华容道游戏的策略和思路:"
          ),
          h("p", { style: "color: #E6A23C;margin-left: 40px;" }, "华容小径"),
          h(
            "p",
            { style: "color: #E6A23C;margin-left: 20px;" },
            "兵不在多，四个则行。"
          ),
          h(
            "p",
            { style: "color: #E6A23C;margin-left: 20px;" },
            "将不在广，五虎则灵。"
          ),
          h(
            "p",
            { style: "color: #E6A23C;margin-left: 20px;" },
            "斯是游戏，唯吾闲情。"
          ),
          h(
            "p",
            { style: "color: #E6A23C;margin-left: 20px;" },
            "曹操跑的快，小兵追的勤。"
          ),
          h("p", { style: "height: 20px;" }, ""),
          h("p", null, [
            h("p", null, "设计：界面参考4399小游戏华容道："),
            h("a", null, "http://www.4399.com/flash/14016_3.htm。")
          ]),
          h("p", { style: "height: 20px;" }, ""),
          h("p", null, [
            h("p", null, "源码：采用H5+vue编写:"),
            h("a", null, "https://github.com/feiniao111/klotski-source。")
          ]),
          h("p", { style: "height: 20px;" }, ""),
          h("p", null, "图片：新浪某微博（找不到出处了），非商用，侵删。"),
          h("p", { style: "height: 20px;" }, ""),
          h("p", null, "音乐：三国志刘备传mod，非商用，侵删。"),
          h("p", { style: "height: 20px;" }, ""),
          h("p", null, "反馈：不足之处，还请海涵，欢迎提建议~")
        ]),
        showCancelButton: false,
        confirmButtonText: "确定"
      })
        .then(() => {
          document
            .getElementsByClassName("el-message-box")[0]
            .removeEventListener("touchmove", () => {});
        })
        .catch(() => {
          if (document.getElementsByClassName("el-message-box")) {
            document
              .getElementsByClassName("el-message-box")[0]
              .removeEventListener("touchmove", () => {});
          }
        });

      document
        .getElementsByClassName("el-message-box")[0]
        .addEventListener("touchmove", () => {}, { passive: true });
    },
    handleReset() {
      this.$confirm(
        "<div><p>是否要重新开始?</p>" +
          "<i style='font-size: 10px; color: #999'>(作者很菜但从不点，别轻易放弃，加油！)</i>" +
          "</div>",
        "提示",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.count = 0;
        this.activeUid = "";
        for (let i = 0; i < this.datas.length; i++) {
          let uid = this.datas[i].uid;
          this.$refs[uid][0].reset();
        }
      });
    },
    handleReq(uid, personX, personY, personWidth, personHeight) {
      this.activeUid = uid;
      this.personX = personX;
      this.personY = personY;
      this.personWidth = personWidth;
      this.personHeight = personHeight;
    },
    handleMov(emUid, blankX, blankY) {
      let hasMove = false;
      if (this.activeUid == "") {
        return;
      }

      let emUid2 = emUid == "empty1" ? "empty2" : "empty1";
      let emInst = this.$refs[emUid][0];
      let emInst2 = this.$refs[emUid2][0];
      let actInst = this.$refs[this.activeUid][0];

      let blankX2 = emInst2.getX();
      let blankY2 = emInst2.getY();
      this.personX = actInst.getX();
      this.personY = actInst.getY();

      if (this.personX == blankX) {
        // 考虑上移、 下移
        if (
          this.personY + this.personHeight == blankY ||
          this.personY - 1 == blankY
        ) {
          // 相邻
          if (this.personWidth == 1) {
            /**
             * 1        0
             * 1        1
             * 0        1
             */
            let tmp = blankY;
            let newBlankY =
              this.personY > blankY ? blankY + this.personHeight : this.personY;
            let newPersonY = this.personY > blankY ? blankY : this.personY + 1;
            emInst.setY(newBlankY);
            actInst.setY(newPersonY);
            hasMove = true;
          } else if (this.personWidth == 2) {
            /**
             * 1 1        0 ?
             * 1 1        1 1
             * 0 ?        1 1
             */
            // 考虑空白是否横向相邻
            if (blankX + 1 == blankX2 && blankY == blankY2) {
              let newBlankY =
                this.personY > blankY
                  ? blankY + this.personHeight
                  : blankY - this.personHeight;
              let newPersonY =
                this.personY > blankY ? blankY : this.personY + 1;
              emInst.setY(newBlankY);
              emInst2.setY(newBlankY);
              actInst.setY(newPersonY);
              hasMove = true;
            }
          }
        } else if (
          this.personWidth == 1 &&
          (this.personY + this.personHeight + 1 == blankY ||
            this.personY - 2 == blankY)
        ) {
          // 考虑纵向移动两格
          if (
            blankX == blankX2 &&
            (blankY2 + 1 == blankY || blankY2 - 1 == blankY)
          ) {
            if (this.personHeight == 1) {
              /**
               * 1    0
               * 0    0
               * 0    1
               */
              emInst.setY(this.personY);
              actInst.setY(blankY);
              hasMove = true;
            } else if (this.personHeight == 2) {
              /**
               * 1    0
               * 1    0
               * 0    1
               * 0    1
               */
              emInst.setY(this.personY + 1);
              emInst2.setY(this.personY);
              actInst.setY(blankY2 > blankY ? blankY : blankY2);
              hasMove = true;
            }
          }
        }
      } else if (this.personY == blankY) {
        // 考虑 左移、右移
        if (
          this.personX + this.personWidth == blankX ||
          this.personX - 1 == blankX
        ) {
          // 相邻
          if (this.personHeight == 1) {
            /**
             * 1 1 0        0 1 1
             */
            let newBlankX =
              this.personX > blankX
                ? blankX + this.personWidth
                : blankX - this.personWidth;
            let newPersonX = this.personX > blankX ? blankX : this.personX + 1;
            emInst.setX(newBlankX);
            actInst.setX(newPersonX);
            hasMove = true;
          } else if (this.personHeight == 2) {
            /**
             * 1 0          0 1
             * 1 ?          ? 1
             */
            // 考虑空白是否纵向相邻
            if (blankY + 1 == blankY2 && blankX == blankX2) {
              let newBlankX =
                this.personX > blankX
                  ? blankX + this.personWidth
                  : blankX - this.personWidth;
              let newPersonX =
                this.personX > blankX ? blankX : this.personX + 1;
              emInst.setX(newBlankX);
              emInst2.setX(newBlankX);
              actInst.setX(newPersonX);
              hasMove = true;
            }
          }
        } else if (
          this.personHeight == 1 &&
          (this.personX + this.personWidth + 1 == blankX ||
            this.personX - 2 == blankX)
        ) {
          // 考虑横向移动两格
          if (
            blankY == blankY2 &&
            (blankX2 + 1 == blankX || blankX2 - 1 == blankX)
          ) {
            if (this.personWidth == 1) {
              /**
               * 1 0 0      0 0 1
               */
              emInst.setX(this.personX);
              actInst.setX(blankX);
              hasMove = true;
            } else if (this.personWidth == 2) {
              /**
               * 1 1 0 0        0 0  1 1
               */
              emInst.setX(this.personX + 1);
              emInst2.setX(this.personX);
              actInst.setX(blankX2 > blankX ? blankX : blankX2);
              hasMove = true;
            }
          }
        }
      } else if (this.personX + 1 == blankX || this.personX - 1 == blankX) {
        if (
          this.personWidth == 2 &&
          blankX2 + 1 == blankX &&
          blankY == blankY2 &&
          (this.personY + this.personHeight == blankY ||
            this.personY - 1 == blankY)
        ) {
          /**
           * 1 1  1 1  ? 0
           * ? 0  1 1  1 1
           *      ? 0
           */
          // 考虑 空白横向相邻时， 上、下移
          let newBlankY =
            this.personY > blankY ? blankY + this.personHeight : this.personY;
          let newPersonY = this.personY > blankY ? blankY : this.personY + 1;
          emInst.setY(newBlankY);
          emInst2.setY(newBlankY);
          actInst.setY(newPersonY);
          hasMove = true;
        } else if (this.personY + 1 == blankY) {
          /**
           * 1 ?    ? 1
           * 1 0    0 1
           */
          // 考虑 空白纵向相邻时， 左、右移
          if (
            this.personHeight == 2 &&
            blankY2 + 1 == blankY &&
            blankX == blankX2
          ) {
            let newBlankX =
              this.personX > blankX ? blankX + this.personWidth : this.personX;
            let newPersonX = this.personX > blankX ? blankX : this.personX + 1;
            emInst.setX(newBlankX);
            emInst2.setX(newBlankX);
            actInst.setX(newPersonX);
            hasMove = true;
          }
        }
      } else if (this.personX + 2 == blankX || this.personX - 2 == blankX) {
        if (blankX == blankX2 && blankY2 + 1 == blankY) {
          emInst.setX(this.personX);
          emInst2.setX(this.personX);
          actInst.setX(this.personX + 1);
          hasMove = true;
        }
      }

      if (hasMove) {
        // 统计步数
        this.count++;
        // 播放移动声效
        this.movePlay();
      }

      // 若曹操走到出口，游戏结束
      if (this.activeUid == "caocao") {
        let personX = actInst.getX();
        let personY = actInst.getY();

        if (personX + 2 == 3 && personY + 2 == 5) {
          this.$alert(
            "曹操已经成功逃到出口，恭喜您通关！请截图给作者获取打赏(#^.^#)",
            "",
            {
              confirmButtonText: "确定",
              callback: action => {}
            }
          );
        }
      }
    },
    handleJud(tarX, tarY) {
      let empNode1 = this.$refs["empty1"][0];
      let empNode2 = this.$refs["empty2"][0];
      let [emptyX1, emptyY1] = [empNode1.getX(), empNode1.getY()];
      let [emptyX2, emptyY2] = [empNode2.getX(), empNode2.getY()];
      if (tarX == emptyX1 && tarY == emptyY1) {
        empNode1.handleClick();
      } else if (tarX == emptyX2 && tarY == emptyY2) {
        empNode2.handleClick();
      }
    }
  },
  mounted() {
    let vm = this;
    this.datas = this.options[0].value;
    if (window.innerWidth > 500) {
      this.dialogWidth = "50%";
    }
    window.onresize = function() {
      vm.screenHeight = window.innerHeight;
      if (window.innerWidth > 500) {
        this.dialogWidth = "50%";
      }
    };
  }
};
</script>
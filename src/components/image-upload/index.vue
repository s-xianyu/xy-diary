<template>
  <view class="yhdsl" v-show="isShow">
    <view>
      <view class="cropper-content">
        <view v-if="isShowImg" class="uni-corpper"
              :style="'width:' + cropperInitW + 'px;height:' + cropperInitH + 'px;background:#000'">
          <view class="uni-corpper-content" :style="
          'width:' +
          cropperW +
          'px;height:' +
          cropperH +
          'px;left:' +
          cropperL +
          'px;top:' +
          cropperT +
          'px'">
            <image :src="imageSrc" :style="'width:' + cropperW + 'px;height:' + cropperH + 'px'"></image>
            <view class="uni-corpper-crop-box" @touchstart.stop="contentStartMove"
                  @touchmove.stop="contentMoveing" @touchend.stop="contentTouchEnd" :style="
                  'left:' + cutL + 'px;top:' + cutT + 'px;right:' + cutR + 'px;bottom:' + cutB + 'px'">
              <view class="uni-cropper-view-box">
                <view class="uni-cropper-dashed-h"></view>
                <view class="uni-cropper-dashed-v"></view>

                <!-- 截图区域顶部 -->
                <view class="uni-cropper-line-t" data-drag="top" @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>

                <!-- 截图区域右侧 -->
                <view class="uni-cropper-line-r" data-drag="right" @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>

                <!-- 截图区域底部 -->
                <view class="uni-cropper-line-b" data-drag="bottom" @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>

                <!-- 截图区域左侧 -->
                <view class="uni-cropper-line-l" data-drag="left" @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>

                <!-- 右下角截图滑块 -->
                <view class="uni-cropper-point point-t" data-drag="top" @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>
                <view class="uni-cropper-point point-tr" data-drag="topTight"></view>
                <view class="uni-cropper-point point-r" data-drag="right" @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>
                <view class="uni-cropper-point point-rb" data-drag="rightBottom"
                      @touchstart.stop="dragStart" @touchmove.stop="dragMove"></view>
                <view class="uni-cropper-point point-b" data-drag="bottom" @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove" @touchend.stop="dragEnd"></view>
                <view class="uni-cropper-point point-bl" data-drag="bottomLeft"></view>
                <view class="uni-cropper-point point-l" data-drag="left" @touchstart.stop="dragStart"
                      @touchmove.stop="dragMove"></view>
                <view class="uni-cropper-point point-lt" data-drag="leftTop"></view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="cropper-config">
        <view class="button-box">
          <view class="button" @click="chooseImage">重选</view>
          <view class="button" @click="previewImg">预览</view>
          <view class="button" @click="finish">完成</view>
        </view>
      </view>
      <canvas canvas-id="myCanvas" :style="
      imageW +
      'px;height:' +
      imageH +
      'px;top:-9999px;left:-9999px;'"></canvas>
    </view>
  </view>
</template>

<script>
const sysInfo = uni.getSystemInfoSync()
const SCREEN_WIDTH = sysInfo.windowWidth >= 500 ? 500 : sysInfo.windowWidth
const SCREEN_HEIGHT = sysInfo.windowHeight + 40
let PAGE_X // 手按下的x位置
let PAGE_Y // 手按下y的位置
// const PR = sysInfo.pixelRatio // dpi
let T_PAGE_X // 手移动的时候x的位置
let T_PAGE_Y // 手移动的时候Y的位置
let CUT_L // 初始化拖拽元素的left值
let CUT_T // 初始化拖拽元素的top值
let CUT_R // 初始化拖拽元素的
let CUT_B // 初始化拖拽元素的
// let CUT_W // 初始化拖拽元素的宽度
// let CUT_H //  初始化拖拽元素的高度
let IMG_RATIO // 图片比例
let IMG_REAL_W // 图片实际的宽度
let IMG_REAL_H // 图片实际的高度
const DRAFG_MOVE_RATIO = 1 // 移动时候的比例,
// const INIT_DRAG_POSITION = 100 // 初始化屏幕宽度和裁剪区域的宽度之差，用于设置初始化裁剪的宽度
const DRAW_IMAGE_W = sysInfo.screenWidth // 设置生成的图片宽度
export default {
  // 页面的初始数据
  data () {
    return {
      imageSrc: '',
      isShow: false,
      isShowImg: false,
      // 初始化的宽高
      cropperInitW: SCREEN_WIDTH,
      cropperInitH: SCREEN_HEIGHT,
      // 动态的宽高
      cropperW: SCREEN_WIDTH,
      cropperH: SCREEN_HEIGHT - 100,
      // 动态的left top值
      cropperL: 0,
      cropperT: 0,
      transL: 0,
      transT: 0,
      // 图片缩放值
      scaleP: 0,
      imageW: 0,
      imageH: 0,
      // 裁剪框 宽高
      cutL: 0,
      cutT: 0,
      cutB: SCREEN_WIDTH,
      cutR: '100%',
      qualityWidth: DRAW_IMAGE_W,
      innerAspectRadio: DRAFG_MOVE_RATIO
    }
  },
  props: {
    // 截图质量，压缩比
    quality: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      default: 1
    },

    src: String,

    fileType: {
      type: String,
      default: 'png',
      validator: function (t) {
        // 这个值必须匹配下列字符串中的一个
        return t === 'png' || t === 'jpg'
      }
    },

    // 截取类型，自由截取free;固定比例截取（正方形）fixed
    mode: {
      type: String,
      default: 'free',
      validator: (t) => {
        // 这个值必须匹配下列字符串中的一个
        return t === 'free' || t === 'fixed' || t === 'scale'
      }
    },
    scale: {
      type: Number,
      default: 1
    }
  },
  created () {
    if (this.src) {
      this.imageSrc = this.src
      this.loadImage()
      this.isShow = true
      this.isShowImg = true
    }
  },
  methods: {
    setData: function (obj) {
      const that = this
      Object.keys(obj).forEach(function (key) {
        that.$set(that.$data, key, obj[key])
      })
    },

    /**
     * 选择图片
     */
    chooseImage: function () {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          if (res.tempFiles[0].size / 1024 < 1024) {
            this.setData({
              imageSrc: res.tempFilePaths[0]
            })
            this.loadImage()
            this.isShow = true
          } else {
            uni.showToast({
              title: '图片大小不能超过1024KB，当前大小' + (res.tempFiles[0].size / 1024).toFixed(2) + 'KB',
              icon: 'none'
            })
          }
        }
      })
    },
    /**
     * 将图片加载到画布
     */
    loadImage: function () {
      uni.showLoading({
        title: '图片加载中...'
      })

      /**
       * 获取图片信息
       */
      uni.getImageInfo({
        src: this.imageSrc,
        success: (res) => {
          const imgH = res.height
          const imgW = res.width

          // let IMG_SCR_H_R = SCREEN_HEIGHT / imgH;
          // let IMG_SCR_W_R = SCREEN_WIDTH / imgW;

          /* 图片的宽高比  */
          IMG_RATIO = imgW / imgH

          /**
           * 如果图片更高一些，为确保图片能够完整在视窗内显示需如下处理
           * 1. 缩放图片的高为 视窗高度减去底部菜单按钮高度（120）
           * 2. 根据图片缩放后的高度，根据图片宽高比计算图片的宽度
           * 3. 如果步骤2计算的图片宽度大于屏幕宽度，则需要再次调整图片宽度为视窗宽度-margin(10)
           * 4. 根据步骤3的宽度，结合图片宽高比重新计算图片的高度
           */
          if (IMG_RATIO < 1 && (SCREEN_HEIGHT - 120) * IMG_RATIO < SCREEN_WIDTH - 10) {
            IMG_REAL_W = (SCREEN_HEIGHT - 120) * IMG_RATIO
            IMG_REAL_H = SCREEN_HEIGHT - 120
          } else {
            IMG_REAL_W = SCREEN_WIDTH - 10
            IMG_REAL_H = IMG_REAL_W / IMG_RATIO
          }

          /* 初始化裁剪区域的位置和形状  */
          const [cutT, cutB, cutL, cutR] = this.initCutArea(IMG_RATIO, IMG_REAL_H,
            IMG_REAL_W)

          this.setData({
            /* 裁剪区域的宽高同图片尺寸  */
            cropperW: IMG_REAL_W,
            cropperH: IMG_REAL_H,

            /* 上下左右各留一定的margin已便更好的拖动裁剪区域  */
            cropperL: Math.ceil((SCREEN_WIDTH - IMG_REAL_W) / 2),

            /* 留出底部操作按钮位置 70  */
            cropperT: Math.ceil((SCREEN_HEIGHT - IMG_REAL_H - 90) / 2),
            cutL: cutL,
            cutT: cutT,
            cutR: cutR,
            cutB: cutB,
            // 图片缩放值
            imageW: IMG_REAL_W,
            imageH: IMG_REAL_H,
            scaleP: IMG_REAL_W / SCREEN_WIDTH,
            qualityWidth: DRAW_IMAGE_W,
            innerAspectRadio: IMG_RATIO
          })
          this.setData({
            isShowImg: true
          })
          uni.hideLoading()
        }
      })
    },

    initCutArea (IMG_RATIO, IMG_REAL_H, IMG_REAL_W) {
      /* 自由裁剪裁剪区域默认覆盖整个图片  */
      let cutT = 0
      let cutB = 0
      let cutL = 0
      let cutR = 0

      /* 正方形裁剪，初始化裁剪区域为正方形并居中  */
      if (this.mode === 'fixed') {
        if (IMG_RATIO < 1) {
          /* 图片比较高  */
          cutT = (IMG_REAL_H - IMG_REAL_W) / 2
          cutB = (IMG_REAL_H - IMG_REAL_W) / 2
        } else {
          /* 图片比较宽  */
          cutL = (IMG_REAL_W - IMG_REAL_H) / 2
          cutR = (IMG_REAL_W - IMG_REAL_H) / 2
        }
      }

      /* 固定比例裁剪，初始化裁剪区域比例和设定值相同  */
      if (this.mode === 'scale') {
        const scale = +this.scale
        if (IMG_RATIO < 1) {
          /* 图片比较高  */
          if (IMG_REAL_W / scale > IMG_REAL_H) {
            cutT = cutB = 0
            cutL = cutR = (IMG_REAL_W - IMG_REAL_H * scale) / 2
          } else {
            cutR = cutL = 0
            cutT = cutB = (IMG_REAL_H - IMG_REAL_W / scale) / 2
          }
        } else {
          /* 图片比较宽  */
          if (IMG_REAL_H * scale > IMG_REAL_W) {
            cutL = cutR = 0
            cutB = cutT = (IMG_REAL_H - IMG_REAL_W / scale) / 2
          } else {
            cutT = cutB = 0
            cutL = cutR = (IMG_REAL_W - IMG_REAL_H * scale) / 2
          }
        }
      }

      return [cutT, cutB, cutL, cutR]
    },
    /**
     * 拖动时候触发的touchStart事件
     * @param e
     */
    contentStartMove (e) {
      PAGE_X = e.touches[0].pageX
      PAGE_Y = e.touches[0].pageY
    },
    /**
     * 拖动时候触发的touchMove事件
     * @param e
     */
    contentMoveing (e) {
      let dragLengthX = (PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
      let dragLengthY = (PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO
      // 左移
      if (dragLengthX > 0) {
        if (this.cutL - dragLengthX < 0) dragLengthX = this.cutL
      } else {
        if (this.cutR + dragLengthX < 0) dragLengthX = -this.cutR
      }
      if (dragLengthY > 0) {
        if (this.cutT - dragLengthY < 0) dragLengthY = this.cutT
      } else {
        if (this.cutB + dragLengthY < 0) dragLengthY = -this.cutB
      }
      this.setData({
        cutL: this.cutL - dragLengthX,
        cutT: this.cutT - dragLengthY,
        cutR: this.cutR + dragLengthX,
        cutB: this.cutB + dragLengthY
      })
      PAGE_X = e.touches[0].pageX
      PAGE_Y = e.touches[0].pageY
    },
    contentTouchEnd () {},

    /**
     * 获取图片尺寸信息
     */
    previewImg () {
      try {
        uni.showLoading({
          title: '图片生成中...'
        })
        // 将图片写入画布
        const ctx = uni.createCanvasContext('myCanvas', this)
        ctx.drawImage(this.imageSrc, 0, 0, IMG_REAL_W, IMG_REAL_H)
        ctx.draw(true, () => {
          // 获取画布要裁剪的位置和宽度   均为百分比 * 画布中图片的宽度    保证了在微信小程序中裁剪的图片模糊  位置不对的问题 canvasT = (this.cutT / this.cropperH) * (this.imageH / pixelRatio)
          const canvasW = ((this.cropperW - this.cutL - this.cutR) / this.cropperW) * IMG_REAL_W
          const canvasH = ((this.cropperH - this.cutT - this.cutB) / this.cropperH) * IMG_REAL_H
          const canvasL = (this.cutL / this.cropperW) * IMG_REAL_W
          const canvasT = (this.cutT / this.cropperH) * IMG_REAL_H
          uni.canvasToTempFilePath({
            x: canvasL,
            y: canvasT,
            width: canvasW,
            height: canvasH,
            // destWidth: canvasW,
            // destHeight: canvasH,
            quality: +this.quality,
            fileType: this.fileType,
            canvasId: 'myCanvas',
            success: (res) => {
              uni.hideLoading()
              // 成功获得地址的地方
              uni.previewImage({
                current: '', // 当前显示图片的http链接
                urls: [res.tempFilePath] // 需要预览的图片http链接列表
              })
            },
            fail: () => {
              uni.hideLoading()
              uni.showToast({
                title: '图片截取失败！',
                icon: 'none'
              })
            }
          }, this)
        })
      } catch (e) {}
    },

    /**
     *  完成裁剪，输出裁剪后的图片路径
     */
    finish () {
      uni.showLoading({
        title: '图片生成中...'
      })
      // 将图片写入画布
      const ctx = uni.createCanvasContext('myCanvas', this)
      ctx.drawImage(this.imageSrc, 0, 0, IMG_REAL_W, IMG_REAL_H)
      ctx.draw(true, () => {
        // 获取画布要裁剪的位置和宽度   均为百分比 * 画布中图片的宽度    保证了在微信小程序中裁剪的图片模糊  位置不对的问题 canvasT = (this.cutT / this.cropperH) * (this.imageH / pixelRatio)
        const canvasW = ((this.cropperW - this.cutL - this.cutR) / this.cropperW) * IMG_REAL_W
        const canvasH = ((this.cropperH - this.cutT - this.cutB) / this.cropperH) * IMG_REAL_H
        const canvasL = (this.cutL / this.cropperW) * IMG_REAL_W
        const canvasT = (this.cutT / this.cropperH) * IMG_REAL_H
        uni.canvasToTempFilePath({
          x: canvasL,
          y: canvasT,
          width: canvasW,
          height: canvasH,
          // destWidth: canvasW,
          // destHeight: canvasH,
          quality: +this.quality,
          fileType: this.fileType,
          canvasId: 'myCanvas',
          success: (res) => {
            uni.hideLoading()
            // 成功获得地址的地方
            this.$emit('uploadImg', res.tempFilePath)
            this.isShow = false
          },
          fail: () => {
            uni.hideLoading()
            uni.showToast({
              title: '图片截取失败！',
              icon: 'none'
            })
          }
        },
        this
        )
      })
    },

    /**
     * 设置大小的时候触发的touchStart事件
     * @param e
     */
    dragStart (e) {
      T_PAGE_X = e.touches[0].pageX
      T_PAGE_Y = e.touches[0].pageY
      CUT_L = this.cutL
      CUT_R = this.cutR
      CUT_B = this.cutB
      CUT_T = this.cutT
    },

    /**
     * 设置大小的时候触发的touchMove事件
     * @param e
     */
    dragMove (e) {
      // this.mode == "fixed" ? this.fixedScaleDrag(e) : this.freeDrag(e);
      this[this.mode + 'Drag'](e)
    },

    /**
     *  固定比例（正方形）截取 ，只有右下角裁剪滑动拖动有效
     * @param e
     */
    fixedDrag (e) {
      const dragType = e.target.dataset.drag
      let dragLengthX = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
      let cutB = ''
      let cutR = ''
      switch (dragType) {
        case 'rightBottom':
          // var dragLengthY = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO;
          // if (CUT_B + dragLengthY < 0) dragLengthY = -CUT_B;

          if (CUT_R + dragLengthX < 0) dragLengthX = -CUT_R

          /* 右侧和底部同比变化 */
          cutB = CUT_B + dragLengthX
          cutR = CUT_R + dragLengthX

          /* 越界判断  */
          if (this.cutB === 0 && cutB < 0) return
          if (this.cutR === 0 && cutR < 0) return;

          (this.cutB > 0 || CUT_B === 0) &&
          this.setData({
            cutB: cutB < 0 ? 0 : cutB,
            cutR: cutR
          })
          break
        default:
          break
      }
    },

    /**
     * 等比例截图，只能通过右下角的滑块改变截图区域
     * @param e
     */
    scaleDrag (e) {
      const dragType = e.target.dataset.drag
      let cutB = ''
      let cutR = ''
      let dragLengthX = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
      switch (dragType) {
        case 'rightBottom':
          // var dragLengthY = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO;
          // if (CUT_B + dragLengthY < 0) dragLengthY = -CUT_B;

          if (CUT_R + dragLengthX < 0) dragLengthX = -CUT_R

          /* 右侧和底部同比变化 */
          cutB = CUT_B + dragLengthX / this.scale
          cutR = CUT_R + dragLengthX

          /* 越界判断  */
          if (this.cutB === 0 && cutB < 0) return
          if (this.cutR === 0 && cutR < 0) return;

          (this.cutB > 0 || CUT_B === 0) &&
          this.setData({
            cutB: cutB < 0 ? 0 : cutB,
            cutR: cutR
          })
          break
        default:
          break
      }
    },

    /**
     * 自由截取,整个裁剪边框均能拖动
     * @param e
     */
    freeDrag (e) {
      const dragType = e.target.dataset.drag
      let dragLength = ''
      let dragLengthX = ''
      let dragLengthY = ''
      switch (dragType) {
        case 'right':
          dragLength = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
          if (CUT_R + dragLength < 0) dragLength = -CUT_R
          this.setData({
            cutR: CUT_R + dragLength
          })
          break
        case 'left':
          dragLength = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
          if (CUT_L - dragLength < 0) dragLength = CUT_L
          if (CUT_L - dragLength > this.cropperW - this.cutR) { dragLength = CUT_L - (this.cropperW - this.cutR) }
          this.setData({
            cutL: CUT_L - dragLength
          })
          break
        case 'top':
          dragLength = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO
          if (CUT_T - dragLength < 0) dragLength = CUT_T
          if (CUT_T - dragLength > this.cropperH - this.cutB) { dragLength = CUT_T - (this.cropperH - this.cutB) }
          this.setData({
            cutT: CUT_T - dragLength
          })
          break
        case 'bottom':
          dragLength = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO
          if (CUT_B + dragLength < 0) dragLength = -CUT_B
          this.setData({
            cutB: CUT_B + dragLength
          })
          break
        case 'rightBottom':
          dragLengthX = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
          dragLengthY = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO
          if (CUT_B + dragLengthY < 0) dragLengthY = -CUT_B
          if (CUT_R + dragLengthX < 0) dragLengthX = -CUT_R
          this.setData({
            cutB: CUT_B + dragLengthY,
            cutR: CUT_R + dragLengthX
          })
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss">
.yhdsl {
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 100rpx;
  display: block;
  align-items: center;
  flex-direction: column;
  z-index: 998;
}

.cropper-config {
  max-width: 1000rpx;
  width: 90%;
  position: fixed;
  z-index: 999;
  bottom: 140rpx;
  left: 50%;
  transform: translateX(-50%);
  /* padding: 20upx 40upx; */
}

.button-box {
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 20rpx;
}

.button {
  @include flexCenter;
  @include wh(100%, 80rpx);
  border-radius: 50rpx;
  border: 2px solid $uni-font;
  background: $uni-color;
  color: $uni-font;
  font-size: 36rpx;
}

.cropper-content {
  width: 100%;
  min-height: 750rpx;
}

.uni-corpper {
  position: relative;

  overflow: hidden;

  box-sizing: border-box;
  margin: 0 auto;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

.uni-corpper-content {
  position: relative;
}

.uni-corpper-content image {
  display: block;

  width: 100%;
  min-width: 0 !important;
  max-width: none !important;
  /* height: 100%; */
  min-height: 0 !important;
  /* max-height: none !important; */

  max-height: calc(100vh - 100rpx);
  margin: 0 auto;

  image-orientation: 0deg !important;
}

/* 移动图片效果 */
.uni-cropper-drag-box {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  cursor: move;

  background: rgba(0, 0, 0, 0.479);
}

/* 内部的信息 */
.uni-corpper-crop-box {
  position: absolute;
  z-index: 2;
  max-height: calc(100vh - 10rpx);
  background: rgba(56, 50, 50, 0.479);
}

.uni-corpper-crop-box .uni-cropper-view-box {
  position: relative;

  display: block;
  overflow: visible;

  width: 100%;
  height: 100%;

  max-height: calc(100vh - 100rpx);
  outline: 5rpx solid $uni-color;
}

/* 横向虚线 */
.uni-cropper-dashed-h {
  position: absolute;
  top: 33.33333333%;
  left: 0;

  width: 100%;
  height: 33.33333333%;

  border-top: 1upx dashed rgba(255, 255, 255, 0.5);
  border-bottom: 1upx dashed rgba(255, 255, 255, 0.5);
}

/* 纵向虚线 */
.uni-cropper-dashed-v {
  position: absolute;
  top: 0;
  left: 33.33333333%;

  width: 33.33333333%;
  height: 100%;

  border-right: 1upx dashed rgba(255, 255, 255, 0.5);
  border-left: 1upx dashed rgba(255, 255, 255, 0.5);
}

/* 四个方向的线  为了之后的拖动事件*/
.uni-cropper-line-t {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 3rpx;

  cursor: n-resize;

  opacity: 0.1;
  background-color: white;
}

.uni-cropper-line-t::before {
  position: absolute;
  z-index: 11;
  top: 50%;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 41rpx;

  content: "";
  -webkit-transform: translate3d(0, -50%, 0);
  transform: translate3d(0, -50%, 0);

  background: transparent;
}

.uni-cropper-line-r {
  position: absolute;
  top: 0;
  right: 0;

  display: block;

  width: 3rpx;
  height: 100%;

  cursor: e-resize;

  opacity: 0.1;
  background-color: white;
}

.uni-cropper-line-r::before {
  position: absolute;
  z-index: 11;
  top: 0;
  bottom: 0;
  left: 50%;

  width: 41rpx;
  height: 100%;

  content: "";
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);

  background: transparent;
}

.uni-cropper-line-b {
  position: absolute;
  bottom: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 3rpx;

  cursor: s-resize;

  opacity: 0.1;
  background-color: white;
}

.uni-cropper-line-b::before {
  position: absolute;
  z-index: 11;
  top: 50%;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 41rpx;

  content: "";
  -webkit-transform: translate3d(0, -50%, 0);
  transform: translate3d(0, -50%, 0);

  background: transparent;
}

.uni-cropper-line-l {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 3rpx;
  height: 100%;

  cursor: w-resize;

  opacity: 0.1;
  background-color: white;
}

.uni-cropper-line-l::before {
  position: absolute;
  z-index: 11;
  top: 0;
  bottom: 0;
  left: 50%;

  width: 41rpx;
  height: 100%;

  content: "";
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);

  background: transparent;
}

.uni-cropper-point {
  position: absolute;
  z-index: 3;

  width: 5rpx;
  height: 5rpx;

  opacity: 0.75;
  background-color: rgb(145, 132, 132);
}

.point-t {
  top: -3rpx;
  left: 50%;

  margin-left: -3rpx;

  cursor: n-resize;
}

.point-tr {
  top: -3rpx;
  left: 100%;

  margin-left: -3rpx;

  cursor: n-resize;
}

.point-r {
  top: 50%;
  left: 100%;

  margin-top: -3rpx;
  margin-left: -3rpx;

  cursor: n-resize;
}

.point-rb {
  position: absolute;
  z-index: 1112;
  top: 100%;
  left: 100%;

  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;

  cursor: n-resize;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);

  opacity: 1;
  background-color: rgb(231, 222, 222);
  background-color: $uni-color;
}

.point-b {
  top: 100%;
  left: 50%;

  margin-top: -3rpx;
  margin-left: -3rpx;

  cursor: n-resize;
}

.point-bl {
  top: 100%;
  left: 0;

  margin-top: -3rpx;
  margin-left: -3rpx;

  cursor: n-resize;
}

.point-l {
  top: 50%;
  left: 0;

  margin-top: -3rpx;
  margin-left: -3rpx;

  cursor: n-resize;
}

.point-lt {
  top: 0;
  left: 0;

  margin-top: -3rpx;
  margin-left: -3rpx;

  cursor: n-resize;
}

/* 裁剪框预览内容 */
.uni-cropper-viewer {
  position: relative;

  overflow: hidden;

  width: 100%;
  height: 100%;
}

.uni-cropper-viewer image {
  position: absolute;
  z-index: 2;
}
</style>

<template>
  <view class="image">
    <button @tap="choose">上传图片</button>
    <ImageUpload ref="yhdslCropper" :quality="1" mode="scale"  @uploadImg="uploadImg" :scale="scale"></ImageUpload>
    <image :src="url" mode="widthFix" style="width: 400rpx;"></image>
  </view>
</template>

<script>
import ImageUpload from '../../components/image-upload/index.vue'
export default {
  components: {
    ImageUpload
  },
  data () {
    return {
      url: '',
      scale: 1
    }
  },
  methods: {
    choose () {
      // 调用实例的chooseImg方法，拉起图片选择界面，待图片选择完毕后直接进入图片截取界面
      this.$refs.yhdslCropper.chooseImage()
    },
    // 裁剪完成时,返回截取图片的临时路径
    uploadImg (e) {
      this.url = e
      uni.uploadFile({
        url: 'http://localhost:3000/upload/album', // 传图片的接口
        filePath: e,
        name: 'file',
        fileType: 'image',
        success: uploadFileRes => {
          // this.url = XXX;(后端传回来的图片地址)
          console.log(uploadFileRes.data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.image{
  padding: 30rpx;
}
</style>

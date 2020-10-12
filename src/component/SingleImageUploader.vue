<style lang="less" scoped>
  .single-image-uploader {
    margin: 20px 34px 0 34px;
    .title {
      font-size: 18px;
    }
    .single-image-uploader-main {
      margin-top: 12px;
    }
    .sub-title {
      font-size: 14px;
      color: #9B9B9B;
      font-family: Gotham-Regular;
    }
    .avatar-display {
      width: 140px;
      height: 140px;
      border-radius: 70px;
      background-size: cover;
    }
    .main-uploader {
      margin-top: 35px;
    }
  }
</style>

<template>
  <div class="single-image-uploader">
    <div class="single-image-uploader-header">
      <div class="title">上传头像</div>
    </div>
    <div class="single-image-uploader-main clear">
      <div class="main-left fl">
        <div class="sub-title">JPG/PNG,不超过2M</div>
        <Upload
          class="main-uploader"
          :before-upload="onBeforeUpload"
          action="" :max-size="maxSize"
          :accept="accept"
          :show-upload-list="false">
          <Button type="primary" ghost>本地上传</Button>
        </Upload>
      </div>
      <div class="main-right fr">
        <div class="avatar-display" :style="{backgroundImage: `url(${imageUrl})`}"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'single-image-uploader',
  props: {
    /**
     * 组件初始化时展示的Url
     */
    imageUrl: {
      type: String,
      default: '',
    },
    /**
     * 用户选中文件后上传操作回调
     * @param base64Str {String} 待上传文件的base64字符串
     */
    onUpload: {
      type: Function,
      default: (base64) => { console.log('文件解析完毕'); },
    },
  },
  data() {
    return {
      maxSize: 2 * 1024,
      accept: '.jpg,.png',
    };
  },
  methods: {
    onBeforeUpload(file) {
      const reader = new FileReader();
      const self = this;
      reader.onload = (e) => {
        const base64 = e.target.result;
        self.onUpload(base64);
      };
      reader.readAsDataURL(file);
      return false;
    },
  },
};
</script>

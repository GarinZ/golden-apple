<style lang="less" scoped>
  .wechat-button {
    text-align: center;
    background-color: #10A418;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    &-icon {
      width: 22px;
      height: 22px;
      background: url("~@assets/images/icons/weixin.svg");
      vertical-align: middle;
      position: relative;
      top: -2px;
    }
    &-text {
      color: white;
      font-weight: bold;
    }
    &-icon, &-text {
      display: inline-block;
    }
  }
</style>

<template>
  <div class="wechat-button" @click="onWechatLoginClick">
    <div class="wechat-button-icon"></div>
    <div class="wechat-button-text">微信登录</div>
  </div>
</template>

<script>
export default {
  name: 'wechat-login',
  props: {
    onWechatLoginClick: {
      type: Function,
      default() {
        console.log('微信登录按钮点击');
      },
    },
  },
};
</script>

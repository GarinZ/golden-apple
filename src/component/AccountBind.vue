<style lang="less" scoped>
  @import "~@assets/css/styles/custom.less";
  .account-bind {
    &-container {
      text-align: left;
      position: relative;
    }
    &-icon {
      width: 44px;
      height: 44px;
      border-radius: 22px;
      background-color: #37A000;
      text-align: center;
      position: relative;
      img {
        position: absolute;
        top: 50%;
        height: 28px;
        margin: -14px;
        color: white;
        &.email {
          width: 22px;
        }
      }
    }
    &-text {
      position: relative;
      top: -4px;
      margin-left: 26px;
    }
    &-text-title {
      font-size: 16px;
      margin-bottom: 7px;
    }
    &-text-sub-title {
      font-size: 14px;
      color: #818181;
    }
    &-operation {
      font-size: 14px;
      height: 56px;
      line-height: 43px;
      cursor: pointer;
      color: #0F5BFF;
      &.bind {
        color: @account-primary-color;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .account-bind {
      &-container {
        position: relative;
      }
      &-operation {
        position: absolute;
        top: 18px;
        right: 0;
      }
    }
  }
</style>

<template>
  <div class="account-bind-container clear">
    <div class="account-bind-icon fl" :style="{backgroundColor: accountBindType['backgroundColor']}">
      <img :class="bindType" :src="accountBindType['icon']">
    </div>
    <div class="account-bind-text fl">
      <div class="account-bind-text-title">{{accountBindType['title']}}</div>
      <div class="account-bind-text-sub-title">{{accountBindType['subTitle']}}</div>
    </div>
    <div class="account-bind-operation fr" :class="{bind: isBind}" v-on:click="onClick">
      {{isBind ? '解除绑定' : '去绑定'}}
    </div>
  </div>
</template>

<script>
import wechatIcon from '@assets/images/icons/weixin.svg';
import emailIcon from '@assets/images/icons/email.svg';

const BIND_TYPE = {
  WECHAT: {
    title: '绑定微信',
    subTitle: '绑定后可直接通过微信登陆',
    icon: wechatIcon,
    backgroundColor: '#37A000',
  },
  EMAIL: {
    title: '绑定邮箱',
    subTitle: '绑定后可通过邮箱登录',
    icon: emailIcon,
    backgroundColor: '#0f5bff',
  },
};

export default {
  name: 'account-bind',
  props: {
    bindType: {
      type: String,
      validator(value) {
        return Object.keys(BIND_TYPE).indexOf(value) !== -1;
      },
      default: 'WECHAT',
    },
    isBind: {
      type: Boolean,
      default: false,
    },
    onBindClick: {
      type: Function,
      default: () => { console.log('绑定按钮点击'); },
    },
    onUnbindClick: {
      type: Function,
      default: () => { console.log('解除绑定定按钮点击'); },
    },
  },
  data() {
    return {
      BIND_TYPE,
    };
  },
  computed: {
    onClick() {
      return this.isBind ? this.onUnbindClick : this.onBindClick;
    },
    accountBindType() {
      return BIND_TYPE[this.bindType];
    },
  },
};
</script>

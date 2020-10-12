<style lang="less" scoped>
  @import "~@assets/css/common.less";

  .account-card {
    &-container {
      text-align: center;
      margin: 0 auto;
    }
    &-content {
      display: inline-block;
      border: 1px solid #FFFFFF;
      box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
    }
    &-form {
      text-align: left;
      padding: 41px 50px 0 50px;
    }
    &-title {
      font-size: 18px;
    }
    &-sub-title {
      padding-top: 12px;
      font-size: 14px;
      color: #818181;
    }
    &-main {
      margin-top: 38px;
      margin-bottom: 42px;
    }
    &-footer {
      padding: 47px 50px;
      background-color: #F6F6F6;
    }
  }

  @media screen and (max-width: 480px) {
    .account-card {
      &-form {
        padding: 40px 40px 0 40px;
      }
    }
  }
</style>

<template>
    <div class="account-card-container">
      <div class="account-card-content">
        <div class="account-card-form">
          <div class="account-card-title">{{ title }}</div>
          <div class="account-card-sub-title" v-show="subTitle">{{ subTitle }}</div>
          <div class="account-card-main">
            <router-view></router-view>
          </div>
        </div>
        <div class="account-card-footer" v-show="isShowFooter">
          <wechat-login :on-wechat-login-click="onWechatClick"></wechat-login>
        </div>
      </div>
    </div>
</template>
<script>
import WechatLogin from '@/component/WechatLogin';
import RouterName from '@/common/constants/RouterName';
import SITE_MAP from '@/common/constants/SiteMap';

const routerName2Title = {
  [RouterName.LOGIN]: {
    title: '登录',
    isShowFooter: true,
  },
  [RouterName.REGISTER]: {
    title: '用户注册',
    isShowFooter: true,
  },
  [RouterName.RESET_PASSWORD]: {
    title: '密码找回',
    isShowFooter: false,
  },
  [RouterName.BIND_EMAIL]: {
    title: '绑定邮箱',
    isShowFooter: false,
  },
  [RouterName.ACCOUNT_INFO]: {
    title: '账户中心',
    subTile: '可修改和完善你的个人资料',
    isShowFooter: false,
  },
};

export default {
  name: 'account-card',
  components: {
    WechatLogin,
  },
  computed: {
    title() {
      return routerName2Title[this.$route.name].title;
    },
    subTitle() {
      return routerName2Title[this.$route.name].subTile;
    },
    isShowFooter() {
      return routerName2Title[this.$route.name].isShowFooter;
    },
  },
  methods: {
    onWechatClick() {
      let { referrer } = document;
      if (referrer === '') {
        referrer = SITE_MAP.MEI_YE.url;
      }
      window.location.href = `${SITE_MAP.MEI_YE.url}/venus/login/wechat?url=${encodeURIComponent(referrer)}`;
    },
  },
  mounted() {

  },
  beforeDestroy() {

  },
};
</script>

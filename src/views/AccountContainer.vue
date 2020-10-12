<style lang="less">
  @import "~@assets/css/common.less";
  @import "~@assets/css/index.less";
  @import "~@assets/css/moji.min.css";
  @import "~@assets/css/animate.css";
  @import "~@assets/css/styles/custom.less";
  @import "~@assets/css/account.less";

  .account-container {
    color: black;
    margin: 23px 58px 0 58px;
    &-header {
      margin-bottom: 124px;
    }
    &-content {
      min-height: 600px;
    }
  }

  @media (max-width: 480px) {
    .account-container {
      margin: 10px 10px;
      &-header {
        margin-bottom: 60px;
      }
      &-content {
        min-height: 0;
      }
    }
  }

</style>

<template>
  <div class="account-container">
    <div class="account-container-header clear">
      <logo logo-type="MEI_YE_PRO" class="fl"></logo>
      <user-profile class="fr" :user-name="userName" :user-avatar="avatarUrl"
                    v-bind:on-click="onProfileClick" v-bind:on-logout-click="onLogoutClick" />
    </div>
    <div class="account-container-content">
      <account-card></account-card>
    </div>
    <div class="account-container-footer">
      <account-footer />
    </div>
  </div>
</template>
<script>
import AccountCard from '@/component/AccountCard';
import Logo from '@/component/Logo';
import AccountFooter from '@/component/AccountFooter';
import UserProfile from '@/component/UserProfile';
import { mapState, mapActions } from 'vuex';
import RouterName from '@/common/constants/RouterName';
import { logout } from '@/api/venus/auth';

export default {
  components: {
    AccountFooter,
    Logo,
    AccountCard,
    UserProfile,
  },
  props: {
    isShowFooter: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState('userProfile', ['userId', 'userName', 'avatarUrl']),
  },
  methods: {
    ...mapActions('userProfile', ['getUserProfile', 'clearUserProfile']),
    /**
     * 用户档案（视图右上角用户名 + 头像）点击后的跳转回调
     */
    onProfileClick() {
      this.$router.push({ name: this.userId ? RouterName.ACCOUNT_INFO : RouterName.LOGIN });
    },
    /**
     * 退出登录点击事件
     */
    async onLogoutClick() {
      await logout();
      this.clearUserProfile();
      await this.$router.push({ name: RouterName.LOGIN });
    },
  },
  async beforeMount() {
    if (!this.userId) {
      try {
        await this.getUserProfile();
        await this.$router.push({ name: RouterName.ACCOUNT_INFO });
      } catch (e) {
        await this.$router.push({ name: RouterName.LOGIN });
      }
    }
  },
};
</script>

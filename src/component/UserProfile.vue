<style lang="less" scoped>
  .user-profile {
    cursor: pointer;
    position: relative;
    &-user-avatar {
      width: 24px;
      height: 24px;
      border-radius: 12px;
      background-size: cover;
      position: relative;
      top: 6px;
    }
    &-user-name {
      margin-right: 16px;
    }
    &-operation-list {
      display: none;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
      border: 1px solid rgba(177,180,185,.45);
      border-radius: 4px;
      position: absolute;
      padding: 4px 10px;
      bottom: -30px;
      left: -5px;
    }
    &:hover {
      .user-profile-operation-list {
        display: block;
      }
    }
  }
  .profile-item {
    display: inline-block;
  }
</style>

<template>
    <div class="user-profile" v-on:click="onClick">
      <div class="user-profile-user-name profile-item">{{userName}}</div>
      <div class="user-profile-user-avatar profile-item" v-bind:style="{backgroundImage: `url(${userAvatar})`}"></div>
      <div class="user-profile-operation-list" v-on:click="onLogoutClick">
        <div class="user-profile-operation-list-item">退出登录</div>
      </div>
    </div>
</template>
<script>
import defaultAvatar from '@assets/images/icons/defaultAvatar.png';

export default {
  name: 'user-profile',
  props: {
    userName: {
      type: String,
      default: '未登录',
    },
    userAvatar: {
      type: String,
      default: defaultAvatar,
    },
    onClick: {
      type: Function,
      default: () => console.log('账户profile点击'),
    },
    onLogoutClick: {
      type: Function,
      default: () => console.log('退出登录点击'),
    },
  },
  computed: {

  },
  mounted() {

  },
  beforeDestroy() {

  },
};
</script>

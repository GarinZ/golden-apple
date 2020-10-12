<style lang="less" scoped>
  .account-footer {
    font-size: 12px;
    color: #565656;
    position: fixed;
    bottom: 20px;
    width: 100%;
    &-copy-right {
      float: left;
    }
    &-link-list {
      float: right;
      &-item {
        display: inline-block;
        padding-right: 38px;
        &:last-child {
          padding-right: 0;
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    .account-footer {
      display: none;
    }
  }
</style>

<template>
  <div class="account-footer clear">
    <div class="account-footer-copy-right">
      © 2020 Meiye. All rights reserved.
    </div>
    <div class="account-footer-link-list">
      <div class="account-footer-link-list-item" v-for="(item, index) in linkList" :key="index">
        <a v-bind:href="item.url">{{item.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import SITE_MAP from '@/common/constants/SiteMap';

export default {
  name: 'account-footer',
  data() {
    return {
      linkList: SITE_MAP,
    };
  },
};
</script>

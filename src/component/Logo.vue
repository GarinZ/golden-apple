<style lang="less">

</style>

<template>
    <div class="logo-container">
        <a  v-bind:href="logoMap.url">
          <img v-bind:height="height" v-bind:src="logoMap.logo">
        </a>
    </div>
</template>
<script>

import SITE_MAP from '@/common/constants/SiteMap';

export default {
  name: 'logo',
  props: {
    logoType: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: '40px',
    },
  },
  data() {
    return {
      logoMap: SITE_MAP[this.logoType],
    };
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {},
};
</script>

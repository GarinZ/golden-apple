<style lang="less" scoped>
.user-name-edit {
  margin: 20px 34px 0 34px;
  .title {
    font-size: 18px;
  }
  .user-name-edit-main {
    margin-top: 12px;
  }
  .sub-title {
    font-size: 14px;
    color: #9B9B9B;
    font-family: Gotham-Regular;
  }

}
</style>

<template>
  <div class="user-name-edit">
    <div class="user-name-edit-header">
      <div class="title">修改用户名</div>
      <div class="sub-title">4-30个字符，支持中英文、数字、“_”或者减号</div>
    </div>
    <div class="user-name-edit-main clear">
      <Input :value="userName" @on-change="onChange"></Input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-name-edit',
  props: {
    userName: {
      type: String,
      default: '',
    },
    onChange: {
      type: Function,
      require: true,
    },
  },
};
</script>

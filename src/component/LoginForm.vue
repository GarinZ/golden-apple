<style lang="less">
  @import "~@assets/css/account.less";

  .account-login-form {
    width: 262px;
  }
  .account-login-help {
    text-align: center;
    &-item {
      font-weight: bold;
      display: inline-block;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .separator {
    width: 1px;
    height: 9px;
    border: 1px solid black;
  }
  .reset-password-link, .register-link {
    cursor: pointer;
  }
  .register-link {
    color: #0F5BFF
  }
</style>

<template>
  <div class="account-login-form">
    <Form ref="loginForm" :model="$props" :rules="$data.rules">
      <FormItem prop="email">
        <Input v-on:on-change="onEmailChange" :value="email" type="email" placeholder="请输入登录邮箱" />
      </FormItem>
      <FormItem prop="password">
        <Input v-on:on-change="onPasswordChange" :value="password" type="password" placeholder="请输入密码" />
      </FormItem>
      <FormItem>
        <Button class="submit" type="primary" v-on:click="onSubmitHandle" long>登录</Button>
      </FormItem>
    </Form>
    <div class="account-login-help">
      <div class="account-login-help-item reset-password-link" v-on:click="resetPasswordClick">
        忘记密码
      </div>
      <div class="account-login-help-item separator"></div>
      <div class="account-login-help-item register-link" v-on:click="registerClick">账号注册</div>
    </div>
  </div>
</template>

<script>
import { validateEmail, validatePassword } from '@/common/utils/ValidateUtils';

export default {
  name: 'login-form',
  props: {
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    onEmailChange: {
      type: Function,
      default(e) {
        console.log(e.target.value);
      },
    },
    onPasswordChange: {
      type: Function,
      default(e) {
        console.log(e.target.value);
      },
    },
    onSubmitClick: {
      type: Function,
      default: () => console.log('登录按钮点击'),
    },
    resetPasswordClick: {
      type: Function,
      default: () => console.log('忘记密码按钮点击'),
    },
    registerClick: {
      type: Function,
      default: () => console.log('注册按钮点击'),
    },
  },
  data() {
    return {
      rules: {
        email: [
          { validator: validateEmail, trigger: 'blur' },
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    onSubmitHandle() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$props.onSubmitClick(this);
        }
      });
    },
  },
};
</script>

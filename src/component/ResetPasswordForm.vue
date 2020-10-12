<style lang="less">
  @import "~@assets/css/account.less";
  .separator {
    width: 1px;
    height: 9px;
    border: 1px solid black;
  }
</style>

<template>
  <div class="account-reset-password-form">
    <Form ref="resetPasswordForm" :model="$props" :rules="$data.rules">
      <FormItem prop="email">
        <Row>
          <Col span="13">
            <Input v-on:on-change="onEmailChange" :value="email" type="email" placeholder="请输入登录邮箱" />
          </Col>
          <Col span="10" offset="1">
            <Button
              type="primary"
              v-on:click="onVrCodeHandle" ghost long
              :loading="vrCodeButtonLoading"
              :disabled="resendTimeout > 0">
              {{resendTimeout === 0 ? '发送验证码' : `${resendTimeout}s`}}
            </Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem prop="verificationCode">
        <Input v-on:on-change="onVerificationCodeChange" :value="verificationCode" placeholder="请输入验证码" />
      </FormItem>
      <FormItem prop="password">
        <Input v-on:on-change="onPasswordChange" :value="password" type="password" placeholder="请输新入密码" />
      </FormItem>
      <FormItem>
        <Button class="submit" type="primary" v-on:click="onSubmitHandle" long>完成设置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { validateEmail, validatePassword } from '@/common/utils/ValidateUtils';

const RESEND_CODE_TIMEOUT_SEC = 60;

export default {
  name: 'register-form',
  props: {
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    verificationCode: {
      type: String,
      default: '',
    },
    onEmailChange: {
      type: Function,
      default(e) {
        console.log('test');
        console.log(e.target.value);
      },
    },
    onPasswordChange: {
      type: Function,
      default(e) {
        console.log(e.target.value);
      },
    },
    onVerificationCodeChange: {
      type: Function,
      default(e) {
        console.log(e.target.value);
      },
    },
    onSubmitClick: {
      type: Function,
      default: () => console.log('注册按钮点击'),
    },
    onSendVerificationCodeClick: {
      type: Function,
      default: () => console.log('发送验证码按钮点击'),
    },
  },
  data() {
    return {
      vrCodeButtonLoading: false,
      resendTimeout: 0,
      rules: {
        email: [
          { validator: validateEmail, trigger: 'blur' },
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' },
        ],
        verificationCode: [
          {
            type: 'string', trigger: 'blur', message: '请输入验证码', min: '1', required: true,
          },
        ],
      },
    };
  },
  methods: {
    onVrCodeHandle() {
      this.vrCodeButtonLoading = true;
      this.$props.onSendVerificationCodeClick().then(
        () => {
          const self = this;
          this.resendTimeout = RESEND_CODE_TIMEOUT_SEC;
          const interval = setInterval(() => {
            if (self.resendTimeout !== 0) {
              self.resendTimeout -= 1;
            } else {
              clearInterval(interval);
            }
          }, 1000);
          this.vrCodeButtonLoading = false;
        },
        () => { this.vrCodeButtonLoading = false; },
      );
    },
    onSubmitHandle() {
      this.$refs.resetPasswordForm.validate((valid) => {
        if (valid) {
          this.$props.onSubmitClick(this);
        }
      });
    },
  },
};
</script>

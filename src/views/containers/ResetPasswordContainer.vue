<template>
  <div class="reset-password-container">
    <reset-password-form
      :email="email"
      :password="password"
      :verification-code="verificationCode"
      :on-email-change="changeEmail"
      :on-password-change="changePassword"
      :on-submit-click="resetPasswordAndJumpToLogin"
      :on-verification-code-change="changeVerificationCode"
      :on-send-verification-code-click="sendVerificationCode"
    />
  </div>
</template>

<script>
import ResetPasswordForm from '@/component/ResetPasswordForm';
import { mapState, mapActions } from 'vuex';
import RouterName from '@/common/constants/RouterName';

export default {
  name: 'reset-password-container',
  components: {
    ResetPasswordForm,
  },
  computed: {
    ...mapState('resetPassword', {
      email: (state) => state.email,
      password: (state) => state.password,
      verificationCode: (state) => state.verificationCode,
    }),
  },
  methods: {
    ...mapActions('resetPassword', ['resetPassword', 'changeEmail', 'changePassword', 'changeVerificationCode', 'sendVerificationCode']),
    resetPasswordAndJumpToLogin() {
      this.resetPassword().then(
        () => {
          this.$router.push({ name: RouterName.LOGIN });
          this.$Message.success('密码修改成功');
        },
        () => {},
      );
    },
  },
};
</script>

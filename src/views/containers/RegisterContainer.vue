<template>
  <div class="register-container">
    <register-form
      :email="email"
      :password="password"
      :verification-code="verificationCode"
      :on-email-change="changeEmail"
      :on-password-change="changePassword"
      :on-submit-click="onEmailRegister"
      :on-verification-code-change="changeVerificationCode"
      :on-send-verification-code-click="sendVerificationCode"
      :submit-button-text="`完成注册`"
    />
  </div>
</template>

<script>
import RegisterForm from '@/component/RegisterForm';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'register-container',
  components: {
    RegisterForm,
  },
  computed: {
    ...mapState('register', {
      email: (state) => state.email,
      password: (state) => state.password,
      verificationCode: (state) => state.verificationCode,
    }),
  },
  methods: {
    ...mapActions('register', ['emailRegister', 'changeEmail', 'changePassword', 'changeVerificationCode', 'sendVerificationCode']),
    onEmailRegister() {
      this.emailRegister().then(
        () => this.$Message.success('注册成功'),
        () => {},
      );
    },
  },
};
</script>

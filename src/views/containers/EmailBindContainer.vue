<template>
  <div class="email-bind-container">
    <register-form
      :email="email"
      :password="password"
      :verification-code="verificationCode"
      :on-email-change="changeEmail"
      :on-password-change="changePassword"
      :on-submit-click="onEmailBind"
      :on-verification-code-change="changeVerificationCode"
      :on-send-verification-code-click="sendVerificationCode"
      :submit-button-text="`完成绑定`"
    />
  </div>
</template>

<script>
import RegisterForm from '@/component/RegisterForm';
import { mapState, mapActions } from 'vuex';
import RouterName from '@/common/constants/RouterName';

export default {
  name: 'email-bind-container',
  components: {
    RegisterForm,
  },
  computed: {
    ...mapState('emailBind', {
      email: (state) => state.email,
      password: (state) => state.password,
      verificationCode: (state) => state.verificationCode,
    }),
  },
  methods: {
    ...mapActions('userProfile', ['getUserProfile']),
    ...mapActions('emailBind', ['changeEmail', 'changePassword', 'changeVerificationCode', 'sendVerificationCode', 'bindEmail']),
    async onEmailBind() {
      await this.bindEmail();
      await this.getUserProfile();
      this.$Message.success('绑定成功');
      await this.$router.push({ name: RouterName.ACCOUNT_INFO });
    },
  },
};
</script>

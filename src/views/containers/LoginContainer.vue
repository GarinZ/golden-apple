<template>
  <div class="login-container">
    <login-form
      :email="email"
      :password="password"
      :on-email-change="changeEmail"
      :on-password-change="changePassword"
      :on-submit-click="emailLogin"
      :register-click="jumpToRegisterRoute"
      :reset-password-click="jumpToResetPasswordRoute"
    />
  </div>
</template>

<script>
import LoginForm from '@/component/LoginForm';
import { mapState, mapActions } from 'vuex';
import RouterName from '@/common/constants/RouterName';

export default {
  name: 'login-container',
  components: { LoginForm },
  computed: {
    ...mapState('login', {
      email: (state) => state.email,
      password: (state) => state.password,
      isFormValid: (state) => state.isFormValid,
    }),
  },
  methods: {
    ...mapActions('login', ['emailLogin', 'changeEmail', 'changePassword']),
    jumpToResetPasswordRoute() {
      this.$router.push({ name: RouterName.RESET_PASSWORD });
    },
    jumpToRegisterRoute() {
      this.$router.push({ name: RouterName.REGISTER });
    },
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    },
  },
};
</script>

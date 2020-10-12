import Vue from 'vue';
import Vuex from 'vuex';
import login from '@/store/modules/login';
import register from '@/store/modules/register';
import resetPassword from '@/store/modules/resetPassword';
import userProfile from '@/store/modules/userProfile';
import emailBind from '@/store/modules/emailBind';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    login,
    register,
    resetPassword,
    userProfile,
    emailBind,
  },
  strict: debug,
});

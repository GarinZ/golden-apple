import { emailLogin } from '@/api/venus/auth';

/**
 * 登录业务模型
 *
 * @author Garin
 * @date 2020-08-23
 */

/**
 * 登录状态collections
 * @type {{password: string, isFormValid: boolean, email: string}}
 * @property email 邮箱
 * @property password 密码
 * @property isFormValid 表单是否校验通过
 */
const state = {
  email: '',
  password: '',
};

/**
 * 登录操作collections
 */
const actions = {
  /**
   * 邮箱登录方法
   * @param commit
   * @param state
   */
  async emailLogin({
    dispatch, commit, state, rootState,
  }) {
    const { email, password } = state;
    const data = await emailLogin({ email, password });
    const { referrer } = document;
    if (referrer) {

    }
  },
  /**
   * 变更邮箱状态
   * @param commit
   * @param state
   * @param e 事件对象
   */
  changeEmail({ commit }, e) {
    commit('changeEmail', { email: e.target.value });
  },
  /**
   * 变更密码状态
   */
  changePassword({ commit }, e) {
    commit('changePassword', { password: e.target.value });
  },
};

/**
 * 状态变更操作 collections
 */
const mutations = {
  changeEmail(state, { email }) {
    state.email = email;
  },
  changePassword(state, { password }) {
    state.password = password;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};

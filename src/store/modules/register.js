import { emailRegister, sendVerificationCode } from '@/api/venus/auth';

/**
 * 注册业务模型
 *
 * @author Garin
 * @date 2020-08-23
 */

/**
 * 注册状态collections
 * @property email 邮箱
 * @property password 密码
 * @property verificationCode 验证码
 */
const state = {
  email: '',
  password: '',
  verificationCode: '',
};

/**
 * 注册操作collections
 */
const actions = {
  /**
   * 邮箱注册
   * @param commit
   * @param state
   */
  async emailRegister({ state }) {
    const { verificationCode, email, password } = state;
    await emailRegister({ verificationCode, email, password });
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
  /**
   * 变更验证码状态
   */
  changeVerificationCode({ commit }, e) {
    commit('changeVerificationCode', { verificationCode: e.target.value });
  },
  /**
   * 发送验证码
   */
  async sendVerificationCode({ state }) {
    const { email, verificationCode } = state;
    return sendVerificationCode({ email, verificationCode });
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
  changeVerificationCode(state, { verificationCode }) {
    state.verificationCode = verificationCode;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};

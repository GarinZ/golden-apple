import defaultAvatar from '@assets/images/icons/defaultAvatar.png';
import {
  getUserProfile, uploadAvatar, updateUserProfile, unbindWechat,
} from '@/api/venus/account';
import _ from 'lodash';

/**
 * 账户基本数据业务模型
 *
 * @author Garin
 * @date 2020-08-23
 */

/**
 * 状态collections
 * @property userName 用户名
 * @property avatarUrl 头像URL
 * @property userId 用户id
 * @property token 用户token
 */
const state = {
  userName: '未登录',
  avatarUrl: defaultAvatar,
  userId: 0,
  isEmailBind: false,
  isWechatBind: false,
};

/**
 * 操作 collections
 */
const actions = {
  /**
   * 获取账户信息
   * @param commit
   * @param state
   */
  async getUserProfile({ commit }) {
    const {
      userId, userName, avatarUrl, isEmailBind, isWechatBind,
    } = await getUserProfile();
    commit('updateUserProfile', {
      userId, userName, avatarUrl, isEmailBind, isWechatBind,
    });
  },
  /**
   * 更新用户名
   * @param commit
   * @param userName
   * @returns {Promise<void>}
   */
  async updateUserName({ commit }, userName) {
    await updateUserProfile({ userName });
    commit('updateUserProfile', { userName });
  },
  /**
   * 更新头像url
   * @param commit
   * @param avatarUrl
   * @returns {Promise<void>}
   */
  async updateAvatarUrl({ commit }, { avatarUrl }) {
    await updateUserProfile({ avatarUrl });
    commit('updateUserProfile', { avatarUrl });
  },
  /**
   * 上传头像
   * @param context 上下文
   * @param base64Str base64字符串
   * @returns {Promise<*>}
   */
  async uploadAvatar({ dispatch }, base64Str) {
    const base64 = base64Str.slice(base64Str.indexOf(',') + 1, base64Str.length);
    const { url } = await uploadAvatar({ base64 });
    await dispatch('updateAvatarUrl', { avatarUrl: url });
    return url;
  },

  /**
   * 解绑微信账号
   * @return {Promise<void>}
   */
  async unbindWechat() {
    await unbindWechat();
  },
  /**
   * 清空用户信息
   */
  clearUserProfile({ dispatch }) {
    dispatch('updateUserProfile', { ...state });
  },
};

/**
 * 状态变更操作 collections
 */
const mutations = {
  updateUserProfile(state, {
    userName, userId, avatarUrl, isEmailBind, isWechatBind,
  }) {
    _.merge(state, {
      userName, userId, avatarUrl, isEmailBind, isWechatBind,
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};

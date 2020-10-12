/**
 * Venus后端模块接口collections
 * PATH: /venus/*
 *
 * @author Garin
 * @date 2020-08-24
 */

import { Ajax } from '@/common/utils/ApiUtils';
import _ from 'lodash';
import { PATH_PREFIX } from './contants';

/**
 * 获取账户信息
 * 请求依赖cookie
 */
async function getUserProfile() {
  return Ajax({
    url: `${PATH_PREFIX}/account/get/userProfile`,
    method: 'post',
    data: {},
  });
}

/**
 * 更新用户信息（按需更新，没有则传null或不进行赋值）
 * @param userName 用户名
 * @param avatarUrl
 * @returns {Promise<*>}
 */
async function updateUserProfile({ userName, avatarUrl }) {
  return Ajax({
    url: `${PATH_PREFIX}/account/update/userProfile`,
    method: 'post',
    data: _.merge({}, { userName, avatarUrl }),
  });
}

/**
 * 上传头像
 * @param base64 base64字符串，去掉前缀
 * @return {Promise<{url: *}>}
 */
async function uploadAvatar({ base64 }) {
  const { url } = await Ajax({
    url: `${PATH_PREFIX}/account/upload/avatar`,
    method: 'post',
    data: { base64 },
  });
  return { url };
}

/**
 * 解绑微信账号
 * @return {Promise<void>}
 */
async function unbindWechat() {
  await Ajax({
    url: `${PATH_PREFIX}/account/unbind/wechat`,
    method: 'post',
    data: {},
  });
}

/**
 * 邮箱绑定
 * @param {String} email 邮箱
 * @param {String} password 密码
 * @param {String} verificationCode 验证码
 */
async function emailBind({ email, password, verificationCode }) {
  return Ajax({
    url: `${PATH_PREFIX}/account/bind/email`,
    method: 'post',
    data: { email, password, verificationCode },
  });
}

/**
 * 邮箱解绑
 */
async function emailUnbind() {
  return Ajax({
    url: `${PATH_PREFIX}/account/unbind/email`,
    method: 'post',
    data: {},
  });
}

export {
  getUserProfile, updateUserProfile, uploadAvatar, unbindWechat, emailBind, emailUnbind,
};

/**
 * Venus后端模块接口collections
 * PATH: /venus/*
 *
 * @author Garin
 * @date 2020-08-24
 */

import { Ajax } from '@/common/utils/ApiUtils';
import { PATH_PREFIX } from './contants';

/**
 * 邮箱登录
 * @param {String} email 邮箱
 * @param {String} password 密码
 */
async function emailLogin({ email, password }) {
  return Ajax({
    url: `${PATH_PREFIX}/login/email`,
    method: 'post',
    data: { email, password },
  });
}

/**
 * 邮箱注册
 * @param {String} email 邮箱
 * @param {String} password 密码
 * @param {String} verificationCode 验证码
 */
async function emailRegister({ email, password, verificationCode }) {
  return Ajax({
    url: `${PATH_PREFIX}/register/email`,
    method: 'post',
    data: { email, password, verificationCode },
  });
}

/**
 * 发送邮箱验证码
 * @param {String} email 邮箱
 * @param {String} verificationCode 验证码
 */
async function sendVerificationCode({ email, verificationCode }) {
  return Ajax({
    url: `${PATH_PREFIX}/login/sendVerificationEmail`,
    method: 'post',
    data: { email, verificationCode },
  });
}

/**
 * 重置密码
 * @param {String} email 邮箱
 * @param {String} password 密码
 * @param {String} verificationCode 验证码
 */
async function resetPassword({ email, password, verificationCode }) {
  return Ajax({
    url: `${PATH_PREFIX}/login/email/passwordReset`,
    method: 'post',
    data: { email, password, verificationCode },
  });
}

/* z*
 * 退出登录
 */
async function logout() {
  return Ajax({
    url: `${PATH_PREFIX}/logout`,
    method: 'get',
    data: {},
  });
}

export {
  emailLogin, emailRegister, sendVerificationCode, resetPassword, logout,
};

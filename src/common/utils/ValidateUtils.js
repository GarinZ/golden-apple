/**
 * 校验工具集
 *
 * @author Garin
 * @date 2020-08-22
 */

/** 邮箱Reg */
const EMAIL_REG_EXP = /^[A-Za-z0-9\u4e00-\u9fa5_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
/** 密码Reg */
const PASSWORD_REG_EXP = /^(?=.*[A-Za-z]+)(?=.*[0-9]+)\w{6,16}$/;
/** 用户名Reg */
const USER_NAME_REG_EXP = /^[\u4e00-\u9fa5\w-]{4,30}$/;

const getCharLength = (str) => {
  if (!str) {
    return 0;
  }
  const len = str.length;
  let reLen = 0;
  for (let i = 0; i < len; i++) {
    if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) {
      reLen += 2;
    } else {
      reLen += 1;
    }
  }
  return reLen;
};

/**
 * 邮箱校验器
 * @param rule
 * @param value
 * @param callback
 */
const validateEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请填写正确的邮箱地址'));
  } else if (value.search(EMAIL_REG_EXP) === -1) {
    callback(new Error('请填写正确的邮箱地址'));
  } else {
    callback();
  }
};

/**
 * 密码校验器
 * @param rule
 * @param value
 * @param callback
 */
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    callback();
  }
};

/**
 * 密码校验器
 * @param rule
 * @param value
 * @param callback
 */
const notEmpty = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入密码'));
  } else {
    callback();
  }
};

/**
 * 用户名校验器
 * @param value
 * @return string 错误信息
 */
const validateUserName = (value) => {
  const MIN_LENGTH = 4;
  const MAX_LENGTH = 30;
  const charLength = getCharLength(value);
  if (charLength < MIN_LENGTH || charLength > MAX_LENGTH) {
    return '用户名需要在4-30个字符内';
  }
  if (value.search(USER_NAME_REG_EXP) < 0) {
    return '用户名仅支持中英文、数字、“_”或者减号';
  }
  return '';
};

export { validateEmail, validatePassword, validateUserName };

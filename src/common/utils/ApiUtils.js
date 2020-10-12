import axios from 'axios';
import { ENV_ENUM, CURRENT_ENV, GLOBAL_REQUEST_SUCCESS_STATUS } from '@/common/constants/Global';
import { Message } from 'iview';

/**
 * 请求工具集
 *
 * @author Garin
 * @date 2020-8-24
 */

/**
 * 请求主域
 * @type {string}
 */
const DOMAIN = (CURRENT_ENV === ENV_ENUM.DEV)
  ? 'http://localhost:9000'
  : 'http://www.uxmap.cn';

/**
 * Axios实例
 */
const Ajax = axios.create({
  // baseURL: DOMAIN,
  timeout: 600000,
  withCredentials: true,
  headers: {
    // 'x-requested-with': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=utf-8',
  },
});

/**
 * 全局请求错误处理
 */
Ajax.interceptors.response.use((response) => {
  const { status, data, errors } = response.data;
  if (status === GLOBAL_REQUEST_SUCCESS_STATUS) {
    return data;
  }
  errors.forEach(({ errorMessage }) => Message.error(errorMessage));
  return Promise.reject();
}, () => {
  Message.error('系统异常');
  return Promise.reject();
});

export { DOMAIN, Ajax };

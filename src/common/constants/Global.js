/**
 * 全局常量
 * @author Garin
 * @date 2020-08-24
 */

const GLOBAL_REQUEST_SUCCESS_STATUS = 200;
const CURRENT_ENV = process.env.NODE_ENV;

/**
 * 全局Node环境变量
 * 可以通过{@code process.env.NODE_ENV}获取
 * @type {{DEV: string, PRODUCT: string}}
 * @property DEV 开发环境
 * @property PRODUCT 生产环境
 */
const ENV_ENUM = {
  DEV: 'development',
  PRODUCT: 'production',
};

export { ENV_ENUM, CURRENT_ENV, GLOBAL_REQUEST_SUCCESS_STATUS };

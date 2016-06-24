import * as utils from '../utils';


/**
 * @private
 *
 * Adds:
 * e.g. { env: { development: true, production: false } }
 */
export default (data) => ({
  ...data,

  env: {
    development: utils.isDevelopmentEnv(),
    production: utils.isProductionEnv(),
  },
});

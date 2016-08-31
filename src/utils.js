import { cleanPath, run } from 'static-base';
import chalk from 'chalk';
import minimatch from 'minimatch';
import Promise from 'bluebird';


/**
 * Utility function to check against the current environment name.
 * Example, `isEnv('development') === true`.
 *
 * Also available:
 *
 * ```
 * isDevelopmentEnv();
 * isProductionEnv();
 * ```
 */
export const isEnv = (env) => process.env.ENV === env;
export const isDevelopmentEnv = () => isEnv('development');
export const isProductionEnv = () => isEnv('production');


/**
 * The `static-base.run` function with a limiter and messenger installed.
 * The last function accepts an object instead of the usual stuff.
 * If the limiter (e.g. `changedPath` from watcher)
 * matches the given pattern then it continues,
 * otherwise it returns a Promise with an empty array.
 *
 * __How to use:__
 *
 * ```
 * const message = 'Building pages';
 * const limiter = 'src/pages/example.hbs';
 * const sequenceItems = [read];
 * const pattern = 'src/pages/*.hbs';
 * const rootDir = __dirname;
 *
 * runWithMessageAndLimiter
 *   (message)
 *   (limiter)
 *   (...sequenceItems)
 *   (pattern, rootDir)
 * ```
 */
export const runWithMessageAndLimiter =
  (msg) =>
  (limiter, limiterPattern) =>
  (...sequenceItems) =>
  (...args) => {
    const pattern = limiterPattern || (typeof args[0] === 'string' ? args[0] : undefined);
    const cleanPattern = pattern && cleanPath(pattern, { beginning: true });

    if (!limiter || (cleanPattern && minimatch(limiter, cleanPattern))) {
      console.log(chalk.bold.yellow(msg));
      return run(...sequenceItems)(...args);
    }

    return Promise.resolve([]);
};

import env from './env';
import Promise from 'bluebird';


/**
 * Metadata function, builds metadata object (e.g. data to pass to templates).
 * Stores node environment details.
 * See `src/metadata/env.js` for more info.
 *
 * @param {Object|Promise} [initial={}]
 */
export default function(initial = {}) {
  return Promise.resolve(initial)
    .then(env);
};

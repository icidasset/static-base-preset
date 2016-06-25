import Promise from 'bluebird';

import env from './env';
import webpack from './webpack';


/**
 * Metadata function, builds metadata object (e.g. data to pass to templates).
 * Stores node environment details and webpack assets paths.
 * See `src/metadata/env.js` and `src/metadata/webpack.js` for more info.
 *
 * @param {Object|Promise} [initial={}]
 */
export default function(initial = {}) {
  return Promise.resolve(initial)
    .then(env)
    .then(webpack);
}

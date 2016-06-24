import Promise from 'bluebird';

import env from './env';
import webpack from './webpack';


export default (initial = {}) => {
  return Promise.resolve(initial)
    .then(env)
    .then(webpack);
}

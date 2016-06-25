import { read } from 'static-base-contrib';
import test from 'ava';

import { exec, runWithMessageAndLimiter } from './lib';


test('exec', async t => {
  return exec([
    (attr) => runWithMessageAndLimiter
      ('Reading')
      (attr.priv.changedPath)
      (read)
      ('test/fixtures/hi.txt', attr.priv.root)

  ], {
    rootDirectory: __dirname,

  }).then(
    results => t.is(results[0][0].content, 'Hi!\n'),
    handleError(t)

  );
});


/*

  Utilities

*/


function handleError(t) {
  return (err) => t.fail(err.toString());
}

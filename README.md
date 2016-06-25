# Static Base Preset

This is the foundation I use together with [`static-base`](https://github.com/icidasset/static-base) and [`static-base-contrib`](https://github.com/icidasset/static-base-contrib).
It includes:

- A simple static server (acts like `surge.sh`).
- A simple file watcher.
- A utility function that wraps the `static-base.run` function,
  which makes it a sequence that only runs when needed and logs a message.
- A metadata function.
- Utility functions for checking the current environment.



## How to use

```js
import { exec, runWithMessageAndLimiter } from 'static-base-preset';
import { read, frontmatter, write } from 'static-base-contrib';


const BUILD_DIR = './build';
const SRC_DIR = './src';

const markdown = (files) => files.map(file => ({
  ...file,
  content: renderMarkdown(file.content),
}));

const sequence = (attr) => runWithMessageAndLimiter
  ('Reading and writing')
  (attr.priv.changedPath)
  (read, frontmatter, markdown, [write, BUILD_DIR])
  (`${SRC_DIR}/*.md`, attr.priv.root);


exec([
  sequence

], {
  rootDirectory: __dirname,
  buildDirectory: BUILD_DIR,
  sourceDirectory: SRC_DIR,

}).then(
  results => console.log('Success!', results),
  error => console.error(error.stack || error.toString())

)
```



## Documentation

[http://icidasset.github.io/static-base-preset](http://icidasset.github.io/static-base-preset)

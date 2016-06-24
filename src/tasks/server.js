import { join } from 'path';
import chalk from 'chalk';
import express from 'express';
import Promise from 'bluebird';


export default function(options) {
  const app = express();
  const buildDir = join(options.rootDirectory, options.buildDirectory);

  app.use(express.static(buildDir));

  // handle not found
  app.use((req, res) => {
    res.status(400).sendFile(join(buildDir, '404.html'));
  });

  // listen
  app.listen(options.serverPort, () => {
    console.log(chalk.bold.magenta(`Running static server at localhost:${options.serverPort}`));
  });

  return Promise.resolve();
}

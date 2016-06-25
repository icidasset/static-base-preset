import { join } from 'path';
import chalk from 'chalk';
import express from 'express';
import Promise from 'bluebird';


export default function server(options) {
  const app = express();
  const buildDir = join(options.rootDirectory, options.buildDirectory);

  // routes
  app.use(express.static(buildDir));
  app.use((req, res) => {
    let status = options.clientSideRouting ?
      200 :
      404 ;

    res.status(status).sendFile(join(buildDir, `${status}.html`));
  });

  // run
  app.listen(options.serverPort, () => {
    console.log(chalk.bold.magenta(`Running static server at localhost:${options.serverPort}`));
  });

  // -- the end
  return Promise.resolve();
}

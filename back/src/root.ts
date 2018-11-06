import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

const app = express();

export const appFactory = (_) => {
  app.options('*', (_, res) => res.sendStatus(200));
  app.post('*', bodyParser.json());
  app.use(express.static(path.join(__dirname, '../../front/dist')));
  app.all('/*', (_, res) => res.sendFile('index.html', { root: 'dist' }));

  app.use((err, _, res, next) => {
    if (res.headersSent) {
      return next(err)
    }
    console.error(err);
    res.sendStatus(500);
  });

  return app;
}
import debugLibrary from 'debug';
import Koa from 'koa';
import cors from 'koa2-cors';
import history from 'koa2-history-api-fallback';
import bodyparser from 'koa-bodyparser';
import etag from 'koa-etag';
import json from 'koa-json';
import logger from 'koa-logger';
import onerror from 'koa-onerror';
import serve from 'koa-static';
import path from 'path';
import conditional from './utils/koa-conditional-get';
import { cronMap } from './crawler/cronInstance';
import { router } from './routes/index';
import { MyContext } from './@types/api';
import jwt from 'koa-jwt';

const debug = debugLibrary('app');

let app = new Koa<any, MyContext>();
app.context.cronMap = cronMap;
app.context.mailValidators = new Map();

app.use(
  cors({
    origin: '*',
    allowHeaders: ['*'],
  }),
);
// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
);

app.use(json());
app.use(logger());

// app.use(async (ctx, next) => {
//   await next();
// });

app.use(history());

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// etag 304
app.use(conditional());
app.use(etag());

// logger
// app.use(async (ctx, next) => {
//   const start = new Date().getTime();
//   await next();
//   const ms = new Date().getTime() - start;
//   debug(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

app.use(
  jwt({ secret: process.env.secret }).unless({
    path: [/\/user\/login/, /\/user\/verify\/code/, /\/user\/register/],
  }),
);

// routes
app.use(router.routes()).use(router.allowedMethods());

app.use(
  serve(path.resolve('..', 'frontend/dist'), {
    // 设置cache-controll缓存时间
    maxage: 1000 * 60 * 60 * 2,
    // index.html禁止缓存
    setHeaders(res, filePath) {
      const { base } = path.parse(filePath);
      if (base === 'index.html') {
        res.setHeader('Cache-Control', 'max-age=0');
      }
    },
  }),
);

// error-handling
app.on('error', (err, ctx) => {
  debug('server error', err, ctx);
});

export default app;

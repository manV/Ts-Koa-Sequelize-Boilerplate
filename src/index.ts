import './sequelize'

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as koaLogger from 'koa-logger';

import * as postRoutes from './routes/post'

const app = new Koa();
const router = new Router();

app.use(koaLogger());

router.use('/post', postRoutes.routes(), postRoutes.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('server started on http://localhost:3000/');
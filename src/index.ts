import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from '@koa/router'

import { generationRoutes } from './routes/generation.routes'

const app = new Koa();
const router = new Router();

// Middleware
app.use(bodyParser());

// Routes 
router.use('/v1', generationRoutes.routes());
app.use(router.routes())
app.use(router.allowedMethods());

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

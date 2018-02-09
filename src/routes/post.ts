import * as Router from 'koa-router';
import Post from './../models/post';
import Topic from './../models/topic';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = await Post.findAll<Post>({
    include: [Topic]
  });
});

export = router;
import { Router } from 'express';
import * as postService from '../services/post.service';

const router = Router();

router
    .get('/', (req, res, next) => postService.getPosts(req.query)
        .then(posts => res.send(posts))
        .catch(next))
    .get('/:id', (req, res, next) => postService.getPostById(req.params.id)
        .then(post => res.send(post))
        .catch(next))
    .post('/', (req, res, next) => postService.create(req.user.id, req.body) // user added to the request in the jwt strategy, see passport config
        .then((post) => {
            req.io.emit('new_post', post); // notify all users that a new post was created
            return res.send(post);
        })
        .catch(next))
    .put('/react', (req, res, next) => postService.setReaction(req.user.id, req.body) // user added to the request in the jwt strategy, see passport config
        .then((reaction) => {
            if (reaction.post && (reaction.post.userId !== req.user.id)) {
                // notify a user if someone (not himself) liked his post
                req.io.to(reaction.post.userId).emit('like', 'Your post was liked!');
            }
            return res.send(reaction);
        })
        .catch(next))
    .get('/react/:id', (req, res, next) => postService.getPostReactionById(req.user.id, req.params.id)
    .then(post => res.send(post))
    .catch(next))
    .delete('/:id', (req, res, next) => postService.deletePostById(req.params.id)
    .then(res.send('deleted'))
    .catch(next))
    .get('/liked', (req,res,next)=>postService.getLikedPostsId()
    .then(post => res.send(post))
    .catch(next))
    .get('/restore/:id', (req, res, next) => postService.restorePostById(req.params.id)
    .then(res.send('restored'))
    .catch(next))
    .put('/',(req, res, next) => postService.updatePost(req.user.id, req.body.id, req.body.text) // user added to the request in the jwt strategy, see passport config
    .then(res.send('updated'))
    .catch(next));
export default router;

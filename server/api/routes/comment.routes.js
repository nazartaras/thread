import { Router } from 'express';
import * as commentService from '../services/comment.service';

const router = Router();

router
    .get('/:id', (req, res, next) => commentService.getCommentById(req.params.id)
        .then(comment => res.send(comment))
        .catch(next))
    .post('/', (req, res, next) => commentService.create(req.user.id, req.body) // user added to the request in the jwt strategy, see passport config
        .then(comment => res.send(comment))
        .catch(next))
    .delete('/:id', (req, res, next) => commentService.deleteCommentById(req.params.id)
        .then(res.send('deleted'))
        .catch(next))
    .put('/', (req, res, next) => commentService.updateComment(req.user.id, req.body.id, req.body.text) // user added to the request in the jwt strategy, see passport config
        .then(res.send('updated'))
        .catch(next))
    .get('/restore/:id', (req, res, next) => commentService.restoreCommentById(req.params.id)
    .then(res.send('restored'))
    .catch(next))

export default router;

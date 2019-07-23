import commentRepository from '../../data/repositories/comment.repository';

export const create = (userId, comment) => commentRepository.create({
    ...comment,
    userId
});

export const deleteCommentById = id => commentRepository.deleteCommentById(id);

export const updateComment = (userId,postId, text) => commentRepository.updateComment(postId, text, userId);

export const getCommentById = id => commentRepository.getCommentById(id);

export const restoreCommentById = id => commentRepository.restoreCommentById(id);
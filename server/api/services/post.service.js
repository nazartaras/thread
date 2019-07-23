import postRepository from '../../data/repositories/post.repository';
import postReactionRepository from '../../data/repositories/post-reaction.repository';

export const getPosts = filter => postRepository.getPosts(filter);

export const getPostById = id => postRepository.getPostById(id);

export const deletePostById = id => postRepository.deletePostById(id);

export const restorePostById = id => postRepository.restorePostById(id);

export const getLikedPostsId = ()=>postReactionRepository.getLikedPostsId();

export const getPostReactionById = (userId, id) => postReactionRepository.getPostReaction(userId, id); 

export const updatePost = (userId,postId, text) => postRepository.updatePost(postId, text, userId);

export const create = (userId, post) => postRepository.create({
    ...post,
    userId
});

export const setReaction = async (userId, { postId, isLike=true, isDislike=true, type }) => {
    // define the callback for future use as a promise
    let updateOrDelete='';
    let reaction='';
    let result='';
    if(type==='like'){updateOrDelete = react => (react.isLike === isLike
        ? postReactionRepository.deleteById(react.id)
        : postReactionRepository.updateById(react.id, { isLike }));

    reaction = await postReactionRepository.getPostReaction(userId, postId);
    isDislike=false;
    result = reaction
        ? await updateOrDelete(reaction)
        : await postReactionRepository.create({ userId, postId, isLike, isDislike });}
        else{
    updateOrDelete = react => (react.isDislike === isDislike
            ? postReactionRepository.deleteById(react.id)
            : postReactionRepository.updateById(react.id, { isDislike }));
    
        reaction = await postReactionRepository.getPostReaction(userId, postId);
        isLike=false;
        result = reaction
            ? await updateOrDelete(reaction)
            : await postReactionRepository.create({ userId, postId, isDislike, isLike });}

    // the result is an integer when an entity is deleted
    return Number.isInteger(result) ? {} : postReactionRepository.getPostReaction(userId, postId);
};

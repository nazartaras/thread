import * as postService from 'src/services/postService';
import * as commentService from 'src/services/commentService';
import {
    ADD_POST,
    LOAD_MORE_POSTS,
    SET_ALL_POSTS,
    SET_EXPANDED_POST,
    DELETE_POST,
    RESTORE_POST,
    UPDATE_POST,
    DELETE_COMMENT,
    RESTORE_COMMENT,
    UPDATE_COMMENT,
 } from './actionTypes';

const setPostsAction = posts => ({
    type: SET_ALL_POSTS,
    posts
});

const addMorePostsAction = posts => ({
    type: LOAD_MORE_POSTS,
    posts
});

const addPostAction = post => ({
    type: ADD_POST,
    post
});

const setExpandedPostAction = post => ({
    type: SET_EXPANDED_POST,
    post
});

const deletePostAction = id =>({
    type: DELETE_POST,
    id
})
const updatePostAction = post =>({
    type: UPDATE_POST,
    post
})

const restorePostAction = id =>({
    type: RESTORE_POST,
    id
})

const deleteCommentAction = id =>({
    type: DELETE_COMMENT,
    id
})
const updateCommentAction = post =>({
    type: UPDATE_COMMENT,
    post
})

const restoreCommentAction = id =>({
    type: RESTORE_COMMENT,
    id
})
export const loadPosts = filter => async (dispatch) => {
    const posts = await postService.getAllPosts(filter);
    dispatch(setPostsAction(posts));
};

export const loadMorePosts = filter => async (dispatch, getRootState) => {
    const { posts: { posts } } = getRootState();
    const loadedPosts = await postService.getAllPosts(filter);
    const filteredPosts = loadedPosts
        .filter(post => !(posts && posts.some(loadedPost => post.id === loadedPost.id)));
    dispatch(addMorePostsAction(filteredPosts));
};

export const applyPost = postId => async (dispatch) => {
    const post = await postService.getPost(postId);
    dispatch(addPostAction(post));
};

export const addPost = post => async (dispatch) => {
    const { id } = await postService.addPost(post);
    const newPost = await postService.getPost(id);
    dispatch(addPostAction(newPost));
};

export const toggleExpandedPost = postId => async (dispatch) => {
    const post = postId ? await postService.getPost(postId) : undefined;
    dispatch(setExpandedPostAction(post));
};

export const likePost = postId => async (dispatch, getRootState) => {
   // const isDisliked = await postService.checkDislike(postId);
    const { id } = await postService.likePost(postId);
    console.log(id);
    const diff = id ? 1 : -1; // if ID exists then the post was liked, otherwise - like was removed

    const mapLikes = post => ({
        ...post,
        likeCount: Number(post.likeCount) + diff // diff is taken from the current closure
    });

    const { posts: { posts, expandedPost } } = getRootState();
    const updated = posts.map(post => (post.id !== postId ? post : mapLikes(post)));

    dispatch(setPostsAction(updated));

    if (expandedPost && expandedPost.id === postId) {
        dispatch(setExpandedPostAction(mapLikes(expandedPost)));
    }
};

export const dislikePost = postId => async (dispatch, getRootState) => {
    const { id } = await postService.dislikePost(postId);
    const diff = id ? 1 : -1; // if ID exists then the post was liked, otherwise - like was removed

    const mapDislikes = post => ({
        ...post,
        dislikeCount: Number(post.dislikeCount) + diff // diff is taken from the current closure
    });

    const { posts: { posts, expandedPost } } = getRootState();
    const updated = posts.map(post => (post.id !== postId ? post : mapDislikes(post)));

    dispatch(setPostsAction(updated));

    if (expandedPost && expandedPost.id === postId) {
        dispatch(setExpandedPostAction(mapDislikes(expandedPost)));
    }
};

export const addComment = request => async (dispatch, getRootState) => {
    const { id } = await commentService.addComment(request);
    const comment = await commentService.getComment(id);

    const mapComments = post => ({
        ...post,
        commentCount: Number(post.commentCount) + 1,
        comments: [...(post.comments || []), comment] // comment is taken from the current closure
    });

    const { posts: { posts, expandedPost } } = getRootState();
    const updated = posts.map(post => (post.id !== comment.postId
        ? post
        : mapComments(post)));

    dispatch(setPostsAction(updated));

    if (expandedPost && expandedPost.id === comment.postId) {
        dispatch(setExpandedPostAction(mapComments(expandedPost)));
    }
};



export const deletePostById = postId => async (dispatch) =>{
    const post = await postService.deletePostById(postId);
    dispatch(deletePostAction(postId));
}

export const updatePost = post => async(dispatch) =>{
     await postService.updatePost(post);
     dispatch(updatePostAction(post));
}



export const restorePostById = postId=> async(dispatch) =>{
    const post = await postService.restorePostById(postId);
    dispatch(restorePostAction(postId));
}

export const updateComment = comment => async(dispatch)=>{
    await commentService.updateComment(comment);
    dispatch(updateCommentAction(comment));
}

export const restoreComment= commentId=> async(dispatch) =>{
    const comment = await commentService.restoreCommentById(commentId);
    dispatch(restoreCommentAction(commentId));
}
export const deleteComment = commentId => async (dispatch)=>{
    const commentDeleted = await commentService.deleteComment(commentId);
    dispatch(deleteCommentAction(commentId));
}
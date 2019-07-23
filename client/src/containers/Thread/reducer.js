import {
    SET_ALL_POSTS,
    LOAD_MORE_POSTS,
    ADD_POST,
    SET_EXPANDED_POST,
    DELETE_POST,
    RESTORE_POST,
    UPDATE_POST,
    DELETE_COMMENT,
    RESTORE_COMMENT,
    UPDATE_COMMENT
} from './actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_ALL_POSTS:
            return {
                ...state,
                posts: action.posts,
                hasMorePosts: Boolean(action.posts.length)
            };
        case LOAD_MORE_POSTS:
            return {
                ...state,
                posts: [...(state.posts || []), ...action.posts],
                hasMorePosts: Boolean(action.posts.length)
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.post, ...state.posts]
            };
        case SET_EXPANDED_POST:
            return {
                ...state,
                expandedPost: action.post
            };
        case DELETE_POST: {
            const newPosts = state.posts.map((el) => {
                if (el.id !== action.id) { return el; }
                else {
                    el = { ...el, deleted: true };
                    return el;
                }
            });
            return {
                ...state,
                posts: newPosts
            }
        }
        case RESTORE_POST: {
            const newPosts = state.posts.map((el) => {
                if (el.id !== action.id) { return el; }
                else {
                    el = { ...el, deleted: false };
                    return el;
                }
            });
            return {
                ...state,
                posts: newPosts
            }
        }
        case UPDATE_POST: {
            const newPosts = state.posts.map((el) => {
                if (el.id !== action.post.id) { return el; }
                else {
                    el = { ...el, body: action.post.text };
                    return el;
                }
            });
            return {
                ...state,
                posts: newPosts
            }
        }
        case DELETE_COMMENT: {
            const newComments = state.expandedPost.comments.map((el) => {
                if (el.id !== action.id) { return el; }
                else {
                    el = { ...el, deleted: true };
                    return el;
                }
            });
            return {
                ...state,
                expandedPost: {...state.expandedPost, comments:newComments}
            }
        }
        case RESTORE_COMMENT: {
            const newComments = state.expandedPost.comments.map((el) => {
                if (el.id !== action.id) { return el; }
                else {
                    el = { ...el, deleted: false };
                    return el;
                }
            });
            return {
                ...state,
                expandedPost: {...state.expandedPost, comments:newComments}
            }
        }
        case UPDATE_COMMENT: {
            const newComments = state.expandedPost.comments.map((el) => {
                if (el.id !== action.post.id) { return el; }
                else {
                    el = { ...el, body: action.post.text };
                    return el;
                }
            });
            return {
                ...state,
                expandedPost: {...state.expandedPost, comments:newComments}
            }
        }
        default:
            return state;
    }
};

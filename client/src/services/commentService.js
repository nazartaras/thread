import callWebApi from 'src/helpers/webApiHelper';

export const addComment = async (request) => {
    const response = await callWebApi({
        endpoint: '/api/comments',
        type: 'POST',
        request
    });
    return response.json();
};

export const getComment = async (id) => {
    const response = await callWebApi({
        endpoint: `/api/comments/${id}`,
        type: 'GET'
    });
    return response.json();
};

export const deleteComment = async (id) => {
    const response = await callWebApi({
        endpoint: `/api/comments/${id}`,
        type: 'DELETE'
    });
    return response;
};

export const updateComment = async (request) => {
    const response = await callWebApi({
        endpoint: `/api/comments`,
        type: 'PUT',
        request
    });
    return response;
};

export const restoreCommentById = async (commentId) => {
    const response = await callWebApi({
        endpoint: `/api/comments/restore/${commentId}`,
        type: 'GET'
    });
    return response;
};
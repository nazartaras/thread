import { SHOW_PAGE, HIDE_PAGE } from "./actionTypes";

const initialState = {
    commentId: '',
    isShown: false,
    text:''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_PAGE: {
            return {
                commentId:action.payload.commentId,
                text:action.payload.commentText,
                isShown: true
            };
        }

        case HIDE_PAGE: {
            return {
                commentId:'',
                text:'',
                isShown: false
            };
        }

        default:
            return state;
    }
}
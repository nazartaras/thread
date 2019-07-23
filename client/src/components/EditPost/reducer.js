import { SHOW_PAGE, HIDE_PAGE } from "./actionTypes";

const initialState = {
    postId: '',
    isShown: false,
    text:''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_PAGE: {
            return {
                postId:action.payload.postId,
                text:action.payload.postText,
                isShown: true
            };
        }

        case HIDE_PAGE: {
            return {
                postId:'',
                text:'',
                isShown: false
            };
        }

        default:
            return state;
    }
}
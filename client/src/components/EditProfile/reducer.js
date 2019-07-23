import { SHOW_PAGE, HIDE_PAGE } from "./actionTypes";

const initialState = {
    userId: '',
    isShown: false,
    mail:'',
    login:'',
    status:''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_PAGE: {
            return {
                userId:action.payload.userId,
                mail:action.payload.mail,
                login:action.payload.login,
                status: action.payload.status,
                isShown: true
            };
        }

        case HIDE_PAGE: {
            return {
                userId:'',
                mail:'',
                login:'',
                status:'',
                isShown: false
            };
        }

        default:
            return state;
    }
}
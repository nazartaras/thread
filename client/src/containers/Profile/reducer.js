import { SET_USER, SET_IS_LOADING, UPDATE_USER } from './actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            console.log("set");
                console.log(state);
            return {
                ...state,
                user: action.user,
                isAuthorized: Boolean(action.user && action.user.id)
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case UPDATE_USER:
                console.log("update");
            console.log(state);
            return{
                ...state,
                user:{
                    ...state.user,
                    email: action.user.email,
                    username: action.user.username,
                    status: action.user.status
                }
            }
        default:
            return state;
    }
};

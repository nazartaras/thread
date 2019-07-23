import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
// import { composeWithDevTools } from 'redux-devtools-extension';

import threadReducer from './containers/Thread/reducer';
import profileReducer from './containers/Profile/reducer';
import editPostReducer from './components/EditPost/reducer';
import editCommentReducer from './components/EditComment/reducer';
import editProfileReducer from './components/EditProfile/reducer';


export const history = createBrowserHistory();

const initialState = {};

const middlewares = [
    thunk,
    routerMiddleware(history)
];

const composedEnhancers = compose(
    applyMiddleware(...middlewares)
);

const reducers = {
    posts: threadReducer,
    profile: profileReducer,
    editPost: editPostReducer,
    editComment: editCommentReducer,
    editProfile: editProfileReducer
};

const rootReducer = combineReducers({
    router: connectRouter(history),
    ...reducers
});

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

export default store;

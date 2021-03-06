import * as authService from 'src/services/authService';
import * as profileService from '../../services/profileService'
import { SET_USER, SET_IS_LOADING, UPDATE_USER } from './actionTypes';

const setToken = token => localStorage.setItem('token', token);

const setUser = user => async dispatch => dispatch({
    type: SET_USER,
    user
});

const setIsLoading = isLoading => async dispatch => dispatch({
    type: SET_IS_LOADING,
    isLoading
});

const updateUserAction = user => ({
    type: UPDATE_USER,
    user
})
const setAuthData = (user = null, token = '') => (dispatch, getRootState) => {
    setToken(token); // token should be set first before user
    setUser(user)(dispatch, getRootState);
};

const handleAuthResponse = authResponsePromise => async (dispatch, getRootState) => {
    const { user, token } = await authResponsePromise;
    setAuthData(user, token)(dispatch, getRootState);
};
export const updateProfile = user => async (dispatch)=>{
    await profileService.updateProfile(user);
    dispatch(updateUserAction(user));
    
}
export const login = request => handleAuthResponse(authService.login(request));

export const registration = request => handleAuthResponse(authService.registration(request));

export const logout = () => setAuthData();

export const loadCurrentUser = () => async (dispatch, getRootState) => {
    setIsLoading(true)(dispatch, getRootState);
    const user = await authService.getCurrentUser();
    setUser(user)(dispatch, getRootState);
    setIsLoading(false)(dispatch, getRootState);
};

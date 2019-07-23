import { SHOW_PAGE, HIDE_PAGE } from "./actionTypes";


export const showPage = (data) => ({
    type: SHOW_PAGE,
    payload: data
});

export const hidePage = () => ({
    type: HIDE_PAGE
});
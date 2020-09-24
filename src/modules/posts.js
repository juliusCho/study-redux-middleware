import * as postsAPI from '../api/posts';
import {
    createPromiseThunk,
    reducerUtils,
    handleAsyncActions,
    createPromiseThunkById,
    handleAsyncActionsById,
    createPromiseSaga,
    createPromiseSagaById
} from "../lib/asyncUtils";
import { takeEvery, getContext } from 'redux-saga/effects';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST'
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';
const GO_TO_HOME = 'GO_TO_HOME';

const initialState = {
    posts: reducerUtils.initial(),
    post: {}
};

// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);
export const getPosts = () => ({type: GET_POSTS});
export const getPost = id => ({type: GET_POST, payload: id, meta: id});

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);

export function* postsSaga() {
    yield takeEvery(GET_POSTS, getPostsSaga);
    yield takeEvery(GET_POST, getPostSaga);
    yield takeEvery(GO_TO_HOME, goToHomeSaga);
}


export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            return handleAsyncActionsById(GET_POST, 'post', true)(state, action);
        default:
            return state;
    }
}

// export const goToHome = () => (dispatch, getState, { history }) => {
//     console.log(dispatch);
//     console.log(getState);
//     console.log(history);
//     history.push('/');
// };

export const goToHome = () => ({type: GO_TO_HOME});

function* goToHomeSaga() {
    const history = yield getContext('history');
    history.push('/');
}
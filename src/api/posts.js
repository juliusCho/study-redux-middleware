import axios from 'axios';

export const getPosts = async () => {
    const response = await axios.get(
        '/posts'
    );
    return response.data;
};

export const getPostById = async id => {
    const response = await axios.get(
        `/posts/${id}`
    );
    return response.data;
};

const sleep = n => new Promise(resolve => setTimeout(resolve, n));

const posts = [
    {
        id: 1,
        title: '리덕스 미들웨어 공부',
        body: '리덕스 공부중임'
    },
    {
        id: 2,
        title: 'redux-thunk 사용',
        body: 'redux-saga도 같이 사용'
    },
    {
        id: 3,
        title: 'bitch behind me is annoying',
        body: 'she seems not had learned a concept of etiquette'
    }
];

// export const getPosts = async () => {
//     await sleep(500);
//     return posts;
// };
//
// export const getPostById = async id => {
//     await sleep(500);
//     return posts.find(post => post.id === id);
// };
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../components/Post";
import { getPost, goToHome } from "../modules/posts";

function PostContainer({ id }) {
    const { post } = useSelector(state => state.posts);
    const { loading, data, error } = post[id] || { loading: false, data: null, error: null };
    const dispatch = useDispatch();

    const fetchData = async () => await dispatch(getPost(id));

    useEffect(() => {
        fetchData();
    }, [id, dispatch]);

    if (loading && !data) return <div>로딩중...</div>;
    if (error) return <div>에러다</div>;
    if (!data) return null;
    return (
        <>
            <button onClick={() => dispatch(goToHome())}>홈으로</button>
            <Post post={data}/>
        </>
    );
}

export default PostContainer;
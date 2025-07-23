import { createSlice } from "@reduxjs/toolkit";

const initialState={
    posts: [],
    comments: {} 
}

const postSlice=createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },

        addPost(state, action) {
            state.posts.push(action.payload);
        },

        delPost(state, action) {
            state.posts = state.posts.filter(post => post.id !== action.payload);
            delete state.comments[action.payload];
        },

        editPost(state, action) {
            state.posts = state.posts.map(post =>
                post.id === action.payload.id ? { ...post, ...action.payload } : post
            ); 
        },

        setComments(state, action) {
            const { postId, comments } = action.payload;
            state.comments[postId] = comments;
        },

        addComment(state, action) {
            const { postId, comment } = action.payload;
            if (!state.comments[postId]) {
                state.comments[postId] = [];
            }
            state.comments[postId].push(comment);
        },

        editComment(state, action) {
            const { postId, commentId, updatedComment } = action.payload;
            if (state.comments[postId]) {
                state.comments[postId] = state.comments[postId].map(comment =>
                    comment.id === commentId ? { ...comment, ...updatedComment } : comment
                );
            }
        },

        deleteComment(state, action) {
            const { postId, commentId } = action.payload;
            if (state.comments[postId]) {
                state.comments[postId] = state.comments[postId].filter(
                    comment => comment.id !== commentId
                );
            }
        }
    }
       
    })

    export const { setPosts, addPost, delPost, editPost, setComments, addComment, editComment, deleteComment } = postSlice.actions;
    export default postSlice.reducer;
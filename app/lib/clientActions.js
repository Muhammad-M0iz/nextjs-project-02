'use client';
import { z } from 'zod';
import { addPost, delPost, editPost, addComment, editComment, deleteComment } from '../../store/postSlice';

const FormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    body: z.string().min(1, 'Body is required'),
});

const UpdateFormSchema = z.object({
    id: z.string().min(1, 'ID is required'),
    title: z.string().min(1, 'Title is required'),
    body: z.string().min(1, 'Body is required'),
});

export function createPostClient(formData, dispatch) {
    const parsedData = FormSchema.safeParse(Object.fromEntries(formData));
    if (!parsedData.success) {
        return {
            errors: parsedData.error.flatten().fieldErrors,
            message: 'Missing or invalid data',
        };
    }

    const { title, body } = parsedData.data;
    const newPost = {
        id: Date.now(), 
        title,
        body,
        userId: 1, 
    };

    dispatch(addPost(newPost));
    
    return {
        success: true,
        message: 'Post created successfully',
        post: newPost
    };
}

export function updatePostClient(formData, dispatch) {
    const parsedData = UpdateFormSchema.safeParse(Object.fromEntries(formData));
    if (!parsedData.success) {
        return {
            errors: parsedData.error.flatten().fieldErrors,
            message: 'Missing or invalid data',
        };
    }

    const { id, title, body } = parsedData.data;
    const updatedPost = {
        id: parseInt(id),
        title,
        body,
    };

    dispatch(editPost(updatedPost));
    
    return {
        success: true,
        message: 'Post updated successfully',
        post: updatedPost
    };
}

export function deletePostClient(postId, dispatch) {
    dispatch(delPost(parseInt(postId)));
    
    return {
        success: true,
        message: 'Post deleted successfully'
    };
}

export function createComment(fromData,dispatch,postId){
    const parsedData = z.object({
        name: z.string().min(1, 'Name is required'),
        body: z.string().min(1, 'Body is required'),
    }).safeParse(Object.fromEntries(fromData));

    if (!parsedData.success) {
        return {
            errors: parsedData.error.flatten().fieldErrors,
            message: 'Missing or invalid data',
        };
    }

    const { name, body } = parsedData.data;
    const newComment = {
        id: Date.now(),
        postId: parseInt(postId),
        name,
        body,
    };

    dispatch(addComment({ postId: parseInt(postId), comment: newComment }));
    
    return {
        success: true,
        message: 'Comment added successfully',
        comment: newComment
    };
}

export function updateCommentClient(formData, dispatch, postId, commentId) {
    const parsedData = z.object({
        name: z.string().min(1, 'Name is required'),
        body: z.string().min(1, 'Body is required'),
    }).safeParse(Object.fromEntries(formData));

    if (!parsedData.success) {
        return {
            errors: parsedData.error.flatten().fieldErrors,
            message: 'Missing or invalid data',
        };
    }

    const { name, body } = parsedData.data;
    const updatedComment = {
        name,
        body,
    };

    dispatch(editComment({ 
        postId: parseInt(postId), 
        commentId: parseInt(commentId), 
        updatedComment 
    }));
    
    return {
        success: true,
        message: 'Comment updated successfully',
        comment: updatedComment
    };
}

export function deleteCommentClient(postId, commentId, dispatch) {
    dispatch(deleteComment({ 
        postId: parseInt(postId), 
        commentId: parseInt(commentId) 
    }));
    
    return {
        success: true,
        message: 'Comment deleted successfully'
    };
}
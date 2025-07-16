'use server';
import {z} from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

const FormSchema=z.object({
    title:z.string().min(1, 'Title is required'),
    body:z.string().min(1, 'Body is required'),
})

const UpdateFormSchema=z.object({
    id:z.string().min(1, 'ID is required'),
    title:z.string().min(1, 'Title is required'),
    body:z.string().min(1, 'Body is required'),
})

export async function createPostAction(prevState,formData) {
    const parsedData=FormSchema.safeParse(Object.fromEntries(formData));
    if(!parsedData.success) {
        return{
            errors:parsedData.error.flatten().fieldErrors,
            message:'Missing or invalid data',
        }
    }

    const {title, body} = parsedData.data;
    const userId = Math.floor(Math.random() * 1000) + 1; 
    console.log('Creating post with data:', {userId, title, body});

    try {
        const res = await fetch(`${process.env.API_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId, title, body}),
        });

        console.log('posted',res);

        if (!res.ok) throw new Error('Failed to create post');

        revalidatePath('/posts');
        redirect('/posts');
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}

export async function updatePostAction(prevState, formData) {
    const parsedData = UpdateFormSchema.safeParse(Object.fromEntries(formData));
    if (!parsedData.success) {
        return {
            errors: parsedData.error.flatten().fieldErrors,
            message: 'Missing or invalid data',
        }
    }

    const { id, title, body } = parsedData.data;
    console.log('Updating post with data:', { id, title, body });

    try {
        const res = await fetch(`${process.env.API_ENDPOINT}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: parseInt(id), title, body, userId: 1 }),
        });

        console.log('updated', res);

        if (!res.ok) throw new Error('Failed to update post');

        revalidatePath('/posts');
        revalidatePath(`/posts/${id}`);
        redirect(`/posts/${id}`);
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

export async function deletePostAction(postId) {
    try {
        const res = await fetch(`${process.env.API_ENDPOINT}/${postId}`, {
            method: 'DELETE',
        });

        if (!res.ok) throw new Error('Failed to delete post');

        revalidatePath('/posts');
        redirect('/posts');
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}


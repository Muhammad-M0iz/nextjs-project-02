'use client';
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePostClient } from "@/app/lib/clientActions";
import AuthGuard from "@/app/components/AuthGuard";
import DeletePostUI from "@/app/ui/DeletePostUI";

export default function DeletePost({ postId }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {        
        if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            setIsLoading(true);
            try {
                const result = deletePostClient(postId, dispatch);
                if (result.success) {
                    router.push('/posts');
                }
            } catch (error) {
                console.error('Delete failed:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <AuthGuard showLoginPrompt={false}>
            <DeletePostUI 
                onDelete={handleDelete}
                isLoading={isLoading}
            />
        </AuthGuard>
    )
}
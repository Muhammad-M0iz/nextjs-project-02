'use client';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updatePostClient } from "@/app/lib/clientActions";
import { withAuthGuard } from "@/app/components/AuthGuard";
import { withPostOwnerGuard } from "@/app/components/PostOwnerGuard";
import { useParams } from "next/navigation";
import EditPostFormUI from "@/app/ui/EditPostFormUI";

function EditPost() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const router = useRouter();
    const posts = useSelector((state) => state.posts.posts);
    const post = posts.find(p => p.id === parseInt(id));
    
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setMessage('');

        const formData = new FormData(e.target);
        const result = updatePostClient(formData, dispatch);

        if (result.errors) {
            setErrors(result.errors);
            setMessage(result.message);
        } else {
            setMessage(result.message);
            setTimeout(() => {
                router.push(`/posts/${id}`);
            }, 1000);
        }
        
        setIsSubmitting(false);
    };

    const handleCancel = () => {
        router.push(`/posts/${id}`);
    };

    return (
        <EditPostFormUI
            post={post}
            onSubmit={handleSubmit}
            errors={errors}
            message={message}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
        />
    );
}

export default withAuthGuard(withPostOwnerGuard(EditPost, {
    unauthorizedFallback: (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
            <div className="text-center max-w-md">
                <div className="w-24 h-24 mx-auto mb-4 text-yellow-500">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
                <p className="text-gray-600 mb-6">You can only edit your own posts.</p>
                <Link 
                    href="/posts"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                    Back to Posts
                </Link>
            </div>
        </div>
    )
}));

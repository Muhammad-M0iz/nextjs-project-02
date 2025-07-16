'use client';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updatePostClient } from "@/app/lib/clientActions";
import { withAuthGuard, useAuth } from "@/app/components/AuthGuard";
import { useParams } from "next/navigation";
import EditPostFormUI from "@/app/ui/EditPostFormUI";

function EditPost() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, isLoading: authLoading } = useAuth();
    const posts = useSelector((state) => state.posts.posts);
    const post = posts.find(p => p.id === parseInt(id));
    
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            setIsLoading(false);
        }
    }, [authLoading]);

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


    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading post...</p>
                </div>
            </div>
        );
    }

    // Post not found
    if (!post) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 mx-auto mb-4 text-red-500">
                        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
                    <p className="text-gray-600 mb-6">The post you&apos;re trying to edit doesn&apos;t exist.</p>
                    <Link 
                        href="/posts"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                        Back to Posts
                    </Link>
                </div>
            </div>
        );
    }

    // Check if user owns the post
    if (!user || post.userId !== user.id) {
        return (
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
        );
    }

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

export default withAuthGuard(EditPost);

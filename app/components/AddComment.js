'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '@/app/lib/clientActions';
import AuthGuard from '@/app/components/AuthGuard';

export default function AddComment({ postId , user}) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setMessage('');

        const formData = new FormData(e.target);
        const result = createComment(formData, dispatch, postId,user);
        console.log(result)

        if (result.errors) {
            setErrors(result.errors);
            setMessage(result.message);
        } else {
            setMessage(result.message);
            // Clear form
            e.target.reset();
            setTimeout(() => setMessage(''), 3000);
        }
        
        setIsSubmitting(false);
    };

    return (
        <AuthGuard 
            showLoginPrompt={true}
            fallback={
                <div className="text-center p-4 bg-gray-50 rounded-lg border mt-4">
                    <p className="text-gray-600 mb-2">Sign in to add a comment</p>
                </div>
            }
        >
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your name"
                        />
                        {errors?.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                            Comment
                        </label>
                        <textarea
                            id="body"
                            name="body"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Write your comment"
                            rows="3"
                        ></textarea>
                        {errors?.body && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.body}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-4 py-2 rounded transition-colors ${
                            isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Comment'}
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 ${errors.name || errors.body ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
            </div>
        </AuthGuard>
    );
}

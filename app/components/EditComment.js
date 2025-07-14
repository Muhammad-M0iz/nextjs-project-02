'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCommentClient } from '@/app/lib/clientActions';

export default function EditComment({ comment, postId, onCancel }) {
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
        const result = updateCommentClient(formData, dispatch, postId, comment.id);

        if (result.errors) {
            setErrors(result.errors);
            setMessage(result.message);
        } else {
            setMessage(result.message);
            setTimeout(() => {
                onCancel(); 
            }, 1000);
        }
        
        setIsSubmitting(false);
    };

    return (
        <div className="mt-2 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-md font-semibold mb-3">Edit Comment</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        defaultValue={comment.name}
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
                        defaultValue={comment.body}
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
                <div className="flex space-x-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                            isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                    >
                        {isSubmitting ? 'Updating...' : 'Update'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-3 py-1 rounded text-sm bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            {message && (
                <p className={`mt-2 text-sm ${errors.name || errors.body ? 'text-red-500' : 'text-green-500'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentClient } from '@/app/lib/clientActions';
import { useAuth } from '@/app/hooks';
import EditComment from '@/app/components/EditComment';

export default function CommentItem({ comment, postId }) {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    
    const canEditComment = user && comment && user.id === comment.userId;

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this comment?')) {
            deleteCommentClient(postId, comment.id, dispatch);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    return (
        <li className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                            {(comment.name || 'U').charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-semibold text-gray-900">
                                {comment.name || 'Anonymous'}
                            </h4>
                        </div>
                        {isAuthenticated && canEditComment && !isEditing && (
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleEdit}
                                    className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {!isEditing ? (
                        <p className="text-gray-700 leading-relaxed">{comment.body}</p>
                    ) : (
                        <EditComment 
                            comment={comment} 
                            postId={postId} 
                            onCancel={handleCancelEdit} 
                        />
                    )}
                </div>
            </div>
        </li>
    );
}

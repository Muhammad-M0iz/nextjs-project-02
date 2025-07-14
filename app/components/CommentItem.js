'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentClient } from '@/app/lib/clientActions';
import { useAuth } from '@/app/components/AuthGuard';
import EditComment from '@/app/components/EditComment';

export default function CommentItem({ comment, postId }) {
    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

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
        <li className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{comment.name}</h4>
                {isAuthenticated && !isEditing && (
                    <div className="flex space-x-2">
                        <button
                            onClick={handleEdit}
                            className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-red-500 hover:text-red-700 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            
            {!isEditing ? (
                <p className="text-gray-700">{comment.body}</p>
            ) : (
                <EditComment 
                    comment={comment} 
                    postId={postId} 
                    onCancel={handleCancelEdit} 
                />
            )}
        </li>
    );
}

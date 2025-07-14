'use client';
import { useAuth } from './AuthGuard';

/**
 * Debug component to show current user info and post ownership
 * Remove this in production
 */
export function OwnershipDebug({ post }) {
    const { user, isAuthenticated } = useAuth();
    console.log(user, post);
    
    if (!isAuthenticated) return null;
    
    return (
        <div className="bg-gray-100 p-4 rounded-lg text-xs text-gray-600 mb-4">
            <h4 className="font-bold mb-2">Debug Info (Remove in Production):</h4>
            <p>Current User ID: {user?.id} (type: {typeof user?.id})</p>
            <p>Post User ID: {post?.userId} (type: {typeof post?.userId})</p>
            <p>IDs Match: {user?.id === post?.userId ? 'Yes' : 'No'}</p>
            <p>IDs Match (with parseInt): {user?.id === parseInt(post?.userId) ? 'Yes' : 'No'}</p>
        </div>
    );
}

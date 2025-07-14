'use client';
import { useAuth } from './AuthGuard';

/**
 * Hook to check if the current authenticated user owns a specific post
 * @param {Object} post - The post object containing userId
 * @returns {Object} - Object containing isOwner boolean and user info
 */
export function usePostOwnership(post) {
    const { isAuthenticated, user } = useAuth();
    
    // Check if user is authenticated and if their ID matches the post's userId
    const isOwner = isAuthenticated && user && post && (user.id === post.userId || user.id === parseInt(post.userId));
    
    return {
        isOwner,
        isAuthenticated,
        user,
        canEdit: isOwner,
        canDelete: isOwner
    };
}

/**
 * Component that renders children only if the current user owns the post
 * @param {Object} props - Component props
 * @param {Object} props.post - The post object
 * @param {ReactNode} props.children - Children to render if user owns the post
 * @param {ReactNode} props.fallback - Fallback to render if user doesn't own the post
 */
export function PostOwnerGuard({ post, children, fallback = null }) {
    const { isOwner } = usePostOwnership(post);
    
    return isOwner ? children : fallback;
}

/**
 * Higher-order component for protecting post-specific actions
 * @param {Component} Component - Component to protect
 * @param {Object} options - Options for protection
 */
export function withPostOwnerGuard(Component, options = {}) {
    return function ProtectedPostComponent(props) {
        const { post } = props;
        const { isOwner, isAuthenticated } = usePostOwnership(post);
        
        if (!isAuthenticated) {
            return options.unauthenticatedFallback || (
                <div className="text-center p-4 bg-gray-50 rounded-lg border">
                    <p className="text-gray-600">You must be logged in to perform this action.</p>
                </div>
            );
        }
        
        if (!isOwner) {
            return options.unauthorizedFallback || (
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-yellow-700">You can only edit or delete your own posts.</p>
                </div>
            );
        }
        
        return <Component {...props} />;
    };
}

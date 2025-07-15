import Link from "next/link";
import { 
    ArrowLeft, 
    User, 
    Edit, 
    Trash2, 
    MessageCircle, 
    Loader2, 
    AlertCircle, 
    CheckCircle 
} from "lucide-react";
import { OwnershipDebug } from "@/app/components/OwnershipDebug";
import CommentItem from "@/app/components/CommentItem";

export default function PostDetailUI({
    post,
    comments,
    onEditClick,
    onDeleteClick,
    showEditDelete = false,
    canEditPost = false, 
    isCommentsLoading = false,
    commentsError = null,
    children 
}) {
    if (!post) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
                        <MessageCircle className="w-full h-full" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
                    <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
                    <Link href="/posts" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Posts
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Back Button */}
                <div className="mb-6">
                    <Link href="/posts" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Posts
                    </Link>
                </div>

                {/* Debug Info - Remove in production */}

                {/* Main Post Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
                    {/* Post Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-white mb-2 leading-tight">
                                    {post.title}
                                </h1>
                                <div className="flex items-center text-blue-100">
                                    <User className="h-4 w-4 mr-2" />
                                    <span className="text-sm">Author: {post.userId}</span>
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            {showEditDelete && canEditPost && (
                                <div className="flex space-x-3">
                                    <button
                                        onClick={onEditClick}
                                        className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-black font-medium rounded-lg transition-all duration-200 backdrop-blur-sm hover:scale-105 cursor-pointer"
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={onDeleteClick}
                                        className="inline-flex items-center px-4 py-2 bg-red-500 bg-opacity-90 hover:bg-opacity-100 text-white font-medium rounded-lg transition-all duration-200 cursor-pointer"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="px-8 py-6">
                        <div className="prose max-w-none">
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                                {post.body}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    {/* Comments Header */}
                    <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                <MessageCircle className="h-6 w-6 mr-3 text-blue-600" />
                                Comments
                            </h2>
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                {comments?.length || 0} {comments?.length === 1 ? 'comment' : 'comments'}
                            </span>
                        </div>
                    </div>

                    {/* Comments Content */}
                    <div className="px-8 py-6">
                        {isCommentsLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
                                    <p className="text-gray-600">Loading comments...</p>
                                </div>
                            </div>
                        ) : commentsError ? (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <div className="flex items-center">
                                    <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                                    <p className="text-red-700 font-medium">
                                        Error loading comments: {commentsError.message}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Comments List */}
                                {comments && comments.length > 0 ? (
                                    <ul className="space-y-4 mb-8">
                                        {comments.map((comment) => (
                                            <CommentItem 
                                                key={comment.id} 
                                                comment={comment} 
                                                postId={post.id} 
                                            />
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                                            <MessageCircle className="w-full h-full" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
                                        <p className="text-gray-600">Be the first to share your thoughts!</p>
                                    </div>
                                )}

                                {/* Add Comment Section */}
                                {children}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

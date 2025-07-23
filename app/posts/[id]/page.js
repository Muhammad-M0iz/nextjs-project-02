'use client';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchPostById, fetchCommentsByPostId } from '@/app/lib/data';
import { setComments } from '../../../store/postSlice';
import { deletePostClient } from '@/app/lib/clientActions';
import { useAuth } from '@/app/hooks';
import PostDetailUI from '@/app/ui/PostDetailUI';
import AddComment from '@/app/components/AddComment';
import { Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function Post() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated,user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const posts = useSelector((state) => state.posts.posts);
  const comments = useSelector((state) => state.posts.comments[id] || []);
  
  const postFromStore = posts.find(p => p.id === parseInt(id));

  const {
    data: fetchedPost,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    enabled: !!id && !postFromStore,
  });

  const post = postFromStore || fetchedPost;

  const canEditPost = isAuthenticated && user && post && post.userId === user.id;
  const {
    data: fetchedComments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    error: commentsError,
  } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => fetchCommentsByPostId(id),
    enabled: !!id && comments.length === 0,
  });

  useEffect(() => {
    if (fetchedComments && comments.length === 0) {
      dispatch(setComments({ postId: id, comments: fetchedComments }));
    }
  }, [fetchedComments, dispatch, id, comments.length]);

  const displayComments = comments.length > 0 ? comments : fetchedComments || [];

  const handleEditClick = () => {
    router.push(`/posts/edit/${id}`);
  };

  const handleDeleteClick = async () => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        const result = deletePostClient(id, dispatch);
        if (result.success) {
          router.push('/posts');
        }
      } catch (error) {
        console.error('Delete failed:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (isLoading && !postFromStore) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  if (isError && !postFromStore) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 text-red-400">
            <AlertTriangle className="w-24 h-24" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Post</h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button 
            onClick={() => router.push('/posts')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <PostDetailUI
      post={post}
      comments={displayComments}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
      showEditDelete={isAuthenticated}
      canEditPost={canEditPost}
      isCommentsLoading={isCommentsLoading && comments.length === 0}
      commentsError={isCommentsError ? commentsError : null}
    >
      {/* Add Comment Component */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add a Comment</h3>
        <AddComment postId={id} user={user}/>
      </div>
    </PostDetailUI>
  );
}

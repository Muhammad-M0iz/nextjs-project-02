'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../../store/postSlice';
import { fetchPosts } from "@/app/lib/data";
import CreateNewPostButton from "@/app/components/CreateNewPostButton";
import UserStatus from "@/app/components/UserStatus";
import Post from '@/app/ui/Post';
import { FileText } from 'lucide-react';

export default function Posts() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();
                dispatch(setPosts(fetchedPosts));
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        if (posts.length === 0) {
            loadPosts();
        }
    }, [dispatch, posts.length]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto p-6 max-w-7xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Posts</h1>
                        <p className="text-gray-600">Discover and share amazing content</p>
                    </div>
                    <UserStatus />
                </div>

                <div className="mb-8">
                    <CreateNewPostButton />
                </div>

                {posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <FileText className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h3>
                        <p className="text-gray-500 text-center max-w-md">
                            Be the first to share something amazing! Create your first post to get started.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <div key={post.id} className="h-full">
                                <Post title={post.title} body={post.body} id={post.id} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
'use client';
import Link from "next/link";
import AuthGuard from "@/app/components/AuthGuard";
import { Plus, LogIn, UserPlus } from 'lucide-react';

export default function CreateNewPostButton() {
    return (
        <AuthGuard 
            showLoginPrompt={true}
            fallback={
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-8 text-center shadow-sm">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Share?</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Join our community and start sharing your thoughts with the world!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link 
                            href="/signin" 
                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            <LogIn className="h-4 w-4 mr-2" />
                            Sign In
                        </Link>
                        <Link 
                            href="/signup" 
                            className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-300 transition-all duration-200 transform hover:scale-105 shadow-sm"
                        >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Sign Up
                        </Link>
                    </div>
                </div>
            }
        >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1">
                <Link 
                    href="/posts/create"
                    className="flex items-center justify-center w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 group"
                >
                    <Plus className="h-5 w-5 mr-3 text-blue-600 group-hover:rotate-90 transition-transform duration-200" />
                    <span className="text-lg">Create New Post</span>
                </Link>
            </div>
        </AuthGuard>
    );
}

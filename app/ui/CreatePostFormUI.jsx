import Link from "next/link";
import { Plus, ArrowLeft, Type, FileText, Loader2, CheckCircle, AlertCircle, Save } from "lucide-react";

export default function CreatePostFormUI({
    onSubmit,
    errors = {},
    message = '',
    isSubmitting = false,
    onCancel
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Back Navigation */}
                <div className="mb-6">
                    <button 
                        onClick={onCancel || (() => window.history.back())}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Posts
                    </button>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                        <h1 className="text-3xl font-bold text-white flex items-center">
                            <Plus className="h-8 w-8 mr-3" />
                            Create New Post
                        </h1>
                        <p className="text-blue-100 mt-2">Share your thoughts with the community</p>
                    </div>

                    {/* Form Content */}
                    <div className="px-8 py-6">
                        <form onSubmit={onSubmit} className="space-y-6">
                            {/* Title Field */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Post Title
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Type className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                                            errors.title 
                                                ? 'border-red-300 bg-red-50' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        placeholder="Enter an engaging title for your post..."
                                    />
                                </div>
                                {errors.title && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Body Field */}
                            <div>
                                <label htmlFor="body" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Post Content
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <FileText className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        id="body"
                                        name="body"
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-vertical ${
                                            errors.body 
                                                ? 'border-red-300 bg-red-50' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        placeholder="Share your thoughts, ideas, or story..."
                                        rows="8"
                                    />
                                </div>
                                {errors.body && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.body}
                                    </p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`flex-1 flex justify-center items-center py-3 px-6 border border-transparent rounded-xl text-sm font-semibold text-white transition-all duration-200 ${
                                        isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                            Creating Post...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5 mr-2" />
                                            Create Post
                                        </>
                                    )}
                                </button>
                                
                                <Link
                                    href="/posts"
                                    className="flex-1 flex justify-center items-center py-3 px-6 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 transform hover:scale-105"
                                >
                                    <ArrowLeft className="h-5 w-5 mr-2" />
                                    Cancel
                                </Link>
                            </div>

                            {/* Status Message */}
                            {message && (
                                <div className={`rounded-xl p-4 border ${
                                    errors.title || errors.body 
                                        ? 'bg-red-50 border-red-200' 
                                        : 'bg-green-50 border-green-200'
                                }`}>
                                    <div className="flex items-center">
                                        {errors.title || errors.body ? (
                                            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                                        ) : (
                                            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                                        )}
                                        <p className={`text-sm font-medium ${
                                            errors.title || errors.body ? 'text-red-700' : 'text-green-700'
                                        }`}>
                                            {message}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Writing Tips */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Writing Tips</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                        <div className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Make your title clear and engaging</span>
                        </div>
                        <div className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Break up long paragraphs for readability</span>
                        </div>
                        <div className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Share your unique perspective</span>
                        </div>
                        <div className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Engage with your audience</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

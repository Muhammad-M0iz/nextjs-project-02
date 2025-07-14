import { Loader2, Trash2 } from 'lucide-react';

export default function DeletePostUI({ 
    onDelete, 
    isLoading = false, 
    isVisible = true 
}) {
    if (!isVisible) return null;

    return (
        <button
            onClick={onDelete}
            disabled={isLoading}
            className={`group inline-flex items-center px-4 py-2 font-medium rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white hover:scale-105'
            }`}
        >
            {isLoading ? (
                <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    Deleting...
                </>
            ) : (
                <>
                    <Trash2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Delete Post
                </>
            )}
        </button>
    );
}

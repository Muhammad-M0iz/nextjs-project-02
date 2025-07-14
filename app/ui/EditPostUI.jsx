import { Edit } from 'lucide-react';

export default function EditPostUI({ 
    postId, 
    onClick,
    isVisible = true 
}) {
    if (!isVisible) return null;

    return (
        <button 
            onClick={onClick}
            className="group inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            <Edit className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
            Edit Post
        </button>
    );
}

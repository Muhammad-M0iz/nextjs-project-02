'use client';
import { useRouter } from "next/navigation";
import AuthGuard from "@/app/components/AuthGuard";
import EditPostUI from "@/app/ui/EditPostUI";

export default function EditPost({ postId }) {
    const router = useRouter();

    const handleEditClick = () => {
        router.push(`/posts/edit/${postId}`);
    };

    return (
        <AuthGuard showLoginPrompt={false}>
            <EditPostUI 
                postId={postId} 
                onClick={handleEditClick}
            />
        </AuthGuard>
    );
}

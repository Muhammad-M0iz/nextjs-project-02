'use client';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { updatePostClient } from "@/app/lib/clientActions";
import { withAuthGuard } from "@/app/components/AuthGuard";
import { useParams } from "next/navigation";
import EditPostFormUI from "@/app/ui/EditPostFormUI";

function EditPost() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const router = useRouter();
    const posts = useSelector((state) => state.posts.posts);
    const post = posts.find(p => p.id === parseInt(id));
    
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setMessage('');

        const formData = new FormData(e.target);
        const result = updatePostClient(formData, dispatch);

        if (result.errors) {
            setErrors(result.errors);
            setMessage(result.message);
        } else {
            setMessage(result.message);
            setTimeout(() => {
                router.push(`/posts/${id}`);
            }, 1000);
        }
        
        setIsSubmitting(false);
    };

    const handleCancel = () => {
        router.push(`/posts/${id}`);
    };

    return (
        <EditPostFormUI
            post={post}
            onSubmit={handleSubmit}
            errors={errors}
            message={message}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
        />
    );
}

export default withAuthGuard(EditPost);

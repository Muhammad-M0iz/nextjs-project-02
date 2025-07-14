'use client';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createPostClient } from "@/app/lib/clientActions";
import { withAuthGuard, useAuth } from "@/app/components/AuthGuard";
import CreatePostFormUI from "@/app/ui/CreatePostFormUI";

function CreatePost() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useAuth();
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setMessage('');

        const formData = new FormData(e.target);
        const result = createPostClient(formData, dispatch, user);

        if (result.errors) {
            setErrors(result.errors);
            setMessage(result.message);
        } else {
            setMessage(result.message);
            setTimeout(() => {
                router.push('/posts');
            }, 1500);
        }
        
        setIsSubmitting(false);
    }; 

    const handleCancel = () => {
        router.push('/posts');
    };

    return (
        <CreatePostFormUI
            onSubmit={handleSubmit}
            errors={errors}
            message={message}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
        />
    );
}

export default withAuthGuard(CreatePost);

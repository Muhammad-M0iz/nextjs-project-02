'use client';
import { useFormik } from "formik";
import { z } from "zod";
import { signinClient } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SignInUI from "@/app/ui/signin";

const initialValue = {
    email: '',
    password: ''
}

const validationSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
});

export default function SignIn() {
    const router = useRouter();
    const [submitStatus, setSubmitStatus] = useState(null);

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValue,
        validate: (values) => {
            try {
                validationSchema.parse(values);
                return {};
            } catch (error) {
                if (error instanceof z.ZodError) {
                    return error.flatten().fieldErrors;
                }
                return {};
            }
        },
        onSubmit: async (values) => {
            setSubmitStatus('loading');
            try {
                const result = await signinClient(values);
                
                if (result.success) {
                    setSubmitStatus('success');
                    setTimeout(() => {
                        router.push('/posts');
                    }, 1500);
                } else {
                    setSubmitStatus('error');
                    console.error('Signin errors:', result.errors);
                }
            } catch (error) {
                setSubmitStatus('error');
                console.error('Signin failed:', error);
            }
        }
    });

    return (
        <SignInUI 
            values={values}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            touched={touched}
            submitStatus={submitStatus}
        />
    );
}

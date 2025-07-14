'use client';
import { useFormik } from "formik";
import { z } from "zod";
import { signupClient } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SignUpUI from "@/app/ui/signup";

const initialValue={
    name:'',
    email:'',
    password:'',
    confirm_password:''
}

const validationSchema = z.object({
    name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
    confirm_password: z.string().min(1, 'Confirm password is required')
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
});

export default function SignUp(){
    const router = useRouter();
    const [submitStatus, setSubmitStatus] = useState(null);

    const {values,errors, handleBlur, handleChange, handleSubmit , touched }=useFormik({
        initialValues:initialValue,
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
                const result = await signupClient(values);
                
                if (result.success) {
                    setSubmitStatus('success');
                    setTimeout(() => {
                        router.push('/posts');
                    }, 1500);
                } else {
                    setSubmitStatus('error');
                    console.error('Signup errors:', result.errors);
                }
            } catch (error) {
                setSubmitStatus('error');
                console.error('Signup failed:', error);
            }
        }
    })    

    return(
        <SignUpUI 
            values={values}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            touched={touched}
            submitStatus={submitStatus}
        />
    )
}
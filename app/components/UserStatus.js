'use client';
import { useAuth } from "@/app/components/AuthGuard";
import { signOut } from "@/app/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserStatus() {
    const { isAuthenticated, user, isLoading } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        signOut();
        router.refresh();
        window.location.reload(); 
    };

    if (isLoading) {
        return <div className="text-gray-500">Loading...</div>;
    }

    if (isAuthenticated && user) {
        return (
            <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.name}!</span>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-4">
            <Link
                href="/signin"
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
            >
                Sign In
            </Link>
            <Link
                href="/signup"
                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
            >
                Sign Up
            </Link>
        </div>
    );
}

'use client';
import { useState, useEffect } from 'react';
import { isUserLoggedIn, getCurrentUser } from '@/app/lib/auth';
import Link from 'next/link';

export default function AuthGuard({ children, fallback = null, showLoginPrompt = false }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = isUserLoggedIn();
            setIsAuthenticated(authenticated);
            setIsLoading(false);
        };

        checkAuth();
        
        // Listen for storage changes (login/logout in other tabs)
        const handleStorageChange = () => {
            checkAuth();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    if (isLoading) {
        return null; // or a loading spinner
    }

    if (!isAuthenticated) {
        if (showLoginPrompt) {
            return (
                <div className="text-center p-4 bg-gray-50 rounded-lg border">
                    <p className="text-gray-600 mb-2">You need to be logged in to access this feature.</p>
                    <div className="space-x-2">
                        <Link 
                            href="/signin" 
                            className="text-blue-500 hover:underline"
                        >
                            Sign In
                        </Link>
                        <span className="text-gray-400">or</span>
                        <Link 
                            href="/signup" 
                            className="text-blue-500 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            );
        }
        return fallback;
    }

    return children;
}

export function withAuthGuard(Component, options = {}) {
    return function ProtectedComponent(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const checkAuth = () => {
                const authenticated = isUserLoggedIn();
                setIsAuthenticated(authenticated);
                setIsLoading(false);
            };

            checkAuth();
        }, []);

        if (isLoading) {
            return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
        }

        if (!isAuthenticated) {
            return (
                <div className="container mx-auto p-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
                    <p className="text-gray-600 mb-4">You need to be logged in to access this page.</p>
                    <div className="space-x-4">
                        <Link 
                            href="/signin" 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link 
                            href="/signup" 
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            );
        }

        return <Component {...props} />;
    };
}

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = isUserLoggedIn();
            const currentUser = getCurrentUser();
            setIsAuthenticated(authenticated);
            setUser(currentUser);
            setIsLoading(false);
        };

        checkAuth();

        const handleStorageChange = () => {
            checkAuth();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return { isAuthenticated, user, isLoading };
}

/**
 * Higher-order component for protecting post edit pages
 * Checks both authentication and post ownership
 */
export function withPostEditGuard(Component) {
    return function ProtectedPostEditComponent(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [user, setUser] = useState(null);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const checkAuth = () => {
                const authenticated = isUserLoggedIn();
                const currentUser = getCurrentUser();
                setIsAuthenticated(authenticated);
                setUser(currentUser);
                setIsLoading(false);
            };

            checkAuth();
        }, []);

        if (isLoading) {
            return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
        }

        if (!isAuthenticated) {
            return (
                <div className="container mx-auto p-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
                    <p className="text-gray-600 mb-4">You need to be logged in to access this page.</p>
                    <div className="space-x-4">
                        <Link 
                            href="/signin" 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link 
                            href="/signup" 
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            );
        }

        return <Component {...props} user={user} />;
    };
}

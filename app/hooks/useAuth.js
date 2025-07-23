'use client';
import { useState, useEffect } from 'react';
import { isUserLoggedIn, getCurrentUser } from '@/app/lib/auth';

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

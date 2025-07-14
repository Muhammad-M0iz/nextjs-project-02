'use client';
import bcrypt from 'bcryptjs';

// Client-side authentication utilities
export async function signupClient(data) {
    const { name, email, password } = data;
    //generate a random number for user ID
    const userId = Math.floor(Math.random() * 1000000).toString();
    
    try {
        // Hash the password on client side
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = {
            userId,
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };
        
        // Store in localStorage
        localStorage.setItem(`user_${email}`, JSON.stringify(user));
        
        // Also keep track of all users
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        existingUsers.push({ email, name });
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
        return {
            success: true,
            message: 'User signed up successfully',
            user: { name, email }
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: 'Failed to sign up user',
            errors: { general: error.message }
        };
    }
}

export async function signinClient(data) {
    const { email, password } = data;
    
    try {
        // Get user from localStorage
        const storedUser = localStorage.getItem(`user_${email}`);
        
        if (!storedUser) {
            return {
                success: false,
                message: 'User not found',
                errors: { email: 'No account found with this email' }
            };
        }
        
        const user = JSON.parse(storedUser);
        
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid password',
                errors: { password: 'Incorrect password' }
            };
        }
        
        // Store current session
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.userId,
            name: user.name,
            email: user.email,
            loginTime: new Date().toISOString()
        }));
        
        return {
            success: true,
            message: 'User signed in successfully',
            user: { name: user.name, email: user.email }
        };
    } catch (error) {
        console.error('Signin error:', error);
        return {
            success: false,
            message: 'Failed to sign in',
            errors: { general: error.message }
        };
    }
}

export function getCurrentUser() {
    if (typeof window === 'undefined') return null;
    
    try {
        const currentUser = localStorage.getItem('currentUser');
        return currentUser ? JSON.parse(currentUser) : null;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

export function signOut() {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('currentUser');
}

export function isUserLoggedIn() {
    return getCurrentUser() !== null;
}

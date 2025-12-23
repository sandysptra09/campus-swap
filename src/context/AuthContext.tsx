'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type User = {
    id: string;
    fullname: string;
    email: string;
    studentId: string;
    role: 'ADMIN' | 'USER';
    points: number;
    major?: string | null;
    contact?: string | null;
    avatarUrl?: string | null;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    updateUser: (payload: Partial<User>) => void;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const pathname = usePathname();
    const router = useRouter();

    async function fetchMe() {
        try {
            const res = await fetch('/api/protected/me', {
                credentials: 'include',
            });

            if (res.status === 401) {
                setUser(null);
                return;
            }

            if (!res.ok) {
                throw new Error('Failed to fetch user');
            }

            const data = await res.json();
            setUser(data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    function updateUser(payload: Partial<User>) {
        setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, ...payload };
        });
    }

    async function logout() {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
        router.replace('/login');
    }

    useEffect(() => {
        if (
            pathname.startsWith('/login') ||
            pathname.startsWith('/register')
        ) {
            setLoading(false);
            return;
        }

        fetchMe();
    }, [pathname]);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                logout,
                updateUser,
                refreshUser: fetchMe,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
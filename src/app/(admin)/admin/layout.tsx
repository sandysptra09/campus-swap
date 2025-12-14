'use client';

import { useAuth } from '@/context/AuthContext';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.replace('/login');
            } else if (user.role !== 'ADMIN') {
                router.replace('/unauthorized');
            }
        }
    }, [user, loading, router]);

    if (loading) return <p>Loading...</p>;
    if (!user || user.role !== 'ADMIN') return null;

    return (
        <>
            {children}
        </>
    )
}

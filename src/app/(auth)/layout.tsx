'use client';

import React, { useEffect } from 'react'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import CampusSwapLogo from '@/components/customs/logo/campus-swap-logo'
import CampusSwapBanner from '@/components/customs/banners/campus-swap-banner'
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            if (user.role === 'ADMIN') {
                router.replace('/admin');
            } else {
                router.replace('/user/dashboard');
            }
        }
    }, [user, loading, router]);

    if (loading) return <p>Loading...</p>;
    if (user) return null;

    return (
        <div className='grid min-h-svh lg:grid-cols-2'>
            <div className='flex flex-col gap-4 p-6 md:p-10'>
                <div className='flex justify-center gap-2 md:justify-start'>
                    <CampusSwapLogo size={50} />
                </div>
                <div className='flex flex-1 items-center justify-center'>
                    <div className='w-full max-w-xs'>
                        {children}
                    </div>
                </div>
            </div>
            <div className=' relative hidden lg:block'>
                <CampusSwapBanner size={400} />
            </div>
        </div>
    )
}

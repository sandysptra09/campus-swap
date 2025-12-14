'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';

export default function UnauthorizedPage() {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center text-center px-4'>
            <h1 className='text-3xl font-bold text-red-600'>
                403 - Unauthorized
            </h1>
            <p className='mt-4 text-gray-600'>
                You don’t have permission to access this page.
            </p>
            <Button
                as={Link}
                href='/'
                className='mt-4 bg-black text-white'
            >
                Return to Home
            </Button>
        </div>
    );
}

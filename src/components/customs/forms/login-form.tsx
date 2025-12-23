'use client';

import React, { useState } from 'react'

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TextFieldInput from '../inputs/text-field-input';
import PasswordFieldInput from '../inputs/password-field-input';
import { Button, Form } from '@heroui/react';
import { addToast } from '@heroui/react';

export default function LoginForm() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        const email = formData.get('email');
        const password = formData.get('password');

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const data = await res.json();
            setError(data.message ?? 'Login failed');
            addToast({
                title: 'Login Failed',
                description: data.message ?? 'Login failed',
                color: 'danger'
            })
            setLoading(false);
            return;
        }

        const user = await res.json();

        addToast({
            title: 'Welcome Back!',
            description: `Successfully logged in as ${user.fullname || 'User'}.`,
            color: 'success',
        });

        if (user.role === 'ADMIN') {
            router.replace('/admin');
        } else {
            router.replace('/user/dashboard');
        }
    }

    return (
        <Form onSubmit={handleLogin} className='w-full flex flex-col gap-6'>
            <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-3xl md:text-2xl font-bold text-primary'>Login Your Account</h1>
                <p className='text-muted-foreground text-sm font-medium max-w-sm'>
                    Enter your university email and password to access your account.
                </p>
            </div>
            <div className='w-full grid gap-6'>
                <TextFieldInput
                    name='email'
                    label='University Email'
                    placeholder='Enter your university email'
                    type='email'
                    required
                />
                <PasswordFieldInput
                    name='password'
                    label='Password'
                    placeholder='Enter your password'
                    type='password'
                    required
                />
                <p className='text-center text-sm text-muted-foreground'>
                    Forgot Password?{' '}
                    <Link
                        href='/login/forgot-password'
                        className='text-primary font-medium hover:underline transition-colors'
                    >
                        Click Here
                    </Link>
                </p>
                <Button
                    type='submit'
                    isLoading={loading}
                    className='w-full bg-primary text-primary-foreground font-semibold text-sm py-3 hover:opacity-90 transition-all'
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </div>
            <p className='mx-auto text-sm text-muted-foreground'>
                Don’t have an account?{' '}
                <Link href='/register' className='text-primary font-medium hover:underline transition-colors'>
                    Sign up
                </Link>
            </p>
        </Form>
    )
}

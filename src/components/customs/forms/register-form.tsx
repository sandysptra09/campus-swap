'use client';

import React, { useState } from 'react'

import Link from 'next/link';
import TextFieldInput from '../inputs/text-field-input';
import NumberFieldInput from '../inputs/number-field-input';
import PasswordFieldInput from '../inputs/password-field-input';
import { Button, Form, addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function RegisterForm() {

    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        const payload = {
            fullname: formData.get('fullname'),
            studentId: formData.get('studentId'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Register failed');
            }

            addToast({
                title: "Registration Successful",
                description: "Your account has been created. Redirecting...",
                color: "success",
            });

            router.replace('/user/dashboard');

        } catch (err: any) {
            setError(err.message);
            addToast({
                title: "Error",
                description: err.message,
                color: "danger"
            });
        } finally {
            setLoading(false);
        }
    }

    if (user) {
        router.replace('/user/dashboard');
        return null;
    }

    return (
        <Form onSubmit={handleRegister} className='w-full flex flex-col gap-6'>
            <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-3xl md:text-2xl font-bold text-primary'>Register Your Account</h1>
                <p className='text-muted-foreground text-sm font-medium max-w-sm'>
                    Use your student ID number and official university email address to create an account.
                </p>
            </div>
            <div className='w-full grid gap-5'>
                <TextFieldInput
                    name='fullname'
                    label='Full Name'
                    placeholder='Enter your full name'
                    type='text'
                    required
                />
                <NumberFieldInput
                    name='studentId'
                    label='Student ID Number'
                    placeholder='Enter your student ID number'
                    required
                />
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

                {error && (
                    <p className='text-sm text-danger text-center'>{error}</p>
                )}

                <Button
                    type='submit'
                    isLoading={loading}
                    className='w-full bg-primary text-primary-foreground font-semibold text-sm py-3 hover:opacity-90 transition-all'
                >
                    {loading ? 'Registering...' : 'Create Account'}
                </Button>
            </div>
            <p className='mx-auto text-sm text-muted-foreground'>
                Already have an account?{' '}
                <Link href='/login' className='text-primary font-medium hover:underline transition-colors'>
                    Sign in
                </Link>
            </p>
        </Form>
    )
}

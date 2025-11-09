'use client';

import React from 'react'

import Link from 'next/link';
import TextFieldInput from '../inputs/text-field-input';
import PasswordFieldInput from '../inputs/password-field-input';
import { Button, Form } from '@heroui/react';

export default function LoginForm() {
    return (
        <Form className='w-full flex flex-col gap-6'>
            <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className="text-3xl md:text-2xl font-bold text-primary">Login Your Account</h1>
                <p className="text-muted-foreground text-sm font-medium max-w-sm">
                    Enter your university email and password to access your account.
                </p>
            </div>
            <div className='w-full grid gap-6'>
                <TextFieldInput
                    name='university_email'
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
                <p className="text-center text-sm text-muted-foreground">
                    Forgot Password?{' '}
                    <Link
                        href="/login/forgot-password"
                        className="text-primary font-medium hover:underline transition-colors"
                    >
                        Click Here
                    </Link>
                </p>
                <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-semibold text-sm py-3 hover:opacity-90 transition-all"
                >
                    Sign In
                </Button>
            </div>
            <p className="mx-auto text-sm text-muted-foreground">
                Don’t have an account?{' '}
                <Link href="/register" className="text-primary font-medium hover:underline transition-colors">
                    Sign up
                </Link>
            </p>
        </Form>
    )
}

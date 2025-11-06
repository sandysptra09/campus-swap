'use client';

import React from 'react'

import Link from 'next/link';
import TextFieldInput from '../inputs/text-field-input';
import { Button, Form } from '@heroui/react';

export default function ForgotPasswordForm() {
    return (
        <Form className='w-full flex flex-col gap-6'>
            <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className="text-3xl md:text-2xl font-bold text-primary">Forget Password</h1>
                <p className="text-muted-foreground text-sm font-medium max-w-sm">
                    Enter your university email address to reset your password.
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
                <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-semibold text-sm py-3 hover:opacity-90 transition-all"
                >
                    Sign In
                </Button>
            </div>
            <p className="mx-auto text-sm text-muted-foreground">
                Remember Password?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline transition-colors">
                    Sign in
                </Link>
            </p>
        </Form>
    )
}

'use client';

import React from 'react'

import Link from 'next/link';
import PasswordFieldInput from '../inputs/password-field-input';
import { Button, Form } from '@heroui/react';

export default function ResetPasswordForm() {
    return (
        <Form className='w-full flex flex-col gap-6 items-center text-center'>
            <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className="text-3xl md:text-2xl font-bold text-primary">Reset Your Password</h1>
                <p className="text-muted-foreground text-sm font-medium max-w-sm">
                    Enter your new password and confirm it.
                </p>
            </div>
            <div className='w-full grid gap-6'>
                <PasswordFieldInput
                    name='new_password'
                    label='New Password'
                    placeholder='Enter your new password'
                    type='password'
                    required
                />
                <PasswordFieldInput
                    name='confirm_password'
                    label='Confirm Password'
                    placeholder='Confirm your new password'
                    type='password'
                    required
                />
                <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-semibold text-sm py-3 hover:opacity-90 transition-all"
                >
                    Reset Password
                </Button>
            </div>
        </Form>
    )
}

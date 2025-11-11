'use client';

import React from 'react'

import Link from 'next/link';
import TextFieldInput from '../inputs/text-field-input';
import NumberFieldInput from '../inputs/number-field-input';
import PasswordFieldInput from '../inputs/password-field-input';
import { Button, Form } from '@heroui/react';

export default function RegisterForm() {
    return (
        <Form className='w-full flex flex-col gap-6'>
            <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className="text-3xl md:text-2xl font-bold text-primary">Register Your Account</h1>
                <p className="text-muted-foreground text-sm font-medium max-w-sm">
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
                    name='student_id_number'
                    label='Student ID Number'
                    placeholder='Enter your student ID number'
                    required
                />
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
                <Button
                    type='submit'
                    className='w-full bg-primary text-primary-foreground font-semibold text-sm py-3 hover:opacity-90 transition-all'
                >
                    Create Account
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

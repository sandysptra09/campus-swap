'use client';

import React from 'react'

import Link from 'next/link';
import OTPFieldInput from '../inputs/otp-field-input';
import { Button, Form } from '@heroui/react';

export default function VerifyOTPConfirmForm() {
    return (
        <Form className='w-full flex flex-col gap-6'>
            <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className="text-3xl md:text-2xl font-bold text-primary">Verify Your Email</h1>
                <p className="text-muted-foreground text-sm font-medium max-w-sm">
                    We have sent an OTP code to your university email address. Enter the code below to activate your account.
                </p>
            </div>
            <div className='w-full grid gap-6'>
                <OTPFieldInput name='otp' placeholder='...' required />
                <Button
                    type='submit'
                    className='w-full bg-primary text-primary-foreground font-semibold text-sm py-3 hover:opacity-90 transition-all'
                >
                    Verify OTP
                </Button>
            </div>
            <p className='mx-auto text-sm text-muted-foreground'>
                Didn&apos;t receive the code?{" "}
                <Link href='#' className='text-primary font-medium hover:underline transition-colors'>
                    Resend it.
                </Link>
            </p>
        </Form>
    )
}

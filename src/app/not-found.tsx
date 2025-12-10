'use client';

import React from 'react'

import { Button, Card, CardBody } from '@heroui/react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='min-h-screen flex items-center justify-center p-6'>
            <Card className='w-full max-w-md p-3 shadow-lg rounded-2xl border border-default-200'>
                <CardBody className='flex flex-col items-center gap-4 py-10'>
                    <h1 className='text-5xl font-bold text-foreground'>404</h1>
                    <p className='text-center text-default-500 text-base'>
                        he page you are looking for cannot be found.<br />
                        Please check the URL again or return to the home page.
                    </p>
                    <Button
                        as={Link}
                        href='/'
                        color='primary'
                        size='md'
                        className='mt-4'
                    >
                        Kembali ke Home
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}

import React from 'react'

import Link from 'next/link';
import { Button } from '@heroui/react'

const quickTopics = [
    'Login Issues',
    'Verification Error',
    'Payment Failed',
    'Unregistered Number',
    'Restricted Account',
];

export default function QuickTopicsHelpButton() {
    return (
        <div className='flex flex-wrap justify-center gap-3 mt-5'>
            {quickTopics.map((topic) => (
                <Button
                    key={topic}
                    size='md'
                    variant='flat'
                    radius='full'
                    as={Link}
                    href={'/'}
                    className='px-4 font-medium bg-default-100 hover:bg-default-200'
                >
                    {topic}
                </Button>
            ))}
        </div>
    )
}

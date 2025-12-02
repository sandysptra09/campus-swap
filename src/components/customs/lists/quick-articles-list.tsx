import React from 'react'

import Link from 'next/link';
import { Listbox, ListboxItem } from '@heroui/react';
import { ChevronRight } from 'lucide-react'

const articles = [
    'How to reset your CampusSwap password',
    'How to verify your student ID',
    'Fix item upload errors',
    'Why your account is temporarily restricted',
    'How to update your phone number',
];

export default function QuickArticlesList() {
    return (
        <Listbox
            color='default'
            aria-label='Quick Articles'
            className='p-4 border border-default-200 rounded-xl overflow-hidden'
            itemClasses={{
                base: 'py-4 px-5',
                title: 'text-lg text-foreground font-medium',
            }}
        >
            {articles.map((title) => (
                <ListboxItem
                    as={Link}
                    href={'/'}
                    key={title}
                    endContent={<ChevronRight className='w-5 h-5 text-muted-foreground' />}
                    className='cursor-pointer'
                >
                    {title}
                </ListboxItem>
            ))}
        </Listbox>
    )
}

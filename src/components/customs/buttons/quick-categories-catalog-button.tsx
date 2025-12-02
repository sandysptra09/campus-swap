import React from 'react'

import Link from 'next/link';
import { Button } from '@heroui/react'

const quickCategories = [
    "Books",
    "Electronics",
    "Fashion",
    "Dorm Equipment",
    "Stationery",
    "Others",
];

export default function QuickCategoriesCatalogButton() {
    return (
        <div className='flex flex-wrap justify-center gap-3 mt-6'>
            {quickCategories.map((categories) => (
                <Button
                    key={categories}
                    size='md'
                    variant='flat'
                    radius='full'
                    as={Link}
                    href={'/'}
                    className='px-4 font-medium bg-default-100 
                    hover:bg-foreground hover:text-white'
                >
                    {categories}
                </Button>
            ))}
        </div>
    )
}

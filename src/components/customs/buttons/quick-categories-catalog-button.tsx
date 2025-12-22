import React from 'react'

import { Button } from '@heroui/react'

const quickCategories = [
    "Books",
    "Electronics",
    "Fashion",
    "Dorm Equipment",
    "Stationery",
    "Others",
];

interface Props {
    onSelectCategory: (category: string) => void;
}

export default function QuickCategoriesCatalogButton({ onSelectCategory }: Props) {
    return (
        <div className='flex flex-wrap justify-center gap-3 mt-6'>
            {quickCategories.map((category) => (
                <Button
                    key={category}
                    size='md'
                    variant='flat'
                    radius='full'
                    onPress={() => onSelectCategory(category)}
                    className='px-4 font-medium bg-default-100 
                    hover:bg-foreground hover:text-white'
                >
                    {category}
                </Button>
            ))}
        </div>
    )
}

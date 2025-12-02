import React from 'react'

import { Select, SelectItem } from '@heroui/react';

const sortbys = [
    { key: 'most-recent', label: 'Most Recent' },
    { key: 'most-popular', label: 'Most Popular' },
    { key: 'price', label: 'Price: Low to High' },
    { key: 'a-z', label: 'A-Z' },
    { key: 'z-a', label: 'Z-A' },
];

export default function FilterItemsSelect() {
    return (
        <div>
            <h3 className='text-base text-foreground font-semibold mb-2'>
                Sorting
            </h3>
            <Select
                size='sm'
                radius='lg'
                className="max-w-xs" label="Sort By">
                {sortbys.map((sortby) => (
                    <SelectItem key={sortby.key}>
                        {sortby.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    )
}

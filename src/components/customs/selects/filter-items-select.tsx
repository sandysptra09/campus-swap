import React from 'react'

import { Select, SelectItem } from '@heroui/react';

const sortbys = [
    { key: 'newest', label: 'Newest' },
    { key: 'price_low', label: 'Price: Low to High' },
    { key: 'price_high', label: 'Price: High to Low' },
];

interface Props {
    value?: string;
    onChange?: (val: string) => void;
}

export default function FilterItemsSelect({ value = 'newest', onChange }: Props) {
    return (
        <Select
            size='sm'
            radius='lg'
            className="max-w-xs" label="Sort By"
            selectedKeys={[value]}
            onChange={(e) => {
                if (onChange && e.target.value) {
                    onChange(e.target.value);
                }
            }}
        >
            {sortbys.map((sortby) => (
                <SelectItem key={sortby.key}>
                    {sortby.label}
                </SelectItem>
            ))}
        </Select>
    )
}

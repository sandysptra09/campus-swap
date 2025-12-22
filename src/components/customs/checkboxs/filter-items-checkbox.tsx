import React from 'react'

import { Checkbox, CheckboxGroup } from '@heroui/react'

const categories = [
    'Books',
    'Electronics',
    'Fashion & Apparel',
    'Dorm Equipment',
    'Stationery',
    'Others'
];

interface Props {
    value?: string[];
    onChange?: (val: string[]) => void;
}

export default function FilterItemsCheckbox({ value = [], onChange }: Props) {

    return (
        <CheckboxGroup
            size='md'
            color='primary'
            value={value}
            onValueChange={onChange}
        >
            {categories.map((category) => (
                <Checkbox key={category} value={category}>
                    {category}
                </Checkbox>
            ))}
        </CheckboxGroup>
    )
}

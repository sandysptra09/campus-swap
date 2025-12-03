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

export default function FilterItemsCheckbox() {

    return (
        <CheckboxGroup
            size='md'
            color='primary'
        >
            {categories.map((category) => (
                <Checkbox key={category} value={category}>
                    {category}
                </Checkbox>
            ))}
        </CheckboxGroup>
    )
}

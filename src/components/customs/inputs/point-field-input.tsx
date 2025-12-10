import React, { useState } from 'react';

import { Input } from "@heroui/react";

interface PointFieldInputProps {
    name: string
    label: string
    placeholder?: string
    required?: boolean
}

export default function PointFieldInput({
    name, label, placeholder, required
}: PointFieldInputProps) {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, "");
        setValue(numericValue);
    };

    return (
        <Input
            name={name}
            type='text'
            label={label}
            labelPlacement='outside'
            placeholder={placeholder}
            radius='sm'
            size='md'
            variant='bordered'
            inputMode='numeric'
            value={value}
            onChange={handleChange}
            isRequired={required}
            endContent={<span className='text-sm font-medium text-foreground'>pts</span>}
            classNames={{
                label: 'text-sm font-medium text-foreground',
                inputWrapper:
                    'border-border hover:border-ring focus-within:border-primary transition-colors',
            }}
        />
    );
}
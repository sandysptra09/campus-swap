import React, { useState } from 'react';

import { Input } from "@heroui/react";

interface NumberFieldInputProps {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
}

export default function NumberFieldInput({
    name, label, placeholder, required = true
}: NumberFieldInputProps) {

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
            classNames={{
                label: 'text-sm font-medium text-foreground',
                inputWrapper:
                    'border-border hover:border-ring focus-within:border-primary transition-colors',
            }}
        />
    )
}
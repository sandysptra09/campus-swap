import React, { useState, useEffect } from 'react';

import { Input } from "@heroui/react";

interface PointFieldInputProps {
    name: string
    label: string
    placeholder?: string
    required?: boolean
    value: number;
    onChange: (value: number) => void;
}

export default function PointFieldInput({
    name,
    label,
    placeholder,
    required,
    value,
    onChange,
}: PointFieldInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        onChange(Number(numericValue || 0));
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
            value={String(value)}
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
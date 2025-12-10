import { Textarea } from '@heroui/react';

interface TextAreaInputProps {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
}

export default function TextAreaInput({ name, label, placeholder, required }: TextAreaInputProps) {
    return (
        <Textarea
            name={name}
            label={label}
            labelPlacement='outside'
            placeholder={placeholder}
            radius='sm'
            size='md'
            variant='bordered'
            isRequired={required}
            classNames={{
                label: 'text-sm font-medium text-foreground',
                inputWrapper:
                    'border-border hover:border-ring focus-within:border-primary transition-colors',
            }}
        />
    );
}
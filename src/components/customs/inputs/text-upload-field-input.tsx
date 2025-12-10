import { Input } from '@heroui/react';

interface TextUploadFieldInputProps {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    value?: string
    onChange?: (value: string) => void;
}

export default function TextUploadFieldInput({
    name, type, label, placeholder,
    required = true, value,
    onChange
}: TextUploadFieldInputProps) {
    return (
        <Input
            name={name}
            type={type}
            label={label}
            labelPlacement='outside'
            placeholder={placeholder}
            radius='sm'
            size='md'
            variant='bordered'
            value={value}
            onValueChange={onChange}
            isRequired={required}
            classNames={{
                label: 'text-sm font-medium text-foreground',
                inputWrapper:
                    'border-border hover:border-ring focus-within:border-primary transition-colors',
            }}
        />
    )
}
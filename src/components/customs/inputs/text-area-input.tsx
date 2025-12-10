import { Textarea } from '@heroui/react';

interface TextAreaInputProps {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export default function TextAreaInput({
    name, label, placeholder, required, defaultValue, value, onChange
}: TextAreaInputProps) {
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
            defaultValue={defaultValue}
            value={value}
            onValueChange={onChange}
            classNames={{
                label: 'text-sm font-medium text-foreground',
                inputWrapper:
                    'border-border hover:border-ring focus-within:border-primary transition-colors',
            }}
        />
    );
}
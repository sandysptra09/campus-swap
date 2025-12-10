import { Input } from '@heroui/react';

interface TextSlugFieldInput {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
}

export default function TextSlugFieldInput({
    name, type, label, placeholder, required = true, value
}: TextSlugFieldInput) {
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
            readOnly
            isRequired={required}
            classNames={{
                label: 'text-sm font-medium text-foreground',
            }}
        />
    )
}
import { Input } from "@heroui/react";

interface FileUploadInputProps {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    onFileSelect?: (file: File | null) => void;
}

export default function FileUploadInput({ name, label, placeholder, required, onFileSelect }: FileUploadInputProps) {
    return (
        <Input
            name={name}
            type='file'
            label={label}
            labelPlacement='outside'
            placeholder={placeholder}
            radius='sm'
            size='md'
            variant='bordered'
            isRequired={required}
            onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                onFileSelect?.(file);
            }}
            classNames={{
                label: 'text-sm font-medium text-foreground',
                inputWrapper:
                    'border-border hover:border-ring focus-within:border-primary transition-colors',
            }}
        />
    );
}
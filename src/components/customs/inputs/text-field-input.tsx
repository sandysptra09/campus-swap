import { Input } from "@heroui/react";

interface TextFieldInputProps {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
}

export default function TextFieldInput({
    name, type, label, placeholder, required = true
}: TextFieldInputProps) {
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
            isRequired={required}
            classNames={{
                label: "text-sm font-medium text-foreground",
                inputWrapper:
                    "border-border hover:border-ring focus-within:border-primary transition-colors",
            }}
        />
    )
}
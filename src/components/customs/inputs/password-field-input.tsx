import { useState } from 'react';
import { Input } from '@heroui/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '../../../../public/assets/icons/password-icon';

interface PasswordFieldInputProps {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
}

export default function PasswordFieldInput({
    name, type = 'password', label, placeholder, required = true
}: PasswordFieldInputProps) {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input
            isRequired={required}
            endContent={
                <button
                    aria-label='toggle password visibility'
                    className='focus:outline-solid outline-transparent'
                    type='button'
                    onClick={toggleVisibility}
                >
                    {isVisible ? (
                        <EyeSlashFilledIcon className='w-5 h-5 text-muted-foreground' />
                    ) : (
                        <EyeFilledIcon className='w-5 h-5 text-muted-foreground' />
                    )}
                </button>
            }
            name={name}
            type={isVisible ? 'text' : type}
            label={label}
            labelPlacement='outside'
            placeholder={placeholder}
            radius='sm'
            size='md'
            variant='bordered'
            classNames={{
                label: "text-sm font-medium text-foreground",
                inputWrapper:
                    "border-border hover:border-ring focus-within:border-primary transition-colors",
            }}
        />
    )
}
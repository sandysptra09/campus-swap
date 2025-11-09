import { InputOtp } from "@heroui/react";

interface OTPFieldInputProps {
    name: string;
    placeholder?: string;
    required?: boolean;
}


export default function OTPFieldInput({ name, placeholder = "•", required }: OTPFieldInputProps) {
    return (
        <InputOtp
            name={name}
            length={4}
            placeholder={placeholder}
            isRequired={required}
            variant='flat'
            radius='md'
            size='lg'
            className='mx-auto'
            classNames={{
                base: 'gap-2',
                input: 'text-lg font-semibold text-center focus-within:border-primary'
            }}
        />
    );
}
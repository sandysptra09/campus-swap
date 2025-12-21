import React from 'react'

import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

interface Props {
    itemId: string;
}

export default function ExchangeButton({ itemId }: Props) {
    const router = useRouter();
    const { user } = useAuth();

    const handleExchange = () => {
        if (!user) {
            router.push('/login');
            return;
        }
        alert(`Open Exchange Modal for Item ID: ${itemId}`);
    };

    return (
        <Button
            size='md'
            radius='lg'
            variant='solid'
            onPress={handleExchange}
            className='w-full mt-4 bg-foreground text-white text-sm font-semibold'
        >
            Exchange
        </Button>
    )
}

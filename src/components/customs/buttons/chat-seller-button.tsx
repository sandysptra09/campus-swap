import React from 'react'

import { Button } from '@heroui/react'
import { MessageCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

interface Props {
    sellerId: string;
}

export default function ChatSellerButton({ sellerId }: Props) {

    const { user } = useAuth();

    if (!user) return null;

    if (user.id === sellerId) return null;

    return (
        <Button
            startContent={<MessageCircle size={16} />}
            size='md'
            radius='lg'
            variant='bordered'
            color='primary'
            onPress={() => alert('Chat coming soon!')}
            className='w-full text-sm font-semibold'
        >
            Chat with Seller
        </Button>
    )
}

import React from 'react'

import { Button } from '@heroui/react'
import { MessageCircle } from 'lucide-react'

export default function ChatSellerButton() {
    return (
        <Button
            startContent={<MessageCircle size={16} />}
            size='md'
            radius='lg'
            variant='bordered'
            color='primary'
            className='w-full text-sm font-semibold'
        >
            Chat with Seller
        </Button>
    )
}

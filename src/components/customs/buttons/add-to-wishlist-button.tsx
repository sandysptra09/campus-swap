import React from 'react'

import { Button } from '@heroui/react'
import { Heart } from 'lucide-react'

export default function AddToWishlistButton() {
    return (
        <Button
            startContent={<Heart size={16} />}
            size='md'
            radius='lg'
            variant='bordered'
            color='primary'
            className='w-full text-sm font-semibold'
        >
            Add to Wishlist
        </Button>
    )
}

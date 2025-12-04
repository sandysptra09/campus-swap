import React from 'react'

import { Heart } from 'lucide-react'
import { Chip } from '@heroui/react'

export default function InWishlistChip() {
    return (
        <Chip
            startContent={<Heart size={16} className='text-primary' fill='#46B85F' />}
            color='primary'
            variant='bordered'
            size='md'
            className='mb-1 text-sm'
        >
            in 7 Wishlist
        </Chip>
    )
}

import React from 'react'

import { Button } from '@heroui/react'

export default function ExchangeButton() {
    return (
        <Button
            size='md'
            radius='lg'
            variant='solid'
            className='w-full mt-4 bg-foreground text-white text-sm font-semibold'
        >
            Exchange
        </Button>
    )
}

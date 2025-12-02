import React from 'react'

import { Search } from 'lucide-react'
import { Input } from '@heroui/react'

export default function InputCatalogSearch() {
    return (
        <div className="w-full">
            <Input
                type='text'
                placeholder='Search catalog items...'
                className='w-full placeholder:text-muted-foreground'
                size='lg'
                radius='full'
                variant='bordered'
                endContent={<Search className='w-5 h-5 text-muted-foreground' />}
            />
        </div>
    )
}

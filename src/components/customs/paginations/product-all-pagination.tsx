import React from 'react'

import { Pagination } from '@heroui/react'

export default function ProductAllPagination() {
    return (
        <div className='flex mt-8 justify-center items-center'>
            <Pagination
                total={10}
                initialPage={1}
                showControls
                size='md'
                classNames={{
                    wrapper: 'flex flex-wrap justify-center gap-2',
                    item: 'transition-transform hover:scale-105',
                    cursor: 'bg-primary text-white font-medium',
                }}
            />
        </div>
    )
}

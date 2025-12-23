import React from 'react'

import { Pagination } from '@heroui/react'

interface Props {
    total: number;
    page: number;
    onChange: (page: number) => void;
}

export default function ProductAllPagination({ total, page, onChange }: Props) {
    return (
        <div className='flex mt-8 justify-center items-center'>
            <Pagination
                total={total}
                page={page}
                onChange={onChange}
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

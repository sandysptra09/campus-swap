import React from 'react'

import { Breadcrumbs, BreadcrumbItem } from '@heroui/breadcrumbs';

interface Props {
    title: string;
}

export default function ProductDetailBreadcrumb({ title }: Props) {
    return (
        <div className='mb-4 flex flex-col flex-wrap gap-4'>
            <Breadcrumbs
                className='text-sm md:text-base text-foreground font-medium'
                size='lg'
                separator='/'
                itemClasses={{
                    item: "text-foreground/60 data-[current=true]:text-foreground font-medium",
                    separator: "text-foreground/40"
                }}
            >
                <BreadcrumbItem
                    href='/catalog'
                    className=''
                >
                    Catalog
                </BreadcrumbItem>
                <BreadcrumbItem className=''>
                    {title}
                </BreadcrumbItem>
            </Breadcrumbs>
        </div>
    )
}

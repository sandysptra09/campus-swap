import React from 'react'

import { Breadcrumbs, BreadcrumbItem } from '@heroui/breadcrumbs';

export default function ProductDetailBreadcrumb() {
    return (
        <div className='mb-4 flex flex-col flex-wrap gap-4'>
            <Breadcrumbs
                className='text-sm md:text-base text-foreground font-medium'
                size='lg'
                separator='/'
            >
                <BreadcrumbItem
                    href='/catalog'
                    className=''
                >
                    Catalog
                </BreadcrumbItem>
                <BreadcrumbItem className=''>
                    Name of the product
                </BreadcrumbItem>
            </Breadcrumbs>
        </div>
    )
}

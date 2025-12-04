import React from 'react'

import { Image } from '@heroui/react'

export default function ProductDetailPreviewImage() {
    return (
        <Image
            isZoomed
            alt="Product Detail Preview Images"
            src="https://dummyimage.com/100x100/ddd/000"
            width={100}
            className='obejct-cover'
        />
    )
}

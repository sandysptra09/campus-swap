import React from 'react'

import { Image } from '@heroui/react'

interface Props {
    imageUrl: string | null;
    altText: string;
}

export default function ProductDetailPreviewImage({ imageUrl, altText }: Props) {
    return (
        <Image
            isZoomed
            alt={altText}
            src={imageUrl || "https://dummyimage.com/100x100/ddd/000"}
            width={100}
            className='obejct-cover'
        />
    )
}

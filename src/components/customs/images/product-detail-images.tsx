import React from 'react'

import { Image } from '@heroui/react'

interface Props {
    imageUrl: string | null;
    altText: string;
}

export default function ProductDetailImages({ imageUrl, altText }: Props) {
    return (
        <Image
            isZoomed
            alt={altText}
            src={imageUrl || "https://dummyimage.com/600x600/ddd/000"}
            width={600}
            className=''
        />
    )
}

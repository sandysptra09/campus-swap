'use client';

import { Image } from "@heroui/react";

interface CampusSwapBannerProps {
    size?: number;
}

export default function CampusSwapBanner({ size = 200 }: CampusSwapBannerProps) {
    return (
        <div className='flex justify-center'>
            <Image
                src='https://ui.shadcn.com/placeholder.svg'
                alt='CampusSwap Banner'
                width={size}
                height={size}
                className='absolute inset-0 w-full h-full object-cover'
            />
        </div>
    )
}
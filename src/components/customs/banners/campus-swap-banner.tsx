'use client';

import Image from "next/image";

interface CampusSwapBannerProps {
    size?: number;
}

export default function CampusSwapBanner({ size = 200 }: CampusSwapBannerProps) {
    return (
        <div className='flex justify-center'>
            <Image
                src='/assets/images/Computer login-bro.png'
                alt='CampusSwap Banner'
                width={size}
                height={size}
                className='absolute inset-0 w-full h-full object-cover'
            />
        </div>
    )
}
'use client';

import { Image } from "@heroui/react";
import Link from "next/link";

type CampusSwapLogoProps = {
    size?: number;
}

export default function CampusSwapLogo({ size = 100 }: CampusSwapLogoProps) {
    return (
        <Link href='/' className='flex items-center gap-2'>
            <Image
                src='/assets/logos/campus-swap-logo.png'
                alt='CampusSwap Logo'
                width={130}
                height={size}
            />
        </Link>
    )
}
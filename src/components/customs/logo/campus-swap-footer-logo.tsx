'use client';

import { Image } from "@heroui/react";
import Link from "next/link";

type CampusSwapFooterLogoProps = {
    size?: number;
}

export default function CampusSwapFooterLogo({ size = 100 }: CampusSwapFooterLogoProps) {
    return (
        <Link href='/' className='flex items-center gap-2'>
            <Image
                src='/assets/logos/campus-swap-logo.png'
                alt='CampusSwap Logo'
                width={255}
                height={size}
            />
        </Link>
    )
}
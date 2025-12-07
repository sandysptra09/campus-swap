'use client';

import { Image } from "@heroui/react";
import Link from "next/link";

type CampusSwapMobileDashboardLogo = {
    size?: number;
}

export default function CampusSwapMobileDashboardLogo({ size = 100 }: CampusSwapMobileDashboardLogo) {
    return (
        <Link href='/' className='flex items-center gap-2'>
            <Image
                src='/assets/logos/campus-swap-logo-mobile-dashboard.png'
                alt='CampusSwap Logo'
                width={50}
                height={size}
            />
        </Link>
    )
}
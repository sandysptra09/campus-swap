import React from 'react'

import CampusSwapLogo from '@/components/customs/logo/campus-swap-logo'
import CampusSwapBanner from '@/components/customs/banners/campus-swap-banner'
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='grid min-h-svh lg:grid-cols-2'>
            <div className='flex flex-col gap-4 p-6 md:p-10'>
                <div className='flex justify-center gap-2 md:justify-start'>
                    <CampusSwapLogo size={50} />
                </div>
                <div className='flex flex-1 items-center justify-center'>
                    <div className='w-full max-w-xs'>
                        {children}
                    </div>
                </div>
            </div>
            <div className='bg-muted relative hidden lg:block'>
                {/* <CampusSwapBanner size={600} /> */}
            </div>
        </div>
    )
}

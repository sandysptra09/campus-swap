'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/shadcn/ui/breadcrumb';

export default function UserBreadcrumb() {
    const pathname = usePathname();

    const isRoot = pathname === '/user/dashboard' || pathname === '/user/dashboard/';

    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    const formatTitle = (slug: string) => {
        return slug
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href='/user/dashboard'>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className='hidden md:block' />

                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {isRoot ? 'Overview' : formatTitle(lastSegment)}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
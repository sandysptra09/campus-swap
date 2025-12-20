'use client';

import * as React from 'react'
import { useSidebar } from '@/components/shadcn/ui/sidebar'

import CampusSwapMobileDashboardLogo from '@/components/customs/logo/campus-swap-mobile-dashboard-logo'
import CampusSwapLogo from '@/components/customs/logo/campus-swap-logo'
import { NavMain } from '@/components/shadcn/admin/nav-main'
import { NavAdminMenu } from './nav-admin-menu'
import { NavAdmin } from '@/components/shadcn/admin/nav-admin'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/shadcn/ui/sidebar'
import { NavUserMenu } from '../user/nav-user-menu';

const userData = {
    name: 'Admin CampusSwap',
    email: 'admin@campusswap.dev',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const { state } = useSidebar()

    return (
        <Sidebar collapsible='icon' {...props}>
            <SidebarHeader className='items-center mt-4'>
                {state === 'expanded' ? (
                    <CampusSwapLogo size={50} />
                ) : (
                    <CampusSwapMobileDashboardLogo size={32} />
                )}
            </SidebarHeader>
            <SidebarContent>
                <NavMain />
                <NavAdminMenu />
            </SidebarContent>
            <SidebarFooter>
                <NavAdmin user={userData} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

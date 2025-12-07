'use client';

import * as React from 'react'
import { useSidebar } from '@/components/shadcn/ui/sidebar'

import CampusSwapMobileDashboardLogo from '@/components/customs/logo/campus-swap-mobile-dashboard-logo'
import CampusSwapLogo from '@/components/customs/logo/campus-swap-logo'
import { NavMain } from '@/components/shadcn/user/nav-main'
import { NavUserMenu } from './nav-user-menu'
import { NavUser } from '@/components/shadcn/user/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/shadcn/ui/sidebar'

const userData = {
  name: 'Sanchie Mikhailovna',
  email: 'sanchie@upi.edu',
  avatar: '/avatars/shadcn.jpg',
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
        <NavUserMenu />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

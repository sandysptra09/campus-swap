'use client';

import { User, Settings, HelpCircle } from 'lucide-react'
import Link from 'next/link'

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/shadcn/ui/sidebar'

export function NavUserMenu() {
    const items = [
        {
            title: 'Profile',
            href: '/user/dashboard/profile',
            icon: User
        },
        {
            title: 'Settings',
            href: '/user/dashboard/settings',
            icon: Settings
        },
        {
            title: 'Get Help',
            href: '/support/help-center',
            icon: HelpCircle
        },
    ]

    return (
        <SidebarGroup>
            <SidebarGroupLabel>User Menu</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild className='text-foreground hover:bg-primary hover:text-white'>
                            <Link href={item.href}>
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

'use client'

import {
    LayoutDashboard,
    Package,
    Blocks,
    UserCog,
    Repeat,
} from 'lucide-react'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/shadcn/ui/sidebar'
import Link from 'next/link'

export function NavMain() {
    const items = [
        {
            title: 'Dashboard',
            href: '/admin',
            icon: LayoutDashboard
        },
        {
            title: 'Items Approval',
            href: '/admin/items-approval',
            icon: Package
        },
        {
            title: 'User Management',
            href: '/admin/users-management',
            icon: UserCog
        },
        {
            title: 'Category Management',
            href: '/admin/categories-management',
            icon: Blocks
        },
        {
            title: 'Transactions Monitor',
            href: '/admin/transactions-monitor',
            icon: Repeat
        },
    ]

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.href} >
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

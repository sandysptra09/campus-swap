'use client'

import {
  LayoutDashboard,
  Package,
  Heart,
  MessageCircle,
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
      href: '/user/dashboard',
      icon: LayoutDashboard
    },
    {
      title: 'My Items',
      href: '/user/dashboard/my-items',
      icon: Package
    },
    {
      title: 'Wishlist',
      href: '/user/dashboard/wishlist',
      icon: Heart
    },
    {
      title: 'Transactions',
      href: '/user/dashboard/transactions',
      icon: Repeat
    },
    {
      title: 'Messages',
      href: '/user/dashboard/messages',
      icon: MessageCircle
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

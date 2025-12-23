'use client'

import {
  LayoutDashboard,
  Package,
  Heart,
  MessageCircle,
  Repeat,
  Wallet,
} from 'lucide-react'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/shadcn/ui/sidebar'
import Link from 'next/link'
import { title } from 'process'

export function NavMain() {
  const items = [
    {
      title: 'Dashboard',
      href: '/user/dashboard',
      icon: LayoutDashboard
    },
    {
      title: 'Points',
      href: '/user/dashboard/points',
      icon: Wallet
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
      href: '/user/dashboard/conversations',
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

'use client';

import { ChevronsUpDown, LogOut, User, Home, Settings } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/shadcn/ui/sidebar'

export function NavUser({ user }: any) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='hover:bg-white hover:cursor-pointer'>
            <SidebarMenuButton size='lg'>
              <Avatar className='h-8 w-8 rounded-full'>
                <AvatarImage src={user.avatar} />
                <AvatarFallback className='rounded-lg'>U</AvatarFallback>
              </Avatar>

              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user.name}</span>
                <span className='truncate text-xs'>{user.email}</span>
              </div>

              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='min-w-56 rounded-lg bg-white'
            side='right'
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel>
              <div className='flex items-center gap-3'>
                <Avatar className='h-8 w-8 rounded-full'>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className='rounded-lg'>U</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium text-sm'>{user.name}</p>
                  <p className='text-xs'>{user.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Home />
              Home
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-destructive font-semibold'>
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

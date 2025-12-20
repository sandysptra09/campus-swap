import React from 'react'

import { requireUser } from '@/lib/auth-server';
import UserBreadcrumb from '@/components/shadcn/user/user-breadcrumb';
import { AppSidebar } from '@/components/shadcn/user/app-sidebar'
import { Separator } from '@/components/shadcn/ui/separator'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/shadcn/ui/sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const user = await requireUser();

    const sidebarUser = {
        name: user.fullname,
        email: user.email,
        avatar: user.avatarUrl || '',
    };

    return (
        <SidebarProvider>
            <AppSidebar user={sidebarUser} />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                        <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
                        <UserBreadcrumb />
                    </div>
                </header>
                <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

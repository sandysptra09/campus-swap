import React from "react";

import { requireAdmin } from "@/lib/auth-server";
import { AppSidebar } from '@/components/shadcn/admin/app-sidebar'
import { Separator } from '@/components/shadcn/ui/separator'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/shadcn/ui/sidebar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/shadcn/ui/breadcrumb'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const user = await requireAdmin();

    const sidebarUser = {
        name: user.fullname,
        email: user.email,
        avatar: user.avatarUrl || "",
    };

    return (
        <SidebarProvider>
            <AppSidebar user={sidebarUser} />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                        <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className='hidden md:block'>
                                    <BreadcrumbLink href='/admin'>Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className='hidden md:block' />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Overview</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

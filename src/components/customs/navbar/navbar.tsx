'use client';

import React, { useState } from 'react';

import { usePathname } from 'next/navigation';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
} from "@heroui/react";
import CampusSwapLogo from "../logo/campus-swap-logo";

export default function CampusSwapNavbar() {
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { title: 'Home', url: '/' },
        { title: 'Catalog', url: '/catalog' },
    ];

    const hiddenRoutes = ['/login', '/register'];

    if (hiddenRoutes.includes(pathname ?? '')) {
        return null;
    }

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBlurred={false} className='p-2'>
            <NavbarContent className='hidden sm:flex gap-6' justify='start'>
                {menuItems.map((item) => (
                    <NavbarItem key={item.title} isActive={pathname === item.url}>
                        <Link
                            href={item.url}
                            color={pathname === item.url ? 'primary' : 'foreground'}
                            className='text-sm font-medium hover:text-primary transition-colors'
                        >
                            {item.title}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify='center'>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    className='sm:hidden cursor-pointer'
                />
                <NavbarBrand className='flex items-center justify-center'>
                    <CampusSwapLogo size={50} />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify='end'>
                <>
                    <NavbarItem className='hidden lg:flex'>
                        <Button
                            as={Link}
                            color='primary'
                            href='/register'
                            variant='ghost'
                            radius='full'
                        >
                            Sign Up
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            as={Link}
                            color='primary'
                            href='/login'
                            variant='solid'
                            radius='full'
                        >
                            Login
                        </Button>
                    </NavbarItem>
                </>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className='w-full'
                            color={pathname == `${item.url}` ? 'primary' : 'foreground'}
                            href={item.url}
                            size='lg'
                        >
                            {item.title}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
'use client'

import { HeroUIProvider } from '@heroui/react'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@heroui/react'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <ToastProvider
                placement='top-center'
                toastOffset={40}
            />
            <AuthProvider>
                {children}
            </AuthProvider>
        </HeroUIProvider>
    )
}
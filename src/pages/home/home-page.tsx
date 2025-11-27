import React from 'react'

import WelcomeSection from '@/components/customs/section/main/welcome'
import QuickActionsSection from '@/components/customs/section/main/quick-actions'

export default function HomePage() {
    return (
        <main className='w-full min-h-screen'>
            <WelcomeSection />
            <QuickActionsSection />
        </main>
    )
}

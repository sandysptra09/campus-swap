import React from 'react'

import WelcomeSection from '@/components/customs/section/main/welcome'
import QuickActionsSection from '@/components/customs/section/main/quick-actions'
import FeaturedHighlightSection from '@/components/customs/section/main/featured-highlight'
import RecommendedItemsSection from '@/components/customs/section/main/recommended-items'
import LatestItemsSection from '@/components/customs/section/main/latest-items'

export default function HomePage() {
    return (
        <main className='w-full min-h-screen'>
            <WelcomeSection />
            <QuickActionsSection />
            <FeaturedHighlightSection />
            <RecommendedItemsSection />
            <LatestItemsSection />
        </main>
    )
}

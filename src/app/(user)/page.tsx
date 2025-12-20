'use client';

import React from 'react';

import { useAuth } from '@/context/AuthContext';
import WelcomeSection from '@/components/customs/section/main/welcome';
import QuickActionsSection from '@/components/customs/section/main/quick-actions';
import FeaturedHighlightSection from '@/components/customs/section/main/featured-highlight';
import RecommendedItemsSection from '@/components/customs/section/main/recommended-items';
import LatestItemsSection from '@/components/customs/section/main/latest-items';
import CTAJoinStartExchangingSection from '@/components/customs/section/main/cta-join-start-exchanging';

export default function MainPage() {

  const { user, loading } = useAuth();

  return (
    <main className='w-full min-h-screen'>
      {!loading && user && (
        <>
          <WelcomeSection />
          <QuickActionsSection />
        </>
      )}

      <FeaturedHighlightSection />
      <RecommendedItemsSection />
      <LatestItemsSection />

      {!user && <CTAJoinStartExchangingSection />}
    </main>
  )
}

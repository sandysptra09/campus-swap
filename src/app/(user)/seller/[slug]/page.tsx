'use client';

import React from 'react'

import ProfileSummarySection from '@/components/customs/section/seller-detail/profile-summary';
import SellerCredibilitySection from '@/components/customs/section/seller-detail/seller-credibility';

export default function SellerDetailPage() {
    return (
        <main className='w-full min-h-screen'>
            <ProfileSummarySection />
            <SellerCredibilitySection />
        </main>
    )
}

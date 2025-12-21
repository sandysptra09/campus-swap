'use client';

import React from 'react'

import SellerHeader from '../../headers/seller-header';
import { SellerData } from '@/app/(user)/seller/[id]/page';

interface Props {
    seller: SellerData;
}

export default function ProfileSummarySection({ seller }: Props) {
    return (
        <section className='max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-10'>
            <SellerHeader seller={seller} />
        </section>
    )
}

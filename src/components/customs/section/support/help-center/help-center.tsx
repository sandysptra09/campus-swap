'use client';

import React from 'react'

import Link from 'next/link';
import { Chip, Divider } from '@heroui/react';
import InputHelpSearch from '@/components/customs/searchs/input-help-search';
import QuickTopicsHelpButton from '@/components/customs/buttons/quick-topics-help-button';
import TopCategoriesHelpCard from '@/components/customs/cards/top-categories-help-card';
import QuickArticlesList from '@/components/customs/lists/quick-articles-list';

export default function HelpCenterSection() {
    return (
        <section className='w-full'>
            <div className='max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-10'>
                <div className='items-center text-center mb-10'>
                    <Chip variant='bordered'
                        size='lg'
                        className='text-foreground border-foreground mb-4'>
                        Help Center
                    </Chip>
                    <h1 className='text-3xl md:text-4xl font-bold mb-3'>
                        Welcome to <span className='text-primary'>CampusSwap</span> Help Center
                    </h1>
                    <p className='text-base text-muted-foreground mb-6'>
                        Get answers, guides, and tips about using CampusSwap securely and productively.
                    </p>
                    <div className='max-w-2xl mx-auto mb-8'>
                        <InputHelpSearch />
                    </div>
                    <QuickTopicsHelpButton />
                </div>
            </div>
            <div className='max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-10'>
                <h2 className='text-2xl md:text-3xl text-foreground font-bold text-center mb-8'>
                    Top Categories
                </h2>
                <TopCategoriesHelpCard />
            </div>
            <div className='max-w-4xl mx-auto px-6 md:px-10 lg:px-20 py-12 mt-5'>
                <h2 className='text-2xl md:text-3xl text-foreground text-center font-bold mb-8'>
                    Quick Articles
                </h2>
                <QuickArticlesList />
            </div>
            <div className='max-w-6xl mx-auto px-6'>
                <Divider className='my-12' />
            </div>
            <div className='max-w-3xl mx-auto px-6 pb-10 text-center'>
                <h2 className='text-2xl font-bold mb-4'>More Support</h2>
                <div className='flex flex-col gap-2 text-base'>
                    <Link href='/support/faq' className='hover:underline text-primary'>
                        FAQ
                    </Link>
                    <Link href='/support/privacy-policy' className='hover:underline text-primary'>
                        Privacy Policy
                    </Link>
                    <Link href='/support/terms-conditions' className='hover:underline text-primary'>
                        Terms & Conditions
                    </Link>
                </div>
            </div>
        </section>
    )
}

'use client';

import React from 'react'

import Link from 'next/link';
import { Divider } from '@heroui/react';
import ProductDetailBreadcrumb from '@/components/customs/breadcrumbs/product-detail-breadcrumb';
import ProductDetailImages from '@/components/customs/images/product-detail-images';
import ProductDetailPreviewImage from '@/components/customs/images/product-detail-preview-image';
import InWishlistChip from '@/components/customs/chips/in-wishlist-chip';
import ExchangeButton from '@/components/customs/buttons/exchange-button';
import ChatSellerButton from '@/components/customs/buttons/chat-seller-button';
import AddToWishlistButton from '@/components/customs/buttons/add-to-wishlist-button';
import { Product } from '@/types/product';

interface Props {
    item: Product;
}

export default function ProductInformationSection({ item }: Props) {

    const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <section className='max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-10'>
            <ProductDetailBreadcrumb title={item.title} />
            <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                <div className='w-full lg:w-3/5'>
                    <div className='w-full'>
                        <ProductDetailImages
                            imageUrl={item.imageUrl}
                            altText={item.title}
                        />
                    </div>
                    <div className='flex gap-3 mt-4 overflow-x-auto pb-2 items-center justify-center'>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className='w-26 h-26 overflow-hidden shrink-0'
                            >
                                <ProductDetailPreviewImage
                                    imageUrl={item.imageUrl}
                                    altText={item.title}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full lg:w-2/5 flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <InWishlistChip />
                        <h3 className='text-lg md:text-xl font-medium text-muted-foreground'>
                            {item.category.name}
                        </h3>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl text-foreground font-bold'>
                            {item.title}
                        </h1>
                        <p className='mt-1 font-normal text-base text-muted-foreground w-full'>
                            {item.shortDescription}
                        </p>
                        <h4 className='mt-1 text-muted-foreground text-base'>
                            Product Condition: <span className='text-foreground font-bold '>{item.condition}</span>
                        </h4>
                        <h4 className='mt-1 text-muted-foreground text-base'>
                            Posted on: <span className='text-foreground font-bold'>{formattedDate}</span>
                        </h4>
                        <h4 className='mt-1 text-muted-foreground text-base'>
                            Posted by: <span className='text-foreground font-bold hover:underline'>
                                <Link href={`/seller/${item.owner.id}`}>{item.owner.fullname}</Link>
                            </span>
                        </h4>
                        <h2 className='mt-1 text-3xl md:text-4xl text-primary font-bold'>
                            300
                            <span className='text-lg md:text-xl font-medium text-foreground ml-1'>
                                pts
                            </span>
                        </h2>
                        <Divider className='mt-2' />
                        <ExchangeButton itemId={item.id} />
                        <div className='flex flex-col sm:flex-row gap-3 mt-2'>
                            <ChatSellerButton sellerId={item.owner.id} />
                            <AddToWishlistButton itemId={item.id} />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

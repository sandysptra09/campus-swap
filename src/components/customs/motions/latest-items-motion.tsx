'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import ProductLatestCard from '../cards/product-latest';

export default function LatestItemsMotion() {

    const items = [...Array(6)];

    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollWidth, setScrollWidth] = useState(0);

    useLayoutEffect(() => {
        if (containerRef.current) {
            setScrollWidth(containerRef.current.scrollWidth - containerRef.current.clientWidth);
        }
    }, []);

    return (
        <div className='relative overflow-hidden w-full'>
            <motion.div
                ref={containerRef}
                className='flex gap-6 p-2'
                initial={{ x: 0 }}
                animate={{ x: scrollWidth > 0 ? -scrollWidth : 0 }}
                transition={{
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 20,
                    ease: 'easeInOut',
                }}
            >
                {items.map((_, i) => (
                    <div key={i} className='min-w-[280px] max-w-[280px]'>
                        <ProductLatestCard
                            product_id='1'
                            product_user_id='1'
                            product_name='Product Name'
                            product_description='Desc'
                            product_category='Category'
                            product_condition='new'
                            product_status='active'
                            product_point_value={280}
                            product_image_url='https://app.requestly.io/delay/3000/https://dummyimage.com/300x300/ffffff/000000'
                            product_created_at='2025-01-01'
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

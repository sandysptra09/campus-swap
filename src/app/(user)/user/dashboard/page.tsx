'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Activity, Heart, Package, Repeat, Star } from 'lucide-react'
import ProductYourLatestCard from '@/components/customs/cards/product-your-latest-card';

export default function DashboardOverviewPage() {
    return (
        <div className='flex flex-col gap-4'>
            <div className='grid gap-4 md:grid-cols-4'>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Points Balance</CardTitle>
                        <Star className='h-7 w-7 text-yellow-500' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>1,250</p>
                        <p className='text-xs text-muted-foreground'>+120 this week</p>
                    </CardContent>
                </Card>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Items Posted</CardTitle>
                        <Package className='h-7 w-7 text-primary' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>18</p>
                        <p className='text-xs text-muted-foreground'>2 pending approval</p>
                    </CardContent>
                </Card>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Items Exchanged</CardTitle>
                        <Repeat className='h-7 w-7 text-green-600' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>9</p>
                        <p className='text-xs text-muted-foreground'>+1 this month</p>
                    </CardContent>
                </Card>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Wishlist Items</CardTitle>
                        <Heart className='h-7 w-7 text-pink-500' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold'>34</p>
                        <p className='text-xs text-muted-foreground'>3 new this week</p>
                    </CardContent>
                </Card>
            </div>
            <Card className='shadow-sm border-default-200'>
                <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='flex items-start gap-3'>
                        <Activity className='h-5 w-5 mt-1 text-primary' />
                        <div>
                            <p className='text-sm font-medium'>You exchanged an item</p>
                            <p className='text-xs text-muted-foreground'>2 hours ago</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-3'>
                        <Package className='h-5 w-5 mt-1 text-blue-600' />
                        <div>
                            <p className='text-sm font-medium'>You posted a new item</p>
                            <p className='text-xs text-muted-foreground'>Yesterday</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-3'>
                        <Heart className='h-5 w-5 mt-1 text-pink-500' />
                        <div>
                            <p className='text-sm font-medium'>You added “Bluetooth Speaker” to Wishlist</p>
                            <p className='text-xs text-muted-foreground'>3 days ago</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className='flex flex-col gap-3'>
                <h2 className="text-lg font-semibold">Your Latest Items</h2>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {[...Array(8)].map((_, i) => (
                        <ProductYourLatestCard
                            key={i}
                            product_id='1'
                            product_user_id='1'
                            product_name='Product Name'
                            product_description='Desc'
                            product_category='Category'
                            product_condition='new'
                            product_status='Pending'
                            product_point_value={300}
                            product_image_url='https://dummyimage.com/300x300/ffffff/000000'
                            product_created_at='2025-12-03'
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

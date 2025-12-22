'use client';

import React, { useEffect, useState } from 'react'

import { Button, Image, Spinner } from '@heroui/react';
import Link from 'next/link';
import { Pencil, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function ViewItemPage() {

    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!slug) return;

        fetch(`/api/items/view/${slug}`)
            .then(async (res) => {
                if (!res.ok) {
                    if (res.status === 404) throw new Error('Item not found');
                    throw new Error('Failed to fetch item');
                }
                return res.json();
            })
            .then((data) => {
                setItem(data);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [slug]);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        setDeleting(true);
        try {
            const res = await fetch(`/api/items/${item.id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to delete');
            }

            router.push('/dashboard/my-items');
            router.refresh();
        } catch (err: any) {
            alert(err.message);
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className='flex h-60 items-center justify-center'>
                <Spinner label='Loading item details...' color='primary' />
            </div>
        );
    }

    if (error || !item) {
        return (
            <div className='flex flex-col items-center justify-center gap-4 py-20'>
                <p className='text-red-500 font-medium'>{error || 'Item not found'}</p>
                <Button as={Link} href='/user/dashboard/my-items' variant='flat'>
                    Back to My Items
                </Button>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-6'>
            <div>
                <h1 className='text-2xl font-semibold'>Item Details</h1>
                <p className='text-muted-foreground text-sm'>View detailed information about your item.</p>
            </div>
            <div className='flex flex-col md:flex-row gap-6 md:gap-4'>
                <div className='w-full md:w-3/5'>
                    <Image
                        radius='lg'
                        isZoomed
                        src={item.imageUrl || 'https://placehold.co/600x600?text=No+Image'}
                        alt={item.title}
                        className='w-full h-80 object-cover'
                    />
                </div>
                <div className='w-full md:2/5 flex flex-col'>
                    <h5 className='text-lg font-medium text-muted-foreground'>
                        {item.category?.name}
                    </h5>
                    <h3 className='text-xl text-foreground font-bold'>
                        {item.title}
                    </h3>
                    <p className='mt-1 font-normal text-base text-muted-foreground w-full'>
                        {item.shortDescription}
                    </p>
                    <h4 className='mt-1 text-muted-foreground text-base'>
                        Product Condition: <span className='text-foreground font-bold'>{item.condition}</span>
                    </h4>
                    <h4 className='mt-1 text-muted-foreground text-base'>
                        Posted on: <span className='text-foreground font-bold'>{item.createdAt}</span>
                    </h4>
                    <h2 className='mt-1 text-2xl text-primary font-bold'>
                        {item.pointValue}
                        <span className='text-lg font-medium text-foreground ml-1'>
                            pts
                        </span>
                    </h2>
                </div>
            </div>
            <div>
                <h3 className='font-semibold text-lg'>Product Description</h3>
                <p className='text-base text-muted-foreground leading-relaxed'>
                    {item.description}
                </p>
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
                <Button
                    startContent={<Trash size={16} />}
                    className='w-full bg-destructive text-white'
                >
                    Delete Item
                </Button>
                <Button
                    as={Link}
                    href={`/user/dashboard/my-items/edit/${item.id}`}
                    startContent={<Pencil size={16} />}
                    className='bg-primary text-white w-full'
                >
                    Edit Item
                </Button>
            </div>
        </div>
    )
}

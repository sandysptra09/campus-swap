import React, { useState, useEffect } from 'react'

import {
    Image,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Chip,
} from '@heroui/react';
import { Trash2 } from 'lucide-react';

type WishlistItem = {
    id: string
    createdAt: string
    item: {
        id: string
        title: string
        slug: string
        imageUrl?: string | null
        status: 'AVAILABLE' | 'IN_CLAIM' | 'COMPLETED'
        category: {
            name: string
        }
    }
}

export default function WishlistTable() {

    const [data, setData] = useState<WishlistItem[]>([])
    const [loading, setLoading] = useState(true)

    async function fetchWishlist() {
        try {
            const res = await fetch('/api/wishlist', {
                credentials: 'include',
            })

            if (!res.ok) throw new Error('Failed to fetch wishlist')

            const json = await res.json()
            setData(json)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(itemId: string) {
        if (!confirm('Remove this item from wishlist?')) return

        try {
            const res = await fetch(`/api/wishlist/${itemId}`, {
                method: 'DELETE',
            })

            if (!res.ok) throw new Error('Failed to remove')

            setData((prev) => prev.filter((w) => w.item.id !== itemId))
        } catch (error) {
            console.error(error)
            alert('Failed to remove item from wishlist')
        }
    }

    useEffect(() => {
        fetchWishlist()
    }, [])

    const wishlistStatus = (status: WishlistItem['item']['status']) => {
        if (status === 'AVAILABLE') {
            return (
                <Chip size='sm' className='text-green-600 bg-green-100'>
                    AVAILABLE
                </Chip>
            )
        }

        return (
            <Chip size='sm' className='text-gray-600 bg-gray-100'>
                NOT AVAILABLE
            </Chip>
        )
    }

    return (
        <Table
            aria-label='Wishlist Table'
            className=' border border-default-200 rounded-xl'
        >
            <TableHeader>
                <TableColumn>ITEM</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ADDED AT</TableColumn>
                <TableColumn className='text-right'>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody
                isLoading={loading}
                emptyContent='No items in wishlist'>
                {data.map((wishlist) => (
                    <TableRow key={wishlist.id}>
                        <TableCell>
                            <div className='flex items-center gap-3'>
                                <Image
                                    radius='full'
                                    src={wishlist.item.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'}
                                    alt={wishlist.item.title}
                                    className='w-12 h-12 object-cover hidden md:block'
                                />
                                <p className='font-medium'>{wishlist.item.title}</p>
                            </div>
                        </TableCell>

                        <TableCell>{wishlist.item.category.name}</TableCell>
                        <TableCell>
                            {wishlistStatus(wishlist.item.status)}
                        </TableCell>

                        <TableCell>
                            {new Date(wishlist.createdAt).toLocaleDateString()}
                        </TableCell>

                        <TableCell className='text-right'>
                            <Button
                                isIconOnly
                                variant='light'
                                color='danger'
                                onPress={() => handleDelete(wishlist.item.id)}
                                aria-label='Remove from wishlist'
                            >
                                <Trash2 className='w-5 h-5' />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >
    )
}

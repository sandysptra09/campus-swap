import React, { useState, useEffect } from 'react'

import { Button } from '@heroui/react'
import { Heart } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

interface Props {
    itemId: string;
}

export default function AddToWishlistButton({ itemId }: Props) {

    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [wishlistId, setWishlistId] = useState<string | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkWishlistStatus = async () => {
            if (!user) return;

            try {
                const res = await fetch('/api/wishlist', { cache: 'no-store' });

                if (res.ok) {
                    const data = await res.json();

                    const foundItem = data.find((w: any) => w.item.id === itemId || w.itemId === itemId);

                    if (foundItem) {
                        setWishlistId(foundItem.id);
                    } else {
                        setWishlistId(null);
                    }
                }
            } catch (error) {
                console.error('Failed to check wishlist status', error);
            } finally {
                setChecking(false);
            }
        };

        checkWishlistStatus();
    }, [user, itemId]);

    if (!user) return null;

    const handleWishlistToggle = async () => {
        setLoading(true);

        try {
            if (wishlistId) {
                const res = await fetch(`/api/wishlist/${wishlistId}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    setWishlistId(null);
                } else {
                    alert('Failed to remove from wishlist');
                }

            } else {
                const res = await fetch('/api/wishlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ itemId }),
                });

                const data = await res.json();

                if (res.ok) {
                    setWishlistId(data.wishlist.id);
                } else if (res.status === 409) {
                    alert('Item already in wishlist (Syncing...)');
                } else {
                    alert(data.message);
                }
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (checking) {
        return (
            <Button
                size='md'
                radius='lg'
                variant='bordered'
                isLoading
                className='w-full text-sm font-semibold'
            >
                Checking...
            </Button>
        )
    }

    const isInWishlist = wishlistId !== null;

    return (
        <Button
            startContent={
                <Heart
                    size={16}
                    fill={isInWishlist ? 'currentColor' : 'none'}
                    className={isInWishlist ? 'text-white' : ''}
                />
            }
            size='md'
            radius='lg'
            variant={isInWishlist ? 'solid' : 'bordered'}
            color='primary'
            isLoading={loading}
            onPress={handleWishlistToggle}
            className='w-full text-sm font-semibold'
        >
            {loading
                ? (isInWishlist ? 'Removing...' : 'Adding...')
                : (isInWishlist ? 'In Wishlist' : 'Add to Wishlist')
            }
        </Button>
    )
}

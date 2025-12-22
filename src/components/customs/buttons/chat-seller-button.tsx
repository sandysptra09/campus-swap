'use client';

import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react'
import { MessageCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

interface Props {
    sellerId: string;
}

export default function ChatSellerButton({ sellerId }: Props) {

    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    if (!user) return null;

    if (user.id === sellerId) return null;

    const handleChat = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/conversations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: sellerId })
            });

            if (res.ok) {
                const conversation = await res.json();
                router.push(`/user/dashboard/conversations/${conversation.id}`);
            } else {
                alert("Failed to start chat.");
            }
        } catch (error) {
            console.error("Chat Error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            startContent={<MessageCircle size={16} />}
            size='md'
            radius='lg'
            variant='bordered'
            color='primary'
            isLoading={loading}
            onPress={handleChat}
            className='w-full text-sm font-semibold'
        >
            Chat with Seller
        </Button>
    )
}

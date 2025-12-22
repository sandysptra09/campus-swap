import React from 'react';
import ConversationList from '@/components/customs/conversations/conversation-list';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}) {
    const currentUser = await getUserFromRequest();

    if (!currentUser) {
        return null;
    }

    const conversations = await prisma.conversation.findMany({
        where: {
            users: {
                some: {
                    id: currentUser.id
                }
            }
        },
        include: {
            users: true,
            messages: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1
            }
        },
        orderBy: {
            lastMessageAt: 'desc'
        }
    });

    return (
        <div className='h-[calc(100vh-80px)] w-full flex overflow-hidden bg-white'>
            <ConversationList
                initialItems={conversations}
                currentUserId={currentUser.id}
            />
            <div className='h-full flex-1'>
                {children}
            </div>
        </div>
    );
}
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import Header from '@/components/customs/conversations/conversation-header';
import Body from '@/components/customs/conversations/conversation-body';
import Form from '@/components/customs/conversations/conversation-form';
import { redirect } from 'next/navigation';

interface IParams {
    conversationId: string;
}

export default async function ConversationIdPage({ params }: { params: Promise<IParams> }) {
    const { conversationId } = await params;
    const currentUser = await getUserFromRequest();

    if (!currentUser) {
        return null;
    }

    const conversation = await prisma.conversation.findUnique({
        where: {
            id: conversationId
        },
        include: {
            users: true,
            messages: {
                include: {
                    seen: true,
                    sender: true
                },
                orderBy: {
                    createdAt: 'asc'
                }
            }
        }
    });

    if (!conversation) {
        redirect('/user/dashboard/conversations');
    }

    return (
        <div className='h-full flex flex-col'>
            <Header conversation={conversation} currentUser={currentUser} />

            <Body
                initialMessages={conversation.messages}
                currentUser={currentUser}
                conversationId={conversationId}
            />

            <Form conversationId={conversationId} />
        </div>
    );
}
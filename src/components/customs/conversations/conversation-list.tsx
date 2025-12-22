'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { User, Input } from '@heroui/react';
import { Search } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

interface ConversationListProps {
    initialItems: any[];
    currentUserId: string;
}

export default function ConversationList({
    initialItems,
    currentUserId
}: ConversationListProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [items, setItems] = useState(initialItems);

    const isOpen = useMemo(() => pathname.includes('/conversations/'), [pathname]);

    return (
        <aside className={clsx(
            'h-full overflow-y-auto  border-gray-200 bg-white',
            isOpen ? 'hidden lg:block' : 'block w-full',
            'lg:w-80 lg:shrink-0 overflow-hidden'
        )}>
            <div className='mr-4'>
                <div className='flex justify-between mb-4 pt-4'>
                    <h2 className='text-2xl font-bold text-primary'>
                        Messages
                    </h2>
                </div>

                <Input
                    placeholder='Search conversations...'
                    startContent={<Search size={18} className='text-gray-400' />}
                    variant='bordered'
                    radius='lg'
                    size='sm'
                    className='mb-4 w-full'
                />
            </div>

            <div className='flex flex-col'>
                {items.map((item) => {
                    const otherUser = item.users.find((user: any) => user.id !== currentUserId);
                    const lastMessage = item.messages[0];
                    const isActive = pathname === `/user/dashboard/conversations/${item.id}`;

                    return (
                        <div
                            key={item.id}
                            onClick={() => router.push(`/user/dashboard/conversations/${item.id}`)}
                            className={clsx(
                                'w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer mx-2 mb-1',
                                isActive && 'bg-neutral-100'
                            )}
                        >
                            <User
                                name={otherUser?.fullname}
                                description={lastMessage?.body || 'Started a conversation'}
                                avatarProps={{
                                    src: otherUser?.avatarUrl || 'https://i.pravatar.cc/150',
                                    size: 'md'
                                }}
                                classNames={{
                                    name: 'font-semibold text-gray-900',
                                    description: 'text-xs text-gray-500 truncate max-w-[180px]'
                                }}
                            />
                            {lastMessage && (
                                <span className='text-[10px] text-gray-400 absolute top-3 right-4'>
                                    {format(new Date(lastMessage.createdAt), 'p')}
                                </span>
                            )}
                        </div>
                    )
                })}

                {items.length === 0 && (
                    <div className='p-8 text-center text-gray-500 text-sm'>
                        No conversations yet.
                    </div>
                )}
            </div>
        </aside>
    );
}
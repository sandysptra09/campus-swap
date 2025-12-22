'use client';

import { User } from '@heroui/react';
import { MoreHorizontal, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

interface HeaderProps {
    conversation: any;
    currentUser: any;
}

export default function Header({ conversation, currentUser }: HeaderProps) {

    const otherUser = useMemo(() => {
        return conversation.users.find((user: any) => user.id !== currentUser.id);
    }, [conversation.users, currentUser.id]);

    return (
        <div className='bg-white w-full flex border-b sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
            <div className='flex gap-3 items-center'>

                <Link
                    href='/user/dashboard/conversations'
                    className='lg:hidden block text-primary hover:text-primary/80 transition cursor-pointer'
                >
                    <ArrowLeft size={20} />
                </Link>

                <User
                    name={otherUser?.fullname}
                    description='Active now'
                    avatarProps={{
                        src: otherUser?.avatarUrl || 'https://i.pravatar.cc/150',
                    }}
                    classNames={{
                        name: 'font-bold text-gray-900',
                        description: 'text-xs text-green-500 font-medium'
                    }}
                />
            </div>

            <MoreHorizontal
                size={24}
                className='text-gray-500 cursor-pointer hover:text-gray-900 transition'
            />
        </div>
    );
}
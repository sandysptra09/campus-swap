'use client';

import clsx from 'clsx';
import { User, Image as HeroImage } from '@heroui/react';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';

interface MessageBoxProps {
    data: any;
    isOwn?: boolean;
}

export default function MessageBox({ data, isOwn }: MessageBoxProps) {

    const container = clsx(
        'flex gap-3 p-4',
        isOwn && 'justify-end'
    );

    const avatar = clsx(isOwn && 'order-2');

    const body = clsx(
        'flex flex-col gap-2',
        isOwn && 'items-end'
    );

    const message = clsx(
        'text-sm w-fit overflow-hidden',
        isOwn ? 'bg-primary text-white' : 'bg-gray-100',
        data.image ? 'rounded-md p-0' : 'rounded-xl py-2 px-3'
    );

    return (
        <div className={container}>
            <div className={avatar}>
                <User
                    name=''
                    avatarProps={{
                        src: data.sender.avatarUrl || 'https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg',
                        size: 'sm'
                    }}
                />
            </div>

            <div className={body}>
                <div className='flex items-center gap-1'>
                    <div className='text-xs text-gray-400'>
                        {data.sender.fullname}
                    </div>
                    <div className='text-xs text-gray-400'>
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>

                <div className={message}>
                    {data.image ? (
                        <HeroImage
                            alt='Image'
                            height='288'
                            width='288'
                            src={data.image}
                            className='object-cover cursor-pointer hover:scale-110 transition translate'
                        />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
            </div>
        </div>
    );
}
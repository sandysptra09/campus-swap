'use client';

import React, { useState, useEffect, useRef } from 'react'
import { pusherClient } from '@/lib/pusher';
import { find } from 'lodash';
import MessageBox from './conversation-message-box';

interface BodyProps {
    initialMessages: any[];
    currentUser: any;
    conversationId: string;
}

export default function Body({ initialMessages, currentUser, conversationId }: BodyProps) {

    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef?.current?.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll mantap
    }, [messages]);

    useEffect(() => {
        pusherClient.subscribe(conversationId);

        const messageHandler = (message: any) => {
            setMessages((current) => {
                if (current.find((m) => m.id === message.id)) {
                    return current;
                }
                return [...current, message];
            });

            bottomRef?.current?.scrollIntoView();
        };

        pusherClient.bind('messages:new', messageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', messageHandler);
        }
    }, [conversationId]);

    return (
        <div className='flex-1 overflow-y-auto p-4 bg-gray-50'>
            {messages.length === 0 ? (
                <div className='flex justify-center items-center h-full text-gray-400 text-sm'>
                    Say hello to start the conversation! 👋
                </div>
            ) : (
                <div className='flex flex-col gap-4'>
                    {messages.map((message, i) => (
                        <MessageBox
                            key={message.id}
                            isOwn={currentUser.id === message.senderId}
                            data={message}
                        />
                    ))}
                </div>
            )}

            <div ref={bottomRef} className="pt-1" />
        </div>
    );
}
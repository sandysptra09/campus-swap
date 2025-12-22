'use client';

import { useState } from 'react';
import { Button, Input } from '@heroui/react';
import { Image as ImageIcon, Send } from 'lucide-react';
import { UploadButton } from '@/lib/uploadthing';

interface FormProps {
    conversationId: string;
}

export default function Form({ conversationId }: FormProps) {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!message.trim()) return;

        try {
            setIsLoading(true);

            await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message,
                    conversationId: conversationId
                })
            });

            setMessage('');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
            <Button isIconOnly variant='light' radius='full'>
                <ImageIcon size={20} className='text-primary' />
            </Button>

            <form onSubmit={handleSubmit} className='flex items-center gap-2 lg:gap-4 w-full'>
                <Input
                    placeholder='Type a message...'
                    value={message}
                    onValueChange={setMessage}
                    variant='faded'
                    radius='full'
                    className='w-full'
                    autoComplete='off'
                />
                <Button
                    type='submit'
                    isIconOnly
                    color='primary'
                    radius='full'
                    isLoading={isLoading}
                >
                    <Send size={18} />
                </Button>
            </form>
        </div>
    );
}
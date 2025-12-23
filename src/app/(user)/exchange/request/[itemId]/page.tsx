'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { addToast, Button, Card, CardBody, Chip, Divider, Image, Spinner, User } from '@heroui/react';
import { ShieldCheck, AlertCircle, MapPin } from 'lucide-react';
import { DetailedProduct } from '@/types/product';
import ConfirmExchangeModal from '@/components/customs/modals/admin/confirm-exchange-modal';

export default function ExchangeRequestPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const itemId = params?.itemId as string;

    const [item, setItem] = useState<DetailedProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`/api/items/${itemId}`);
                if (!res.ok) throw new Error('Item not found');
                const data = await res.json();
                setItem(data);
            } catch (error) {
                console.error(error);
                router.push('/catalog');
            } finally {
                setLoading(false);
            }
        };

        if (itemId) fetchItem();
    }, [itemId, router]);

    const processExchange = async () => {
        if (!user || !item) return;

        try {
            setSubmitting(true);

            const res = await fetch('/api/transactions/claim', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId: item.id })
            });

            const data = await res.json();

            if (!res.ok) {
                addToast({
                    title: 'Request Failed',
                    description: data.message || 'Failed to request exchange',
                    color: 'danger',

                });
                return;
            }

            addToast({
                title: 'Exchange Requested!',
                description: 'Points held securely. Redirecting...',
                color: 'success',
            });

            setIsConfirmModalOpen(false);

            if (data.transaction && data.transaction.id) {
                router.push(`/user/dashboard/transactions/${data.transaction.id}`);
            } else {
                router.push('/user/dashboard/transactions');
            }

        } catch (error: any) {
            addToast({
                title: 'Error',
                description: 'An error occurred while requesting.',
                color: 'danger',
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || !user) {
        return <div className='h-screen w-full flex items-center justify-center'><Spinner size='lg' /></div>;
    }

    if (!item) return null;

    const isEnoughPoints = user.points >= item.pointValue;
    const remainingPoints = user.points - item.pointValue;

    return (
        <main className='min-h-screen '>
            <div className='max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-10'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-bold text-foreground'>Confirm Exchange</h1>
                    <p className='text-gray-500 text-sm'>Review the item and your point balance before confirming.</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    <div className='lg:col-span-2 space-y-4'>
                        <Card className='shadow-sm border border-gray-100'>
                            <CardBody className='p-6'>
                                <div className='flex flex-col sm:flex-row gap-6'>
                                    <div className='w-full sm:w-40 h-40 shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-200'>
                                        <Image
                                            src={item.imageUrl || 'https://placehold.co/200x200'}
                                            alt={item.title}
                                            className='w-full h-full object-cover'
                                            radius='none'
                                        />
                                    </div>

                                    <div className='flex-1 flex flex-col justify-between'>
                                        <div>
                                            <div className='flex justify-between items-start'>
                                                <div>
                                                    <Chip size='sm' variant='flat' color='success' className='mb-2 uppercase text-xs font-bold'>
                                                        {item.category?.name || 'Item'}
                                                    </Chip>
                                                    <h2 className='text-xl font-bold text-foreground line-clamp-1'>{item.title}</h2>
                                                </div>
                                                <div className='text-right'>
                                                    <span className='text-lg font-bold text-primary block whitespace-nowrap'>{item.pointValue} pts</span>
                                                </div>
                                            </div>

                                            <p className='text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed'>
                                                {item.shortDescription}
                                            </p>
                                        </div>

                                        <div className='mt-4 pt-4 border-t border-gray-100 flex items-center gap-2'>
                                            <span className='text-xs text-gray-400 uppercase font-semibold tracking-wider'>Seller</span>
                                            <User
                                                name={item.owner.fullname}
                                                description='Verified Student'
                                                avatarProps={{ src: item.owner.avatarUrl || undefined }}
                                                classNames={{ name: 'text-sm font-semibold', description: 'text-[10px]' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card className='shadow-sm border border-gray-100 bg-blue-50/50'>
                            <CardBody className='p-4 flex items-start gap-3'>
                                <div className='p-2 bg-blue-100 rounded-lg text-blue-600'>
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className='font-semibold text-gray-900 text-sm'>Meetup Transaction</h4>
                                    <p className='text-sm text-gray-500 mt-1'>
                                        This is a standard CampusSwap transaction. You will need to meet the seller on campus to exchange the item.
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className='lg:col-span-1'>
                        <div className='sticky top-24'>
                            <Card className='shadow-sm border border-gray-100'>
                                <CardBody className='p-6'>
                                    <h3 className='font-bold text-lg mb-4 flex items-center gap-2 text-gray-900'>
                                        Transaction Summary
                                    </h3>

                                    <div className='space-y-3 mb-6'>
                                        <div className='flex justify-between items-center text-sm text-gray-600'>
                                            <span>Your Balance</span>
                                            <span className='font-medium'>{user.points} pts</span>
                                        </div>
                                        <div className='flex justify-between items-center text-sm text-gray-600'>
                                            <span>Item Price</span>
                                            <span className='font-medium text-red-500'>- {item.pointValue} pts</span>
                                        </div>
                                        <Divider className='my-2' />
                                        <div className='flex justify-between items-center text-base font-bold text-gray-900'>
                                            <span>Remaining</span>
                                            <span className={isEnoughPoints ? 'text-green-600' : 'text-red-600'}>
                                                {remainingPoints} pts
                                            </span>
                                        </div>
                                    </div>

                                    {!isEnoughPoints && (
                                        <div className='mb-4 bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-xs flex gap-2'>
                                            <AlertCircle size={16} className='shrink-0' />
                                            <span>You need <b>{Math.abs(remainingPoints)}</b> more points.</span>
                                        </div>
                                    )}

                                    <Button
                                        fullWidth
                                        size='md'
                                        color={isEnoughPoints ? 'primary' : 'danger'}
                                        variant={isEnoughPoints ? 'solid' : 'flat'}
                                        className='font-bold shadow-md'
                                        isDisabled={!isEnoughPoints || submitting}
                                        isLoading={submitting}
                                        onPress={() => setIsConfirmModalOpen(true)}
                                    >
                                        {isEnoughPoints ? 'Confirm Exchange' : 'Insufficient Points'}
                                    </Button>

                                    <div className='mt-4 flex gap-2 text-gray-400 leading-tight'>
                                        <ShieldCheck size={18} className='shrink-0 mt-1' />
                                        <p className='text-sm'>Points held securely until you confirm item receipt.</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmExchangeModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={processExchange}
                isLoading={submitting}
                itemName={item.title}
                itemPoints={item.pointValue}
                userPoints={user.points}
            />
        </main>
    );
}
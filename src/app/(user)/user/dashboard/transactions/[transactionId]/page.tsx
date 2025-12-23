'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    addToast,
    Button,
    Card,
    CardBody,
    Chip,
    Divider,
    Image,
    Spinner,
    User,
} from '@heroui/react';
import {
    CheckCircle,
    XCircle,
    MessageCircle,
    MapPin,
    AlertTriangle,
    Clock,
    ShieldCheck,
    Check,
} from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';
import ConfirmReceivedModal from '@/components/customs/modals/confirm-received-modal';
import CancelOrderModal from '@/components/customs/modals/cancel-order-modal';

export default function TransactionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const transactionId = params?.transactionId as string;

    const [transaction, setTransaction] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [completing, setCompleting] = useState(false);
    const [canceling, setCanceling] = useState(false);

    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const res = await fetch(`/api/transactions/${transactionId}`);
                if (!res.ok) throw new Error('Transaction not found');
                const data = await res.json();
                setTransaction(data);
            } catch (error) {
                console.error(error);
                router.push('/user/dashboard/transactions');
            } finally {
                setLoading(false);
            }
        };

        if (transactionId) fetchTransaction();
    }, [transactionId, router]);

    const handleChat = async (opponentId: string) => {
        try {
            const res = await fetch('/api/conversations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: opponentId }),
            });
            const data = await res.json();
            router.push(`/user/dashboard/conversations/${data.id}`);
        } catch (error) {
            addToast({
                title: 'Error',
                description: 'Failed to start chat',
                color: 'danger'
            });
        }
    };

    const handleComplete = async () => {
        try {
            setCompleting(true);
            const res = await fetch('/api/transactions/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transactionId }),
            });

            if (!res.ok) throw new Error('Failed to complete');

            addToast({
                title: 'Success!',
                description: 'Transaction Completed. Points transferred.',
                color: 'success',
            });

            setIsCompleteModalOpen(false);
            window.location.reload();
        } catch (error) {
            addToast({
                title: 'Error',
                description: 'Something went wrong',
                color: 'danger'
            });
        } finally {
            setCompleting(false);
        }
    };

    const handleCancel = async () => {

        try {
            setCanceling(true);
            const res = await fetch('/api/transactions/cancel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transactionId }),
            });

            if (!res.ok) throw new Error('Failed to cancel');
            addToast({
                title: 'Canceled',
                description: 'Transaction canceled and refunded.',
                color: 'warning',
            });

            setIsCancelModalOpen(false);
            window.location.reload();
        } catch (error) {
            addToast({
                title: 'Error',
                description: 'Something went wrong',
                color: 'danger'
            });
        } finally {
            setCanceling(false);
        }
    };

    if (loading || !user)
        return (
            <div className='flex justify-center items-center h-screen'>
                <Spinner size='lg' />
            </div>
        );
    if (!transaction) return null;

    const isBuyer = user.id === transaction.fromUserId;
    const opponent = isBuyer ? transaction.toUser : transaction.fromUser;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'success';
            case 'CANCELED':
                return 'danger';
            default:
                return 'warning';
        }
    };

    return (
        <div className='max-w-5xl mx-auto p-4 md:p-8 space-y-6 min-h-[calc(100vh-80px)]'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-4'>
                <div>
                    <div className='flex items-center gap-3'>
                        <h1 className='text-xl md:text-2xl font-bold text-gray-900'>
                            Order #{transactionId.slice(0, 8)}
                        </h1>
                        <Chip
                            size='sm'
                            color={getStatusColor(transaction.status)}
                            variant='flat'
                            className='font-bold'
                        >
                            {transaction.status}
                        </Chip>
                    </div>
                    <p className='text-gray-500 text-xs md:text-sm mt-1 flex items-center gap-2'>
                        <Clock size={14} /> Created on{' '}
                        {format(new Date(transaction.createdAt), 'MMMM do, yyyy • p')}
                    </p>
                </div>

                <div className='flex items-center gap-3 bg-white px-3 py-2 rounded-full border border-gray-200 shadow-sm'>
                    <User
                        name={opponent.fullname}
                        description={isBuyer ? 'Seller' : 'Buyer'}
                        avatarProps={{ src: opponent.avatarUrl || undefined, size: 'sm' }}
                        classNames={{
                            name: 'text-sm font-semibold',
                            description: 'text-[10px] uppercase font-bold text-primary',
                        }}
                    />
                    <Button
                        size='sm'
                        isIconOnly
                        variant='light'
                        color='primary'
                        radius='full'
                        onPress={() => handleChat(opponent.id)}
                    >
                        <MessageCircle size={18} />
                    </Button>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

                <div className='lg:col-span-2 space-y-6'>
                    <Card className='shadow-sm border border-gray-100 overflow-visible'>
                        <CardBody className='p-0 flex flex-row'>
                            <div className='w-32 sm:w-40 shrink-0 relative bg-gray-100'>
                                <Image
                                    src={transaction.item.imageUrl}
                                    classNames={{
                                        wrapper: 'w-full h-full',
                                        img: 'w-full object-cover',
                                    }}
                                    radius='none'
                                />
                            </div>
                            <div className='p-4 sm:p-5 flex-1 flex flex-col justify-center'>
                                <div className='flex justify-between items-start mb-1'>
                                    <h3 className='font-bold text-lg text-gray-900 line-clamp-1'>
                                        {transaction.item.title}
                                    </h3>
                                    <span className='font-bold text-primary whitespace-nowrap'>
                                        {transaction.points} pts
                                    </span>
                                </div>
                                <p className='text-sm text-gray-500 line-clamp-2 mb-3'>
                                    {transaction.item.shortDescription ||
                                        'No description provided.'}
                                </p>

                                <div className='flex items-center gap-2 text-xs text-primary bg-green-100 w-fit px-2 py-1 rounded border border-gray-100'>
                                    <ShieldCheck size={12} />
                                    <span>Verified Item</span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <div className='pl-2'>
                        <h3 className='font-bold text-foreground mb-4 text-sm uppercase tracking-wide'>
                            Status History
                        </h3>
                        <div className='space-y-6 border-l-2 border-gray-200 ml-3 pl-6 py-2 relative'>
                            <div className='relative'>
                                <div className='absolute -left-[31px] bg-green-500 rounded-full p-1 text-white shadow-sm ring-4 ring-white'>
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <p className='font-semibold text-sm text-gray-900'>
                                    Exchange Requested
                                </p>
                                <p className='text-xs text-gray-500 mt-0.5'>
                                    Points held securely by system.
                                </p>
                            </div>

                            <div className='relative'>
                                <div
                                    className={clsx(
                                        'absolute -left-[31px] rounded-full p-1 shadow-sm ring-4 ring-white text-white',
                                        transaction.status === 'COMPLETED'
                                            ? 'bg-green-500'
                                            : transaction.status === 'CANCELED'
                                                ? 'bg-gray-300'
                                                : 'bg-blue-500'
                                    )}
                                >
                                    {transaction.status === 'COMPLETED' ? (
                                        <Check size={12} strokeWidth={4} />
                                    ) : (
                                        <MapPin size={12} />
                                    )}
                                </div>
                                <p className='font-semibold text-sm text-gray-900'>
                                    Meetup & Inspection
                                </p>
                                <p className='text-xs text-gray-500 mt-0.5'>
                                    Meet {opponent.fullname} on campus.
                                </p>
                            </div>

                            <div className='relative'>
                                <div
                                    className={clsx(
                                        'absolute -left-[31px] rounded-full p-1 shadow-sm ring-4 ring-white text-white',
                                        transaction.status === 'COMPLETED'
                                            ? 'bg-green-500'
                                            : transaction.status === 'CANCELED'
                                                ? 'bg-red-500'
                                                : 'bg-gray-200 text-gray-400'
                                    )}
                                >
                                    {transaction.status === 'COMPLETED' ? (
                                        <Check size={12} strokeWidth={4} />
                                    ) : transaction.status === 'CANCELED' ? (
                                        <XCircle size={12} />
                                    ) : (
                                        <CheckCircle size={12} />
                                    )}
                                </div>
                                <p
                                    className={clsx(
                                        'font-semibold text-sm',
                                        transaction.status === 'CANCELED'
                                            ? 'text-red-600'
                                            : 'text-gray-900'
                                    )}
                                >
                                    {transaction.status === 'COMPLETED'
                                        ? 'Completed'
                                        : transaction.status === 'CANCELED'
                                            ? 'Canceled'
                                            : 'Confirmation Pending'}
                                </p>
                                <p className='text-xs text-gray-500 mt-0.5'>
                                    {transaction.status === 'COMPLETED'
                                        ? 'Item received.'
                                        : transaction.status === 'CANCELED'
                                            ? 'Refunded.'
                                            : 'Waiting for buyer confirmation.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='lg:col-span-1'>
                    <Card className='shadow-md border border-gray-100 sticky top-6'>
                        <CardBody className='p-5 space-y-4'>
                            <div>
                                <h3 className='font-bold text-foreground mb-1'>Actions</h3>
                                <p className='text-xs text-gray-500'>
                                    Manage your transaction.
                                </p>
                            </div>

                            <Button
                                onPress={() => handleChat(opponent.id)}
                                fullWidth
                                size='sm'
                                radius='sm'
                                variant='bordered'
                                color='primary'
                                className='font-semibold'
                                startContent={<MessageCircle size={18} />}
                            >
                                Chat with {isBuyer ? 'Seller' : 'Buyer'}
                            </Button>

                            <Divider className='my-2' />

                            {transaction.status === 'PENDING' && (
                                <div className='space-y-3'>
                                    {isBuyer && (
                                        <>
                                            <div className='bg-blue-50 border border-blue-100 p-3 rounded-lg flex gap-2 items-start justify-center'>
                                                <AlertTriangle
                                                    className='text-blue-600 shrink-0 mt-0.5'
                                                    size={14}
                                                />
                                                <p className='text-[11px] text-blue-700 leading-tight'>
                                                    Only click <b>Confirm</b> after you have physically
                                                    received the item.
                                                </p>
                                            </div>

                                            <Button
                                                fullWidth
                                                color='success'
                                                size='sm'
                                                className='font-bold text-white shadow-lg shadow-green-200'
                                                onPress={() => setIsCompleteModalOpen(true)}
                                                isLoading={completing}
                                                startContent={<CheckCircle size={18} />}
                                            >
                                                Confirm Received
                                            </Button>
                                        </>
                                    )}

                                    <Button
                                        fullWidth
                                        variant='bordered'
                                        size='sm'
                                        color='danger'
                                        onPress={() => setIsCancelModalOpen(true)}
                                        isDisabled={completing || canceling}
                                        isLoading={canceling}
                                        startContent={<XCircle size={18} />}
                                    >
                                        Cancel Order
                                    </Button>
                                </div>
                            )}

                            {transaction.status === 'COMPLETED' && (
                                <div className='text-center py-2'>
                                    <div className='bg-green-100 text-green-700 p-2 rounded-full w-fit mx-auto mb-2'>
                                        <CheckCircle size={20} />
                                    </div>
                                    <p className='text-sm font-bold text-green-700'>
                                        Transaction Finalized
                                    </p>
                                </div>
                            )}

                            {transaction.status === 'CANCELED' && (
                                <div className='text-center py-2'>
                                    <div className='bg-red-100 text-red-700 p-2 rounded-full w-fit mx-auto mb-2'>
                                        <XCircle size={20} />
                                    </div>
                                    <p className='text-sm font-bold text-red-700'>
                                        Order Canceled
                                    </p>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
            <ConfirmReceivedModal
                isOpen={isCompleteModalOpen}
                onClose={() => setIsCompleteModalOpen(false)}
                onConfirm={handleComplete}
                isLoading={completing}
            />

            <CancelOrderModal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                onConfirm={handleCancel}
                isLoading={canceling}
            />
        </div>
    );
}

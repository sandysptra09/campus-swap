'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/shadcn/ui/card';
import { Button, Spinner, Chip } from '@heroui/react';
import { Wallet, History, Plus, TrendingUp, Lightbulb } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import PointHistoryTable, { PointHistoryItem } from '@/components/customs/tables/point-history-table';
import TopUpModal from '@/components/customs/modals/topup-modal';

export default function PointHistoryPage() {
    const { user, refreshUser } = useAuth();
    const [history, setHistory] = useState<PointHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    const fetchHistory = useCallback(async () => {
        try {
            const res = await fetch('/api/points/history');
            if (res.ok) {
                const data = await res.json();
                setHistory(data);
            }
        } catch (error) {
            console.error('Failed to fetch point history', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const handleTopUpSuccess = async () => {
        await fetchHistory();
        if (refreshUser) await refreshUser();
        else window.location.reload();
    };

    return (
        <div className='flex flex-col gap-8 max-w-5xl mx-auto py-6'>

            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-bold flex items-center gap-2'>
                        <History className='text-primary' />
                        Point History
                    </h1>
                    <p className='text-muted-foreground text-sm mt-1'>
                        Track your earnings and spendings.
                    </p>
                </div>
                <Button
                    color='primary'
                    size='md'
                    radius='full'
                    startContent={<Plus size={18} />}
                    className='font-semibold shadow-md shadow-primary/20'
                    onPress={() => setIsTopUpOpen(true)}
                >
                    Top Up Points
                </Button>
            </div>

            <div className='grid md:grid-cols-3 gap-6'>

                <Card className='shadow-sm border-none bg-gradient-to-br from-primary/10 via-primary/5 to-transparent md:col-span-1 relative overflow-hidden'>
                    <div className='absolute -right-6 -top-6 bg-primary/10 w-24 h-24 rounded-full blur-2xl'></div>
                    <CardContent className='p-6 flex flex-col justify-between h-full relative z-10'>
                        <div className='flex items-center gap-3 text-primary mb-4'>
                            <div className='p-2 bg-white rounded-full shadow-sm'>
                                <Wallet size={20} />
                            </div>
                            <span className='font-bold text-xs uppercase tracking-wider'>My Wallet</span>
                        </div>
                        <div>
                            <div className='text-4xl font-extrabold text-gray-900 flex items-baseline'>
                                {user ? user.points.toLocaleString() : <Spinner size='sm' />}
                                <span className='text-lg font-medium text-gray-500 ml-1'>pts</span>
                            </div>
                            <div className='flex items-center gap-1 mt-2'>
                                <Chip size='sm' color='success' variant='flat' startContent={<TrendingUp size={12} />} className='px-2 h-6'>
                                    Active Balance
                                </Chip>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className='shadow-sm border border-orange-100 bg-orange-50/50 md:col-span-2 flex items-center'>
                    <CardContent className='p-6 flex gap-4 items-start'>
                        <div className='p-3 bg-orange-100 rounded-full text-orange-500 shrink-0'>
                            <Lightbulb size={24} />
                        </div>
                        <div>
                            <p className='mb-1 font-bold text-orange-700 text-lg'>How to earn more points?</p>
                            <p className='text-sm text-gray-600 leading-relaxed'>
                                You can earn points instantly by listing unused items from your dorm room.
                                Every verified item gives you initial value points. Successful transactions also build your reputation score!
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-lg font-bold text-gray-800'>Transaction Log</h2>
                </div>

                <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
                    <PointHistoryTable data={history} loading={loading} />
                </div>
            </div>

            <TopUpModal
                isOpen={isTopUpOpen}
                onClose={() => setIsTopUpOpen(false)}
                onSuccess={handleTopUpSuccess}
            />
        </div>
    );
}
'use client';

import React, { useState } from 'react';
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, addToast, Chip
} from '@heroui/react';
import { Wallet, CheckCircle2, Zap } from 'lucide-react';
import clsx from 'clsx';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const PREDEFINED_AMOUNTS = [50, 100, 200, 500, 1000, 5000];

export default function TopUpModal({ isOpen, onClose, onSuccess }: Props) {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
    const [customAmount, setCustomAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectAmount = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomChange = (val: string) => {
        setCustomAmount(val);
        setSelectedAmount(null);
    };

    const finalAmount = selectedAmount || Number(customAmount);

    const handleTopUp = async () => {
        if (!finalAmount || finalAmount <= 0) return;

        setIsLoading(true);
        try {
            const res = await fetch('/api/points/topup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: finalAmount })
            });

            if (!res.ok) throw new Error('Top up failed');

            addToast({
                title: 'Top Up Successful!',
                description: `You purchased ${finalAmount} points.`,
                color: 'success',
            });

            onSuccess();
            onClose();
        } catch (error) {
            addToast({
                title: 'Error',
                description: 'Failed to top up.',
                color: 'danger'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} backdrop='opaque' size='lg'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>
                            <div className='flex items-center gap-2 text-primary'>
                                <Wallet /> Top Up Points
                            </div>
                            <p className='text-xs text-muted-foreground font-normal'>
                                Add points to your wallet instantly (Sandbox Mode).
                            </p>
                        </ModalHeader>
                        <ModalBody>
                            <div className='space-y-4'>
                                <div>
                                    <p className='text-sm font-semibold mb-2'>Select Amount</p>
                                    <div className='grid grid-cols-3 gap-3'>
                                        {PREDEFINED_AMOUNTS.map((amount) => (
                                            <div
                                                key={amount}
                                                onClick={() => handleSelectAmount(amount)}
                                                className={clsx(
                                                    'cursor-pointer border rounded-xl p-3 flex flex-col items-center justify-center transition-all',
                                                    selectedAmount === amount
                                                        ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                                                        : 'border-default-200 hover:border-primary/50 text-gray-600'
                                                )}
                                            >
                                                <span className='text-lg'>{amount}</span>
                                                <span className='text-[10px] uppercase text-muted-foreground'>pts</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className='text-sm font-semibold mb-2'>Or Enter Custom Amount</p>
                                    <Input
                                        type='number'
                                        placeholder='Min. 10 points'
                                        value={customAmount}
                                        onValueChange={handleCustomChange}
                                        startContent={<span className='text-sm font-bold text-gray-500'>Pts</span>}
                                        variant='bordered'
                                    />
                                </div>

                                <div className='bg-gray-50 p-4 rounded-lg flex justify-between items-center border border-gray-100'>
                                    <div>
                                        <p className='text-xs text-gray-500'>Total Payment</p>
                                        <p className='font-bold text-lg text-gray-900'>
                                            Free (Sandbox)
                                        </p>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-xs text-gray-500'>You will get</p>
                                        <p className='font-bold text-xl text-primary'>
                                            {finalAmount || 0} pts
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='light' onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                color='primary'
                                onPress={handleTopUp}
                                isLoading={isLoading}
                                isDisabled={!finalAmount || finalAmount <= 0}
                                startContent={!isLoading && <Zap size={18} fill='currentColor' />}
                                className='font-bold shadow-lg shadow-primary/20'
                            >
                                Pay Now
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
'use client';

import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Divider,
} from '@heroui/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface ConfirmExchangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    itemPoints: number;
    userPoints: number;
    isLoading?: boolean;
}

export default function ConfirmExchangeModal({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    itemPoints,
    userPoints,
    isLoading = false,
}: ConfirmExchangeModalProps) {
    const remainingPoints = userPoints - itemPoints;

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            backdrop='opaque'
            placement='center'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>
                            <div className='flex items-center gap-2 text-primary'>
                                <ShoppingBag size={24} />
                                Confirm Exchange Request
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <p className='text-sm text-gray-600 mb-4'>
                                You are about to request an exchange for <strong>'{itemName}'</strong>.
                                Please review your point balance.
                            </p>

                            <div className='bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2'>
                                <div className='flex justify-between text-sm'>
                                    <span className='text-gray-500'>Current Balance</span>
                                    <span className='font-semibold'>{userPoints} pts</span>
                                </div>
                                <div className='flex justify-between text-sm text-danger'>
                                    <span>Item Cost</span>
                                    <span className='font-semibold'>- {itemPoints} pts</span>
                                </div>
                                <Divider className='my-2' />
                                <div className='flex justify-between text-base font-bold'>
                                    <span>Balance After</span>
                                    <span className={remainingPoints < 0 ? 'text-danger' : 'text-success'}>
                                        {remainingPoints} pts
                                    </span>
                                </div>
                            </div>

                            <p className='text-xs text-gray-400 mt-2'>
                                * Points will be held securely until you confirm item receipt.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='light' onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                color='primary'
                                onPress={onConfirm}
                                isLoading={isLoading}
                                className='font-bold'
                                endContent={!isLoading}
                            >
                                Confirm & Request
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
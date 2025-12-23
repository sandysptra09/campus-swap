'use client';

import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from '@heroui/react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export default function ConfirmReceivedModal({ isOpen, onClose, onConfirm, isLoading }: Props) {
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
                        <ModalHeader className='flex flex-col gap-1 text-success'>
                            <div className='flex items-center gap-2'>
                                <CheckCircle2 size={24} />
                                Confirm Item Receipt
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <p className='text-sm text-gray-600'>
                                By confirming, you agree that you have physically received the item and inspected it.
                            </p>
                            <div className='bg-yellow-50 border border-yellow-200 p-3 rounded-lg flex gap-3 items-start'>
                                <AlertTriangle className='text-yellow-600 shrink-0 mt-0.5' size={16} />
                                <p className='text-xs text-yellow-700 leading-relaxed'>
                                    This action is <b>irreversible</b>. The points held in escrow will be immediately transferred to the seller's wallet.
                                </p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='light' onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                color='success'
                                onPress={onConfirm}
                                isLoading={isLoading}
                                className='font-bold text-white shadow-lg shadow-green-100'
                            >
                                Yes, I Received It
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
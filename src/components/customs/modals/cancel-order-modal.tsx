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
import { XCircle } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export default function CancelOrderModal({ isOpen, onClose, onConfirm, isLoading }: Props) {
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
                        <ModalHeader className='flex flex-col gap-1 text-danger'>
                            <div className='flex items-center gap-2'>
                                <XCircle size={24} />
                                Cancel Order
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <p className='text-sm text-gray-600'>
                                Are you sure you want to cancel this order?
                            </p>
                            <ul className='list-disc list-inside text-xs text-gray-500 space-y-1 ml-1'>
                                <li>The transaction will be terminated.</li>
                                <li>All points held in escrow will be fully refunded to the buyer.</li>
                                <li>The item will be marked as available again.</li>
                            </ul>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='light' onPress={onClose}>
                                Keep Order
                            </Button>
                            <Button
                                color='danger'
                                onPress={onConfirm}
                                isLoading={isLoading}
                                className='font-bold'
                            >
                                Yes, Cancel Order
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
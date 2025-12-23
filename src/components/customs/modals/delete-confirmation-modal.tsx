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
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    isLoading?: boolean;
}

export default function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Deletion',
    description = 'Are you sure you want to delete this item? This action cannot be undone.',
    isLoading = false,
}: DeleteConfirmationModalProps) {
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
                                <AlertTriangle size={24} />
                                {title}
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <p className='text-gray-600'>
                                {description}
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='light' onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                color='danger'
                                onPress={onConfirm}
                                isLoading={isLoading}
                                className='font-semibold'
                            >
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
'use client'

import React, { useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Snippet,
    Chip,
    Avatar,
    Divider,
    Image,
} from '@heroui/react'
import { CheckCircle2, XCircle, Calendar, User } from 'lucide-react'

type PendingItem = {
    id: string
    title: string
    slug: string
    imageUrl?: string
    shortDescription?: string
    owner: { fullname: string }
    pointValue: number
}

type Props = {
    open: boolean
    onClose: () => void
    item: PendingItem | null
    onApprove: (id: string) => Promise<void>
    onReject: (id: string) => Promise<void>
}

export default function ItemVerificationModal({
    open,
    onClose,
    item,
    onApprove,
    onReject
}: Props) {
    const [loadingApprove, setLoadingApprove] = useState(false)
    const [loadingReject, setLoadingReject] = useState(false)

    if (!item) return null

    const handleApprove = async () => {
        setLoadingApprove(true)
        await onApprove(item.id)
        setLoadingApprove(false)
        onClose()
    }

    const handleReject = async () => {
        setLoadingReject(true)
        await onReject(item.id)
        setLoadingReject(false)
        onClose()
    }

    return (
        <Modal size='2xl' isOpen={open} onClose={onClose} placement='center'>
            <ModalContent>
                <ModalHeader className='flex flex-col gap-1'>
                    Verify Item Request
                </ModalHeader>
                <ModalBody>
                    <div className='flex flex-col md:flex-row gap-6'>
                        <div className='w-full md:w-2/5 flex flex-col gap-2'>
                            <div className='border border-default-200 rounded-xl p-1 shadow-sm bg-default-50'>
                                <Image
                                    src={item.imageUrl || 'https://via.placeholder.com/300'}
                                    alt={item.title}
                                    isZoomed
                                    className='w-full object-cover rounded-lg'
                                    radius='lg'
                                />
                            </div>
                            <div className='flex justify-between items-center mt-2'>
                                <span className='text-xs font-semibold text-gray-500 uppercase'>Value</span>
                                <span className='text-lg font-bold text-primary'>{item.pointValue} pts</span>
                            </div>
                        </div>

                        <div className='w-full md:w-3/5 flex flex-col gap-3'>
                            <div>
                                <h3 className='text-xl font-bold text-gray-800'>{item.title}</h3>
                            </div>
                            <Divider />
                            <div>
                                <span className='text-xs font-semibold text-gray-500 uppercase mb-1 block'>Description</span>
                                <p className='text-sm text-gray-600 leading-relaxed'>
                                    {item.shortDescription || 'No description provided.'}
                                </p>
                            </div>

                            <div className='mt-auto bg-default-100 p-3 rounded-lg borde flex items-center gap-3'>
                                <div className='bg-white p-1 rounded-full border border-blue-100'>
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className='text-xs font-bold text-gray-500'>Submitted by</p>
                                    <p className='text-sm font-semibold text-foreground'>{item.owner.fullname}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className='text-white bg-destructive'
                        variant='flat'
                        onPress={handleReject}
                        isLoading={loadingReject}
                        isDisabled={loadingApprove}
                        startContent={!loadingReject && <XCircle size={18} />}
                    >
                        Reject
                    </Button>
                    <Button
                        className='text-white bg-primary'
                        onPress={handleApprove}
                        isLoading={loadingApprove}
                        isDisabled={loadingReject}
                        startContent={!loadingApprove && <CheckCircle2 size={18} />}
                    >
                        Approve
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
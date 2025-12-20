'use client'

import React from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    User,
    Tabs,
    Tab,
    Chip,
    Card,
    CardBody,
    Avatar
} from '@heroui/react'
import { Package, Heart, ArrowRightLeft, Calendar } from 'lucide-react'

type UserDetail = {
    id: string
    fullname: string
    email: string
    avatarUrl: string | null
    createdAt: string
    items: { id: string; title: string; status: string; verificationStatus: string }[]
    wishlist: { item: { title: string } }[]
    sentTx: any[]
    receivedTx: any[]
}

type Props = {
    open: boolean
    onClose: () => void
    user: UserDetail | null
    loading: boolean
}

export default function UserDetailsModal({ open, onClose, user, loading }: Props) {
    if (!user && !loading) return null

    return (
        <Modal isOpen={open} onClose={onClose} size='2xl' scrollBehavior='inside'>
            <ModalContent>
                <ModalHeader className='flex flex-col gap-1'>User Details</ModalHeader>
                <ModalBody>
                    {loading ? (
                        <div className='py-10 text-center'>Loading user details...</div>
                    ) : user ? (
                        <div className='flex flex-col gap-6'>

                            <div className='flex items-center justify-between bg-default-50 p-4 rounded-xl border border-default-200'>
                                <div className='flex items-center gap-4'>
                                    <Avatar
                                        src={user.avatarUrl || undefined}
                                        size="lg"
                                        isBordered
                                        className='flex-shrink-0'
                                    />

                                    <div className='flex flex-col gap-1'>
                                        <p className='font-bold text-base leading-none text-gray-800'>
                                            {user.fullname}
                                        </p>
                                        <p className='text-xs text-gray-500'>
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-xs text-muted-foreground uppercase font-bold'>Joined Date</p>
                                    <div className='flex items-center gap-1 text-sm'>
                                        <Calendar size={14} />
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <Tabs aria-label='User Activities' color='primary' variant='underlined'>
                                <Tab
                                    key='items'
                                    title={
                                        <div className='flex items-center gap-2'>
                                            <Package size={16} />
                                            <span>Items ({user.items.length})</span>
                                        </div>
                                    }
                                >
                                    <div className='flex flex-col gap-2 mt-2'>
                                        {user.items.length === 0 && <p className='text-sm text-gray-400'>No items posted.</p>}
                                        {user.items.map((item) => (
                                            <Card key={item.id} shadow='none' className='border border-default-200'>
                                                <CardBody className='flex flex-row justify-between items-center py-2'>
                                                    <span className='font-medium text-sm'>{item.title}</span>
                                                    <div className='flex gap-2'>
                                                        <Chip size='sm' variant='flat' color={item.status === 'AVAILABLE' ? 'success' : 'danger'} >{item.status}</Chip>
                                                        <Chip
                                                            size='sm'
                                                            variant='dot'
                                                            color={item.verificationStatus === 'APPROVED' ? 'success' : 'warning'}
                                                        >
                                                            {item.verificationStatus}
                                                        </Chip>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        ))}
                                    </div>
                                </Tab>

                                <Tab
                                    key='wishlist'
                                    title={
                                        <div className='flex items-center gap-2'>
                                            <Heart size={16} />
                                            <span>Wishlist ({user.wishlist.length})</span>
                                        </div>
                                    }
                                >
                                    <ul className='list-disc list-inside text-sm space-y-1 text-gray-600 mt-2'>
                                        {user.wishlist.length === 0 && <p className='text-gray-400'>Wishlist empty.</p>}
                                        {user.wishlist.map((w, i) => (
                                            <li key={i}>{w.item.title}</li>
                                        ))}
                                    </ul>
                                </Tab>

                                <Tab
                                    key='transactions'
                                    title={
                                        <div className='flex items-center gap-2'>
                                            <ArrowRightLeft size={16} />
                                            <span>Transactions</span>
                                        </div>
                                    }
                                >
                                    <div className='grid grid-cols-2 gap-4 mt-2'>
                                        <div className='bg-green-50 p-3 rounded-lg'>
                                            <p className='text-xs font-bold text-primary uppercase'>Incoming (Sales)</p>
                                            <p className='text-2xl font-bold'>{user.receivedTx?.length || 0}</p>
                                        </div>
                                        <div className='bg-blue-50 p-3 rounded-lg'>
                                            <p className='text-xs font-bold text-blue-700 uppercase'>Outgoing (Buys)</p>
                                            <p className='text-2xl font-bold'>{user.sentTx?.length || 0}</p>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>

                        </div>
                    ) : null}
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' variant='light' onPress={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
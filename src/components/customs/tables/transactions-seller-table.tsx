'use client';

import React from 'react'

import { useRouter } from 'next/navigation';
import {
    Image,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Chip,
} from '@heroui/react';
import { format } from 'date-fns';
import { MoreHorizontal, Eye, Check, X, MessageCircle } from 'lucide-react';

interface Props {
    transactions: any[];
    loading: boolean;
}

export default function TransactionsSellerTable({ transactions, loading }: Props) {

    const router = useRouter();

    const handleChat = async (buyerId: string) => {
        try {
            const res = await fetch('/api/conversations', {
                method: 'POST',
                body: JSON.stringify({ userId: buyerId })
            });
            const data = await res.json();
            router.push(`/user/dashboard/conversations/${data.id}`);
        } catch (error) {
            alert('Failed to start chat');
        }
    };

    const handleReject = async (txId: string) => {
        if (!confirm('Reject this request? Points will be refunded to buyer.')) return;
        try {
            const res = await fetch('/api/transactions/cancel', {
                method: 'POST',
                body: JSON.stringify({ transactionId: txId })
            });
            if (res.ok) window.location.reload();
        } catch (error) {
            alert('Failed to reject');
        }
    };

    if (loading) return <div className='p-4 text-center'>Loading transactions...</div>;

    return (
        <Table
            aria-label='Seller Transactions Table'
        >
            <TableHeader>
                <TableColumn>BUYER</TableColumn>
                <TableColumn>REQUESTED ITEM</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>REQUESTED AT</TableColumn>
                <TableColumn className='text-right'>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={'No incoming requests'}>
                {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                        <TableCell>
                            {tx.fromUser.fullname}
                        </TableCell>
                        <TableCell>
                            <div className='flex items-center gap-3'>
                                <Image
                                    radius='full'
                                    src={tx.item.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'}
                                    alt='Item Image'
                                    className='w-12 h-12 object-cover hidden md:block'
                                />
                                <p className='font-medium'>Item Name</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Chip
                                size='sm'
                                variant='flat'
                                color={tx.status === 'COMPLETED' ? 'success' : tx.status === 'CANCELED' ? 'danger' : 'warning'}
                            >
                                {tx.status}
                            </Chip>
                        </TableCell>
                        <TableCell>
                            {format(new Date(tx.createdAt), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell className='text-right'>
                            <Dropdown placement='left-start'>
                                <DropdownTrigger>
                                    <Button isIconOnly variant='light'>
                                        <MoreHorizontal className='w-5 h-5' />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label='Actions Menu'>
                                    <DropdownItem
                                        onPress={() => router.push(`/user/dashboard/transactions/${tx.id}`)}
                                        key={'view-details'} startContent={<Eye className='w-4 h-4' />}
                                    >
                                        View Details
                                    </DropdownItem>
                                    <DropdownItem
                                        key={'chat-buyer'} startContent={<MessageCircle className='w-4 h-4' />}
                                        onPress={() => handleChat(tx.fromUser.id)}
                                    >
                                        Chat Buyer
                                    </DropdownItem>
                                    <DropdownItem key={'approve'} startContent={<Check className='w-4 h-4' />} className='text-primary' color='primary' >
                                        Approve
                                    </DropdownItem>
                                    <DropdownItem
                                        key={'reject'} startContent={<X className='w-4 h-4' />} className='text-danger' color='danger'
                                        onPress={() => handleReject(tx.id)}
                                    >
                                        Reject
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

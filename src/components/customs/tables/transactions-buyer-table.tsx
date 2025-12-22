'use client';

import React from 'react'

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
import { useRouter } from 'next/navigation';
import { Eye, X, MoreHorizontal, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
    transactions: any[];
    loading: boolean;
}

export default function TransactionsBuyerTable({ transactions, loading }: Props) {

    const router = useRouter();

    const handleChat = async (sellerId: string) => {
        try {
            const res = await fetch('/api/conversations', {
                method: 'POST',
                body: JSON.stringify({ userId: sellerId })
            });
            const data = await res.json();
            router.push(`/user/dashboard/conversations/${data.id}`);
        } catch (error) {
            alert('Failed to start chat');
        }
    };

    const handleCancel = async (txId: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const res = await fetch('/api/transactions/cancel', {
                method: 'POST',
                body: JSON.stringify({ transactionId: txId })
            });
            if (res.ok) window.location.reload();
        } catch (error) {
            alert('Failed to cancel');
        }
    };

    if (loading) return <div className='p-4 text-center'>Loading transactions...</div>;

    return (
        <Table
            aria-label='Buyer Transactions Table'
        >
            <TableHeader>
                <TableColumn>ITEM</TableColumn>
                <TableColumn>OWNER</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>LAST UPDATED</TableColumn>
                <TableColumn className='text-right'>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody
                emptyContent='No transactions found'
            >
                {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                        <TableCell>
                            <div className='flex items-center gap-3'>
                                <Image
                                    radius='full'
                                    src={tx.item.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'}
                                    alt='Item Image'
                                    className='w-12 h-12 object-cover hidden md:block'
                                />
                                <p className='font-medium'>{tx.item.title}</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            {tx.toUser.fullname}
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
                                        key={'view'} startContent={<Eye className='w-4 h-4' />}
                                        onPress={() => router.push(`/user/dashboard/transactions/${tx.id}`)}
                                    >
                                        View Details
                                    </DropdownItem>
                                    <DropdownItem
                                        key={'chat-seller'} startContent={<MessageCircle className='w-4 h-4' />}
                                        onPress={() => handleChat(tx.toUser.id)}
                                    >
                                        Chat Seller
                                    </DropdownItem>
                                    <DropdownItem
                                        key={'delete'} startContent={<X className='w-4 h-4' />} className='text-danger' color='danger'
                                        onPress={() => handleCancel(tx.id)}
                                    >
                                        Cancel Request
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

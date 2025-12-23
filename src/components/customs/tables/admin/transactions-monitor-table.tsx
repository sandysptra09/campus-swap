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
    Button,
    Chip,
    User,
    Spinner,
    Tooltip
} from '@heroui/react';
import { CheckCircle, Clock, Eye, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
    transactions: any[];
    loading: boolean;
}

export default function TransactionsMonitorTable({ transactions, loading }: Props) {

    const router = useRouter();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'success';
            case 'CANCELED': return 'danger';
            default: return 'warning';
        }
    };

    return (
        <Table
            aria-label='Transactions Monitor Table'

        >
            <TableHeader>
                <TableColumn>TRANSACTION ID</TableColumn>
                <TableColumn>ITEM</TableColumn>
                <TableColumn>BUYER</TableColumn>
                <TableColumn>SELLER</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn className='text-right'>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody
                items={transactions}
                isLoading={loading}
                loadingContent={<Spinner label='Loading transactions...' />}
                emptyContent='No transactions found.'
            >
                {(tx) => (
                    <TableRow key={tx.id}>
                        <TableCell>
                            <div>
                                <p className='font-bold text-gray-700'>#{tx.id.slice(0, 8)}</p>
                                <p className='text-[10px] text-gray-400'>
                                    {format(new Date(tx.createdAt), 'MMM d, yyyy • HH:mm')}
                                </p>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className='flex items-center gap-3'>
                                <Image
                                    radius='md'
                                    src={tx.item.imageUrl || 'https://placehold.co/100'}
                                    alt={tx.item.title}
                                    className='w-10 h-10 object-cover border border-gray-200'
                                />
                                <div>
                                    <p className='font-medium text-sm line-clamp-1 w-32'>{tx.item.title}</p>
                                    <p className='text-xs text-primary font-bold'>{tx.item.pointValue} pts</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <User
                                name={tx.fromUser.fullname}
                                avatarProps={{ src: tx.fromUser.avatarUrl, size: 'sm' }}
                                classNames={{ name: 'text-xs', description: 'text-[10px]' }}
                            />
                        </TableCell>
                        <TableCell>
                            <User
                                name={tx.toUser.fullname}
                                avatarProps={{ src: tx.toUser.avatarUrl, size: 'sm' }}
                                classNames={{ name: 'text-xs', description: 'text-[10px]' }}
                            />
                        </TableCell>
                        <TableCell>
                            <Chip
                                size='sm'
                                variant='flat'
                                color={getStatusColor(tx.status)}
                                startContent={
                                    tx.status === 'COMPLETED' ? <CheckCircle size={12} /> :
                                        tx.status === 'CANCELED' ? <XCircle size={12} /> :
                                            <Clock size={12} />
                                }
                            >
                                {tx.status}
                            </Chip>
                        </TableCell>
                        <TableCell className='text-right'>
                            <Tooltip content='View Details'>
                                <Button
                                    isIconOnly
                                    variant='light'
                                    size='sm'
                                    color='default'
                                    onPress={() => router.push(`/user/dashboard/transactions/${tx.id}`)}
                                >
                                    <Eye size={18} className='text-gray-500' />
                                </Button>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

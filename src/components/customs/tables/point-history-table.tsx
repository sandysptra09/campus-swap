'use client';

import React from 'react';
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Spinner
} from '@heroui/react';
import { TrendingUp, TrendingDown, ArrowRightLeft } from 'lucide-react';
import clsx from 'clsx';

export type PointHistoryItem = {
    id: string;
    amount: number;
    type: 'EARN' | 'SPEND' | 'TOPUP' | 'REFUND';
    description: string | null;
    createdAt: string;
};

interface Props {
    data: PointHistoryItem[];
    loading: boolean;
}

export default function PointHistoryTable({ data, loading }: Props) {

    if (loading) {
        return <div className='flex justify-center p-8'><Spinner label='Loading history...' /></div>;
    }

    const getFlowStyle = (type: string) => {
        const positives = ['EARN', 'TOPUP', 'REFUND'];
        if (positives.includes(type)) {
            return {
                color: 'text-green-600',
                prefix: '+',
                chipColor: 'success' as const,
                icon: <TrendingUp size={16} className='text-green-600' />
            };
        }
        return {
            color: 'text-red-600',
            prefix: '-',
            chipColor: 'danger' as const,
            icon: <TrendingDown size={16} className='text-red-600' />
        };
    };

    return (
        <Table aria-label='Point History Table' className='border border-default-200 rounded-xl' shadow='sm'>
            <TableHeader>
                <TableColumn>DATE</TableColumn>
                <TableColumn>TYPE</TableColumn>
                <TableColumn>DESCRIPTION</TableColumn>
                <TableColumn align='end'>AMOUNT</TableColumn>
            </TableHeader>
            <TableBody emptyContent='No point history found.' items={data}>
                {(item) => {
                    const style = getFlowStyle(item.type);
                    return (
                        <TableRow key={item.id}>
                            <TableCell className='text-gray-500 text-sm whitespace-nowrap'>
                                {new Date(item.createdAt).toLocaleDateString()}
                                <span className='text-xs ml-1 text-gray-400'>
                                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    size='sm'
                                    variant='flat'
                                    color={style.chipColor}
                                    startContent={style.icon}
                                    className='capitalize font-semibold pl-1'
                                >
                                    {item.type.toLowerCase()}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <p className='text-sm text-foreground line-clamp-1'>
                                    {item.description || '-'}
                                </p>
                            </TableCell>
                            <TableCell>
                                <span className={clsx('font-bold text-base', style.color)}>
                                    {style.prefix}{item.amount} pts
                                </span>
                            </TableCell>
                        </TableRow>
                    );
                }}
            </TableBody>
        </Table>
    );
}
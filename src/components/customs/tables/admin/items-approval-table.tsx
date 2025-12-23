import React from 'react'

import {
    Image,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Button,
} from '@heroui/react';
import { FileCog } from 'lucide-react';

export type PendingItem = {
    id: string
    title: string
    slug: string
    createdAt: string
    pointValue: number
    imageUrl?: string
    shortDescription?: string
    owner: {
        id: string
        fullname: string
    }
    category: {
        name: string
    }
}

interface Props {
    data: PendingItem[]
    loading: boolean
    onVerify?: (item: PendingItem) => void
}

export default function ItemsApprovalTable({ data, loading, onVerify }: Props) {
    return (
        <Table
            aria-label='Items Approval Table'
            className=' border border-default-200 rounded-xl'
        >
            <TableHeader>
                <TableColumn>ITEM</TableColumn>
                <TableColumn>VERIFICATION STATUS</TableColumn>
                <TableColumn>OWNER</TableColumn>
                <TableColumn>POINT</TableColumn>
                <TableColumn>POSTED AT</TableColumn>
                <TableColumn className='text-right'>ACTIONS</TableColumn>
            </TableHeader>
            {(
                <TableBody emptyContent='No items found'>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <div className='flex items-center gap-3'>
                                    <div>
                                        <p className='font-medium'>{item.title}</p>
                                        <p className='text-xs text-muted-foreground'>
                                            {item.category.name}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell>
                                <Chip size='sm' className='bg-yellow-100 text-yellow-600'>
                                    Pending
                                </Chip>
                            </TableCell>
                            <TableCell>{item.owner.fullname}</TableCell>
                            <TableCell>{item.pointValue} Points</TableCell>
                            <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>

                            <TableCell className='text-right'>
                                {onVerify ? (
                                    <Button
                                        isIconOnly
                                        variant='light'
                                        color='primary'
                                        onPress={() => onVerify(item)}
                                    >
                                        <FileCog className='w-5 h-5' />
                                    </Button>
                                ) : (
                                    <span className='text-gray-300'>-</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            )}
        </Table >
    )
}

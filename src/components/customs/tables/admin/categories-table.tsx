'use client'

import React from 'react'
import {
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
} from '@heroui/react';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';

export type Category = {
    id: string
    name: string
    _count: {
        items: number
    }
}

interface Props {
    data: Category[]
    loading: boolean
    onEdit: (category: Category) => void
    onDelete: (category: Category) => void
}

export default function CategoriesTable({ data, loading, onEdit, onDelete }: Props) {
    return (
        <Table
            aria-label='Categories Table'
            className='border border-default-200 rounded-xl'
        >
            <TableHeader>
                <TableColumn width={50}>NO</TableColumn>
                <TableColumn>CATEGORY NAME</TableColumn>
                <TableColumn className='text-right'>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody
                isLoading={loading}
                emptyContent='No categories found'>
                {data.map((category, index) => (
                    <TableRow key={category.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className='font-medium'>{category.name}</TableCell>
                        <TableCell className='text-right'>
                            <Dropdown placement='left-start'>
                                <DropdownTrigger>
                                    <Button isIconOnly variant='light'>
                                        <MoreHorizontal className='w-5 h-5' />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label='Actions'>
                                    <DropdownItem
                                        key='edit'
                                        startContent={<Edit className='w-4 h-4' />}
                                        onPress={() => onEdit(category)}
                                    >
                                        Edit
                                    </DropdownItem>

                                    <DropdownItem
                                        key='delete'
                                        className='text-danger'
                                        color='danger'
                                        startContent={<Trash2 className='w-4 h-4' />}
                                        isDisabled={category._count.items > 0}
                                        onPress={() => onDelete(category)}
                                    >
                                        Delete
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
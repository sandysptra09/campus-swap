import React, { useState, useEffect } from 'react'

import Link from 'next/link';
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
    addToast,
    Spinner
} from '@heroui/react';
import { MoreHorizontal, Edit, Eye, Trash2 } from 'lucide-react';
import DeleteConfirmationModal from '../modals/delete-confirmation-modal';

export default function MyItemsTable() {

    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetch('/api/items/my')
            .then(res => res.json())
            .then(data => setItems(data))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <p className='text-sm text-muted-foreground'>Loading items...</p>
    }

    const verificationChip = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return <Chip size='sm' className='bg-green-100 text-green-600'>Approved</Chip>
            case 'REJECTED':
                return <Chip size='sm' className='bg-red-100 text-red-600'>Rejected</Chip>
            default:
                return <Chip size='sm' className='bg-yellow-100 text-yellow-600'>Pending</Chip>
        }
    }

    const statusChip = (status: string) => {
        switch (status) {
            case 'AVAILABLE':
                return <Chip size='sm' className='bg-green-100 text-green-600'>Available</Chip>
            case 'CLAIMED':
                return <Chip size='sm' className='bg-blue-100 text-blue-600'>In Claim</Chip>
            default:
                return <Chip size='sm' className='bg-gray-100 text-gray-600'>Completed</Chip>
        }
    }

    const initiateDelete = (itemId: string) => {
        setItemToDelete(itemId);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        setIsDeleting(true);

        try {
            const res = await fetch(`/api/items/${itemToDelete}`, {
                method: 'DELETE',
            })

            if (!res.ok) {
                const err = await res.json()
                addToast({
                    title: 'Delete Failed',
                    description: err.message,
                    color: 'danger',
                });
                return
            }

            addToast({
                title: 'Item Deleted',
                description: 'Your item has been removed successfully.',
                color: 'success',
            });

            setItems(prev => prev.filter(item => item.id !== itemToDelete));
            setIsDeleteModalOpen(false);

        } catch (error) {
            console.error(error)
            addToast({
                title: 'Error',
                description: 'Something went wrong',
                color: 'danger'
            });
        } finally {
            setIsDeleting(false);
            setItemToDelete(null);
        }
    }

    if (loading) return <div className='flex justify-center p-4'><Spinner label='Loading items...' /></div>;

    return (
        <>
            <Table
                aria-label='My Items Table'
                className=' border border-default-200 rounded-xl'
            >
                <TableHeader>
                    <TableColumn>ITEM</TableColumn>
                    <TableColumn>VERIFICATION STATUS</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>WISHLIST</TableColumn>
                    <TableColumn>POSTED AT</TableColumn>
                    <TableColumn className='text-right'>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent='No items found'>
                    {items.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <div className='flex items-center gap-3'>
                                    <Image
                                        radius='full'
                                        src={item.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'}
                                        className='w-12 h-12 object-cover hidden md:block'
                                    />
                                    <div>
                                        <p className='font-medium'>{item.title}</p>
                                        <p className='text-xs text-muted-foreground'>
                                            {item.category?.name}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell>{verificationChip(item.verificationStatus)}</TableCell>
                            <TableCell>{statusChip(item.status)}</TableCell>
                            <TableCell>{item.wishlistCount || 0}</TableCell>
                            <TableCell>
                                {new Date(item.createdAt).toLocaleDateString()}
                            </TableCell>

                            <TableCell className='text-right'>
                                <Dropdown placement='left-start'>
                                    <DropdownTrigger>
                                        <Button isIconOnly variant='light'>
                                            <MoreHorizontal className='w-5 h-5' />
                                        </Button>
                                    </DropdownTrigger>

                                    <DropdownMenu aria-label='Actions'>
                                        <DropdownItem
                                            key={'view'}
                                            as={Link}
                                            href={`/user/dashboard/my-items/${item.slug}`}
                                            startContent={<Eye className='w-4 h-4' />}
                                        >
                                            View
                                        </DropdownItem>

                                        <DropdownItem
                                            key={'edit'}
                                            as={Link}
                                            href={`/user/dashboard/my-items/edit-item/${item.id}`}
                                            startContent={<Edit className='w-4 h-4' />}
                                        >
                                            Edit
                                        </DropdownItem>

                                        <DropdownItem
                                            key='delete'
                                            className='text-danger'
                                            color='danger'
                                            startContent={<Trash2 className='w-4 h-4' />}
                                            onPress={() => initiateDelete(item.id)}
                                        >
                                            Delete
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                isLoading={isDeleting}
                title='Delete Item'
                description='Are you sure you want to delete this item? It will be removed from the catalog permanently.'
            />
        </>

    )
}

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
    Switch,
    Button,
} from '@heroui/react';
import { MoreHorizontal, Eye, Trash2 } from 'lucide-react';

export type UserListItem = {
    id: string
    avatarUrl: string | null
    fullname: string
    email: string
    isActive: boolean
    createdAt: string
    _count: {
        items: number
        wishlist: number
        sentTx: number
        receivedTx: number
    }
}

interface Props {
    data: UserListItem[]
    loading: boolean
    onView: (user: UserListItem) => void
    onToggleStatus: (user: UserListItem) => void
    onDelete: (user: UserListItem) => void
}

export default function UserManageTable({ data, loading, onView, onToggleStatus, onDelete }: Props) {
    return (
        <Table
            aria-label='User Management Table'
            className='border border-default-200 rounded-xl'
        >
            <TableHeader>
                <TableColumn>Avatar</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Items</TableColumn>
                <TableColumn>Joined At</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody
                isLoading={loading}
                emptyContent='No users found'
            >
                {data.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <Image
                                alt='User Avatar'
                                className='w-10 h-10 rounded-full'
                                src='/path/to/avatar.jpg'
                            />
                        </TableCell>
                        <TableCell>{user.fullname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            <Switch
                                size='sm'
                                color='primary'
                                isSelected={user.isActive}
                                onValueChange={() => onToggleStatus(user)}
                                aria-label="Toggle status" />
                        </TableCell>
                        <TableCell>{user._count.items}</TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
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
                                        startContent={<Eye className='w-4 h-4' />}
                                        onPress={() => onView(user)}
                                    >
                                        View Details
                                    </DropdownItem>

                                    <DropdownItem
                                        key='delete'
                                        className='text-danger'
                                        color='danger'
                                        startContent={<Trash2 className='w-4 h-4' />}
                                        onPress={() => onDelete(user)}
                                    >
                                        Delete User
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

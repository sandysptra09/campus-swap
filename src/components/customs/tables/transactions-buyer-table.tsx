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
import { Eye, X, MoreHorizontal, MessageCircle } from 'lucide-react';

export default function TransactionsBuyerTable() {
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
            <TableBody>
                <TableRow key='1'>
                    <TableCell>
                        <div className='flex items-center gap-3'>
                            <Image
                                radius='full'
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'}
                                alt='Item Image'
                                className='w-12 h-12 object-cover hidden md:block'
                            />
                            <p className='font-medium'>Item Name</p>
                        </div>
                    </TableCell>
                    <TableCell>
                        Item Owner
                    </TableCell>
                    <TableCell>
                        <Chip size='sm' className='text-yellow-600 bg-yellow-100'>
                            Pending
                        </Chip>
                    </TableCell>
                    <TableCell>
                        2025-01-14
                    </TableCell>
                    <TableCell className='text-right'>
                        <Dropdown placement='left-start'>
                            <DropdownTrigger>
                                <Button isIconOnly variant='light'>
                                    <MoreHorizontal className='w-5 h-5' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label='Actions Menu'>
                                <DropdownItem key={'view'} startContent={<Eye className='w-4 h-4' />} >
                                    View Details
                                </DropdownItem>
                                <DropdownItem key={'chat-seller'} startContent={<MessageCircle className='w-4 h-4' />} >
                                    Chat Seller
                                </DropdownItem>
                                <DropdownItem key={'delete'} startContent={<X className='w-4 h-4' />} className='text-danger' color='danger'>
                                    Cancel Request
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </TableCell>
                </TableRow>
                <TableRow key='2'>
                    <TableCell>
                        <div className='flex items-center gap-3'>
                            <Image
                                radius='full'
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'}
                                alt='Item Image'
                                className='w-12 h-12 object-cover hidden md:block'
                            />
                            <p className='font-medium'>Item Name</p>
                        </div>
                    </TableCell>
                    <TableCell>
                        Item Owner
                    </TableCell>
                    <TableCell>
                        <Chip size='sm' className='text-yellow-600 bg-yellow-100'>
                            Pending
                        </Chip>
                    </TableCell>
                    <TableCell>
                        2025-01-14
                    </TableCell>
                    <TableCell className='text-right'>
                        <Dropdown placement='left-start'>
                            <DropdownTrigger>
                                <Button isIconOnly variant='light'>
                                    <MoreHorizontal className='w-5 h-5' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label='Actions Menu'>
                                <DropdownItem key={'view'} startContent={<Eye className='w-4 h-4' />} >
                                    View Details
                                </DropdownItem>
                                <DropdownItem key={'chat-seller'} startContent={<MessageCircle className='w-4 h-4' />} >
                                    Chat Seller
                                </DropdownItem>
                                <DropdownItem key={'delete'} startContent={<X className='w-4 h-4' />} className='text-danger' color='danger'>
                                    Cancel Request
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </TableCell>
                </TableRow>
                <TableRow key='3'>
                    <TableCell>
                        <div className='flex items-center gap-3'>
                            <Image
                                radius='full'
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'}
                                alt='Item Image'
                                className='w-12 h-12 object-cover hidden md:block'
                            />
                            <p className='font-medium'>Item Name</p>
                        </div>
                    </TableCell>
                    <TableCell>
                        Item Owner
                    </TableCell>
                    <TableCell>
                        <Chip size='sm' className='text-yellow-600 bg-yellow-100'>
                            Pending
                        </Chip>
                    </TableCell>
                    <TableCell>
                        2025-01-14
                    </TableCell>
                    <TableCell className='text-right'>
                        <Dropdown placement='left-start'>
                            <DropdownTrigger>
                                <Button isIconOnly variant='light'>
                                    <MoreHorizontal className='w-5 h-5' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label='Actions Menu'>
                                <DropdownItem key={'view'} startContent={<Eye className='w-4 h-4' />} >
                                    View Details
                                </DropdownItem>
                                <DropdownItem key={'chat-seller'} startContent={<MessageCircle className='w-4 h-4' />} >
                                    Chat Seller
                                </DropdownItem>
                                <DropdownItem key={'delete'} startContent={<X className='w-4 h-4' />} className='text-danger' color='danger'>
                                    Cancel Request
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

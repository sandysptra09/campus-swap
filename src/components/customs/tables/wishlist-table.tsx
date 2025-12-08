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
    User,
    Chip,
    Tooltip,
} from '@heroui/react';
import { MoreHorizontal, Edit, Eye, Trash2 } from 'lucide-react';

export default function WishlistTable() {
    return (
        <Table
            aria-label='Wishlist Table'
            className=' border border-default-200 rounded-xl'
        >
            <TableHeader>
                <TableColumn>ITEM</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ADDED AT</TableColumn>
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
                        Item Category
                    </TableCell>
                    <TableCell>
                        <Chip size='sm' className='text-green-600 bg-green-100'>
                            Available
                        </Chip>
                    </TableCell>
                    <TableCell>
                        2025-01-12
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
                                    View Item
                                </DropdownItem>
                                <DropdownItem key={'delete'} startContent={<Trash2 className='w-4 h-4' />} className='text-danger' color='danger'>
                                    Remove from Wishlist
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
                        Item Category
                    </TableCell>
                    <TableCell>
                        <Chip size='sm' className='text-destructive bg-red-100'>
                            Not Available
                        </Chip>
                    </TableCell>
                    <TableCell>
                        2025-01-12
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
                                    View Item
                                </DropdownItem>
                                <DropdownItem key={'delete'} startContent={<Trash2 className='w-4 h-4' />} className='text-danger' color='danger'>
                                    Remove from Wishlist
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
                        Item Category
                    </TableCell>
                    <TableCell>
                        <Chip size='sm' className='text-green-600 bg-green-100'>
                            Available
                        </Chip>
                    </TableCell>
                    <TableCell>
                        2025-01-12
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
                                    View Item
                                </DropdownItem>
                                <DropdownItem key={'delete'} startContent={<Trash2 className='w-4 h-4' />} className='text-danger' color='danger'>
                                    Remove from Wishlist
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </TableCell>
                </TableRow>
                <TableRow key='4'>
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
                        Item Category
                    </TableCell>
                    <TableCell>
                        <Chip size='sm' className='text-destructive bg-red-100'>
                            Not Available
                        </Chip>
                    </TableCell>
                    <TableCell>
                        2025-01-12
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
                                    View Item
                                </DropdownItem>
                                <DropdownItem key={'delete'} startContent={<Trash2 className='w-4 h-4' />} className='text-danger' color='danger'>
                                    Remove from Wishlist
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table >
    )
}

import React from 'react'

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
    User,
    Chip,
    Tooltip,
} from '@heroui/react';
import { MoreHorizontal, Edit, Eye, Trash2 } from 'lucide-react';

export default function MyItemsTable() {
    return (
        <Table
            aria-label='My Items Table'
            className=' border border-default-200 rounded-xl'
        >
            <TableHeader>
                <TableColumn>ITEM</TableColumn>
                <TableColumn>VERIFICATION STATUS</TableColumn>
                <TableColumn>VIEWS</TableColumn>
                <TableColumn>WISHLIST</TableColumn>
                <TableColumn>POSTED AT</TableColumn>
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
                            <div className=''>
                                <p className='font-medium'>Item Name</p>
                                <p className='text-xs text-muted-foreground'>Item Category</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Chip size='sm' className='text-green-600 bg-green-100'>
                            Approved
                        </Chip>
                    </TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>9</TableCell>
                    <TableCell>2025-01-05</TableCell>
                    <TableCell className='text-right'>
                        <Dropdown placement='left-start'>
                            <DropdownTrigger>
                                <Button isIconOnly variant='light'>
                                    <MoreHorizontal className='w-5 h-5' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label='Actions Menu'>
                                <DropdownItem as={Link} href={`/dashboard/my-items/`} key={'view'} startContent={<Eye className='w-4 h-4' />} >
                                    View
                                </DropdownItem>
                                <DropdownItem as={Link} href={`/dashboard/my-items/edit-item/`} key={'edit'} startContent={<Edit className='w-4 h-4' />} >
                                    Edit
                                </DropdownItem>
                                <DropdownItem key={'delete'} startContent={<Trash2 className='w-4 h-4' />} className='text-danger' color='danger'>
                                    Delete
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
                            <div>
                                <p className='font-medium'>Item Name</p>
                                <p className='text-xs text-muted-foreground'>Item Category</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Chip size='sm' className='text-destructive bg-red-100'>
                            Rejected
                        </Chip>
                    </TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2025-01-02</TableCell>
                    <TableCell className='text-right'>
                        <Dropdown placement='left-start'>
                            <DropdownTrigger>
                                <Button isIconOnly variant='light'>
                                    <MoreHorizontal className='w-5 h-5' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label='Actions Menu'>
                                <DropdownItem key={'view'} startContent={<Eye className='w-4 h-4' />} >
                                    View
                                </DropdownItem>
                                <DropdownItem key={'edit'} startContent={<Edit className='w-4 h-4' />} >
                                    Edit
                                </DropdownItem>
                                <DropdownItem key={'delete'} startContent={<Trash2 className='w-4 h-4' />} className='text-danger' color='danger'>
                                    Delete
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
                            <div>
                                <p className='font-medium'>Item Name</p>
                                <p className='text-xs text-muted-foreground'>Item Category</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Chip size='sm' className='text-yellow-600 bg-yellow-100'>
                            Pending
                        </Chip>
                    </TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2025-01-04</TableCell>
                    <TableCell className='text-right'>
                        <Dropdown placement='left-start'>
                            <DropdownTrigger>
                                <Button isIconOnly variant='light'>
                                    <MoreHorizontal className='w-5 h-5' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label='Actions Menu'>
                                <DropdownItem key={'view'} startContent={<Eye className='w-4 h-4' />} >
                                    View
                                </DropdownItem>
                                <DropdownItem key={'edit'} startContent={<Edit className='w-4 h-4' />} >
                                    Edit
                                </DropdownItem>
                                <DropdownItem key={'delete'} startContent={<Trash2 className='w-4 h-4' />} className='text-danger' color='danger'>
                                    Delete
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
                            <div>
                                <p className='font-medium'>Item Name</p>
                                <p className='text-xs text-muted-foreground'>Item Category</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Chip size='sm' className='text-green-600 bg-green-100'>
                            Approved
                        </Chip>
                    </TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>9</TableCell>
                    <TableCell>2025-01-05</TableCell>
                    <TableCell className='text-right'>
                        <Dropdown placement='left-start'>
                            <DropdownTrigger>
                                <Button isIconOnly variant='light'>
                                    <MoreHorizontal className='w-5 h-5' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label='Actions Menu'>
                                <DropdownItem key={'view'} startContent={<Eye className='w-4 h-4' />} >
                                    View
                                </DropdownItem>
                                <DropdownItem key={'edit'} startContent={<Edit className='w-4 h-4' />} >
                                    Edit
                                </DropdownItem>
                                <DropdownItem key={'delete'} startContent={<Trash2 className='w-4 h-4' />} className='text-danger' color='danger'>
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table >
    )
}

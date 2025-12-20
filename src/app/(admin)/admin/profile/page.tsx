'use client';

import React, { useState, useEffect } from 'react'

import { Avatar, Card, CardBody, Input } from '@heroui/react';

type AdminProfile = {
    fullname: string
    email: string
    studentId: string
    role: string
    avatarUrl: string | null
}

export default function ProfilePage() {

    const [data, setData] = useState<AdminProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/protected/me')
                if (res.ok) {
                    const json = await res.json()
                    setData(json)
                }
            } catch (error) {
                console.error('Failed to fetch profile', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [])

    if (loading) {
        return (
            <div className='flex justify-center items-center h-64'>
                <p className='text-gray-500'>Loading profile...</p>
            </div>
        )
    }

    return (
        <div>
            <Card>
                <CardBody className='flex flex-col gap-4 p-6 md:p-8'>
                    <div className='flex justify-center'>
                        <Avatar
                            src={data?.avatarUrl ?? ''}
                            className='w-28 h-28'
                        />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
                        <Input
                            name='name'
                            label='Full Name'
                            labelPlacement='outside'
                            value={data?.fullname || ''}
                            readOnly
                            radius='sm'
                            className='text-foreground font-semibold'
                        />
                        <Input
                            name='studentId'
                            label='Admin Code'
                            labelPlacement='outside'
                            value={data?.studentId || ''}
                            readOnly
                            radius='sm'
                            className='text-foreground font-semibold'
                        />
                        <Input
                            name='email'
                            label='Email'
                            labelPlacement='outside'
                            value={data?.email || ''}
                            readOnly
                            radius='sm'
                            className='text-foreground font-semibold'
                        />
                        <Input
                            name='role'
                            label='Role'
                            labelPlacement='outside'
                            value={data?.role || ''}
                            readOnly
                            radius='sm'
                            className='text-foreground font-semibold'
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
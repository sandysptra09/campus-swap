'use client';

import React, { useRef, useState } from 'react'

import { Avatar, Button, Card, CardBody, Input } from '@heroui/react';
import { Edit, Camera } from 'lucide-react';

export default function DashboarProfilePage() {

    const [isEditing, setIsEditing] = useState(false);

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setAvatarPreview(url);
    };

    return (
        <div className=''>
            <Card>
                <CardBody className='flex flex-col gap-4 p-6 md:p-8'>
                    <div className='relative flex justify-center'>
                        <Avatar
                            src={avatarPreview || ''}
                            className='w-28 h-28 cursor-pointer'
                            onClick={handleAvatarClick}
                        />
                        {isEditing && (
                            <button
                                onClick={handleAvatarClick}
                                className='
                                    absolute bottom-0 right-[calc(50%-3.5rem)] 
                                    bg-primary text-white p-2 rounded-full 
                                    border border-white shadow-md
                                '
                            >
                                <Camera size={16} />
                            </button>
                        )}
                        <input
                            type='file'
                            ref={fileInputRef}
                            className='hidden'
                            accept='image/*'
                            onChange={handleFileChange}
                        />
                    </div>
                    <Input
                        name='name'
                        label='Full Name'
                        labelPlacement='outside'
                        defaultValue='Sanchie Mikhailovna'
                        isReadOnly={!isEditing}
                        radius='sm'
                        className='text-foreground font-semibold'
                    />
                    <Input
                        name='studentId'
                        label='Student ID Number'
                        labelPlacement='outside'
                        defaultValue='123456789'
                        isReadOnly={!isEditing}
                        radius='sm'
                        className='text-foreground font-semibold'
                    />
                    <Input
                        name='email'
                        label='Email'
                        labelPlacement='outside'
                        defaultValue='sanchie@upi.edu'
                        isReadOnly={!isEditing}
                        radius='sm'
                        className='text-foreground font-semibold'
                    />
                    {!isEditing ? (
                        <div className='flex justify-end'>
                            <Button
                                color='primary'
                                radius='sm'
                                className='w-full sm:w-auto'
                                onPress={() => setIsEditing(true)}
                                startContent={<Edit size={16} />}
                            >
                                Edit Profile
                            </Button>
                        </div>
                    ) : (
                        <div className='flex flex-col sm:flex-row justify-end gap-3'>
                            <Button
                                color='primary'
                                radius='sm'
                                className='w-full sm:w-auto'
                                onPress={() => setIsEditing(false)}
                            >
                                Save Changes
                            </Button>

                            <Button
                                color='danger'
                                variant='bordered'
                                radius='sm'
                                className='w-full sm:w-auto'
                                onPress={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    )
}

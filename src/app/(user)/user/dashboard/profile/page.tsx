'use client';

import React, { useState, useEffect } from 'react'

import { Avatar, Button, Card, CardBody, Input } from '@heroui/react';
import { Edit, Camera } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboarProfilePage() {

    const { user, updateUser } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        fullname: '',
        major: '',
        contact: '',
    });

    useEffect(() => {
        if (user) {
            setForm({
                fullname: user.fullname ?? '',
                major: user.major ?? '',
                contact: user.contact ?? '',
            });
        }
    }, [user]);

    if (!user) return null;

    async function handleSave() {
        setSaving(true);

        const res = await fetch('/api/protected/profile', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            const updatedUser = await res.json();

            updateUser(updatedUser);
            setIsEditing(false);
        }

        setSaving(false);
    }

    return (
        <div className=''>
            <Card>
                <CardBody className='flex flex-col gap-4 p-6 md:p-8'>
                    <div className="flex justify-center">
                        <Avatar
                            src={user.avatarUrl ?? ''}
                            className="w-28 h-28"
                        />
                    </div>
                    <Input
                        name='name'
                        label='Full Name'
                        labelPlacement='outside'
                        value={form.fullname}
                        isReadOnly={!isEditing}
                        onChange={(e) =>
                            setForm({ ...form, fullname: e.target.value })
                        }
                        radius='sm'
                        className='text-foreground font-semibold'
                    />
                    <Input
                        name='major'
                        label='Major'
                        labelPlacement='outside'
                        placeholder='Add your major by updating your profile'
                        value={form.major}
                        isReadOnly={!isEditing}
                        onChange={(e) =>
                            setForm({ ...form, major: e.target.value })
                        }
                        radius='sm'
                        className='text-foreground font-semibold'
                    />
                    <Input
                        name='contact'
                        label='Contact Number'
                        labelPlacement='outside'
                        placeholder='Add your contact number by updating your profile'
                        value={form.contact}
                        isReadOnly={!isEditing}
                        onChange={(e) =>
                            setForm({ ...form, contact: e.target.value })
                        }
                        radius='sm'
                        className='text-foreground font-semibold'
                    />
                    <Input
                        name='studentId'
                        label='Student ID Number'
                        labelPlacement='outside'
                        value={user.studentId}
                        isReadOnly={!isEditing}
                        radius='sm'
                        readOnly
                        className='text-foreground font-semibold'
                    />
                    <Input
                        name='email'
                        label='Email'
                        labelPlacement='outside'
                        value={user.email}
                        isReadOnly={!isEditing}
                        radius='sm'
                        className='text-foreground font-semibold'
                    />
                    <Input
                        name='role'
                        label='Role'
                        labelPlacement='outside'
                        value={user.role}
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
                                isLoading={saving}
                                onPress={handleSave}
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

import React, { useState } from 'react'

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    Button,
    Input,
    Card,
    CardBody
} from '@heroui/react'
import { log } from 'console';

export default function ChangePasswordForm() {

    const router = useRouter();
    const { logout } = useAuth();

    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    async function handleChangePassword() {
        if (!form.currentPassword || !form.newPassword) return;
        if (form.newPassword !== form.confirmPassword) return;

        try {
            setSaving(true);
            const res = await fetch('/api/protected/change-password', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: form.currentPassword,
                    newPassword: form.newPassword,
                }),
            });

            if (res.ok) {
                setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }
            await logout();
            router.replace('/login');

        } finally {
            setSaving(false);
        }
    }

    return (
        <Card>
            <CardBody className='w-full flex-col gap-3'>
                <p className='text-muted-foreground text-sm font-bold'>Change your password</p>
                <Input
                    name='currentPassword'
                    label='Current Password'
                    labelPlacement='outside'
                    placeholder='Your Current Password'
                    value={form.currentPassword}
                    onChange={(e) =>
                        setForm({ ...form, currentPassword: e.target.value })
                    }
                    type='password'
                    radius='sm'
                    className='text-foreground font-semibold'
                />
                <Input
                    name='newPassword'
                    label='New Password'
                    labelPlacement='outside'
                    placeholder='Enter Your New Password'
                    value={form.newPassword}
                    onChange={(e) =>
                        setForm({ ...form, newPassword: e.target.value })
                    }
                    radius='sm'
                    type='password'
                    className='text-foreground font-semibold'
                />
                <Input
                    name='confirmPassword'
                    label='Confirm Password'
                    labelPlacement='outside'
                    placeholder='Confirm Your New Password'
                    value={form.confirmPassword}
                    onChange={(e) =>
                        setForm({ ...form, confirmPassword: e.target.value })
                    }
                    radius='sm'
                    type='password'
                    className='text-foreground font-semibold'
                />
                <div className='flex justify-end'>
                    <Button
                        color='primary'
                        radius='sm'
                        className='w-full sm:w-auto'
                        isLoading={saving}
                        onPress={handleChangePassword}
                    >
                        Save Changes
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Form,
    Button,
    Select,
    SelectItem,
    Image,
    Modal,
    ModalContent,
} from '@heroui/react';
import TextUploadFieldInput from '../inputs/text-upload-field-input';
import TextAreaInput from '../inputs/text-area-input';
import FileUploadInput from '../inputs/file-upload-input';
import PointFieldInput from '../inputs/point-field-input';
import { Camera } from 'lucide-react';

const CATEGORIES = [
    { key: 1, label: 'Books' },
    { key: 2, label: 'Electronics' },
    { key: 3, label: 'Fashion & Apparel' },
    { key: 4, label: 'Dorm Equipment' },
    { key: 5, label: 'Stationery' },
    { key: 6, label: 'Others' },
]

const CONDITIONS = [
    { key: 'NEW', label: 'New' },
    { key: 'LIKE_NEW', label: 'Like New' },
    { key: 'USED', label: 'Used' },
]

export default function UserEditItemForm({ item }: { item?: any }) {

    const router = useRouter()

    const [preview, setPreview] = useState<string | null>(null)
    const [isZoomOpen, setIsZoomOpen] = useState(false)
    const [saving, setSaving] = useState(false)

    const [form, setForm] = useState({
        title: item.title,
        shortDescription: item.shortDescription,
        description: item.description,
        categoryId: String(item.categoryId),
        condition: item.condition,
        pointValue: item.pointValue,
    })

    const handleImageChange = (file: File | null) => {
        if (!file) {
            setPreview(item?.image || null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    async function handleSubmit() {
        try {
            setSaving(true)

            const res = await fetch(`/api/items/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: form.title,
                    shortDescription: form.shortDescription,
                    description: form.description,
                    categoryId: Number(form.categoryId),
                    condition: form.condition,
                    pointValue: Number(form.pointValue),
                }),
            })

            if (!res.ok) {
                const err = await res.json()
                alert(err.message || 'Failed to update item')
                return
            }

            router.push('/user/dashboard/my-items')
        } finally {
            setSaving(false)
        }
    }

    return (
        <Form className='w-full flex flex-col gap-6'>
            <div className='w-full max-w-2xl flex flex-col gap-4'>
                <TextUploadFieldInput
                    name='product_name'
                    label='Product Name'
                    placeholder='Enter product name'
                    type='text'
                    value={form.title}
                    onChange={(v) => setForm({ ...form, title: v })}
                    required
                />
                <TextAreaInput
                    name='product_short_description'
                    label='Short Description'
                    placeholder='Enter short description'
                    required
                    value={form.shortDescription}
                    onChange={(v) =>
                        setForm({ ...form, shortDescription: v })
                    }
                />
                <TextAreaInput
                    name='product_description'
                    label='Product Description'
                    placeholder='Enter description'
                    required
                    value={form.description}
                    onChange={(v) =>
                        setForm({ ...form, description: v })
                    }
                />
                <div className='flex flex-col md:flex-row gap-4'>
                    <Select
                        name='product_category'
                        label='Category'
                        placeholder='Select category'
                        selectedKeys={[form.categoryId]}
                        onSelectionChange={(keys) =>
                            setForm({
                                ...form,
                                categoryId: Array.from(keys)[0] as string,
                            })
                        }
                        className='w-full'
                    >
                        {CATEGORIES.map((cat) => (
                            <SelectItem key={String(cat.key)}>
                                {cat.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        name='product_condition'
                        label='Condition'
                        selectedKeys={[form.condition]}
                        onSelectionChange={(keys) =>
                            setForm({
                                ...form,
                                condition: Array.from(keys)[0] as string,
                            })
                        }
                        placeholder='Select condition'
                        className='w-full'
                    >
                        {CONDITIONS.map((cond) => (
                            <SelectItem key={cond.key}>
                                {cond.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className='flex flex-col gap-2 mt-2 mb-2'>
                    <FileUploadInput
                        name='product_image'
                        label='Product Image'
                        onFileSelect={handleImageChange}
                    />
                    <div className='mt-3 flex flex-col items-start'>
                        <p className='text-sm text-gray-500 mb-1'>Preview:</p>
                        <div
                            className='w-full h-40 md:h-56 border rounded-lg border-gray-200 
                            bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer'
                            onClick={() => preview && setIsZoomOpen(true)}
                        >
                            {preview ? (
                                <Image
                                    src={preview}
                                    alt='Preview'
                                    radius='none'
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <div className='flex flex-col items-center text-gray-400'>
                                    <Camera size={36} />
                                    <span>No preview</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='max-w-xs'>
                    <PointFieldInput
                        name='product_point'
                        label='Product Point'
                        placeholder='Enter product point'
                        value={form.pointValue}
                        onChange={(v) =>
                            setForm({ ...form, pointValue: v })
                        }
                        required
                    />
                </div>
            </div>
            <div className='w-full max-w-2xl flex gap-4 justify-between'>
                <Button
                    as={Link}
                    href='/user/dashboard/my-items'
                    className='w-full bg-destructive text-white'
                >
                    Cancel
                </Button>
                <Button
                    isLoading={saving}
                    onPress={handleSubmit}
                    className='w-full bg-primary text-white'>
                    {saving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
            <Modal
                isOpen={isZoomOpen}
                onOpenChange={setIsZoomOpen}
                backdrop='blur'
                size='full'
                className='flex items-center justify-center'
            >
                <ModalContent>
                    <div className='w-full h-full flex items-center justify-center bg-black/80 p-4'>
                        <img
                            src={preview ?? ''}
                            alt='Zoomed Preview'
                            className='max-w-full max-h-full rounded-lg object-contain'
                        />
                    </div>
                </ModalContent>
            </Modal>
        </Form>
    );
}

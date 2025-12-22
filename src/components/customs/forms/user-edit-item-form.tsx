import React, { useState, useEffect } from 'react';

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
import { UploadDropzone } from '@/lib/uploadthing';
import PointFieldInput from '../inputs/point-field-input';
import { Camera, X } from 'lucide-react';

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
    const [imageUrl, setImageUrl] = useState<string>('')
    const [saving, setSaving] = useState(false)

    const [form, setForm] = useState({
        title: '',
        shortDescription: '',
        description: '',
        categoryId: '',
        condition: '',
        pointValue: 0,
    })

    useEffect(() => {
        if (!item) return

        setForm({
            title: item.title,
            shortDescription: item.shortDescription,
            description: item.description,
            categoryId: String(item.categoryId),
            condition: item.condition,
            pointValue: Number(item.pointValue),
        })

        if (item.imageUrl) {
            setPreview(item.imageUrl)
            setImageUrl(item.imageUrl)
        }
    }, [item])

    const handleResetImage = () => {
        setPreview(null);

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
                    imageUrl: imageUrl,
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
                    <label className='text-sm font-medium'>Product Image</label>
                    {!preview ? (
                        <div className='border-2 border-dashed border-gray-300 rounded-lg p-6'>
                            <UploadDropzone
                                endpoint='imageUploader'
                                onClientUploadComplete={(res) => {
                                    if (res && res.length > 0) {
                                        const url = res[0].ufsUrl || res[0].url;
                                        console.log("URL yang dipake:", url);
                                        setImageUrl(url);
                                        setPreview(url);
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    alert(`ERROR! ${error.message}`);
                                }}
                            />
                        </div>
                    ) : (
                        <div className='relative w-full overflow-hidden group'>
                            <Image
                                src={preview}
                                alt='Preview'
                                className='w-full h-full object-cover'
                                radius='lg'
                            />
                            <div className='absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opcity'>
                                <Button
                                    color='warning'
                                    variant='solid'
                                    onPress={handleResetImage}
                                    startContent={<X size={18} />}
                                >
                                    Change Image
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <div className='max-w-xs'>
                    <PointFieldInput
                        name='product_point'
                        label='Product Point'
                        placeholder='Enter product point'
                        value={form.pointValue}
                        onChange={(v) =>
                            setForm({ ...form, pointValue: Number(v) })
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
        </Form>
    );
}

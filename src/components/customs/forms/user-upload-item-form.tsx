import React, { useState } from 'react'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Form,
    Button,
    Select,
    SelectItem,
    Image,
    Modal,
    ModalContent,
    Checkbox,
} from '@heroui/react'
import TextUploadFieldInput from '../inputs/text-upload-field-input'
import TextAreaInput from '../inputs/text-area-input'
import FileUploadInput from '../inputs/file-upload-input'
import PointFieldInput from '../inputs/point-field-input'
import { Camera } from 'lucide-react'

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

export default function UserUploadItemForm() {

    const router = useRouter()

    const [preview, setPreview] = useState<string | null>(null)
    const [isZoomOpen, setIsZoomOpen] = useState(false)
    const [agreed, setAgreed] = useState(false)
    const [saving, setSaving] = useState(false)

    const [form, setForm] = useState({
        title: '',
        shortDescription: '',
        description: '',
        categoryId: '',
        condition: '',
        pointValue: 0,
    })

    const handleImageChange = (file: File | null) => {
        if (!file) {
            setPreview(null)
            return
        }
        setPreview(URL.createObjectURL(file))
    }

    async function handleSubmit() {
        if (!agreed) return


        try {
            setSaving(true)

            const res = await fetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: form.title,
                    shortDescription: form.shortDescription,
                    description: form.description,
                    condition: form.condition,
                    pointValue: Number(form.pointValue),
                    categoryId: Number(form.categoryId),
                }),
            })

            if (!res.ok) {
                const err = await res.json()
                alert(err.message || 'Failed to create item')
                return
            }

            router.refresh()
            router.push('/user/dashboard/my-items')
        } finally {
            setSaving(false)
        }
    }

    return (
        <Form className='w-full flex flex-col gap-6'>
            <div className='w-full max-w-2xl flex flex-col gap-4'>
                <TextUploadFieldInput
                    name='title'
                    label='Product Name'
                    placeholder='Enter your product name'
                    type='text'
                    required
                    value={form.title}
                    onChange={(v) => setForm({ ...form, title: v })}
                />
                <TextAreaInput
                    name='shortDescription'
                    label='Product Short Description'
                    placeholder='Enter your product short description'
                    required
                    value={form.shortDescription}
                    onChange={(value) =>
                        setForm({ ...form, shortDescription: value })
                    }
                />
                <TextAreaInput
                    name='description'
                    label='Product Description'
                    placeholder='Enter your product description'
                    required
                    value={form.description}
                    onChange={(value) =>
                        setForm({ ...form, description: value })
                    }
                />
                <div className='flex flex-col md:flex-row gap-4'>
                    <Select
                        name='categoryId'
                        label='Category'
                        placeholder='Select category'
                        selectedKeys={form.categoryId ? [form.categoryId] : []}
                        onSelectionChange={(keys) =>
                            setForm({ ...form, categoryId: Array.from(keys)[0] as string })
                        }
                        className='w-full'
                        required
                    >
                        {CATEGORIES.map((cat) => (
                            <SelectItem key={String(cat.key)}>{cat.label}</SelectItem>
                        ))}
                    </Select>
                    <Select
                        name='condition'
                        label='Condition'
                        placeholder='Select condition'
                        selectedKeys={form.condition ? [form.condition] : []}
                        onSelectionChange={(keys) =>
                            setForm({ ...form, condition: Array.from(keys)[0] as string })
                        }
                        className='w-full'
                        required
                    >
                        {CONDITIONS.map((cond) => (
                            <SelectItem key={cond.key}>{cond.label}</SelectItem>
                        ))}
                    </Select>
                </div>
                <div className='flex flex-col gap-2 mt-1 mb-1'>
                    <FileUploadInput
                        name='product_image'
                        label='Product Image'
                        required
                        onFileSelect={handleImageChange}
                    />
                    <div className='mt-3 flex flex-col items-start'>
                        <p className='text-sm text-gray-500 mb-1'>Preview:</p>
                        <div className='-full w-full md:w-full h-40 md:h-56 border rounded-lg 
                        border-gray-200 flex items-center justify-center bg-gray-100 overflow-hidden cursor-pointer'
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
                                <div className='flex flex-col items-center justify-center text-gray-400 text-xs gap-1'>
                                    <Camera size={36} />
                                    <span>No preview available</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='max-w-xs'>
                    <PointFieldInput
                        name='pointValue'
                        label='Product Point'
                        placeholder='Enter product point'
                        required
                        value={form.pointValue}
                        onChange={(value) =>
                            setForm({ ...form, pointValue: value })
                        }
                    />
                </div>
                <div className="w-full max-w-2xl mt-2">
                    <Checkbox
                        isSelected={agreed}
                        onValueChange={setAgreed}
                        required
                    >
                        <span className="text-sm text-gray-600">
                            I confirm that the item I'm uploading is accurate, legally allowed, and follows the CampusSwap community guidelines.
                        </span>
                    </Checkbox>
                </div>
            </div>
            <div className='w-full max-w-2xl flex gap-4'>
                <Button
                    as={Link}
                    href='/user/dashboard/my-items'
                    className='w-full bg-destructive text-white'
                >
                    Cancel
                </Button>
                <Button
                    variant='flat'
                    className='w-full'
                >
                    Save as Draft
                </Button>
            </div>
            <div className='w-full max-w-2xl flex'>
                <Button
                    isDisabled={!agreed || saving}
                    isLoading={saving}
                    onPress={handleSubmit}
                    className='w-full bg-primary text-white'
                >
                    Submit
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
                            className='max-w-full max-h-full rounded-lg object-contain shadow-lg'
                        />
                    </div>
                </ModalContent>
            </Modal>

        </Form>
    )
}

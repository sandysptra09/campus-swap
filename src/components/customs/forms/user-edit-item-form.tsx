import React, { useEffect, useState } from 'react';

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
import TextSlugFieldInput from '../inputs/text-slug-field-input';
import TextAreaInput from '../inputs/text-area-input';
import FileUploadInput from '../inputs/file-upload-input';
import PointFieldInput from '../inputs/point-field-input';
import { Camera } from 'lucide-react';

export default function UserEditItemForm({ item }: { item?: any }) {

    const [productName, setProductName] = useState(item?.name || '');
    const [slug, setSlug] = useState(item?.slug || '');
    const [preview, setPreview] = useState<string | null>(item?.image || null);
    const [isZoomOpen, setIsZoomOpen] = useState(false);

    const CATEGORIES = [
        { value: 'books', label: 'Books' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'fashion', label: 'Fashion & Apparel' },
        { value: 'dorm-equipment', label: 'Dorm Equipment' },
        { value: 'stationery', label: 'Stationery' },
        { value: 'others', label: 'Others' },
    ];

    const CONDITIONS = [
        { value: 'new', label: 'New' },
        { value: 'like-new', label: 'Like New' },
        { value: 'used', label: 'Used' },
    ];

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
    };

    const handleProductName = (value: string) => {
        setProductName(value);
        setSlug(generateSlug(value));
    };

    const handleImageChange = (file: File | null) => {
        if (!file) {
            setPreview(item?.image || null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    return (
        <Form className='w-full flex flex-col gap-6'>
            <div className='w-full max-w-2xl flex flex-col gap-4'>
                <TextUploadFieldInput
                    name='product_name'
                    label='Product Name'
                    placeholder='Enter product name'
                    type='text'
                    value={productName}
                    onChange={handleProductName}
                    required
                />
                <TextSlugFieldInput
                    name='product_slug'
                    label='Product Slug'
                    placeholder='Prodcut slug'
                    type='text'
                    value={slug}
                    required
                />
                <TextAreaInput
                    name='product_short_description'
                    label='Short Description'
                    placeholder='Enter short description'
                    required
                    defaultValue={item?.shortDesc || ''}
                />
                <TextAreaInput
                    name='product_description'
                    label='Product Description'
                    placeholder='Enter description'
                    required
                    defaultValue={item?.description || ''}
                />
                <div className='flex flex-col md:flex-row gap-4'>
                    <Select
                        name='product_category'
                        label='Category'
                        placeholder='Select category'
                        selectedKeys={[item?.category]}
                        className='w-full'
                    >
                        {CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value}>{cat.label}</SelectItem>
                        ))}
                    </Select>
                    <Select
                        name='product_condition'
                        label='Condition'
                        selectedKeys={[item?.condition]}
                        placeholder='Select condition'
                        className='w-full'
                    >
                        {CONDITIONS.map((cond) => (
                            <SelectItem key={cond.value}>{cond.label}</SelectItem>
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
                        required
                        defaultValue={item?.point}
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
                <Button className='w-full bg-primary text-white'>
                    Save Changes
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

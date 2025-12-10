import React, { useState } from 'react'

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
import TextSlugFieldInput from '../inputs/text-slug-field-input'
import TextAreaInput from '../inputs/text-area-input'
import FileUploadInput from '../inputs/file-upload-input'
import PointFieldInput from '../inputs/point-field-input'
import { Camera } from 'lucide-react'

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

export default function UserUploadItemForm() {

    const [productName, setProductName] = useState('');
    const [slug, setSlug] = useState('');
    const [preview, setPreview] = useState<string | null>(null);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const handleImageChange = (file: File | null) => {
        if (!file) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

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


    return (
        <Form className='w-full flex flex-col gap-6'>
            <div className='w-full max-w-2xl flex flex-col gap-4'>
                <TextUploadFieldInput
                    name='product_name'
                    label='Product Name'
                    placeholder='Enter your product name'
                    type='text'
                    required
                    value={productName}
                    onChange={handleProductName}
                />
                <TextSlugFieldInput
                    name='product_slug'
                    label='Product Slug'
                    placeholder='Enter your product slug'
                    type='text'
                    value={slug}
                    required
                />
                <TextAreaInput
                    name='product_short_description'
                    label='Product Short Description'
                    placeholder='Enter your product short description'
                    required
                />
                <TextAreaInput
                    name='product_description'
                    label='Product Description'
                    placeholder='Enter your product description'
                    required
                />
                <div className='flex flex-col md:flex-row gap-4'>
                    <Select
                        name='product_category'
                        label='Category'
                        placeholder='Select category'
                        className='w-full'
                        required
                    >
                        {CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value}>
                                {cat.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        name='product_condition'
                        label='Condition'
                        placeholder='Select condition'
                        className='w-full'
                        required
                    >
                        {CONDITIONS.map((cond) => (
                            <SelectItem key={cond.value}>
                                {cond.label}
                            </SelectItem>
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
                        name='product_point'
                        label='Product Point'
                        placeholder='Enter product point'
                        required
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
                    isDisabled={!agreed}
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

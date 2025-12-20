'use client'

import React, { useEffect, useState } from 'react'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from '@heroui/react'

type CategoryModalProps = {
    open: boolean
    onClose: () => void
    onSuccess: () => void
    initialData?: {
        id: string
        name: string
    } | null
}

export default function CategoryModal({
    open,
    onClose,
    onSuccess,
    initialData,
}: CategoryModalProps) {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const isEdit = Boolean(initialData)

    useEffect(() => {
        if (initialData) {
            setName(initialData.name)
        } else {
            setName('')
        }
    }, [initialData, open])

    async function handleSubmit() {
        if (!name.trim()) {
            alert('Category name is required')
            return
        }

        setLoading(true)

        try {
            const res = await fetch(
                isEdit
                    ? `/api/admin/categories/${initialData?.id}`
                    : '/api/admin/categories',
                {
                    method: isEdit ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name }),
                }
            )

            const data = await res.json()

            if (!res.ok) {
                alert(data.message || 'Failed to save category')
                return
            }

            onSuccess()
            onClose()
        } catch (error) {
            console.error(error)
            alert('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal isOpen={open} onClose={onClose} placement='center'>
            <ModalContent>
                <ModalHeader>
                    {isEdit ? 'Edit Category' : 'Add New Category'}
                </ModalHeader>

                <ModalBody>
                    <Input
                        label='Category Name'
                        labelPlacement='outside'
                        placeholder='e.g. Electronics'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant='light'
                        onPress={onClose}
                        isDisabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        color='primary'
                        onPress={handleSubmit}
                        isLoading={loading}
                    >
                        {isEdit ? 'Update' : 'Create'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

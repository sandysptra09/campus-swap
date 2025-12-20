'use client';

import React, { useState, useEffect } from 'react'
import { Upload } from 'lucide-react';
import { Button } from '@heroui/react';
// Import type Category dari table juga
import CategoriesTable, { Category } from '@/components/customs/tables/admin/categories-table';
import CategoryModal from '@/components/customs/modals/admin/category-modal';

export default function CategoriesManagementPage() {

    const [data, setData] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

    async function fetchCategories() {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/categories')
            if (!res.ok) throw new Error('Failed to fetch')
            const json = await res.json()
            setData(json)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(category: Category) {
        if (!confirm(`Delete category "${category.name}"?`)) return

        try {
            const res = await fetch(`/api/admin/categories/${category.id}`, {
                method: 'DELETE',
            })

            if (!res.ok) {
                const json = await res.json()
                alert(json.message || 'Failed to delete')
                return
            }

            fetchCategories()
        } catch (error) {
            console.error(error)
            alert('Something went wrong')
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <div>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl font-semibold'>Categories Management</h1>
                        <p className='text-muted-foreground text-sm'>Manage all categories on CampusSwap.</p>
                    </div>
                    <Button
                        color='primary'
                        startContent={<Upload className='w-4 h-4' />}
                        className='font-semibold'
                        onPress={() => {
                            setSelectedCategory(null)
                            setOpenModal(true)
                        }}
                    >
                        Add New Category
                    </Button>
                </div>

                <CategoriesTable
                    data={data}
                    loading={loading}
                    onEdit={(category) => {
                        setSelectedCategory(category)
                        setOpenModal(true)
                    }}
                    onDelete={handleDelete}
                />

                <CategoryModal
                    open={openModal}
                    initialData={selectedCategory}
                    onClose={() => {
                        setOpenModal(false)
                        setSelectedCategory(null)
                    }}
                    onSuccess={() => {
                        fetchCategories()
                        setOpenModal(false)
                    }}
                />
            </div>
        </div>
    )
}
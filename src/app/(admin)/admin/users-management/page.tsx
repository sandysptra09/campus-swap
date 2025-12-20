'use client';

import React, { useEffect, useState } from 'react'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Pagination } from '@heroui/react';
import UserManageTable, { UserListItem } from '@/components/customs/tables/admin/user-manage-table';
import UserDetailsModal from '@/components/customs/modals/admin/user-details-modal';

export default function UsersManagementPage() {

    const [users, setUsers] = useState<UserListItem[]>([])
    const [loading, setLoading] = useState(true)

    const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null)

    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [userDetailData, setUserDetailData] = useState<any>(null)
    const [loadingDetail, setLoadingDetail] = useState(false)

    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const [actionType, setActionType] = useState<'disable' | 'delete' | null>(null)
    const [actionLoading, setActionLoading] = useState(false)

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/users')
            const json = await res.json()
            if (res.ok) setUsers(json)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const fetchUserDetail = async (id: string) => {
        setLoadingDetail(true)
        try {
            const res = await fetch(`/api/admin/users/${id}`)
            const json = await res.json()
            if (res.ok) setUserDetailData(json)
        } catch (err) {
            console.error(err)
        } finally {
            setLoadingDetail(false)
        }
    }

    const handleView = (user: UserListItem) => {
        setSelectedUser(user)
        setViewModalOpen(true)
        fetchUserDetail(user.id) // Fetch detail pas modal dibuka
    }

    // Trigger Modal Konfirmasi Disable/Enable
    const handleToggleStatus = (user: UserListItem) => {
        setSelectedUser(user)
        setActionType('disable')
        setConfirmModalOpen(true)
    }

    const handleDelete = (user: UserListItem) => {
        setSelectedUser(user)
        setActionType('delete')
        setConfirmModalOpen(true)
    }

    const executeAction = async () => {
        if (!selectedUser || !actionType) return

        setActionLoading(true)
        try {
            let res;
            if (actionType === 'disable') {
                res = await fetch(`/api/admin/users/${selectedUser.id}/disable`, { method: 'PATCH' })
            } else {
                res = await fetch(`/api/admin/users/${selectedUser.id}`, { method: 'DELETE' })
            }

            const json = await res.json()

            if (!res.ok) {
                alert(json.message || 'Action failed')
            } else {
                await fetchUsers()
                setConfirmModalOpen(false)
            }

        } catch (error) {
            console.error(error)
            alert('Something went wrong')
        } finally {
            setActionLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <h1 className='text-2xl font-semibold'>User Management</h1>
                <p className='text-muted-foreground text-sm'>Monitor, manage, and oversee all registered accounts on CampusSwap.</p>
            </div>

            <UserManageTable
                data={users}
                loading={loading}
                onView={handleView}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
            />

            <div className='flex justify-center mt-8'>
                <Pagination
                    total={5}
                    initialPage={1}
                    showControls
                    color='primary'
                />
            </div>

            <UserDetailsModal
                open={viewModalOpen}
                onClose={() => {
                    setViewModalOpen(false)
                    setUserDetailData(null)
                }}
                user={userDetailData}
                loading={loadingDetail}
            />

            <Modal isOpen={confirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
                <ModalContent>
                    <ModalHeader>
                        {actionType === 'disable'
                            ? (selectedUser?.isActive ? 'Disable User?' : 'Enable User?')
                            : 'Delete User?'}
                    </ModalHeader>
                    <ModalBody>
                        <p className="text-sm text-gray-500">
                            {actionType === 'disable'
                                ? `Are you sure you want to ${selectedUser?.isActive ? 'disable' : 'enable'} access for "${selectedUser?.fullname}"? They won't be able to log in.`
                                : `Are you sure you want to permanently delete "${selectedUser?.fullname}"? This action cannot be undone.`}
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="light" onPress={() => setConfirmModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            color={actionType === 'delete' ? 'danger' : 'warning'}
                            onPress={executeAction}
                            isLoading={actionLoading}
                        >
                            {actionType === 'disable'
                                ? (selectedUser?.isActive ? 'Yes, Disable' : 'Yes, Enable')
                                : 'Yes, Delete'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
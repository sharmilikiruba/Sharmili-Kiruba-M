'use client';

import { useState, useMemo } from 'react';
import { BlacklistEntry, BlacklistFormData } from './types';
import { BlacklistView } from './BlacklistView';
import { BlacklistModal } from './BlacklistModal';

export default function BlacklistManagement() {
    const [blacklist, setBlacklist] = useState<BlacklistEntry[]>([
        {
            id: '1',
            visitorName: 'Rajesh Kumar',
            idProof: 'XXXX-XXXX-1234',
            idType: 'Aadhar',
            reason: 'Suspicious behavior during visit',
            addedBy: 'Dr. Suresh Kumar',
            role: 'warden',
            date: '2026-01-02',
            status: 'active',
        },
        {
            id: '2',
            visitorName: 'Sanjay Patel',
            idProof: 'DL-5678-9012',
            idType: 'Driving License',
            reason: 'Attempted entry with fake ID',
            addedBy: 'Admin Office',
            role: 'admin',
            date: '2025-12-28',
            status: 'active',
        },
        {
            id: '3',
            visitorName: 'Amit Sharma',
            idProof: 'J1234567',
            idType: 'Passport',
            reason: 'Overstayed multiple times',
            addedBy: 'Dr. Suresh Kumar',
            role: 'warden',
            date: '2025-12-15',
            status: 'removed',
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'removed'>('all');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const [currentUser] = useState<{ name: string; role: 'warden' | 'admin' }>({
        name: 'Dr. Suresh Kumar',
        role: 'warden',
    });

    const handleOpenAddModal = () => {
        setIsEditMode(false);
        setEditingId(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (entry: BlacklistEntry) => {
        setIsEditMode(true);
        setEditingId(entry.id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleModalSubmit = (data: BlacklistFormData) => {
        if (isEditMode && editingId) {
            setBlacklist(
                blacklist.map((entry) =>
                    entry.id === editingId
                        ? {
                            ...entry,
                            ...data,
                        }
                        : entry
                )
            );
        } else {
            const newEntry: BlacklistEntry = {
                id: Date.now().toString(),
                ...data,
                addedBy: currentUser.name,
                role: currentUser.role,
                date: new Date().toISOString().split('T')[0],
                status: 'active',
            };
            setBlacklist([newEntry, ...blacklist]);
        }
        setIsModalOpen(false);
    };

    const filteredBlacklist = useMemo(() => {
        return blacklist.filter((entry) => {
            const matchesSearch =
                entry.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entry.idProof.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [blacklist, searchQuery, statusFilter]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

    const editingEntryData = useMemo(() => {
        if (!editingId) return undefined;
        const entry = blacklist.find(e => e.id === editingId);
        if (!entry) return undefined;
        return {
            visitorName: entry.visitorName,
            idProof: entry.idProof,
            idType: entry.idType,
            reason: entry.reason,
        };
    }, [editingId, blacklist]);

    return (
        <>
            <BlacklistView
                currentUser={currentUser}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                showStatusDropdown={showStatusDropdown}
                setShowStatusDropdown={setShowStatusDropdown}
                filteredBlacklist={filteredBlacklist}
                onAddClick={handleOpenAddModal}
                onEditClick={handleOpenEditModal}
                formatDate={formatDate}
            />

            <BlacklistModal
                isOpen={isModalOpen}
                isEditMode={isEditMode}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
                initialData={editingEntryData}
            />

            {/* Global click handler for dropdown */}
            {showStatusDropdown && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowStatusDropdown(false)}
                />
            )}
        </>
    );
}
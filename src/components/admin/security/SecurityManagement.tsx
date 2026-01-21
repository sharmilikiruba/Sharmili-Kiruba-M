'use client';

import { useState } from 'react';
import { QrCode, ShieldAlert } from 'lucide-react';
import { BlocklistEntry, Alert, BlocklistForm } from './types';
import { AddBlocklistModal } from './AddBlocklistModal';
import { BlocklistTable } from './BlocklistTable';
import { AlertsSection } from './AlertsSection';

export default function SecurityManagement() {
    const [blocklist, setBlocklist] = useState<BlocklistEntry[]>([
        {
            name: 'John Doe',
            id: 'XXXX-1234',
            reason: 'Suspicious behavior',
            addedBy: 'Dr. Suresh Kumar',
            date: '2026-01-02',
        },
        {
            name: 'Jane Smith',
            id: 'DL-5678',
            reason: 'Fake ID attempted',
            addedBy: 'Dr. Meera Singh',
            date: '2025-12-28',
        },
    ]);

    const [alerts] = useState<Alert[]>([
        {
            message: 'Visitor overstay detected - Room A-204',
            time: '10 mins ago',
            type: 'warning',
        },
        {
            message: 'Emergency pass generated for Medical Emergency',
            time: '30 mins ago',
            type: 'info',
        },
        {
            message: 'Multiple failed QR scan attempts at East Gate',
            time: '1 hour ago',
            type: 'critical',
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveBlocklist = (form: BlocklistForm) => {
        const newItem: BlocklistEntry = {
            ...form,
            addedBy: 'Admin (You)',
            date: new Date().toISOString().split('T')[0],
        };

        setBlocklist([newItem, ...blocklist]);
        setIsModalOpen(false);
    };

    const handleDelete = (index: number) => {
        if (confirm('Are you sure you want to remove this person from the blocklist?')) {
            const newList = [...blocklist];
            newList.splice(index, 1);
            setBlocklist(newList);
        }
    };

    const handleGenerateEmergencyPass = () => {
        alert('Emergency pass generation process started');
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50/30 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                        <ShieldAlert className="w-8 h-8 text-red-600" />
                        Security Management
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        Central control for blocklist, emergency protocols, and security monitoring
                    </p>
                </div>
            </div>

            {/* Blocklist Section */}
            <BlocklistTable
                entries={blocklist}
                onDelete={handleDelete}
                onAddClick={() => setIsModalOpen(true)}
            />

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Emergency Pass */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <QrCode className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Emergency Protocol</h2>
                        </div>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Bypass standard approval workflows for urgent visitor access. All emergency passes are logged with priority status for administrative review.
                        </p>
                    </div>
                    <button
                        onClick={handleGenerateEmergencyPass}
                        className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-[0.98]"
                    >
                        <QrCode className="w-5 h-5" />
                        Generate Emergency Pass
                    </button>
                </div>

                {/* Active Alerts */}
                <AlertsSection alerts={alerts} />
            </div>

            {/* Add Modal */}
            <AddBlocklistModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveBlocklist}
            />
        </div>
    );
}

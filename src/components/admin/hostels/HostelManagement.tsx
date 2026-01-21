"use client"
import { useState, useMemo } from 'react';
import { Home, Search, Plus, Shield } from 'lucide-react';

// Modular Imports
import { TabType, Hostel, Gate, GuardAssignment, HostelForm, GateForm, AssignmentForm } from './types';
import { HostelTab } from './HostelTab';
import { AddHostelModal } from './AddHostelModal';
import { EditHostelModal } from './EditHostelModal';
import { GateTab } from './GateTab';
import { AddGateModal } from './AddGateModal';
import { EditGateModal } from './EditGateModal';
import { GuardTab } from './GuardTab';
import { AddGuardModal } from './AddGuardModal';
import { EditGuardModal } from './EditGuardModal';

export default function HostelManagement() {
    const [activeTab, setActiveTab] = useState<TabType>('Hostels');
    const [searchQuery, setSearchQuery] = useState('');

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Data States
    const [hostels, setHostels] = useState<Hostel[]>([
        { id: '1', name: 'Krishna Hostel', address: 'Block A, University Campus', type: 'Boys', rooms: 150, capacity: 300, warden: 'Dr. Suresh Kumar', status: 'Active' },
        { id: '2', name: 'Saraswati Hostel', address: 'Block B, University Campus', type: 'Girls', rooms: 120, capacity: 240, warden: 'Dr. Meera Singh', status: 'Active' },
        { id: '3', name: 'Vivekananda Hostel', address: 'Block C, University Campus', type: 'Boys', rooms: 100, capacity: 200, warden: 'Dr. Anil Sharma', status: 'Active' },
    ]);

    const [gates, setGates] = useState<Gate[]>([
        { id: '1', name: 'Main Gate', code: 'MG-01', hostel: 'Krishna Hostel', type: 'Entry & Exit', guard: 'Ramesh Yadav', status: 'Active' },
        { id: '2', name: 'East Gate', code: 'EG-01', hostel: 'Krishna Hostel', type: 'Entry & Exit', guard: 'Sunil Verma', status: 'Active' },
        { id: '3', name: 'Main Gate', code: 'MG-02', hostel: 'Saraswati Hostel', type: 'Entry & Exit', guard: 'Unassigned', status: 'Active' },
    ]);

    const [guardAssignments, setGuardAssignments] = useState<GuardAssignment[]>([
        { id: '1', guardName: 'Ramesh Yadav', hostel: 'Krishna Hostel', gate: 'Main Gate', shiftStart: '06:00', shiftEnd: '14:00', status: 'Active' },
        { id: '2', guardName: 'Sunil Verma', hostel: 'Krishna Hostel', gate: 'East Gate', shiftStart: '14:00', shiftEnd: '22:00', status: 'Active' },
    ]);

    const [availableWardens, setAvailableWardens] = useState<{ id: string, name: string }[]>([
        { id: '1', name: 'Dr. Suresh Kumar' },
        { id: '2', name: 'Dr. Meera Singh' },
        { id: '3', name: 'Dr. Anil Sharma' },
    ]);

    // Filtering
    const filteredHostels = useMemo(() => hostels.filter(h =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.warden.toLowerCase().includes(searchQuery.toLowerCase())
    ), [hostels, searchQuery]);

    const filteredGates = useMemo(() => gates.filter(g =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.hostel.toLowerCase().includes(searchQuery.toLowerCase())
    ), [gates, searchQuery]);

    const filteredAssignments = useMemo(() => guardAssignments.filter(a =>
        a.guardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.hostel.toLowerCase().includes(searchQuery.toLowerCase())
    ), [guardAssignments, searchQuery]);

    // Handlers - Hostel
    const handleSaveHostel = (form: HostelForm) => {
        let assignedWarden = form.warden;
        if (form.isNewWarden) {
            const newWarden = { id: Date.now().toString(), name: form.newWardenName };
            setAvailableWardens(prev => [...prev, newWarden]);
            assignedWarden = newWarden.name;
        }

        const data: Hostel = {
            id: selectedItem?.id || Date.now().toString(),
            name: form.name,
            address: form.address,
            type: form.type,
            rooms: parseInt(form.totalRooms),
            capacity: parseInt(form.capacity),
            warden: assignedWarden,
            status: 'Active',
        };

        if (selectedItem) {
            setHostels(prev => prev.map(h => h.id === selectedItem.id ? data : h));
        } else {
            setHostels(prev => [...prev, data]);
        }
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleDeleteHostel = (id: string) => {
        if (confirm('Are you sure you want to delete this hostel?')) {
            setHostels(prev => prev.filter(h => h.id !== id));
        }
    };

    // Handlers - Gate
    const handleSaveGate = (form: GateForm) => {
        const data: Gate = {
            id: selectedItem?.id || Date.now().toString(),
            name: form.gateName,
            code: selectedItem?.code || `${form.gateName.substring(0, 2).toUpperCase()}-${Date.now().toString().slice(-2)}`,
            hostel: form.hostel,
            type: form.gateType,
            guard: form.guard || 'Unassigned',
            status: 'Active',
        };

        if (selectedItem) {
            setGates(prev => prev.map(g => g.id === selectedItem.id ? data : g));
        } else {
            setGates(prev => [...prev, data]);
        }
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleDeleteGate = (id: string) => {
        if (confirm('Are you sure you want to delete this gate?')) {
            setGates(prev => prev.filter(g => g.id !== id));
        }
    };

    // Handlers - Guard Assignment
    const handleSaveAssignment = (form: AssignmentForm) => {
        const data: GuardAssignment = {
            id: selectedItem?.id || Date.now().toString(),
            guardName: form.guard,
            hostel: form.hostel,
            gate: form.gate,
            shiftStart: form.shiftStart,
            shiftEnd: form.shiftEnd,
            status: form.status ? 'Active' : 'Inactive',
        };

        if (selectedItem) {
            setGuardAssignments(prev => prev.map(a => a.id === selectedItem.id ? data : a));
        } else {
            setGuardAssignments(prev => [...prev, data]);
        }
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleDeleteAssignment = (id: string) => {
        if (confirm('Are you sure you want to delete this assignment?')) {
            setGuardAssignments(prev => prev.filter(a => a.id !== id));
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Hostel Management</h1>
                <p className="text-gray-600 mt-1">Manage hostels, gates, and security assignments</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-gray-900">Hostels & Gates</h2>
                        <div className="relative">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full md:w-80"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 px-6 gap-4">
                    <div className="flex overflow-x-auto whitespace-nowrap">
                        <button
                            onClick={() => setActiveTab('Hostels')}
                            className={`px-4 py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'Hostels' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                        >
                            <Home className="w-4 h-4" />
                            Hostels ({filteredHostels.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('Gates')}
                            className={`px-4 py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'Gates' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                            Gates ({filteredGates.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('Guards')}
                            className={`px-4 py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'Guards' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                        >
                            <Shield className="w-4 h-4" />
                            Guards ({filteredAssignments.length})
                        </button>
                    </div>
                    <div className="py-3">
                        <button
                            onClick={() => { setSelectedItem(null); setIsAddModalOpen(true); }}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            <Plus className="w-5 h-5" />
                            Add {activeTab.slice(0, -1)}
                        </button>
                    </div>
                </div>

                <div className="bg-white">
                    {activeTab === 'Hostels' && (
                        <HostelTab
                            hostels={filteredHostels}
                            onEdit={(h) => { setSelectedItem(h); setIsEditModalOpen(true); }}
                            onDelete={handleDeleteHostel}
                        />
                    )}
                    {activeTab === 'Gates' && (
                        <GateTab
                            gates={filteredGates}
                            onEdit={(g) => { setSelectedItem(g); setIsEditModalOpen(true); }}
                            onDelete={handleDeleteGate}
                        />
                    )}
                    {activeTab === 'Guards' && (
                        <GuardTab
                            assignments={filteredAssignments}
                            onEdit={(a) => { setSelectedItem(a); setIsEditModalOpen(true); }}
                            onDelete={handleDeleteAssignment}
                        />
                    )}
                </div>
            </div>

            {/* Modals */}
            <AddHostelModal
                isOpen={isAddModalOpen && activeTab === 'Hostels'}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveHostel}
                availableWardens={availableWardens}
            />
            <EditHostelModal
                isOpen={isEditModalOpen && activeTab === 'Hostels'}
                onClose={() => setIsEditModalOpen(false)}
                onSave={(_id, form) => handleSaveHostel(form)}
                hostel={selectedItem}
                availableWardens={availableWardens}
            />

            <AddGateModal
                isOpen={isAddModalOpen && activeTab === 'Gates'}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveGate}
                hostels={hostels}
            />
            <EditGateModal
                isOpen={isEditModalOpen && activeTab === 'Gates'}
                onClose={() => setIsEditModalOpen(false)}
                onSave={(_id, form) => handleSaveGate(form)}
                gate={selectedItem}
                hostels={hostels}
            />

            <AddGuardModal
                isOpen={isAddModalOpen && activeTab === 'Guards'}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveAssignment}
                hostels={hostels}
                gates={gates}
            />
            <EditGuardModal
                isOpen={isEditModalOpen && activeTab === 'Guards'}
                onClose={() => setIsEditModalOpen(false)}
                onSave={(_id, form) => handleSaveAssignment(form)}
                assignment={selectedItem}
                hostels={hostels}
                gates={gates}
            />
        </div>
    );
}

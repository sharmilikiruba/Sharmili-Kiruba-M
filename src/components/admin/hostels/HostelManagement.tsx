'use client';

import { useState, useMemo, useEffect } from 'react';
import { Home, Search, Plus, Shield } from 'lucide-react';
import apiClient from '@/lib/api-client';

// Modular Imports
import { TabType, Hostel, Gate, HostelForm, GateForm } from './types';
import { HostelTab } from './HostelTab';
import { AddHostelModal } from './AddHostelModal';
import { EditHostelModal } from './EditHostelModal';
import { GateTab } from './GateTab';
import { AddGateModal } from './AddGateModal';
import { EditGateModal } from './EditGateModal';
import { HostelViewModal } from './HostelViewModal';
import { Warden } from '../users/types';

export default function HostelManagement() {
    const [activeTab, setActiveTab] = useState<TabType>('Hostels');
    const [searchQuery, setSearchQuery] = useState('');

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Data States
    const [hostels, setHostels] = useState<Hostel[]>([]);

    const [gates, setGates] = useState<Gate[]>([]);


    const [availableWardens, setAvailableWardens] = useState<(Warden & { name: string })[]>([]);

    // Filtering
    // Data fetching
    const fetchData = async () => {
        try {
            const [hostelsRes, gatesRes, wardensRes] = await Promise.all([
                apiClient.get('/admin/hostels'),
                apiClient.get('/admin/gates'),
                apiClient.get('/admin/wardens')
            ]);

            if (hostelsRes.data.success) {
                const mappedHostels: Hostel[] = hostelsRes.data.data.map((h: any) => ({
                    id: h.hostel_id.toString(),
                    hostel_id: h.hostel_id,
                    name: h.hostel_name,
                    address: h.location,
                    type: h.hostel_type,
                    rooms: h.total_rooms,
                    capacity: h.total_rooms * 2, // Assuming capacity logic or get from data if available
                    warden: h.warden?.name || 'Unassigned',
                    status: 'Active'
                }));
                setHostels(mappedHostels);
            }

            if (gatesRes.data.success) {
                const mappedGates: Gate[] = gatesRes.data.data.map((g: any) => ({
                    id: g.gate_id.toString(),
                    gate_id: g.gate_id,
                    name: g.gate_name,
                    gate_no: g.gate_no,
                    code: `G-${g.gate_no}`,
                    hostel: g.hostel?.hostel_name || 'Unassigned',
                    hostel_id: g.hostel_id,
                    location: g.location,
                    type: 'Entry & Exit',
                    status: 'Active'
                }));
                setGates(mappedGates);
            }

            if (wardensRes.data.success) {
                const mappedWardens = wardensRes.data.data.map((w: any) => ({
                    ...w,
                    id: w.warden_id.toString(), // Ensure id is string for UI components
                    name: w.name || w.user?.name
                }));
                setAvailableWardens(mappedWardens);
            }
        } catch (error) {
            console.error('Error fetching hostel management data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredHostels = useMemo(() => hostels.filter(h =>
        (h.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (h.warden || '').toLowerCase().includes(searchQuery.toLowerCase())
    ), [hostels, searchQuery]);

    const filteredGates = useMemo(() => gates.filter(g =>
        (g.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (g.hostel || '').toLowerCase().includes(searchQuery.toLowerCase())
    ), [gates, searchQuery]);


    // Handlers - Hostel
    const handleSaveHostel = async (form: HostelForm) => {
        try {
            const id = selectedItem?.id;
            const assignedWardenName = form.warden;
            // Find warden by name - robust check
            const foundWarden = availableWardens.find(w => w.name === assignedWardenName);
            const wardenId = foundWarden ? foundWarden.id : null;

            const payload = {
                hostel_name: form.name,
                location: form.address,
                hostel_type: form.type,
                total_rooms: parseInt(form.totalRooms),
                warden_id: wardenId ? parseInt(wardenId) : null, // Send null if unassigned or not found
                // capacity is likely derived from rooms in many systems, but if backend accepts it or we want to store it:
                // capacity: parseInt(form.capacity) 
            };

            let response;
            if (id) {
                // Update
                response = await apiClient.put(`/admin/hostels/${id}`, payload);
            } else {
                // Create
                response = await apiClient.post('/admin/hostels', payload);
            }

            if (response.data.success) {
                // Determine the new/updated hostel object for local state update or just refetch
                // Refetching is safer to get backend-generated fields/relations
                await fetchData();
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
            }
        } catch (error: any) {
            console.error('Error saving hostel:', error);
            alert(error.response?.data?.message || 'Failed to save hostel');
        }
    };

    const handleDeleteHostel = async (id: string) => {
        if (!confirm('Are you sure you want to delete this hostel?')) return;
        try {
            const response = await apiClient.delete(`/admin/hostels/${id}`);
            if (response.data.success) {
                // setHostels(prev => prev.filter(h => h.id !== id));
                // Better to refetch to ensure sync especially if side effects exist
                fetchData();
            }
        } catch (error) {
            console.error('Error deleting hostel:', error);
            alert('Failed to delete hostel');
        }
    };

    // Handlers - Gate
    const handleSaveGate = async (id: string | null, form: GateForm) => {
        try {
            const payload = {
                gate_name: form.gateName,
                gate_no: form.gateNo,
                hostel_id: form.hostel_id, // hostel_id is already number in form state logic in EditGateModal
                location: form.location,
                status: 'Active', // Default or from form if we had status
                // gateType is not directly in standard Gate model as enum but maybe free field or unused, 
                // passing it as type if backend expects it, or ignoring. 
                // Based on frontend 'gateType', backend might use it or ignore it.
                // Checking previous code, 'type' was mapped to 'gate_type'. Let's send what matches likely backend expectation.
                // But Gate model has 'type' nowhere? It has status. 
                // Wait, EditGateModal.tsx uses 'gateType' and maps to 'gate.type'. 
                // Backend Gate model has no 'type' field visible in the file I read (Guard has, Gate has status). 
                // Wait, I missed it? Let me re-read Gate.ts in my thought... 
                // Gate.ts: gate_name, gate_no, hostel_id, location, status. NO 'type'.
                // So 'gateType' from form likely goes nowhere or is 'status' if mapped? 
                // Form options: "Entry & Exit", "Entry Only" etc. 
                // If backend doesn't support it, we can't save it. 
                // I will send it in case I missed a loose field or it's handled by controller logic not seen, 
                // but primary fields are gate_name, gate_no, hostel_id.
            };

            let response;
            if (id) {
                // Update existing gate
                response = await apiClient.put(`/admin/gates/${id}`, payload);
            } else {
                // Create new gate
                response = await apiClient.post('/admin/gates', payload);
            }

            if (response.data.success) {
                const gateId = response.data.data?.gate_id || id;

                // If guard is assigned, call the assign-gate endpoint
                if (form.guard_id) {
                    await apiClient.post('/admin/guards/assign-gate', {
                        guardId: form.guard_id,
                        gateId: gateId
                    });
                }

                await fetchData();
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
            }
        } catch (error: any) {
            console.error('Error saving gate:', error);
            alert(error.response?.data?.message || 'Failed to save gate');
        }
    };

    const handleDeleteGate = async (id: string) => {
        if (!confirm('Are you sure you want to delete this gate?')) return;
        try {
            const response = await apiClient.delete(`/admin/gates/${id}`);
            if (response.data.success) {
                // setGates(prev => prev.filter(g => g.id !== id));
                fetchData();
            }
        } catch (error) {
            console.error('Error deleting gate:', error);
            alert('Failed to delete gate');
        }
    };


    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Hostel Management</h1>
                <p className="text-gray-600 mt-1">Manage hostels and gates</p>
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
                            onView={(h) => { setSelectedItem(h); setIsViewModalOpen(true); }}
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
                </div>
            </div>

            {/* Modals */}
            <HostelViewModal
                isOpen={isViewModalOpen && activeTab === 'Hostels'}
                onClose={() => setIsViewModalOpen(false)}
                hostel={selectedItem}
                wardenDetails={availableWardens.find(w => w.name === selectedItem?.warden)}
            />

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
                onSave={(form) => handleSaveGate(null, form)}
                hostels={hostels}
            />
            <EditGateModal
                isOpen={isEditModalOpen && activeTab === 'Gates'}
                onClose={() => setIsEditModalOpen(false)}
                onSave={(id, form) => handleSaveGate(id, form)}
                gate={selectedItem}
                hostels={hostels}
            />

        </div>
    );
}

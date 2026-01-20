"use client"
import { useState } from 'react';
import { Home, Search, Plus, Edit, Trash2, Shield, Clock } from 'lucide-react';

type TabType = 'Hostels' | 'Gates' | 'Guards';

interface Hostel {
    id: string;
    name: string;
    address: string;
    type: string;
    rooms: number;
    capacity: number;
    warden: string;
    status: string;
}

interface Gate {
    id: string;
    name: string;
    code: string;
    hostel: string;
    type: string;
    guard: string;
    status: string;
}

interface GuardAssignment {
    id: string;
    guardName: string;
    hostel: string;
    gate: string;
    shiftStart: string;
    shiftEnd: string;
    status: string;
}

export default function HostelManagement() {
    const [activeTab, setActiveTab] = useState<TabType>('Hostels');
    const [isHostelModalOpen, setIsHostelModalOpen] = useState(false);
    const [isGateModalOpen, setIsGateModalOpen] = useState(false);
    const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);

    const [hostels, setHostels] = useState<Hostel[]>([
        {
            id: '1',
            name: 'Krishna Hostel',
            address: 'Block A, University Campus',
            type: 'Boys',
            rooms: 150,
            capacity: 300,
            warden: 'Dr. Suresh Kumar',
            status: 'Active',
        },
        {
            id: '2',
            name: 'Saraswati Hostel',
            address: 'Block B, University Campus',
            type: 'Girls',
            rooms: 120,
            capacity: 240,
            warden: 'Dr. Meera Singh',
            status: 'Active',
        },
        {
            id: '3',
            name: 'Vivekananda Hostel',
            address: 'Block C, University Campus',
            type: 'Boys',
            rooms: 100,
            capacity: 200,
            warden: 'Dr. Anil Sharma',
            status: 'Active',
        },
    ]);

    const [gates, setGates] = useState<Gate[]>([
        {
            id: '1',
            name: 'Main Gate',
            code: 'MG-01',
            hostel: 'Krishna Hostel',
            type: 'Entry & Exit',
            guard: 'Ramesh Yadav',
            status: 'Active',
        },
        {
            id: '2',
            name: 'East Gate',
            code: 'EG-01',
            hostel: 'Krishna Hostel',
            type: 'Entry & Exit',
            guard: 'Sunil Verma',
            status: 'Active',
        },
        {
            id: '3',
            name: 'Main Gate',
            code: 'MG-02',
            hostel: 'Saraswati Hostel',
            type: 'Entry & Exit',
            guard: 'Unassigned',
            status: 'Active',
        },
    ]);

    const [guardAssignments, setGuardAssignments] = useState<GuardAssignment[]>([
        {
            id: '1',
            guardName: 'Ramesh Yadav',
            hostel: 'Krishna Hostel',
            gate: 'Main Gate',
            shiftStart: '06:00',
            shiftEnd: '14:00',
            status: 'Active',
        },
        {
            id: '2',
            guardName: 'Sunil Verma',
            hostel: 'Krishna Hostel',
            gate: 'East Gate',
            shiftStart: '14:00',
            shiftEnd: '22:00',
            status: 'Active',
        },
    ]);

    const [availableWardens, setAvailableWardens] = useState<{ id: string, name: string }[]>([
        { id: '1', name: 'Dr. Suresh Kumar' },
        { id: '2', name: 'Dr. Meera Singh' },
        { id: '3', name: 'Dr. Anil Sharma' },
    ]);

    const initialHostelForm = { 
        name: '', 
        type: '', 
        totalRooms: '', 
        capacity: '', 
        warden: '', 
        address: '', 
        isNewWarden: false, 
        newWardenName: '', 
        newWardenEmail: '', 
        newWardenContact: '' 
    };
    const initialGateForm = { gateName: '', hostel: '', gateType: '', guard: '' };
    const initialAssignmentForm = { guard: '', hostel: '', gate: '', shiftStart: '06:00', shiftEnd: '14:00', status: true };

    const [hostelForm, setHostelForm] = useState(initialHostelForm);
    const [gateForm, setGateForm] = useState(initialGateForm);
    const [assignmentForm, setAssignmentForm] = useState(initialAssignmentForm);

    const filteredHostels = hostels.filter(h =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.warden.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredGates = gates.filter(g =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.hostel.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredAssignments = guardAssignments.filter(a =>
        a.guardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.hostel.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateHostel = (e: React.FormEvent) => {
        e.preventDefault();

        let assignedWarden = hostelForm.warden;

        if (hostelForm.isNewWarden) {
            const newWarden = {
                id: Date.now().toString(),
                name: hostelForm.newWardenName,
            };
            setAvailableWardens([...availableWardens, newWarden]);
            assignedWarden = newWarden.name;
        }

        const newHostel: Hostel = {
            id: editingId || Date.now().toString(),
            name: hostelForm.name,
            address: hostelForm.address,
            type: hostelForm.type,
            rooms: parseInt(hostelForm.totalRooms),
            capacity: parseInt(hostelForm.capacity),
            warden: assignedWarden,
            status: 'Active',
        };

        if (editingId) {
            setHostels(hostels.map(h => h.id === editingId ? newHostel : h));
        } else {
            setHostels([...hostels, newHostel]);
        }

        closeHostelModal();
        alert(editingId ? 'Hostel updated successfully!' : 'Hostel created successfully with warden assignment!');
    };

    const handleCreateGate = (e: React.FormEvent) => {
        e.preventDefault();
        const newGate: Gate = {
            id: editingId || Date.now().toString(),
            name: gateForm.gateName,
            code: editingId ? (gates.find(g => g.id === editingId)?.code || '') : `${gateForm.gateName.substring(0, 2).toUpperCase()}-${Date.now().toString().slice(-2)}`,
            hostel: gateForm.hostel,
            type: gateForm.gateType,
            guard: gateForm.guard || 'Unassigned',
            status: 'Active',
        };

        if (editingId) {
            setGates(gates.map(g => g.id === editingId ? newGate : g));
        } else {
            setGates([...gates, newGate]);
        }

        closeGateModal();
        alert(editingId ? 'Gate updated successfully!' : 'Gate created successfully!');
    };

    const handleSaveAssignment = (e: React.FormEvent) => {
        e.preventDefault();
        const newAssignment: GuardAssignment = {
            id: editingId || Date.now().toString(),
            guardName: assignmentForm.guard,
            hostel: assignmentForm.hostel,
            gate: assignmentForm.gate,
            shiftStart: assignmentForm.shiftStart,
            shiftEnd: assignmentForm.shiftEnd,
            status: assignmentForm.status ? 'Active' : 'Inactive',
        };

        if (editingId) {
            setGuardAssignments(guardAssignments.map(a => a.id === editingId ? newAssignment : a));
        } else {
            setGuardAssignments([...guardAssignments, newAssignment]);
        }

        closeAssignmentModal();
        alert(editingId ? 'Assignment updated successfully!' : 'Assignment saved successfully!');
    };

    const handleEditHostel = (hostel: Hostel) => {
        setHostelForm({
            name: hostel.name,
            type: hostel.type,
            totalRooms: hostel.rooms.toString(),
            capacity: hostel.capacity.toString(),
            warden: hostel.warden,
            address: hostel.address,
            isNewWarden: false,
            newWardenName: '',
            newWardenEmail: '',
            newWardenContact: ''
        });
        setEditingId(hostel.id);
        setIsHostelModalOpen(true);
    };

    const handleEditGate = (gate: Gate) => {
        setGateForm({
            gateName: gate.name,
            hostel: gate.hostel,
            gateType: gate.type,
            guard: gate.guard === 'Unassigned' ? '' : gate.guard,
        });
        setEditingId(gate.id);
        setIsGateModalOpen(true);
    };

    const handleEditAssignment = (assignment: GuardAssignment) => {
        setAssignmentForm({
            guard: assignment.guardName,
            hostel: assignment.hostel,
            gate: assignment.gate,
            shiftStart: assignment.shiftStart,
            shiftEnd: assignment.shiftEnd,
            status: assignment.status === 'Active',
        });
        setEditingId(assignment.id);
        setIsAssignmentModalOpen(true);
    };

    const handleDeleteHostel = (id: string) => {
        if (confirm('Are you sure you want to delete this hostel?')) {
            setHostels(hostels.filter(h => h.id !== id));
        }
    };

    const handleDeleteGate = (id: string) => {
        if (confirm('Are you sure you want to delete this gate?')) {
            setGates(gates.filter(g => g.id !== id));
        }
    };

    const handleDeleteAssignment = (id: string) => {
        if (confirm('Are you sure you want to delete this assignment?')) {
            setGuardAssignments(guardAssignments.filter(a => a.id !== id));
        }
    };

    const closeHostelModal = () => {
        setIsHostelModalOpen(false);
        setEditingId(null);
        setHostelForm(initialHostelForm);
    };

    const closeGateModal = () => {
        setIsGateModalOpen(false);
        setEditingId(null);
        setGateForm(initialGateForm);
    };

    const closeAssignmentModal = () => {
        setIsAssignmentModalOpen(false);
        setEditingId(null);
        setAssignmentForm(initialAssignmentForm);
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Hostel Management</h1>
                <p className="text-gray-600 mt-1">Manage hostels, gates, and security assignments</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Hostels & Gates</h2>
                        <div className="relative">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between border-b border-gray-200 px-6">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('Hostels')}
                            className={`px-4 py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'Hostels'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Home className="w-4 h-4" />
                            Hostels ({filteredHostels.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('Gates')}
                            className={`px-4 py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'Gates'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                            Gates ({filteredGates.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('Guards')}
                            className={`px-4 py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'Guards'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Shield className="w-4 h-4" />
                            Guards ({filteredAssignments.length})
                        </button>
                    </div>
                    <div className="py-3">
                        {activeTab === 'Hostels' && (
                            <button
                                onClick={() => setIsHostelModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Add Hostel
                            </button>
                        )}
                        {activeTab === 'Gates' && (
                            <button
                                onClick={() => setIsGateModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Add Gate
                            </button>
                        )}
                        {activeTab === 'Guards' && (
                            <button
                                onClick={() => setIsAssignmentModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Add Assignment
                            </button>
                        )}
                    </div>
                </div>

                {activeTab === 'Hostels' && (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hostel</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rooms</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Warden</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredHostels.map((hostel) => (
                                    <tr key={hostel.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-semibold text-gray-900">{hostel.name}</div>
                                                <div className="text-sm text-gray-600">{hostel.address}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900">{hostel.type}</td>
                                        <td className="px-6 py-4 text-gray-900">{hostel.rooms}</td>
                                        <td className="px-6 py-4 text-gray-900">{hostel.warden}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                                {hostel.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleEditHostel(hostel)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <button onClick={() => handleDeleteHostel(hostel.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'Gates' && (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gate</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Code</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hostel</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Guard</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredGates.map((gate) => (
                                    <tr key={gate.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-gray-900">{gate.name}</td>
                                        <td className="px-6 py-4 text-gray-900">{gate.code}</td>
                                        <td className="px-6 py-4 text-gray-900">{gate.hostel}</td>
                                        <td className="px-6 py-4 text-gray-900">{gate.type}</td>
                                        <td className="px-6 py-4 text-gray-900">{gate.guard}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                                {gate.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleEditGate(gate)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <button onClick={() => handleDeleteGate(gate.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'Guards' && (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Guard Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hostel</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gate</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Shift Time</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredAssignments.map((assignment) => (
                                    <tr key={assignment.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-gray-900">{assignment.guardName}</td>
                                        <td className="px-6 py-4 text-gray-900">{assignment.hostel}</td>
                                        <td className="px-6 py-4 text-gray-900">{assignment.gate}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-900">
                                                <Clock className="w-4 h-4" />
                                                {assignment.shiftStart} - {assignment.shiftEnd}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                                {assignment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleEditAssignment(assignment)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <button onClick={() => handleDeleteAssignment(assignment.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add Hostel Modal */}
            {isHostelModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                            <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Hostel' : 'Add New Hostel'}</h2>
                            <button onClick={closeHostelModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleCreateHostel} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Hostel Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter hostel name"
                                        value={hostelForm.name}
                                        onChange={(e) => setHostelForm({ ...hostelForm, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                    <input
                                        type="text"
                                        placeholder="Enter address"
                                        value={hostelForm.address}
                                        onChange={(e) => setHostelForm({ ...hostelForm, address: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                    <select
                                        value={hostelForm.type}
                                        onChange={(e) => setHostelForm({ ...hostelForm, type: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option value="">Select type</option>
                                        <option value="Boys">Boys</option>
                                        <option value="Girls">Girls</option>
                                        <option value="Co-ed">Co-ed</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Rooms</label>
                                        <input
                                            type="number"
                                            placeholder="100"
                                            value={hostelForm.totalRooms}
                                            onChange={(e) => setHostelForm({ ...hostelForm, totalRooms: e.target.value })}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                                        <input
                                            type="number"
                                            placeholder="200"
                                            value={hostelForm.capacity}
                                            onChange={(e) => setHostelForm({ ...hostelForm, capacity: e.target.value })}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="flex items-center gap-2 mb-2">
                                        <input
                                            type="checkbox"
                                            checked={hostelForm.isNewWarden}
                                            onChange={(e) => setHostelForm({ ...hostelForm, isNewWarden: e.target.checked, warden: '' })}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Create New Warden</span>
                                    </label>
                                </div>

                                {hostelForm.isNewWarden ? (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Warden Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter warden name"
                                                value={hostelForm.newWardenName}
                                                onChange={(e) => setHostelForm({ ...hostelForm, newWardenName: e.target.value })}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                placeholder="warden@university.edu"
                                                value={hostelForm.newWardenEmail}
                                                onChange={(e) => setHostelForm({ ...hostelForm, newWardenEmail: e.target.value })}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
                                            <input
                                                type="tel"
                                                placeholder="+91 98765 43210"
                                                value={hostelForm.newWardenContact}
                                                onChange={(e) => setHostelForm({ ...hostelForm, newWardenContact: e.target.value })}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Assign Warden</label>
                                        <select
                                            value={hostelForm.warden}
                                            onChange={(e) => setHostelForm({ ...hostelForm, warden: e.target.value })}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        >
                                            <option value="">Select warden</option>
                                            {availableWardens.map((warden) => (
                                                <option key={warden.id} value={warden.name}>{warden.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={closeHostelModal}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    {editingId ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Gate Modal */}
            {isGateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full">
                        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                            <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Gate' : 'Add New Gate'}</h2>
                            <button onClick={closeGateModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleCreateGate} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gate Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Main Gate"
                                        value={gateForm.gateName}
                                        onChange={(e) => setGateForm({ ...gateForm, gateName: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Hostel</label>
                                    <select
                                        value={gateForm.hostel}
                                        onChange={(e) => setGateForm({ ...gateForm, hostel: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option value="">Select hostel</option>
                                        {hostels.map((hostel) => (
                                            <option key={hostel.id} value={hostel.name}>{hostel.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gate Type</label>
                                    <select
                                        value={gateForm.gateType}
                                        onChange={(e) => setGateForm({ ...gateForm, gateType: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option value="">Select type</option>
                                        <option value="Entry & Exit">Entry & Exit</option>
                                        <option value="Entry Only">Entry Only</option>
                                        <option value="Exit Only">Exit Only</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Assign Guard (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="Guard name"
                                        value={gateForm.guard}
                                        onChange={(e) => setGateForm({ ...gateForm, guard: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={closeGateModal}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    {editingId ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Guard Assignment Modal */}
            {isAssignmentModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full">
                        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                            <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Assignment' : 'New Guard Assignment'}</h2>
                            <button onClick={closeAssignmentModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSaveAssignment} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Guard Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter guard name"
                                        value={assignmentForm.guard}
                                        onChange={(e) => setAssignmentForm({ ...assignmentForm, guard: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Hostel</label>
                                    <select
                                        value={assignmentForm.hostel}
                                        onChange={(e) => setAssignmentForm({ ...assignmentForm, hostel: e.target.value, gate: '' })}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option value="">Select hostel</option>
                                        {hostels.map((hostel) => (
                                            <option key={hostel.id} value={hostel.name}>{hostel.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gate</label>
                                    <select
                                        value={assignmentForm.gate}
                                        onChange={(e) => setAssignmentForm({ ...assignmentForm, gate: e.target.value })}
                                        required
                                        disabled={!assignmentForm.hostel}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
                                    >
                                        <option value="">Select gate</option>
                                        {gates.filter(g => g.hostel === assignmentForm.hostel).map((gate) => (
                                            <option key={gate.id} value={gate.name}>{gate.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Shift Start</label>
                                        <input
                                            type="time"
                                            value={assignmentForm.shiftStart}
                                            onChange={(e) => setAssignmentForm({ ...assignmentForm, shiftStart: e.target.value })}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Shift End</label>
                                        <input
                                            type="time"
                                            value={assignmentForm.shiftEnd}
                                            onChange={(e) => setAssignmentForm({ ...assignmentForm, shiftEnd: e.target.value })}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={assignmentForm.status}
                                            onChange={(e) => setAssignmentForm({ ...assignmentForm, status: e.target.checked })}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Active Status</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={closeAssignmentModal}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    {editingId ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
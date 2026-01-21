"use client"
import { useState, useMemo } from 'react';
import { Search, Plus, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Modular Imports
import { TabType, Student, Warden, Guard, WardenForm, GuardForm } from './types';
import { StudentTab } from './StudentTab';
import { StudentViewModal } from './StudentViewModal';
import { WardenTab } from './WardenTab';
import { AddWardenModal } from './AddWardenModal';
import { EditWardenModal } from './EditWardenModal';
import { WardenViewModal } from './WardenViewModal';
import { GuardTab } from './GuardTab';
import { AddGuardModal } from './AddGuardModal';
import { EditGuardModal } from './EditGuardModal';
import { GuardViewModal } from './GuardViewModal';

export default function UserManagement() {
    const [activeTab, setActiveTab] = useState<TabType>('Students');
    const [searchQuery, setSearchQuery] = useState('');

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // Dynamic Data States
    const [selectedUser, setSelectedUser] = useState<any>(null);

    // Sample data
    const [students, setStudents] = useState<Student[]>([
        { id: '1', name: 'Rahul Sharma', email: 'rahul.sharma@university.edu', contact: '+91 98765 00000', rollNo: '21CS101', department: 'Computer Science', hostel: 'Krishna Hostel', room: 'A-204', status: 'Active' },
        { id: '2', name: 'Priya Patel', email: 'priya.patel@university.edu', contact: '+91 98765 00001', rollNo: '21EC102', department: 'Electronics', hostel: 'Saraswati Hostel', room: 'B-105', status: 'Active' },
        { id: '3', name: 'Amit Kumar', email: 'amit.kumar@university.edu', contact: '+91 98765 00002', rollNo: '22ME103', department: 'Mechanical', hostel: 'Krishna Hostel', room: 'C-310', status: 'Inactive' },
    ]);

    const [wardens, setWardens] = useState<Warden[]>([
        { id: '1', name: 'Dr. Suresh Kumar', email: 'suresh.kumar@university.edu', contact: '+91 98765 11111', hostel: 'Krishna Hostel', status: 'Active' },
        { id: '2', name: 'Dr. Meera Singh', email: 'meera.singh@university.edu', contact: '+91 98765 22222', hostel: 'Saraswati Hostel', status: 'Active' },
    ]);

    const [guards, setGuards] = useState<Guard[]>([
        { id: '1', name: 'Ramesh Yadav', email: 'ramesh.guard@university.edu', contact: '+91 98765 33333', gate: 'Main Gate', shift: 'Morning', status: 'Active' },
        { id: '2', name: 'Sunil Verma', email: 'sunil.guard@university.edu', contact: '+91 98765 44444', gate: 'East Gate', shift: 'Evening', status: 'Active' },
    ]);

    const filteredStudents = useMemo(() =>
        students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())),
        [students, searchQuery]);

    const filteredWardens = useMemo(() =>
        wardens.filter(w => w.name.toLowerCase().includes(searchQuery.toLowerCase())),
        [wardens, searchQuery]);

    const filteredGuards = useMemo(() =>
        guards.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase())),
        [guards, searchQuery]);

    // Handlers
    const handleToggleStatus = (id: string, type: TabType) => {
        if (type === 'Students') {
            setStudents(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
        } else if (type === 'Wardens') {
            setWardens(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
        } else if (type === 'Guards') {
            setGuards(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
        }
    };

    const handleSaveWarden = (form: WardenForm) => {
        const id = selectedUser?.id;
        const data: Warden = {
            id: id || Date.now().toString(),
            name: form.fullName,
            email: form.email,
            contact: form.mobile,
            hostel: form.hostel,
            status: 'Active',
        };
        setWardens(prev => id ? prev.map(u => u.id === id ? data : u) : [...prev, data]);
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleSaveGuard = (form: GuardForm) => {
        const id = selectedUser?.id;
        const data: Guard = {
            id: id || Date.now().toString(),
            name: form.fullName,
            email: form.email,
            contact: form.mobile,
            gate: form.gate,
            shift: form.shift,
            status: 'Active',
        };
        setGuards(prev => id ? prev.map(u => u.id === id ? data : u) : [...prev, data]);
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(`${activeTab} Report`, 14, 20);
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

        let headers: string[] = [];
        let data: string[][] = [];

        if (activeTab === 'Students') {
            headers = ['Name', 'Roll No', 'Department', 'Hostel', 'Room', 'Status'];
            data = filteredStudents.map(s => [s.name, s.rollNo, s.department, s.hostel, s.room, s.status]);
        } else if (activeTab === 'Wardens') {
            headers = ['Name', 'Hostel', 'Email', 'Contact', 'Status'];
            data = filteredWardens.map(w => [w.name, w.hostel, w.email, w.contact || '-', w.status]);
        } else if (activeTab === 'Guards') {
            headers = ['Name', 'Gate', 'Shift', 'Email', 'Contact', 'Status'];
            data = filteredGuards.map(g => [g.name, g.gate, g.shift, g.email, g.contact || '-', g.status]);
        }

        autoTable(doc, { head: [headers], body: data, startY: 35 });
        doc.save(`${activeTab.toLowerCase()}_report.pdf`);
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 mt-1">Manage students, wardens, and guards</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-gray-900">All Users</h2>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative">
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full md:w-80"
                                />
                            </div>
                            {activeTab !== 'Students' && (
                                <button
                                    onClick={() => { setSelectedUser(null); setIsAddModalOpen(true); }}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add {activeTab === 'Wardens' ? 'Warden' : 'Guard'}
                                </button>
                            )}
                            <button
                                onClick={handleExportPDF}
                                className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-sm"
                            >
                                <FileText className="w-5 h-5" />
                                Export PDF
                            </button>
                        </div>
                    </div>
                </div>

                {activeTab === 'Students' && (
                    <div className="bg-blue-50 border-b border-blue-200 px-6 py-3 flex items-center gap-2 text-sm text-blue-800">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span><strong>Read-Only Access:</strong> Students are managed by their respective wardens. You can only view student records.</span>
                    </div>
                )}

                <div className="flex border-b border-gray-200 px-6 overflow-x-auto">
                    {(['Students', 'Wardens', 'Guards'] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                        >
                            {tab} ({tab === 'Students' ? students.length : tab === 'Wardens' ? wardens.length : guards.length})
                        </button>
                    ))}
                </div>

                <div className="bg-white">
                    {activeTab === 'Students' && (
                        <StudentTab
                            students={filteredStudents}
                            onView={(s) => { setSelectedUser(s); setIsViewModalOpen(true); }}
                            onToggleStatus={(id) => handleToggleStatus(id, 'Students')}
                        />
                    )}
                    {activeTab === 'Wardens' && (
                        <WardenTab
                            wardens={filteredWardens}
                            onEdit={(w) => { setSelectedUser(w); setIsEditModalOpen(true); }}
                            onView={(w) => { setSelectedUser(w); setIsViewModalOpen(true); }}
                            onToggleStatus={(id) => handleToggleStatus(id, 'Wardens')}
                        />
                    )}
                    {activeTab === 'Guards' && (
                        <GuardTab
                            guards={filteredGuards}
                            onEdit={(g) => { setSelectedUser(g); setIsEditModalOpen(true); }}
                            onView={(g) => { setSelectedUser(g); setIsViewModalOpen(true); }}
                            onToggleStatus={(id) => handleToggleStatus(id, 'Guards')}
                        />
                    )}
                </div>
            </div>

            {/* Modals */}
            <StudentViewModal
                isOpen={isViewModalOpen && activeTab === 'Students'}
                onClose={() => setIsViewModalOpen(false)}
                student={selectedUser}
            />

            <AddWardenModal
                isOpen={isAddModalOpen && activeTab === 'Wardens'}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveWarden}
            />
            <EditWardenModal
                isOpen={isEditModalOpen && activeTab === 'Wardens'}
                onClose={() => setIsEditModalOpen(false)}
                warden={selectedUser}
                onSave={(_id, form) => handleSaveWarden(form)}
            />
            <WardenViewModal
                isOpen={isViewModalOpen && activeTab === 'Wardens'}
                onClose={() => setIsViewModalOpen(false)}
                warden={selectedUser}
            />

            <AddGuardModal
                isOpen={isAddModalOpen && activeTab === 'Guards'}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveGuard}
            />
            <EditGuardModal
                isOpen={isEditModalOpen && activeTab === 'Guards'}
                onClose={() => setIsEditModalOpen(false)}
                guard={selectedUser}
                onSave={(_id, form) => handleSaveGuard(form)}
            />
            <GuardViewModal
                isOpen={isViewModalOpen && activeTab === 'Guards'}
                onClose={() => setIsViewModalOpen(false)}
                guard={selectedUser}
            />
        </div>
    );
}

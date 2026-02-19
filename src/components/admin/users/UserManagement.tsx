"use client"
import { useState, useMemo, useEffect } from 'react';
import { Search, Plus, FileText } from 'lucide-react';
import apiClient from '@/lib/api-client';
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
import { AddStudentModal } from './AddStudentModal';

export default function UserManagement() {
    const [activeTab, setActiveTab] = useState<TabType>('Students');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedHostel, setSelectedHostel] = useState<string>('All');

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // Dynamic Data States
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hostels, setHostels] = useState<any[]>([]);

    // Sample data
    const [students, setStudents] = useState<Student[]>([]);
    const [wardens, setWardens] = useState<Warden[]>([]);
    const [guards, setGuards] = useState<Guard[]>([]);

    // Fetch data
    const fetchHostels = async () => {
        try {
            const response = await apiClient.get('/admin/hostels');
            if (response.data.success) {
                setHostels(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching hostels:', error);
        }
    };

    const fetchWardens = async () => {
        try {
            const response = await apiClient.get('/admin/wardens');
            if (response.data.success) {
                const formattedWardens = response.data.data.map((w: any) => ({
                    id: w.warden_id.toString(),
                    name: w.name,
                    email: w.user?.email || '',
                    contact: w.phone || '',
                    hostel: w.hostel?.hostel_name || 'Unassigned',
                    status: 'Active',
                    empId: w.emp_id,
                    dateOfJoining: w.joining_date,
                    address: w.address,
                }));
                setWardens(formattedWardens);
            }
        } catch (error) {
            console.error('Error fetching wardens:', error);
        }
    };

    const fetchGuards = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get('/admin/guards');
            if (response.data.success) {
                const formattedGuards = response.data.data.map((g: any) => ({
                    id: g.guard_id.toString(),
                    name: g.name,
                    email: g.user?.email || '',
                    contact: g.phone || g.alternate_phone || '',
                    status: 'Active',
                    empId: g.emp_id,
                    dateOfJoining: g.joining_date,
                    address: g.address,
                    gender: g.gender,
                    designation: g.designation,
                    dob: g.dob,
                    gate_id: g.gate_id,
                    assignedGate: g.assignedGate ? { gate_name: g.assignedGate.gate_name } : undefined,
                    shift_type: g.shift_type,
                    shift_start_time: g.shift_start_time,
                    shift_end_time: g.shift_end_time,
                }));
                setGuards(formattedGuards);
            }
        } catch (error) {
            console.error('Error fetching guards:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await apiClient.get('/admin/students');
            if (response.data.success) {
                const formattedStudents = response.data.data.map((s: any) => ({
                    id: s.student_id?.toString() || s.id?.toString(),
                    name: s.name,
                    email: s.user?.email || s.email || '',
                    contact: s.phone || s.mobile || '',
                    rollNo: s.roll_no || s.rollNumber || '',
                    department: s.department,
                    hostel: s.hostel?.hostel_name || 'Unassigned',
                    room: s.room_no || s.roomNumber || '',
                    status: 'Active', // Default or from data if available
                }));
                setStudents(formattedStudents);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchStudentDetails = async (id: string) => {
        try {
            const response = await apiClient.get(`/admin/students/${id}`);
            if (response.data.success) {
                const s = response.data.data;
                return {
                    id: s.student_id?.toString() || s.id?.toString(),
                    name: s.name,
                    email: s.user?.email || s.email || '',
                    contact: s.phone || s.mobile || '',
                    rollNo: s.roll_no || s.rollNumber || '',
                    department: s.department,
                    hostel: s.hostel?.hostel_name || 'Unassigned',
                    room: s.room_no || s.roomNumber || '',
                    status: 'Active',
                };
            }
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
        return null; // Return null if failed
    };

    useEffect(() => {
        fetchHostels();
    }, []);

    useEffect(() => {
        if (activeTab === 'Guards') {
            fetchGuards();
        } else if (activeTab === 'Wardens') {
            fetchWardens();
        } else if (activeTab === 'Students') {
            fetchStudents();
        }
    }, [activeTab]);

    const filteredStudents = useMemo(() =>
        students.filter(s =>
            (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedHostel === 'All' || s.hostel === selectedHostel)
        ),
        [students, searchQuery, selectedHostel]);

    const filteredWardens = useMemo(() =>
        wardens.filter(w => (w.name || '').toLowerCase().includes(searchQuery.toLowerCase())),
        [wardens, searchQuery]);

    const filteredGuards = useMemo(() =>
        guards.filter(g => (g.name || '').toLowerCase().includes(searchQuery.toLowerCase())),
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

    const handleDeleteGuard = async (id: string) => {
        if (!confirm('Are you sure you want to delete this guard?')) return;
        try {
            const response = await apiClient.delete(`/admin/guards/${id}`);
            if (response.data.success) {
                fetchGuards();
            }
        } catch (error) {
            console.error('Error deleting guard:', error);
            alert('Failed to delete guard');
        }
    };

    const handleDeleteWarden = async (id: string) => {
        if (!confirm('Are you sure you want to delete this warden?')) return;
        try {
            const response = await apiClient.delete(`/admin/wardens/${id}`);
            if (response.data.success) {
                fetchWardens();
            }
        } catch (error) {
            console.error('Error deleting warden:', error);
            alert('Failed to delete warden');
        }
    };

    const handleSaveWarden = async (form: WardenForm) => {
        try {
            const id = selectedUser?.id;
            const hostel = hostels.find(h => h.hostel_name === form.hostel);

            const payload: any = {
                name: form.fullName,
                email: form.email,
                phone: form.mobile,
                hostel_id: hostel?.hostel_id,
                address: form.address,
                joining_date: form.dateOfJoining,
            };

            if (form.password) {
                payload.password = form.password;
            }

            // Only include gender and dob if they are collected/available, otherwise don't send defaults for updates
            // For new creations, these might be needed if required by backend, but here we focus on updates primarily or ensure defaults are only for new
            if (!id) {
                payload.gender = 'M'; // Default for new creation if not in form
                payload.dob = '1990-01-01'; // Default for new creation if not in form
                payload.designation = 'Warden';
            }

            let response;
            if (id) {
                // For update, we don't send gender/dob/designation unless we want to update them (which we don't have forms for yet)
                response = await apiClient.put(`/admin/wardens/${id}`, payload);
            } else {
                response = await apiClient.post('/admin/wardens', payload);
            }

            if (response.data.success) {
                fetchWardens();
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
            }
        } catch (error: any) {
            console.error('Error saving warden:', error);
            alert(error.response?.data?.message || 'Failed to save warden');
        }
    };

    const handleDeleteStudent = async (id: string) => {
        if (!confirm('Are you sure you want to delete this student?')) return;
        try {
            const response = await apiClient.delete(`/admin/students/${id}`);
            if (response.data.success) {
                fetchStudents();
            }
        } catch (error) {
            console.error('Error deleting student:', error);
            alert('Failed to delete student');
        }
    };

    const handleSaveGuard = async (form: GuardForm) => {
        try {
            const id = selectedUser?.id;
            const payload: any = {
                name: form.fullName,
                email: form.email,
                phone: form.mobile,
                alternate_phone: form.mobile,
                gender: form.gender,
                dob: form.dob,
                designation: form.designation,
                address: form.address,
                gate_id: form.gate_id,
                shift_type: form.shift_type,
                shift_start_time: form.shift_start_time,
                shift_end_time: form.shift_end_time,
                joining_date: form.dateOfJoining,
            };

            if (form.password) {
                payload.password = form.password;
            }

            let response;
            if (id) {
                response = await apiClient.put(`/admin/guards/${id}`, payload);
            } else {
                response = await apiClient.post('/admin/guards', payload);
            }

            if (response.data.success) {
                fetchGuards();
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
            }
        } catch (error: any) {
            console.error('Error saving guard:', error);
            alert(error.response?.data?.message || 'Failed to save guard');
        }
    };

    const handleSaveStudent = async (form: any) => {
        try {
            const hostel = hostels.find(h => h.hostel_name === form.hostel);

            const payload = {
                fullName: form.fullName,
                roll_no: form.rollNumber,
                email: form.email,
                phone: form.mobile,
                room_no: form.room,
                department: form.department,
                hostel_id: hostel?.hostel_id
                // Backend might require additional fields or defaults?
                // Warden implementation includes gender, dob, address etc., but admin form doesn't asked for them yet.
                // If backend requires them, we might fail. 
                // However, user prompt didn't ask to add those fields to Admin modal.
                // I will send what we have. If backend fails due to missing fields, I'll know.
            };

            const response = await apiClient.post('/warden/students', payload);

            if (response.data.success) {
                setIsAddModalOpen(false);
                fetchStudents(); // Refresh list
                alert('Student created successfully');
            }
        } catch (error: any) {
            console.error('Error saving student:', error);
            alert(error.response?.data?.message || 'Failed to save student');
        }
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
            data = filteredGuards.map(g => [g.name, g.assignedGate?.gate_name || '-', g.shift_type || '-', g.email, g.contact || '-', g.status]);
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

                            {activeTab === 'Students' && (
                                <select
                                    value={selectedHostel}
                                    onChange={(e) => setSelectedHostel(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-700 font-medium cursor-pointer shadow-sm hover:border-gray-400 transition-all min-w-[200px]"
                                >
                                    <option value="All">All Hostels</option>
                                    {hostels.map((h) => (
                                        <option key={h.hostel_id} value={h.hostel_name}>
                                            {h.hostel_name}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <button
                                onClick={() => { setSelectedUser(null); setIsAddModalOpen(true); }}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                <Plus className="w-5 h-5" />
                                Add {activeTab === 'Wardens' ? 'Warden' : activeTab === 'Guards' ? 'Guard' : 'Student'}
                            </button>
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
                            onView={async (s) => {
                                setSelectedUser(s); // Show immediate data
                                setIsViewModalOpen(true);
                                const details = await fetchStudentDetails(s.id);
                                if (details) setSelectedUser(details); // Update with fresh data
                            }}
                            onDelete={handleDeleteStudent}
                            onToggleStatus={(id) => handleToggleStatus(id, 'Students')}
                        />
                    )}
                    {activeTab === 'Wardens' && (
                        <WardenTab
                            wardens={filteredWardens}
                            onEdit={(w) => { setSelectedUser(w); setIsEditModalOpen(true); }}
                            onView={(w) => { setSelectedUser(w); setIsViewModalOpen(true); }}
                            onToggleStatus={(id) => handleToggleStatus(id, 'Wardens')}
                            onDelete={handleDeleteWarden}
                        />
                    )}
                    {activeTab === 'Guards' && (
                        <GuardTab
                            guards={filteredGuards}
                            onEdit={(g) => { setSelectedUser(g); setIsEditModalOpen(true); }}
                            onView={(g) => { setSelectedUser(g); setIsViewModalOpen(true); }}
                            onDelete={handleDeleteGuard}
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
                hostels={hostels}
            />
            <EditWardenModal
                isOpen={isEditModalOpen && activeTab === 'Wardens'}
                onClose={() => setIsEditModalOpen(false)}
                warden={selectedUser}
                onSave={(_id, form) => handleSaveWarden(form)}
                hostels={hostels}
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

            <AddStudentModal
                isOpen={isAddModalOpen && activeTab === 'Students'}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveStudent}
                hostels={hostels}
            />
        </div>
    );
}

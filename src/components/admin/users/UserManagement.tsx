"use client"
import { useState, useMemo, useEffect } from 'react';
import { Search, Plus, FileText } from 'lucide-react';
import apiClient from '@/lib/api-client';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Modular Imports
import { TabType, Student, Warden, Guard, WardenForm, GuardForm, StudentForm } from './types';
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
import { EditStudentModal } from './EditStudentModal';
import { AdminTab } from './AdminTab';
import { AddAdminModal } from './AddAdminModal';
import { EditAdminModal } from './EditAdminModal';
import { AdminViewModal } from './AdminViewModal';
import { AdminUser, AdminForm } from './types';

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
    const [admins, setAdmins] = useState<AdminUser[]>([]);


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
            console.log('[UserManagement] Fetching wardens...');
            const response = await apiClient.get('/admin/wardens');
            console.log('[UserManagement] Wardens API Response Headers:', response.headers);
            console.log('[UserManagement] Wardens API Response Data:', response.data);

            if (response.data.success) {
                const rawData = response.data.data;
                if (!Array.isArray(rawData)) {
                    console.error('[UserManagement] Wardens data is not an array:', rawData);
                    return;
                }

                const formattedWardens = rawData.map((w: any) => {
                    try {
                        return {
                            id: (w.warden_id || w.id || w.userId || Math.random().toString()).toString(),
                            fullName: w.name || w.user?.username || 'Unknown',
                            email: w.user?.email || w.email || 'N/A',
                            phone: w.phone || w.user?.phone || 'N/A',
                            hostel: w.hostel?.hostel_name || 'Unassigned',
                            status: 'Active',
                            empId: w.emp_id || 'N/A',
                            dateOfJoining: w.user?.created_at || w.joining_date || 'N/A',
                            address: w.address || 'N/A',
                        };
                    } catch (e) {
                        console.error('[UserManagement] Error mapping individual warden:', w, e);
                        return null;
                    }
                }).filter(Boolean) as Warden[];

                console.log('[UserManagement] Successfully formatted wardens. Count:', formattedWardens.length);
                setWardens(formattedWardens);
            }
        } catch (error) {
            console.error('[UserManagement] Critical error in fetchWardens:', error);
        }
    };

    const fetchGuards = async () => {
        try {
            const response = await apiClient.get('/admin/guards');
            if (response.data.success && Array.isArray(response.data.data)) {
                const formattedGuards = response.data.data.map((g: any) => ({
                    id: (g.guard_id || g.id || '').toString(),
                    fullName: g.name || 'Unknown',
                    email: g.user?.email || g.email || 'N/A',
                    phone: g.phone || 'N/A',
                    gate: g.assignedGate?.gate_name || 'Unassigned',
                    status: 'Active',
                    empId: g.emp_id || 'N/A',
                    dateOfJoining: g.user?.created_at || g.joining_date || 'N/A',
                    address: g.address || 'N/A',
                    gender: g.gender || 'N/A',
                    shift_type: g.shift_type || 'N/A',
                    shift_start_time: g.shift_start_time || '',
                    shift_end_time: g.shift_end_time || '',
                    gate_id: g.gate_id || g.assignedGate?.gate_id
                }));
                setGuards(formattedGuards);
            }
        } catch (error) {
            console.error('Error fetching guards:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAdmins = async () => {
        try {
            const response = await apiClient.get('/admin/admins');
            if (response.data.success && Array.isArray(response.data.data)) {
                const formattedAdmins = response.data.data.map((a: any) => ({
                    id: (a.admin_id || a.id || '').toString(),
                    fullName: a.name || a.fullName || (a.user && a.user.name) || 'Unknown',
                    email: a.email || (a.user && a.user.email) || 'N/A',
                    phone: a.phone || a.mobile || (a.user && a.user.phone) || 'N/A',
                    designation: a.designation || 'Staff Admin',
                    gender: a.gender || '',
                    dob: a.dob || '',
                    status: (a.user?.status?.toLowerCase() === 'active' || a.status?.toLowerCase() === 'active') ? 'Active' : 'Inactive',
                    empId: a.emp_id || 'N/A',
                    dateOfJoining: a.user?.created_at || a.created_at || 'N/A',
                    address: a.address || 'N/A'
                }));
                setAdmins(formattedAdmins);
            }
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    const fetchStudents = async (hostelId?: string) => {
        try {
            const params: any = {};
            if (hostelId && hostelId !== 'All') {
                params.hostelId = hostelId;
            }
            if (searchQuery) {
                params.query = searchQuery;
            }

            const response = await apiClient.get('/admin/students', { params });
            console.log('[UserManagement] Students API Response:', response.data);
            if (response.data.success && Array.isArray(response.data.data)) {
                const formattedStudents = response.data.data.map((s: any) => ({
                    id: (s.student_id || s.id || s.userId || '').toString(),
                    fullName: s.name || s.fullName || s.userName || 'Unknown',
                    email: s.user?.email || s.email || 'N/A',
                    phone: s.phone || s.user?.phone || s.user?.mobile || 'N/A',
                    rollNumber: s.roll_no || s.rollNumber || s.roll || 'N/A',
                    department: s.department || 'N/A',
                    hostel: s.hostel?.hostel_name || s.hostel_name || 'Unassigned',
                    room_no: s.room?.room_no || (typeof s.room_no === 'object' ? s.room_no?.room_no : (s.room_no || s.rollNumber || s.room || 'N/A')),
                    status: 'Active',
                    dateOfJoining: s.user?.created_at || 'N/A',
                    gender: s.gender || '',
                    dob: s.dob || '',
                    course: s.course || '',
                    currentYear: s.current_year?.toString() || s.currentYear || '',
                    semester: s.semester?.toString() || '',
                    parentName: s.parent_name || '',
                    parentPhone: s.parent_phone || '',
                    guardianName: s.guardian_name || '',
                    guardianContact: s.guardian_contact || '',
                }));
                console.log('[UserManagement] Formatted Students:', formattedStudents);
                setStudents(formattedStudents);
            }
        } catch (error) {
            console.error('[UserManagement] Error fetching students:', error);
        }
    };

    const fetchStudentDetails = async (id: string) => {
        try {
            const response = await apiClient.get(`/admin/students/${id}`);
            if (response.data.success) {
                const s = response.data.data;
                return {
                    id: s.student_id?.toString() || s.id?.toString(),
                    fullName: s.fullName || s.name || '',
                    email: s.user?.email || s.email || '',
                    phone: s.phone || s.user?.phone || s.user?.mobile || '',
                    rollNumber: s.roll_no || s.rollNumber || '',
                    department: s.department,
                    hostel: s.hostel?.hostel_name || 'Unassigned',
                    room_no: s.room?.room_no || (typeof s.room_no === 'object' ? s.room_no?.room_no : (s.room_no || s.rollNumber || '')),
                    status: 'Active',
                    dateOfJoining: s.user?.created_at || 'N/A',
                    gender: s.gender || '',
                    dob: s.dob || '',
                    course: s.course || '',
                    currentYear: s.current_year?.toString() || s.currentYear || '',
                    semester: s.semester?.toString() || '',
                    parentName: s.parent_name || '',
                    parentPhone: s.parent_phone || '',
                    guardianName: s.guardian_name || '',
                    guardianContact: s.guardian_contact || '',
                };
            }
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
        return null; // Return null if failed
    };

    const fetchGuardDetails = async (id: string) => {
        try {
            const response = await apiClient.get(`/admin/guards/${id}`);
            if (response.data.success) {
                const g = response.data.data;
                return {
                    id: (g.guard_id || g.id || '').toString(),
                    fullName: g.name || 'Unknown',
                    email: g.user?.email || g.email || 'N/A',
                    phone: g.phone || 'N/A',
                    gate: g.assignedGate?.gate_name || 'Unassigned',
                    gate_id: g.gate_id || g.gate?.gate_id,
                    status: 'Active',
                    empId: g.emp_id || 'N/A',
                    dateOfJoining: g.joining_date || 'N/A',
                    address: g.address || 'N/A',
                    gender: g.gender || 'M',
                    shift: g.shift_type || 'N/A',
                    shift_type: g.shift_type || 'Day',
                    shift_start_time: g.shift_start_time || '',
                    shift_end_time: g.shift_end_time || '',
                    dob: g.dob || ''
                };
            }
        } catch (error) {
            console.error('Error fetching guard details:', error);
        }
        return null;
    };

    useEffect(() => {
        fetchHostels();
        fetchWardens();
        fetchGuards();
        fetchAdmins();
    }, []);

    // Effect to fetch students whenever search or hostel filter changes
    useEffect(() => {
        if (activeTab === 'Students') {
            const timer = setTimeout(() => {
                fetchStudents(selectedHostel);
            }, 300); // Small debounce for search
            return () => clearTimeout(timer);
        }
    }, [selectedHostel, searchQuery, activeTab]);

    const filteredStudents = useMemo(() =>
        students.filter(s =>
            (s.fullName || '').toLowerCase().includes(searchQuery.toLowerCase())
        ),
        [students, searchQuery]);

    const filteredWardens = useMemo(() =>
        wardens.filter(w => (w.fullName || '').toLowerCase().includes(searchQuery.toLowerCase())),
        [wardens, searchQuery]);

    const filteredGuards = useMemo(() =>
        guards.filter(g => (g.fullName || '').toLowerCase().includes(searchQuery.toLowerCase())),
        [guards, searchQuery]);

    const filteredAdmins = useMemo(() =>
        admins.filter(a => (a.fullName || '').toLowerCase().includes(searchQuery.toLowerCase())),
        [admins, searchQuery]);

    console.log('[UserManagement] Render State:', {
        activeTab,
        searchQuery,
        selectedHostel,
        studentsCount: students.length,
        wardensCount: wardens.length,
        guardsCount: guards.length,
        filteredStudentsCount: filteredStudents?.length || 0,
        filteredWardensCount: filteredWardens?.length || 0,
        filteredGuardsCount: filteredGuards?.length || 0
    });

    // Handlers
    const handleToggleStatus = async (id: string, type: TabType) => {
        if (type === 'Students') {
            setStudents(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
        } else if (type === 'Wardens') {
            setWardens(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
        } else if (type === 'Guards') {
            setGuards(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
        } else if (type === 'Admins') {
            const admin = admins.find(a => a.id === id);
            if (admin) {
                const newStatus = admin.status === 'Active' ? 'Inactive' : 'Active';
                try {
                    const response = await apiClient.put(`/admin/admins/${id}`, { status: newStatus });
                    if (response.data.success) {
                        setAdmins(admins.map(a => a.id === id ? { ...a, status: newStatus } : a));
                    }
                } catch (error) {
                    console.error('Error toggling admin status:', error);
                }
            }
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

    const handleDeleteAdmin = async (id: string) => {
        if (!confirm('Are you sure you want to delete this administrator?')) return;
        try {
            const response = await apiClient.delete(`/admin/admins/${id}`);
            if (response.data.success) {
                fetchAdmins();
            }
        } catch (error) {
            console.error('Error deleting admin:', error);
            alert('Failed to delete administrator');
        }
    };

    const handleSaveWarden = async (form: WardenForm) => {
        try {
            const id = selectedUser?.id;
            const hostel = hostels.find(h => h.hostel_name === form.hostel);

            const payload: any = {
                name: form.fullName,
                email: form.email,
                phone: form.phone,
                hostel_id: hostel?.hostel_id,
                address: form.address,
                joining_date: form.dateOfJoining,
            };

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
                phone: form.phone,
                alternate_phone: form.phone,
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

            let response;
            if (id) {
                response = await apiClient.put(`/admin/guards/${id}`, payload);
            } else {
                response = await apiClient.post('/admin/guards', payload);
            }

            if (response.data.success) {
                const guardId = response.data.data?.guard_id || id;

                // Explicitly call assign-gate if gate_id is provided
                if (form.gate_id) {
                    try {
                        await apiClient.post('/admin/guards/assign-gate', {
                            guardId: parseInt(guardId.toString()),
                            gateId: form.gate_id
                        });
                    } catch (assignError) {
                        console.error('Error assigning gate to guard:', assignError);
                        // We don't necessarily want to fail the whole save if just assignment fails, 
                        // but maybe alert the user.
                    }
                }

                fetchGuards();
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
            }
        } catch (error: any) {
            console.error('Error saving guard:', error);
            alert(error.response?.data?.message || 'Failed to save guard');
        }
    };

    const handleSaveStudent = async (form: StudentForm) => {
        try {
            const id = selectedUser?.id;
            const hostel = hostels.find(h => h.hostel_name === form.hostel);

            const payload = {
                fullName: form.fullName,
                rollNumber: form.rollNumber,
                email: form.email,
                phone: form.phone,
                room_no: form.room_no,
                department: form.department,
                hostel_id: hostel?.hostel_id,
                course: form.course,
                current_year: form.currentYear,
                semester: form.semester,
                gender: form.gender,
                dob: form.dob,
                parent_name: form.parentName,
                parent_phone: form.parentPhone,
                guardian_name: form.guardianName,
                guardian_contact: form.guardianContact
            };

            let response;
            if (id) {
                response = await apiClient.put(`/admin/students/${id}`, payload);
            } else {
                response = await apiClient.post('/admin/students', payload);
            }

            if (response.data.success) {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                fetchStudents(); // Refresh list
                return { success: true };
            }
            return { success: false, message: 'Failed to save student' };
        } catch (error: any) {
            console.error('Error saving student:', error);
            return { success: false, message: error.response?.data?.message || 'Failed to save student' };
        }
    };

    const handleSaveAdmin = async (form: AdminForm) => {
        try {
            const id = selectedUser?.id;
            const payload: any = {
                name: form.fullName,
                email: form.email,
                phone: form.phone,
                designation: form.designation,
                emp_id: form.empId
            };

            let response;
            if (id) {
                response = await apiClient.put(`/admin/admins/${id}`, payload);
            } else {
                response = await apiClient.post('/admin/admins', payload);
            }

            if (response.data.success) {
                fetchAdmins();
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                alert(`Administrator ${id ? 'updated' : 'created'} successfully`);
            }
        } catch (error: any) {
            console.error('Error saving admin:', error);
            alert(error.response?.data?.message || 'Failed to save administrator');
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
            data = filteredStudents.map(s => [s.fullName, s.rollNumber, s.department, s.hostel, s.room_no, s.status]);
        } else if (activeTab === 'Wardens') {
            headers = ['Name', 'Hostel', 'Email', 'Contact', 'Status'];
            data = filteredWardens.map(w => [w.fullName, w.hostel, w.email, w.phone || '-', w.status]);
        } else if (activeTab === 'Guards') {
            headers = ['Name', 'Gate', 'Shift', 'Email', 'Contact', 'Status'];
            data = filteredGuards.map(g => [
                g.fullName,
                g.gate || '-',
                `${g.shift_type || '-'} (${g.shift_start_time || 'N/A'} - ${g.shift_end_time || 'N/A'})`,
                g.email,
                g.phone || '-',
                g.status
            ]);
        } else if (activeTab === 'Admins') {
            headers = ['Name', 'Designation', 'Email', 'Contact', 'Status'];
            data = filteredAdmins.map(a => [a.fullName, a.designation, a.email, a.phone || '-', a.status]);
        }

        autoTable(doc, { head: [headers], body: data, startY: 35 });
        doc.save(`${activeTab.toLowerCase()}_report.pdf`);
    };

    return (
        <div className="p-4 md:p-8 space-y-6">
            <div className="mb-6 md:mb-8 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">Manage students, wardens, guards, and administrators</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-gray-900">All Users</h2>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                            <div className="relative flex-1 sm:flex-none">
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
                                />
                            </div>

                            {activeTab === 'Students' && (
                                <select
                                    value={selectedHostel}
                                    onChange={(e) => setSelectedHostel(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-700 font-medium cursor-pointer shadow-sm hover:border-gray-400 transition-all w-full sm:min-w-[200px]"
                                >
                                    <option value="All">All Hostels</option>
                                    {hostels.map((h) => (
                                        <option key={h.hostel_id} value={h.hostel_id.toString()}>
                                            {h.hostel_name}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <div className="flex items-center gap-4 mr-4">
                                <button
                                    onClick={() => { setSelectedUser(null); setIsAddModalOpen(true); }}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm text-sm"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>Add {activeTab === 'Wardens' ? 'Warden' : activeTab === 'Guards' ? 'Guard' : activeTab === 'Admins' ? 'Admin' : 'Student'}</span>
                                </button>
                                <button
                                    onClick={handleExportPDF}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-sm text-sm"
                                >
                                    <FileText className="w-5 h-5" />
                                    <span>Export</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex border-b border-gray-200 px-6 overflow-x-auto">
                    {(['Students', 'Wardens', 'Guards', 'Admins'] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                        >
                            {tab} ({tab === 'Students' ? students.length : tab === 'Wardens' ? wardens.length : tab === 'Guards' ? guards.length : admins.length})
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
                            onEdit={async (s) => {
                                setSelectedUser(s);
                                setIsEditModalOpen(true);
                                const details = await fetchStudentDetails(s.id);
                                if (details) setSelectedUser(details);
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
                            onEdit={async (g) => {
                                setSelectedUser(g); // Temporary data
                                setIsEditModalOpen(true);
                                const details = await fetchGuardDetails(g.id);
                                if (details) setSelectedUser(details); // Fresh data
                            }}
                            onView={async (g) => {
                                setSelectedUser(g); // Temporary data
                                setIsViewModalOpen(true);
                                const details = await fetchGuardDetails(g.id);
                                if (details) setSelectedUser(details); // Fresh data
                            }}
                            onDelete={handleDeleteGuard}
                        />
                    )}
                    {activeTab === 'Admins' && (
                        <AdminTab
                            admins={filteredAdmins}
                            onEdit={(a) => { setSelectedUser(a); setIsEditModalOpen(true); }}
                            onView={(a) => { setSelectedUser(a); setIsViewModalOpen(true); }}
                            onDelete={handleDeleteAdmin}
                            onToggleStatus={(id) => handleToggleStatus(id, 'Admins')}
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

            <EditStudentModal
                isOpen={isEditModalOpen && activeTab === 'Students'}
                onClose={() => setIsEditModalOpen(false)}
                student={selectedUser}
                onSave={(_id, form) => handleSaveStudent(form)}
                hostels={hostels}
            />

            <AddAdminModal
                isOpen={isAddModalOpen && activeTab === 'Admins'}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveAdmin}
            />

            <EditAdminModal
                isOpen={isEditModalOpen && activeTab === 'Admins'}
                onClose={() => setIsEditModalOpen(false)}
                admin={selectedUser}
                onSave={(_id, form) => handleSaveAdmin(form)}
            />

            <AdminViewModal
                isOpen={isViewModalOpen && activeTab === 'Admins'}
                onClose={() => setIsViewModalOpen(false)}
                admin={selectedUser}
            />
        </div>
    );
}

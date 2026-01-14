"use client"
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Search, Plus, FileText, Edit, Eye, Trash2, CheckCircle, XCircle,UploadCloud } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type UserType = 'Student' | 'Warden' | 'Guard';
type TabType = 'Students' | 'Wardens' | 'Guards';

interface BaseUser {
    id: string;
    name: string;
    email: string;
    contact?: string; // Unified contact field
    status: 'Active' | 'Inactive';
}

interface Student extends BaseUser {
    rollNo: string;
    department: string;
    hostel: string;
    room: string;
}

interface Warden extends BaseUser {
    hostel: string;

}

interface Guard extends BaseUser {
    gate: string;
    shift: string;
}

const initialStudentForm = { fullName: '', email: '', mobile: '', rollNumber: '', department: '', hostel: '', room: '' };
const initialWardenForm = { fullName: '', email: '', mobile: '', hostel: '' };
const initialGuardForm = { fullName: '', email: '', mobile: '', gate: '', shift: '' };

export default function UserManagement() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('Students');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

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

    // Form states
    const [studentForm, setStudentForm] = useState(initialStudentForm);
    const [wardenForm, setWardenForm] = useState(initialWardenForm);
    const [guardForm, setGuardForm] = useState(initialGuardForm);

    const handleViewStudent = (student: Student) => {
        setViewingStudent(student);
        setIsViewModalOpen(true);
    };

    const handleOpenModal = (user?: any, type?: TabType) => {
        const targetType = type || activeTab;

        // Prevent adding/editing students (admin can only view)
        if (targetType === 'Students') {
            alert('Students can only be viewed. Contact the respective warden to manage student records.');
            return;
        }

        setEditingId(user?.id || null);
        setIsModalOpen(true);

        if (user) {
            // Populate form for editing
            if (targetType === 'Wardens') {
                setWardenForm({
                    fullName: user.name, email: user.email, mobile: user.contact || '', hostel: user.hostel
                });
            } else if (targetType === 'Guards') {
                setGuardForm({
                    fullName: user.name, email: user.email, mobile: user.contact || '', gate: user.gate, shift: user.shift
                });
            }
        } else {
            // Reset forms for new entry
            setWardenForm(initialWardenForm);
            setGuardForm(initialGuardForm);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (activeTab === 'Wardens') {
            const data: Warden = {
                id: editingId || Date.now().toString(),
                name: wardenForm.fullName,
                email: wardenForm.email,
                contact: wardenForm.mobile,
                hostel: wardenForm.hostel,
                status: 'Active',
            };
            setWardens(prev => editingId ? prev.map(u => u.id === editingId ? data : u) : [...prev, data]);
        } else if (activeTab === 'Guards') {
            const data: Guard = {
                id: editingId || Date.now().toString(),
                name: guardForm.fullName,
                email: guardForm.email,
                contact: guardForm.mobile,
                gate: guardForm.gate,
                shift: guardForm.shift,
                status: 'Active',
            };
            setGuards(prev => editingId ? prev.map(u => u.id === editingId ? data : u) : [...prev, data]);
        }

        setIsModalOpen(false);
        setEditingId(null);
    };

    const filterData = (data: any[]) => {
        return data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
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
            data = students.map(s => [s.name, s.rollNo, s.department, s.hostel, s.room, s.status]);
        } else if (activeTab === 'Wardens') {
            headers = ['Name', 'Hostel', 'Email', 'Contact', 'Status'];
            data = wardens.map(w => [w.name, w.hostel, w.email, w.contact || '-', w.status]);
        } else if (activeTab === 'Guards') {
            headers = ['Name', 'Gate', 'Shift', 'Email', 'Contact', 'Status'];
            data = guards.map(g => [g.name, g.gate, g.shift, g.email, g.contact || '-', g.status]);
        }

        autoTable(doc, {
            head: [headers],
            body: data,
            startY: 35,
        });

        doc.save(`${activeTab.toLowerCase()}_report.pdf`);
    };

    const toggleStatus = (id: string, type: TabType) => {
        if (type === 'Students') {
            setStudents(prev => prev.map(user => user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user));
        } else if (type === 'Wardens') {
            setWardens(prev => prev.map(user => user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user));
        } else if (type === 'Guards') {
            setGuards(prev => prev.map(user => user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user));
        }
    };

    const renderTable = (columns: { header: string, accessor: (item: any) => React.ReactNode }[], data: any[], isStudentTab: boolean = false) => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{col.header}</th>
                        ))}
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            {columns.map((col, idx) => (
                                <td key={idx} className="px-6 py-4 text-sm text-gray-900">{col.accessor(item)}</td>
                            ))}
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {item.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => activeTab === 'Students' ? handleViewStudent(item) : handleOpenModal(item)}
                                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                                        title="View/Edit Details"
                                    >
                                        {/* Unified View/Edit logic - for simplicity, Wardens/Guards open Edit modal which has view + edit, Students open View modal */}
                                        {activeTab === 'Students' ? <Eye className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                                    </button>

                                    {/* Additional View Detail Button for Wardens/Guards to consistent with request 'add view symbol' */}
                                    {activeTab !== 'Students' && (
                                        <button
                                            onClick={() => {
                                                // Reuse view modal logic if needed, or just show alert for now as "View Details"
                                                // For a cleaner approach, let's reuse handleViewStudent logic but adapting it for generic users if we had a generic view modal.
                                                // Since handleViewStudent is typed for Student, we'll just open the Edit modal which serves as detail view for admins.
                                                handleOpenModal(item);
                                            }}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4 text-gray-600" />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => toggleStatus(item.id, activeTab)}
                                        className={`p-2 rounded-lg transition-colors ${item.status === 'Active' ? 'hover:bg-red-50 text-red-600' : 'hover:bg-green-50 text-green-600'}`}
                                        title={item.status === 'Active' ? 'Deactivate' : 'Activate'}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const userColumn = (item: any) => (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-500" />
            </div>
            <div>
                <div className="font-semibold text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-600">{item.email}</div>
            </div>
        </div>
    );

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 mt-1">Manage students, wardens, and guards</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">All Users</h2>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-80"
                                />
                            </div>
                            {/* Only show Add User button for Wardens and Guards */}
                            {activeTab !== 'Students' && (
                                <button
                                    onClick={() => handleOpenModal()}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add {activeTab === 'Wardens' ? 'Warden' : 'Guard'}
                                </button>
                            )}
                            {activeTab !== 'Students' && (
                                <button
                                    onClick={handleExportPDF}
                                    className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                                >
                                    <FileText className="w-5 h-5" />
                                    Export PDF
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info banner for Students tab */}
                {activeTab === 'Students' && (
                    <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
                        <div className="flex items-center gap-2 text-sm text-blue-800">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span><strong>Read-Only Access:</strong> Students are managed by their respective wardens. You can only view student records.</span>
                        </div>
                    </div>
                )}

                <div className="flex border-b border-gray-200 px-6">
                    {(['Students', 'Wardens', 'Guards'] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                        >
                            {tab} ({tab === 'Students' ? students.length : tab === 'Wardens' ? wardens.length : guards.length})
                        </button>
                    ))}
                </div>

                {activeTab === 'Students' && renderTable([
                    { header: 'Student', accessor: userColumn },
                    { header: 'Roll No', accessor: (s) => <span className="font-medium">{s.rollNo}</span> },
                    { header: 'Department', accessor: (s) => s.department },
                    { header: 'Hostel', accessor: (s) => s.hostel },
                    { header: 'Room', accessor: (s) => <span className="font-medium">{s.room}</span> },
                ], filterData(students), true)}

                {activeTab === 'Wardens' && renderTable([
                    { header: 'Warden', accessor: userColumn },
                    { header: 'Hostel', accessor: (w) => w.hostel },
                    { header: 'Contact', accessor: (w) => w.contact },
                ], filterData(wardens))}

                {activeTab === 'Guards' && renderTable([
                    { header: 'Guard', accessor: userColumn },
                    { header: 'Gate', accessor: (g) => g.gate },
                    { header: 'Shift', accessor: (g) => g.shift },
                    { header: 'Contact', accessor: (g) => g.contact },
                ], filterData(guards))}
            </div>

            {/* View Student Modal (Read-Only) */}
            {isViewModalOpen && viewingStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                            <h2 className="text-xl font-bold text-gray-900">Student Details</h2>
                            <button onClick={() => setIsViewModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <div className="flex items-center gap-2 text-sm text-blue-800">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <span>This is a read-only view. Contact the warden of <strong>{viewingStudent.hostel}</strong> to make changes.</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <ViewField label="Full Name" value={viewingStudent.name} />
                                <ViewField label="Roll Number" value={viewingStudent.rollNo} />
                                <ViewField label="Email" value={viewingStudent.email} />
                                <ViewField label="Contact" value={viewingStudent.contact || 'N/A'} />
                                <ViewField label="Department" value={viewingStudent.department} />
                                <ViewField label="Hostel" value={viewingStudent.hostel} />
                                <ViewField label="Room" value={viewingStudent.room} />
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-xl">
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal (Only for Wardens and Guards) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                            <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit User' : 'Add New User'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                                    {activeTab.slice(0, -1)}
                                </div>
                            </div>

                            {/* Dynamic Form Fields based on Active Tab */}
                            {activeTab === 'Wardens' && (
                                <>
                                    <InputField label="Full Name" value={wardenForm.fullName} onChange={(v) => setWardenForm({ ...wardenForm, fullName: v })} />
                                    <InputField label="Email" type="email" value={wardenForm.email} onChange={(v) => setWardenForm({ ...wardenForm, email: v })} />
                                    <InputField label="Mobile" value={wardenForm.mobile} onChange={(v) => setWardenForm({ ...wardenForm, mobile: v })} />
                                    <SelectField label="Hostel" value={wardenForm.hostel} onChange={(v) => setWardenForm({ ...wardenForm, hostel: v })} options={["Krishna Hostel", "Saraswati Hostel", "Ganga Hostel"]} />
                                </>
                            )}

                            {activeTab === 'Guards' && (
                                <>
                                    <InputField label="Full Name" value={guardForm.fullName} onChange={(v) => setGuardForm({ ...guardForm, fullName: v })} />
                                    <InputField label="Email" type="email" value={guardForm.email} onChange={(v) => setGuardForm({ ...guardForm, email: v })} />
                                    <InputField label="Mobile" value={guardForm.mobile} onChange={(v) => setGuardForm({ ...guardForm, mobile: v })} />
                                    <InputField label="Gate" value={guardForm.gate} onChange={(v) => setGuardForm({ ...guardForm, gate: v })} />
                                    <SelectField label="Shift" value={guardForm.shift} onChange={(v) => setGuardForm({ ...guardForm, shift: v })} options={["Morning", "Evening", "Night"]} />
                                </>
                            )}

                            <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                {editingId ? 'Save Changes' : 'Create User'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper components to minimize code
const InputField = ({ label, value, onChange, type = "text" }: { label: string, value: string, onChange: (val: string) => void, type?: string }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input
            type={type}
            placeholder={`Enter ${label.toLowerCase()}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
    </div>
);

const SelectField = ({ label, value, onChange, options }: { label: string, value: string, onChange: (val: string) => void, options: string[] }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const ViewField = ({ label, value }: { label: string, value: string }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
            {value}
        </div>
    </div>
);
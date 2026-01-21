import React from 'react';
import { Users, Home, Search, Download, Plus, Eye, Edit, Trash2, Phone, Mail } from 'lucide-react';
import { Student } from './types';

interface StudentDirectoryViewProps {
    studentsCount: number;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    yearFilter: string;
    onYearFilterChange: (value: string) => void;
    departmentFilter: string;
    onDepartmentFilterChange: (value: string) => void;
    years: string[];
    departments: string[];
    onResetFilters: () => void;
    onExportPDF: () => void;
    onAddClick: () => void;
    filteredStudents: Student[];
    onViewClick: (student: Student) => void;
    onEditClick: (student: Student) => void;
    onDeleteClick: (id: number) => void;
}

export const StudentDirectoryView: React.FC<StudentDirectoryViewProps> = ({
    studentsCount,
    searchTerm,
    onSearchChange,
    yearFilter,
    onYearFilterChange,
    departmentFilter,
    onDepartmentFilterChange,
    years,
    departments,
    onResetFilters,
    onExportPDF,
    onAddClick,
    filteredStudents,
    onViewClick,
    onEditClick,
    onDeleteClick,
}) => {
    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-[1600px] mx-auto px-8 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Warden Portal</h1>
                        <p className="text-sm font-medium text-gray-500 mt-1 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Managing <span className="text-gray-900 font-semibold">Krishna Hostel</span> Residents
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onExportPDF}
                            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold shadow-sm active:scale-95"
                        >
                            <Download size={18} className="text-gray-400" />
                            Export Data
                        </button>
                        <button
                            onClick={onAddClick}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg shadow-blue-600/20 active:scale-95"
                        >
                            <Plus size={20} />
                            Add Student
                        </button>
                    </div>
                </div>

                <div className="max-w-[1600px] mx-auto px-8 pb-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <ShieldIcon className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-blue-900">
                            Session Status: <span className="font-normal text-blue-700 opacity-80">Authorized access to Krishna Hostel student records.</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <StatCard icon={Users} label="Total Residents" value={studentsCount} sub="Current active students" color="blue" />
                    <StatCard icon={Home} label="Room Load" value={studentsCount} sub="Occupied capacity" color="indigo" />
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-[2rem] shadow-2xl border-gray-100 p-8 mb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-5 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder="Search name, roll number, or room..."
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl outline-none transition-all font-medium text-gray-900"
                            />
                        </div>

                        <div className="lg:col-span-2">
                            <select
                                value={yearFilter}
                                onChange={(e) => onYearFilterChange(e.target.value)}
                                className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl outline-none transition-all font-medium text-gray-900"
                            >
                                <option>All Years</option>
                                {years.map(year => <option key={year}>{year}</option>)}
                            </select>
                        </div>

                        <div className="lg:col-span-3">
                            <select
                                value={departmentFilter}
                                onChange={(e) => onDepartmentFilterChange(e.target.value)}
                                className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl outline-none transition-all font-medium text-gray-900"
                            >
                                <option>All Departments</option>
                                {departments.map(dept => <option key={dept}>{dept}</option>)}
                            </select>
                        </div>

                        <div className="lg:col-span-2">
                            <button
                                onClick={onResetFilters}
                                className="w-full px-4 py-4 text-gray-500 font-medium hover:text-gray-900"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table/Directory */}
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Active Student Directory</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-200">
                                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Resident Identity</th>
                                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Roll Number</th>
                                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Allocation</th>
                                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-8 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="group hover:bg-blue-50/30 transition-all">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <img
                                                        src={student.photo || 'https://via.placeholder.com/150'}
                                                        alt={student.name}
                                                        className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md transition-all group-hover:scale-105"
                                                    />
                                                    <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full border border-gray-100">
                                                        <div className="bg-green-500 w-2.5 h-2.5 rounded-full"></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-base font-bold text-gray-900">{student.name}</p>
                                                    <p className="text-xs font-medium text-gray-500">{student.department}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200">
                                                {student.rollNumber}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-indigo-50 p-1.5 rounded-lg border border-indigo-100">
                                                    <Home className="w-4 h-4 text-indigo-600" />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">{student.roomNumber}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                                                    {student.mobile}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                                    <Mail className="w-3.5 h-3.5 text-gray-300" />
                                                    {student.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-center gap-3">
                                                <ActionButton
                                                    onClick={() => onViewClick(student)}
                                                    icon={Eye}
                                                    title="View Profile"
                                                    color="blue"
                                                />
                                                <ActionButton
                                                    onClick={() => onEditClick(student)}
                                                    icon={Edit}
                                                    title="Edit Profile"
                                                    color="gray"
                                                />
                                                <ActionButton
                                                    onClick={() => onDeleteClick(student.id)}
                                                    icon={Trash2}
                                                    title="Delete Record"
                                                    color="red"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredStudents.length === 0 && (
                            <div className="p-20 text-center">
                                <div className="bg-gray-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-gray-200">
                                    <Search className="w-10 h-10 text-gray-300" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-1">No Records Found</h4>
                                <p className="text-sm font-medium text-gray-400 max-w-xs mx-auto">Try adjusting your filters or search query to find the specific student profile.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, sub, color, isPulse = false }: any) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all hover:shadow-md hover:-translate-y-1">
        <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</span>
            <div className={`bg-${color}-50 p-2.5 rounded-xl`}>
                <Icon className={`w-5 h-5 text-${color}-600 ${isPulse ? 'animate-pulse' : ''}`} />
            </div>
        </div>
        <p className="text-3xl font-bold text-gray-900 tracking-tight mb-1">{value}</p>
        <p className="text-xs font-medium text-gray-500">{sub}</p>
    </div>
);

const ActionButton = ({ onClick, icon: Icon, title, color }: any) => {
    const colors: any = {
        blue: "text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-600 hover:text-white",
        gray: "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-900 hover:text-white",
        red: "text-red-600 bg-red-50 border-red-100 hover:bg-red-600 hover:text-white"
    };

    return (
        <button
            onClick={onClick}
            className={`p-2.5 rounded-xl border transition-all shadow-sm active:scale-95 ${colors[color]}`}
            title={title}
        >
            <Icon size={18} />
        </button>
    );
};

const ShieldIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

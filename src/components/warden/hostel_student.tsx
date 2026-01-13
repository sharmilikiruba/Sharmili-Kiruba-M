'use client';

import { useState } from 'react';
import { 
  Search,
  Mail,
  Phone,
  Home,
  User,
  GraduationCap,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  room: string;
  department: string;
  year: string;
  semester: string;
  phone: string;
  photoUrl?: string;
}

// Sample student data - In production, this would come from your API filtered by warden's hostel
const sampleStudents: Student[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@university.edu',
    rollNo: '21CS101',
    room: 'A-204',
    department: 'Computer Science',
    year: '3rd Year',
    semester: '5th Semester',
    phone: '+91 98765 43210'
  },
  {
    id: '2',
    name: 'Amit Kumar',
    email: 'amit.kumar@university.edu',
    rollNo: '22ME103',
    room: 'C-310',
    department: 'Mechanical',
    year: '2nd Year',
    semester: '3rd Semester',
    phone: '+91 98765 43211'
  },
  {
    id: '3',
    name: 'Priya Patel',
    email: 'priya.patel@university.edu',
    rollNo: '21CS102',
    room: 'B-105',
    department: 'Computer Science',
    year: '3rd Year',
    semester: '5th Semester',
    phone: '+91 98765 43212'
  },
  {
    id: '4',
    name: 'Sneha Singh',
    email: 'sneha.singh@university.edu',
    rollNo: '22EE201',
    room: 'D-401',
    department: 'Electrical Engineering',
    year: '2nd Year',
    semester: '3rd Semester',
    phone: '+91 98765 43213'
  },
  {
    id: '5',
    name: 'Vikram Reddy',
    email: 'vikram.reddy@university.edu',
    rollNo: '21ME105',
    room: 'A-302',
    department: 'Mechanical',
    year: '3rd Year',
    semester: '5th Semester',
    phone: '+91 98765 43214'
  },
  {
    id: '6',
    name: 'Anjali Gupta',
    email: 'anjali.gupta@university.edu',
    rollNo: '22CS201',
    room: 'B-210',
    department: 'Computer Science',
    year: '2nd Year',
    semester: '3rd Semester',
    phone: '+91 98765 43215'
  },
  {
    id: '7',
    name: 'Rohan Joshi',
    email: 'rohan.joshi@university.edu',
    rollNo: '21EE103',
    room: 'C-405',
    department: 'Electrical Engineering',
    year: '3rd Year',
    semester: '5th Semester',
    phone: '+91 98765 43216'
  },
  {
    id: '8',
    name: 'Kavya Iyer',
    email: 'kavya.iyer@university.edu',
    rollNo: '22ME202',
    room: 'D-115',
    department: 'Mechanical',
    year: '2nd Year',
    semester: '3rd Semester',
    phone: '+91 98765 43217'
  }
];

export default function HostelStudents() {
  const [students] = useState<Student[]>(sampleStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Get unique departments and years
  const departments = ['All Departments', ...Array.from(new Set(students.map(s => s.department)))];
  const years = ['All Years', ...Array.from(new Set(students.map(s => s.year)))];

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.room.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = departmentFilter === 'All Departments' || student.department === departmentFilter;
    const matchesYear = yearFilter === 'All Years' || student.year === yearFilter;

    return matchesSearch && matchesDepartment && matchesYear;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  // Calculate department distribution
  const departmentDistribution = students.reduce((acc, student) => {
    acc[student.department] = (acc[student.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalStudents = students.length;

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Name', 'Roll No', 'Room', 'Department', 'Year/Semester', 'Email', 'Phone'];
    const csvData = filteredStudents.map(s => [
      s.name,
      s.rollNo,
      s.room,
      s.department,
      `${s.year} ${s.semester}`,
      s.email,
      s.phone
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hostel-students-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Calculate stats
  const occupiedRooms = new Set(students.map(s => s.room)).size;
  const uniqueDepartments = new Set(students.map(s => s.department)).size;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hostel Students</h1>
          <p className="text-gray-600">Students residing in Krishna Hostel</p>
        </div>

        {/* Summary Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {/* Total Students */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 ">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-700 font-medium mb-1">Total Students</p>
                <p className="text-xs text-gray-600">In your hostel</p>
              </div>
              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{totalStudents}</p>
          </div>

          {/* Occupied Rooms */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-700 font-medium mb-1">Occupied Rooms</p>
                <p className="text-xs text-gray-500">Currently in use</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{occupiedRooms}</p>
          </div>

          {/* Departments */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-700 font-medium mb-1">Departments</p>
                <p className="text-xs text-gray-500">Different programs</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{uniqueDepartments}</p>
          </div>

          {/* Filtered Results */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-700 font-medium mb-1">Filtered Results</p>
                <p className="text-xs text-gray-500">Matching criteria</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Filter className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{filteredStudents.length}</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, roll no, room..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Year Filter */}
            <div className="w-48">
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div className="w-52">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSearchTerm('');
                setDepartmentFilter('All Departments');
                setYearFilter('All Years');
                setCurrentPage(1);
              }}
              className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium whitespace-nowrap"
            >
              Reset
            </button>

            {/* Export Button */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Student Directory Table */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Student Directory</h2>
          </div>

          {currentStudents.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Student</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Roll No</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Room</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Department</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Year / Semester</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                        {/* Student Info */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                              {student.photoUrl ? (
                                <img src={student.photoUrl} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                              ) : (
                                <span className="text-blue-600 font-semibold text-sm">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{student.name}</div>
                              <div className="text-xs text-gray-500">{student.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Roll No */}
                        <td className="py-4 px-6">
                          <span className="text-sm font-medium text-gray-900">{student.rollNo}</span>
                        </td>

                        {/* Room */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700 font-medium">{student.room}</span>
                          </div>
                        </td>

                        {/* Department */}
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-700">{student.department}</span>
                        </td>

                        {/* Year/Semester */}
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-700">
                            <div className="font-medium">{student.year}</div>
                            <div className="text-xs text-gray-500">{student.semester}</div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <Phone className="w-3.5 h-3.5 text-gray-400" />
                              <span>{student.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-3.5 h-3.5 text-gray-400" />
                              <span className="text-xs truncate max-w-[200px]">{student.email}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} students
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 rounded-lg font-medium ${
                            currentPage === i + 1
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-16 text-center">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
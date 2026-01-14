'use client';

import React, { useState } from 'react';
import {
  Users,
  Home,
  GraduationCap,
  Filter,
  Search,
  Download,
  Plus,
  X,
  Upload,
  Trash2,
  Eye,
  Edit,
  Phone,
  Mail,
  Calendar,
  User
} from 'lucide-react';

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  email: string;
  mobile: string;
  roomNumber: string;
  department: string;
  year: string;
  semester: string;
  photo: string | null;
  parentName?: string;
  parentMobile?: string;
  guardianName?: string;
  guardianMobile?: string;
  fatherPhoto?: string | null;
  motherPhoto?: string | null;
  guardianPhoto?: string | null;
}

interface FormData {
  fullName: string;
  rollNumber: string;
  email: string;
  mobile: string;
  department: string;
  year: string;
  semester: string;
  roomNumber: string;
  parentName: string;
  parentMobile: string;
  parentRelation: string;
  address: string;
  bloodGroup: string;
  emergencyContact: string;
  guardianName: string;
  guardianMobile: string;
}

interface Photos {
  student: string | null;
  father: string | null;
  mother: string | null;
  guardian: string | null;
}

const HostelStudents: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All Departments');
  const [yearFilter, setYearFilter] = useState<string>('All Years');

  // Edit States
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentStudentId, setCurrentStudentId] = useState<number | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    rollNumber: '',
    email: '',
    mobile: '',
    department: '',
    year: '',
    semester: '',
    roomNumber: '',
    parentName: '',
    parentMobile: '',
    parentRelation: '',
    address: '',
    bloodGroup: '',
    emergencyContact: '',
    guardianName: '',
    guardianMobile: ''
  });

  const [photos, setPhotos] = useState<Photos>({
    student: null,
    father: null,
    mother: null,
    guardian: null
  });

  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Rahul Sharma',
      rollNumber: '21CS101',
      email: 'rahul.sharma@university.edu',
      mobile: '+91 98765 43210',
      roomNumber: 'A-204',
      department: 'Computer Science',
      year: '3rd Year',
      semester: '5th Semester',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      parentName: 'Mr. Sharma',
      parentMobile: '+91 98765 43211',
      guardianName: 'Mr. Sharma',
      guardianMobile: '+91 98765 43211',
      fatherPhoto: null,
      motherPhoto: null,
      guardianPhoto: null
    },
    {
      id: 2,
      name: 'Amit Kumar',
      rollNumber: '22ME103',
      email: 'amit.kumar@university.edu',
      mobile: '+91 98765 43212',
      roomNumber: 'C-310',
      department: 'Mechanical',
      year: '2nd Year',
      semester: '3rd Semester',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      parentName: 'Mrs. Kumar',
      parentMobile: '+91 98765 43213',
      guardianName: 'Mrs. Kumar',
      guardianMobile: '+91 98765 43213',
      fatherPhoto: null,
      motherPhoto: null,
      guardianPhoto: null
    }
  ]);

  const departments: string[] = ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Electronics'];
  const years: string[] = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const semesters: string[] = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];

  // Filter Logic
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = departmentFilter === 'All Departments' || student.department === departmentFilter;
    const matchesYear = yearFilter === 'All Years' || student.year === yearFilter;

    return matchesSearch && matchesDepartment && matchesYear;
  });

  // Export to PDF function
  const exportToPDF = async () => {
    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');

      const doc = new jsPDF();

      // Add title
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Krishna Hostel - Student Directory', 14, 20);

      // Add date
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

      // Add summary
      doc.setFontSize(12);
      doc.text(`Total Students: ${filteredStudents.length}`, 14, 36);

      // Prepare table data
      const tableData = filteredStudents.map(student => [
        student.name,
        student.rollNumber,
        student.department,
        student.year,
        student.roomNumber,
        student.mobile,
        student.email
      ]);

      // Add table
      autoTable(doc, {
        startY: 42,
        head: [['Name', 'Roll No', 'Department', 'Year', 'Room', 'Mobile', 'Email']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [37, 99, 235], // Blue color
          textColor: 255,
          fontStyle: 'bold',
          fontSize: 10
        },
        bodyStyles: {
          fontSize: 9
        },
        columnStyles: {
          0: { cellWidth: 30 }, // Name
          1: { cellWidth: 22 }, // Roll No
          2: { cellWidth: 28 }, // Department
          3: { cellWidth: 20 }, // Year
          4: { cellWidth: 18 }, // Room
          5: { cellWidth: 28 }, // Mobile
          6: { cellWidth: 32 }  // Email
        },
        margin: { top: 42 }
      });

      // Add footer
      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }

      // Save the PDF
      doc.save(`Krishna_Hostel_Students_${new Date().toISOString().split('T')[0]}.pdf`);

      alert('PDF exported successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  const handlePhotoUpload = (type: keyof Photos, e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos({ ...photos, [type]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (type: keyof Photos): void => {
    setPhotos({ ...photos, [type]: null });
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (): void => {
    if (!formData.fullName || !formData.rollNumber || !formData.mobile || !formData.roomNumber) {
      alert('Please fill in all required fields');
      return;
    }

    if (isEditing && currentStudentId) {
      // Update existing student
      setStudents(students.map(student => {
        if (student.id === currentStudentId) {
          return {
            ...student,
            name: formData.fullName,
            rollNumber: formData.rollNumber,
            email: formData.email,
            mobile: formData.mobile,
            roomNumber: formData.roomNumber,
            department: formData.department,
            year: formData.year,
            semester: formData.semester,
            photo: photos.student || student.photo,
            parentName: formData.parentName,
            parentMobile: formData.parentMobile,
            guardianName: formData.guardianName,
            guardianMobile: formData.guardianMobile,
            fatherPhoto: photos.father || student.fatherPhoto,
            motherPhoto: photos.mother || student.motherPhoto,
            guardianPhoto: photos.guardian || student.guardianPhoto
          };
        }
        return student;
      }));
      alert('Student updated successfully!');
    } else {
      // Add new student
      const newStudent: Student = {
        id: Date.now(),
        name: formData.fullName,
        rollNumber: formData.rollNumber,
        email: formData.email,
        mobile: formData.mobile,
        roomNumber: formData.roomNumber,
        department: formData.department,
        year: formData.year,
        semester: formData.semester,
        photo: photos.student,
        parentName: formData.parentName,
        parentMobile: formData.parentMobile,
        guardianName: formData.guardianName,
        guardianMobile: formData.guardianMobile,
        fatherPhoto: photos.father,
        motherPhoto: photos.mother,
        guardianPhoto: photos.guardian
      };
      setStudents([...students, newStudent]);
      alert('Student added successfully!');
    }

    setShowAddModal(false);
    resetForm();
  };

  const resetForm = (): void => {
    setFormData({
      fullName: '',
      rollNumber: '',
      email: '',
      mobile: '',
      department: '',
      year: '',
      semester: '',
      roomNumber: '',
      parentName: '',
      parentMobile: '',
      parentRelation: '',
      address: '',
      bloodGroup: '',
      emergencyContact: '',
      guardianName: '',
      guardianMobile: ''
    });
    setPhotos({
      student: null,
      father: null,
      mother: null,
      guardian: null
    });
    setIsEditing(false);
    setCurrentStudentId(null);
  };

  const handleDelete = (id: number): void => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const handleEdit = (student: Student): void => {
    setIsEditing(true);
    setCurrentStudentId(student.id);
    setFormData({
      fullName: student.name,
      rollNumber: student.rollNumber,
      email: student.email,
      mobile: student.mobile,
      department: student.department,
      year: student.year,
      semester: student.semester,
      roomNumber: student.roomNumber,
      parentName: student.parentName || '',
      parentMobile: student.parentMobile || '',
      parentRelation: '',
      address: '',
      bloodGroup: '',
      emergencyContact: '',
      guardianName: student.guardianName || '',
      guardianMobile: student.guardianMobile || ''
    });
    setPhotos({
      student: student.photo,
      father: student.fatherPhoto || null,
      mother: student.motherPhoto || null,
      guardian: student.guardianPhoto || null
    });
    setShowAddModal(true);
  };

  const handleViewStudent = (student: Student): void => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const PhotoUploadBox: React.FC<{ type: keyof Photos; label: string; photo: string | null }> = ({ type, label, photo }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {photo ? (
        <div className="relative">
          <img
            src={photo}
            alt={label}
            className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            type="button"
            onClick={() => handleRemovePhoto(type)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-lg"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ) : (
        <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer bg-gray-50 hover:bg-blue-50">
          <Upload size={24} />
          <span className="text-sm">Upload Photo</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handlePhotoUpload(type, e)}
            className="hidden"
          />
        </label>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hostel Students</h1>
            <p className="text-gray-600">Manage students residing in Krishna Hostel</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus size={20} />
            Add Student
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <div className="text-blue-600 mt-0.5">ℹ️</div>
          <p className="text-sm text-blue-800">
            <strong>Warden Permissions:</strong> You can add, edit, and remove students for your hostel (Krishna Hostel).
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm font-medium">Total Students</span>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{students.length}</p>
            <p className="text-sm text-gray-500 mt-1">In your hostel</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm font-medium">Occupied Rooms</span>
              <div className="bg-gray-100 p-3 rounded-lg">
                <Home className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{students.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm font-medium">Departments</span>
              <div className="bg-gray-100 p-3 rounded-lg">
                <GraduationCap className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{new Set(students.map(s => s.department)).size}</p>
          </div>

        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Filter size={20} />
            Filters & Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, roll no, room..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option>All Years</option>
              {years.map(year => <option key={year}>{year}</option>)}
            </select>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option>All Departments</option>
              {departments.map(dept => <option key={dept}>{dept}</option>)}
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setYearFilter('All Years');
                  setDepartmentFilter('All Departments');
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
              >
                Reset
              </button>
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Student Directory</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Roll No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {student.photo && (
                          <img
                            src={student.photo}
                            alt={student.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                          />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{student.rollNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Home className="w-4 h-4 text-gray-400" />
                        {student.roomNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {student.mobile}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 truncate max-w-xs">
                          <Mail className="w-3 h-3 text-gray-400" />
                          {student.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewStudent(student)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(student)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Edit Student' : 'Add New Student'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">Fill in the student details</p>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Photo Uploads */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Upload Photos</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <PhotoUploadBox type="student" label="Student Photo *" photo={photos.student} />
                  <PhotoUploadBox type="father" label="Father Photo" photo={photos.father} />
                  <PhotoUploadBox type="mother" label="Mother Photo" photo={photos.mother} />
                  <PhotoUploadBox type="guardian" label="Guardian Photo" photo={photos.guardian} />
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter student's full name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Roll Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                      placeholder="e.g., 21CS101"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="student@university.edu"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="">Select</option>
                      {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <select
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="">Select</option>
                      {years.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                    <select
                      value={formData.semester}
                      onChange={(e) => handleInputChange('semester', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="">Select</option>
                      {semesters.map(sem => <option key={sem} value={sem}>{sem}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Hostel Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Hostel Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.roomNumber}
                      onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                      placeholder="e.g., A-101"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Guardian Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Guardian Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Name</label>
                    <input
                      type="text"
                      value={formData.guardianName}
                      onChange={(e) => handleInputChange('guardianName', e.target.value)}
                      placeholder="Parent/Guardian name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Mobile</label>
                    <input
                      type="tel"
                      value={formData.guardianMobile}
                      onChange={(e) => handleInputChange('guardianMobile', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-4 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {isEditing ? 'Update Student' : 'Add Student'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {showViewModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Student Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Photos Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Photos</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedStudent.photo && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Student</p>
                      <img
                        src={selectedStudent.photo}
                        alt="Student"
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                      />
                    </div>
                  )}
                  {selectedStudent.fatherPhoto && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Father</p>
                      <img
                        src={selectedStudent.fatherPhoto}
                        alt="Father"
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                      />
                    </div>
                  )}
                  {selectedStudent.motherPhoto && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Mother</p>
                      <img
                        src={selectedStudent.motherPhoto}
                        alt="Mother"
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                      />
                    </div>
                  )}
                  {selectedStudent.guardianPhoto && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Guardian</p>
                      <img
                        src={selectedStudent.guardianPhoto}
                        alt="Guardian"
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Student Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{selectedStudent.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Roll Number</p>
                      <p className="font-medium text-gray-900">{selectedStudent.rollNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Mobile</p>
                      <p className="font-medium text-gray-900">{selectedStudent.mobile}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900 truncate">{selectedStudent.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="font-medium text-gray-900">{selectedStudent.department}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Year / Semester</p>
                      <p className="font-medium text-gray-900">{selectedStudent.year} / {selectedStudent.semester}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Room Number</p>
                      <p className="font-medium text-gray-900">{selectedStudent.roomNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guardian Info */}
              {(selectedStudent.guardianName || selectedStudent.guardianMobile) && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Guardian Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedStudent.guardianName && (
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Guardian Name</p>
                          <p className="font-medium text-gray-900">{selectedStudent.guardianName}</p>
                        </div>
                      </div>
                    )}
                    {selectedStudent.guardianMobile && (
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Guardian Mobile</p>
                          <p className="font-medium text-gray-900">{selectedStudent.guardianMobile}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-4">
              <button
                onClick={() => setShowViewModal(false)}
                className="w-full bg-gray-600 text-white px-6 py-2.5 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelStudents;